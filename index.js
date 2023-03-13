
const { Configuration, OpenAIApi } = require("openai");
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

/*Configuration with API key*/ 
const configuration = new Configuration({
    organization: "org-GNyNazgOdrGaE6ybjMyf5zmu",
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);

/*Unabled CORS*/
const app = express()
app.use(bodyParser.json());
app.use(cors())
/*3080 port, beacause 3000 is reserved for React app*/ 
const port = 3080
/*Resolving request from user */ 
app.post('/',async (req,res) => {
    const {message, currentModel} = req.body;
    console.log(currentModel, "currentmodel");
    
    const response = await openai.createCompletion({
        model: `${currentModel}`,
        prompt: `${message}`,
        max_tokens: 100,
        temperature: 0.5,
      });
      
      console.log(response.data.choices[0].text);  
      res.json({
        message:response.data.choices[0].text,
      })
});

app.get('/models',async (req,res) => {
    const response = await openai.listEngines();
    console.log(response.data.data);
    res.json({
      models:response.data.data
    })
});

app.listen(port, () => {
    console.log('Example app is listening at the port:' + port);
})