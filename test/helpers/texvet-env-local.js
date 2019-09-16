const DRUPAL_URL = "http://inventive-d8-txc.pantheonsite.io"

var API_BASE_URL

if(process.env.TEST_ENV == 'local'){
    API_BASE_URL = "http://localhost:3000";
}
if(process.env.TEST_ENV == 'demo'){
    API_BASE_URL = "http://demo-api.chatbot.texvet.org";
}
if(process.env.TEST_ENV == 'development'){
    API_BASE_URL = "http://dev-api.chatbot.texvet.org";
}
if(process.env.TEST_ENV == 'staging'){
    API_BASE_URL = "http://staging-api.chatbot.texvet.org";
}
if(process.env.TEST_ENV == 'production'){
    API_BASE_URL = "http://api.chatbot.texvet.org";
}

module.exports = {DRUPAL_URL, API_BASE_URL}