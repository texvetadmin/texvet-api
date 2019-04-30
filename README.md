# TexVet API

This is the main API project for the texvet.io application. It utilizes the following technologies:

- AWS Cognito for authentication/authorization
  - Deployed using Terraform in the texvet-infrastructure repository
- AWS Lambda (node 8.10) + AWS API Gateway for API infrastructure
  - Deployed using the serverless framework [serverless framework](https://serverless.com/framework/docs/providers/aws/guide/quick-start/)
- ExpressJS for routing and middleware
- MongoDB for data persistence (prefer MongoDB Atlas for hosted instances)
  - Mongoose for ORM
  - Provision manually using the MongoDB Atlas website

## Prerequisites

### AWS Account & CLI

You should have received AWS credentials from the team lead for this project.
The AWS CLI should be installed and configured on your local machine.

- Create a profile in the credentials file ~/.aws/credentials

  ```bash
    [texvet]
    aws_access_key_id = <YOUR_ACCESS_KEY_ID_FOR_THIS_PROJECT>
    aws_secret_access_key = <YOUR_SECRET_ACCESS_KEY_FOR_THIS_PROJECT>
  ```

- Make the project profile the default for your aws-cli commands

  ```bash
  export AWS_PROFILE=`texvet`
  ```

### Docker

Install [Docker](https://www.docker.com/) if you don't already have it.
You should have, at a minimum, Docker Engine 18.06 and Docker Compose 1.22 installed and configured.

----

## Local Development

To get started with local development, you simply need to execute a few commands...

- Pull down this repo to your local machine
  - `git clone ...`
- Change the directory into the project then
  - `npm install`
- Once everything is installed, start it up
  - `npm start`
    - NOTE: Be sure to wait for MongoDB to finish spooling up (about 30 seconds)

## Infrastructure

This project make the following assumptions about the infrastructure:

- the texvet-infrastructure project has already been configured and run to provide the baseline environments
- there is already a TLS certificate which can be used for the [dev-,staging-,demo-]api.texvet.io domain

### Creating the API domain names

This *one-time* activity allows the project to use named domains for the API instead of the auto-generated API Gateway names.
This is accomplished by using the [serverless-domain-manager](https://github.com/amplify-education/serverless-domain-manager) plugin.
After running `npm install`, check the serverless.yml `domains` configuration to ensure the names match the environments defined in the infrastructure project.
To initialize the domains run the following command for each domain and replace {STAGE_NAME} with the appropriate stage.

  ```bash
  ./node_modules/serverless/bin/serverless create_domain --stage {STAGE_NAME}
  ```