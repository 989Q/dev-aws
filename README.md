<!-- <table>
  <tr>
    <td align="center">README</td>
  </tr>
  <tr>
    <td align="center"><img src="https://user-images.githubusercontent.com/73060136/170978123-74321c58-f497-4c36-a2e9-cb719add57cc.jpeg" width=100%></td>
  </tr>
</table> -->



<!-- ________________________________________________________________________________________________________________________ -->

### Dev-1 ( starter )
🤩 Success
> - setting : serverless offine
> - add : expreess serverless dynamodb



</br>

<!-- ________________________________________________________________________________________________________________________ -->

### Dev-2 ( starter + linebot )
🤩 Success
> - ngrok & serverless
> - can post message data from line to dynamoDB

🤯 Doing
> - connect to chat-ui
> - Serverless : offline , online
> - Feature : graphql

😭 Error
> - GlobalSecondaryIndexes can't get anything, ( proj not support GSI and file )
> - FRONTEND : postman error can't get data because I don't know the correct format to do GSI.
>   - BACKEND : aws dynamoDB is work

???
> 🥲 ServerlessYoutubeSeries/lambdas/common/Dynamo.js 
>   - query: async ({ tableName, index, queryKey, queryValue }) => {...}

> 🥲 ServerlessYoutubeSeries/lambdas/endpoints/getGameScores.js 
>   - const handler = async event => {...}



</br>

<!-- ________________________________________________________________________________________________________________________ -->

### sls.ts-1 ( serverless.ts template ) 
🤩 Success
> Building a serverless app with TypeScript
>   - https://github.com/icode247/aws-serverless-typescript-api/

🤯 Doing
> - serverless.ts : advance
> - api : graphql 
> - ...
