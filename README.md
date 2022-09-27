### Building a serverless app with TypeScript
- src : https://blog.logrocket.com/building-serverless-app-typescript/
```bash
# Initialize a new serverless project
serverless create --template aws-nodejs-typescript --path aws-serverless-typescript-api
```
### Project structure
The project code base is mainly located within the src folder. This folder is divided in:
- functions - containing code base and configuration for your lambda functions
- libs - containing shared code base between your lambdas
```
├── src
│   ├── functions               # Lambda configuration and source code folder
│   │   ├── hello
│   │   │   ├── handler.ts      # `Hello` lambda source code
│   │   │   ├── index.ts        # `Hello` lambda Serverless configuration
│   │   │   ├── mock.json       # `Hello` lambda input parameter, if any, for local invocation
│   │   │   └── schema.ts       # `Hello` lambda input event JSON-Schema
│   │   │
│   │   └── index.ts            # Import/export of all lambda configurations
│   │
│   └── libs                    # Lambda shared code
│       └── apiGateway.ts       # API Gateway specific helpers
│       └── handlerResolver.ts  # Sharable library for resolving lambda handlers
│       └── lambda.ts           # Lambda middleware
│
├── package.json
├── serverless.ts               # Serverless service file
├── tsconfig.json               # Typescript compiler configuration
├── tsconfig.paths.json         # Typescript paths
└── webpack.config.js           # Webpack configuration
```

</br>





## After start - serverless.ts

</br>

### SECTION 1
missing... 
    constants

```ts
import {
    STAGE,
    LICENSE_TABLE_NAME,
    ...,
    SHOP_TABLE_NAME,
} from "./constants";
```

</br>

### SECTION 2
missing... apiGateway

```ts
const capitalizeFirst = (s: string) => s[0].toUpperCase() + s.substring(1);
// Read apiGatewayRestApiId & apiGatewayRestApiRootResourceId from ./apigateway/serverless.yml
let apiGatewayRestApiId = "";
let apiGatewayRestApiRootResourceId = "";
try {
  // SOMEHOW CODE BREAKS WITH New VERSION OF YAML. CHANGING TO THIS FIRST!
  apiGatewayRestApiId = `newBackend${capitalizeFirst(STAGE)}SharedGW-restApiId`;
  apiGatewayRestApiRootResourceId = `newBackend${capitalizeFirst(
    STAGE
  )}SharedGW-rootResourceId`;
} catch (e) {
  console.log("Error:", e);
}
```

</br>

### SECTION 3 - 🤯 change a lot
missing... 
```
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
```
 __________ SETTING __________
```ts
    // frameworkVersion
    frameworkVersion: "2",
    // custom
    custom: {
        webpack: {
        webpackConfig: "./webpack.config.js",
        includeModules: true,
        },
        // Unexpected error while starting serverless-offline lambda server on port 3002: Error: listen EADDRINUSE: address already in use 0.0.0.0:3002
        //https://github.com/dherault/serverless-offline/issues/1015
        "serverless-offline": {
        lambdaPort: 4000,
        },
    },
    // plugins
    plugins: ["serverless-webpack", "serverless-offline"],
```

__________ HANDLER __________
```ts
    //  gql
    functions: {
        authMiddlewareFunction,
        graphqlAPI,
        authRegister,
        userDetail,
    },
    // Resources.GatewayResponseDefault4XX
    GatewayResponseDefault4XX: {
    Type: "AWS::ApiGateway::GatewayResponse",
        Properties: {
            ResponseParameters: {
            "gatewayresponse.header.Access-Control-Allow-Origin": "'*'",
            "gatewayresponse.header.Access-Control-Allow-Headers": "'*'",
            "gatewayresponse.header.Access-Control-Expose-Headers":
                "'x-amzn-ErrorType, x-amz-apigw-id, X-Cache, X-Amz-Cf-Pop, X-Amz-Cf-Id'",
            },
            ResponseType: "DEFAULT_4XX",
            RestApiId: {
            "Fn::ImportValue": apiGatewayRestApiId,
            },
        },
    },
    // Resources.newBackendLicenseTableDynamoDbTable
    ["newBackendLicenseTableDynamoDbTable" + STAGE]: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
            TableName: LICENSE_TABLE_NAME,
            BillingMode: "PAY_PER_REQUEST",
            AttributeDefinitions: [
                { AttributeName: "licenseID", AttributeType: "S" },
                { AttributeName: "email", AttributeType: "S" },
            ],
            KeySchema: [
                { AttributeName: "licenseID", KeyType: "HASH" }, // PK
            ],
            GlobalSecondaryIndexes: [
                {
                    IndexName: LICENSE_BY_EMAIL_INDEX,
                    KeySchema: [{ AttributeName: "email", KeyType: "HASH" }],
                    Projection: {
                    ProjectionType: "ALL",
                    },
                },
            ],
        },
    },
```
