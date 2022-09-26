### Building a serverless app with TypeScript
> https://blog.logrocket.com/building-serverless-app-typescript/
```bash
# Initialize a new serverless project
serverless create --template aws-nodejs-typescript --path aws-serverless-typescript-api
```



</br>

## after start : serverless.ts

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
missing... 
    apiGateway

```ts
const capitalizeFirst = (s: string) => s[0].toUpperCase() + s.substring(1);
// Read apiGatewayRestApiId & apiGatewayRestApiRootResourceId from ./apigateway/serverless.yml
let apiGatewayRestApiId = "";
let apiGatewayRestApiRootResourceId = "";
try {
  // SOMEHOW CODE BREAKS WITH New VERSION OF YAML. CHANGING TO THIS FIRST!
  apiGatewayRestApiId = `whaleVoice${capitalizeFirst(STAGE)}SharedGW-restApiId`;
  apiGatewayRestApiRootResourceId = `whaleVoice${capitalizeFirst(
    STAGE
  )}SharedGW-rootResourceId`;
} catch (e) {
  console.log("Error:", e);
}
```

</br>

### SECTION 3 - 🤯 change a lot
missing... 
    custom.serverless-offline , 
    functions , 
    Resources.GatewayResponseDefault4XX , 
    LicenseTable

```ts

```