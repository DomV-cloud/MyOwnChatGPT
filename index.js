
const { Configuration, OpenAIApi } = require("openai");
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

/*Configuration with API key*/ 
const configuration = new Configuration({
    organization: "org-GNyNazgOdrGaE6ybjMyf5zmu",
    apiKey: "YOUR API KEY, you can get one there: https://platform.openai.com/",
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
    const {message} = req.body;
    
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${message}`,
        max_tokens: 100,
        temperature: 0.5,
      });
      
      console.log(response.data.choices[0].text);  
      res.json({
        //data:response.data
        message:response.data.choices[0].text,
      })
});

app.listen(port, () => {
    console.log('Example app is listening at the port:' + port);
})
