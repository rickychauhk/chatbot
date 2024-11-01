// services/openaiService.js
const { Configuration, OpenAIApi } = require("openai");
const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });

const apiKey = "sk-2XQ820I9uVvgu3K4139fCf0198Ab446d997324356678FeAc";
const configuration = new Configuration({
  apiKey: apiKey,
  // organization: 'YOUR_ORGANIZATION_ID',
  basePath: 'https://openai.ss-gpt.com/v1',
});
const openai = new OpenAIApi(configuration);
var options = {
  host: 'https://mobileapiprd.citysuper.com.hk/public/api/eshop/homepage',
  port: 80,
  path: '',
  method: 'GET'
};
async function callGPT(promptContent, systemContent, previousChat) {
  try {
    const messages = [];

    const userPrompt = {
      role: "user",
      content: promptContent,
    };
    const systemPrompt = {
      role: "system",
      content: systemContent,
    };
    const assistantPrompt = {
      role: "assistant",
      content: previousChat,
    };

    messages.push(userPrompt);
    messages.push(systemPrompt);
    messages.push(assistantPrompt);

    const response = await openai.createChatCompletion({
      model: "gpt-4o", // Switch to different models if necessary
      //   model: "gpt-3.5-turbo",
      messages: messages,
    });
  
    console.log('data', response.data);
    console.log('content:', response.data.choices[0].message.content);
    if(response.data.length == 0){
      return
    }
    if(Object.keys(response.data.choices[0].message).length == 0){
      return
    }
    var requestify = require('requestify');

requestify.get('https://mobileapiprd.citysuper.com.hk/public/api/eshop/homepage')
  .then(function(response) {
      // Get the response body (JSON parsed or jQuery object for XMLs)
      response.getBody();
      console.error("response:", response.getBody());
  }
);
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Error:", error);
    return `An error occurred while processing the request: ${error}`;
  }
}

module.exports = { callGPT };
