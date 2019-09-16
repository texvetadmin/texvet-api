const supertest = require('supertest');
const expect = require('chai').expect;
const env = require('./../helpers/texvet-env-local')


const request = supertest(env.API_BASE_URL);

var data = {
    "responseId": "ea3d77e8-ae27-41a4-9e1d-174bd461b68c",
    "session": "projects/your-agents-project-id/agent/sessions/88d13aa8-2999-4f71-b233-39cbf3a824a0",
    "queryResult": {
        "queryText": "user's original query to your agent",
        "parameters": {
            "param": "param value"
            },
        "allRequiredParamsPresent": true,
        "fulfillmentText": "Text defined in Dialogflow's console for the intent that was matched",
        "fulfillmentMessages": [{
            "text": {
                "text": [
                "Text defined in Dialogflow's console for the intent that was matched"
                ]
            }
        }],
        "outputContexts": [{
            "name": "projects/your-agents-project-id/agent/sessions/88d13aa8-2999-4f71-b233-39cbf3a824a0/contexts/generic",
            "lifespanCount": 5,
            "parameters": {
                "param": "param value"
            }
        }],
        "intent": {
            "name": "projects/your-agents-project-id/agent/intents/29bcd7f8-f717-4261-a8fd-2d3e451b8af8",
            "displayName": "Matched Intent Name"
        },
        "intentDetectionConfidence": 1,
        "diagnosticInfo": {},
        "languageCode": "en"
    },
    "originalDetectIntentRequest": {}
};
// -- Not working as expected --

// // dialogflow-webhook
// describe('dialogflow-webhook', function () {
//     var path = '/auth/v1/fulfillments/dialogflow-webhook'

//     it("Should Succeed", function(done) { 
//         request
//         .post(path)
//         .send(data)
//         .end(function(err, res) {
//             expect(res.statusCode).to.equal(200);
//             done();
//         });
//     });

//     it("Should not be empty", function(done) {
//         request
//         .get(path)
//         .end(function(err, response) {
//             expect(response.message).to.not.be.null;
//             expect(response.message).to.be.an('object');
//             expect(response.message.fulfillmentText).to.not.be.empty;
//             done();
//         });
//     });
// });
