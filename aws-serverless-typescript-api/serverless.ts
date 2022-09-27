//  ____________________ SECTION 1 START ____________________

import type { AWS } from '@serverless/typescript';

import 
  hello 
from '@functions/hello';

  /* 
    ...constants
  */ 

//  ____________________ SECTION 1 ENDER ____________________



//  ____________________ SECTION 2 START ____________________

  /* 
    ...apiGateway
  */ 
   
//  ____________________ SECTION 2 ENDER ____________________



//  ____________________ SECTION 3 START ____________________

const serverlessConfiguration: AWS = {

  /* 
    __________ SETTING __________

    frameworkVersion 
      .2 -> 3

    custom
      .serverless-offline 

    plugins
      .serverless-offline

    iam
      .role

    __________ HANDLER __________

    functions
      .gql

    Resources
      .GatewayResponseDefault4XX
      .newBackendLicenseTableDynamoDbTable
        .Type
        .Properties
  */ 

  service: 'aws-serverless-typescript-api',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
  },
  // import the function via paths
  functions: { hello },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

//  ____________________ SECTION 3 ENDER ____________________

module.exports = serverlessConfiguration;
