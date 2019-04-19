/* eslint-disable no-use-before-define */
/* eslint-disable no-underscore-dangle */

const AWS = require('aws-sdk');
const chalk = require('chalk');
const _find = require('lodash.find');

async function createUser(region, userpoolName, userpoolAppClientName, user) {
  console.log('Starting identity seeding...');

  // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CognitoIdentityServiceProvider.html
  const idp = new AWS.CognitoIdentityServiceProvider({ region });

  idp.listUserPools({ MaxResults: 10 }).promise()
    .then(findUserPoolId)
    .then(listUserPoolClients)
    .then(findAppClient)
    .then(signUpUser)
    .then(confirmUser)
    .catch((err) => {
      console.error(chalk.red(`Whoops!!!!!\n${err}`));
    });

  /*
      **************************************************************************
      Helper functions
      **************************************************************************
  */

  function confirmUser(appClient) {
    console.info(`Confirming user: ${user.userName}`);

    const confirmParams = {
      UserPoolId: appClient.UserPoolId,
      Username: user.userName,
    };

    return idp.adminConfirmSignUp(confirmParams).promise();
  }

  function findUserPoolId(data) {
    if (!data.UserPools) {
      throw new Error('No user pools returned.');
    }

    const userpool = _find(data.UserPools, item => item.Name === userpoolName);

    if (userpool && userpool.Id) {
      return userpool.Id;
    }

    throw new Error(`User Pool ${userpoolName} not found!`);
  }

  function findAppClient(data) {
    if (!data || !data.UserPoolClients) {
      throw new Error(`There are no User Pool App Clients in ${userpoolName}!`);
    }

    const appClient = _find(data.UserPoolClients,
      item => item.ClientName === userpoolAppClientName);

    if (appClient) {
      return appClient;
    }

    throw new Error(`App Client ${userpoolAppClientName} was not found in ${userpoolName}`);
  }

  function listUserPoolClients(userPoolId) {
    console.info(`Finding App Clients for User Pool: ${userpoolName} (${userPoolId})`);

    return idp.listUserPoolClients({
      UserPoolId: userPoolId,
      MaxResults: 10,
    }).promise();
  }

  async function signUpUser(appClient) {
    console.info(`Creating user: ${user.userName} for App Client ${userpoolAppClientName} (${appClient.ClientId})`);

    const signUpParams = {
      ClientId: appClient.ClientId,
      Password: user.password,
      Username: user.userName,
      UserAttributes: [
        {
          Name: 'email',
          Value: user.email,
        },
      ],
    };

    await idp.signUp(signUpParams).promise();
    return appClient;
  }
}

module.exports = createUser;
