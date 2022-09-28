//  ____________________ env 1 START ____________________

// pack starter
const AWS = require("aws-sdk");
const express = require("express");
const serverless = require("serverless-http");
const app = express();
// CRUD
const {
    get
} = require("@aws-sdk/client-dynamodb")
const { v4: uuidv4 } = require('uuid'); 

// dynamoDB
const USERS_TABLE = process.env.USERS_TABLE;
const MESSAGE_TABLE = process.env.MESSAGE_TABLE;
const dynamoDbClient = new AWS.DynamoDB.DocumentClient();
// linebot 
const axios = require("axios").default;
const dotenv = require("dotenv");
const env = dotenv.config().parsed;

const line = require("@line/bot-sdk");
const lineConfig = {
    channelAccessToken: env.ACCESS_TOKEN,
    channelSecret: env.SECRET_TOKEN,
};
// create client
const client = new line.Client(lineConfig);

//  ____________________ env 1 ENDER ____________________

//  ________________________________________ section START ________________________________________

app.post("/webhook", line.middleware(lineConfig), async (req, res) => {
    try {
        const events = req.body.events;
        console.log('🍭 event 😵‍💫 ', events);
        return events.length > 0
            ? await events.map((item) => handleEvent(item))
            : res.status(200).send("OK");
    } catch (error) {
        res.status(500).end();
    }
});

app.get('/webhook', async (req, res) => {
    res.send("hi")
})

const handleEvent = async (event) => {
    if (event.type !== 'message' || event.message.type !== 'text') {
        return null;
    }

    else if (event.type === 'message') {
        //  ____________________ put to dynamod START ____________________
        const id_gen = uuidv4()

        const params = {
        TableName: MESSAGE_TABLE,
            Item: {
                PK: id_gen,
                messageId: event.message.id, 
                name: "-",
                text: event.message.text,
                userId: event.source.userId
            },
        };
        try {
            await dynamoDbClient.put(params).promise();
            console.log('🍭 send message to db 🧑🏻 💬 ', params)
        } catch(error) {
            console.log(error);
            res.status(500).json({ error: "Could not send message to db" });
        }
        //  ____________________ put to dynamod ENDER ____________________

        // ขอรายละเอียด
        if (event.message.text === "ขอรายละเอียด") {
            messageAll = [
                { 
                    "type": "text", 
                    "text": "เลือกรายการที่คุณต้องการ 😆",
                    "quickReply": { 
                        "items": [    
                        // {
                        //     "type": "action", 
                        //     "action": {
                        //     "type": "location",
                        //     "label": "Send location"
                        //     }
                        // },
                        {
                            "type": "action",
                            "action": {
                            "type": "message",
                            "label": "🎃 ร้านอยู่ที่ไหน",
                            "text": "ร้านอยู่ไหน"
                            }
                        },
                        {
                            "type": "action",
                            "action": {
                            "type": "message",
                            "label": "🎃 ข้อมูลติดต่อ",
                            "text": "ข้อมูลติดต่อ"
                            }
                        },
                        {
                            "type": "action",
                            // "imageUrl": "https://example.com/tempura.png",
                            "action": {
                            "type": "message",
                            "label": "ออก",
                            "text": "."
                            }
                        }
                        ]
                    }
                }
            ];
            console.log("messageAll -> ", messageAll);
            return client.replyMessage(event.replyToken, messageAll);
        }

        // TODO
        else if (event.message.text === "Todo") {
            try {
                const { data } = await axios.get(
                    `https://jsonplaceholder.typicode.com/todos/1`
                ); //use data destructuring to get data from the promise object
                console.log("Data -> ", data);
                messageAll = [
                    { type: "text", text: 
                        " userId : " + data.userId + 
                        "\n id : " + data.id + 
                        "\n title : " + data.title + 
                        "\n completed : " + data.completed 
                    },
                ];
                console.log("messageAll -> ", messageAll);
    
                return client.replyMessage(event.replyToken, messageAll);
            } catch (error) {
                console.log(error);
            }
        }

        // USER
        else if (event.message.text === "User") {
            try {
                const { data } = await axios.get(
                    `https://jsonplaceholder.typicode.com/users/1`
                ); //use data destructuring to get data from the promise object
                console.log("Data -> ", data);
                messageAll = [
                    { type: "text", text: 
                        " id : " + data.id  +
                        "\n name : " + data.name +
                        "\n username : " + data.username +
                        "\n email : " + data.email +
                        "\n phone : " + data.phone
                    },
                ];
                console.log("messageAll -> ", messageAll.text);
                return client.replyMessage(event.replyToken, messageAll);
            } catch (error) {
                console.log(error);
            }
        }

        // POINT
        else if (event.message.text === "Point") {
            try {
                // const { data } = await axios.get(
                //     `{mock}https://localhost/point`
                // ); 
                // console.log("Data -> ", data);
                messageAll = [
                    { type: "text", text: 
                        " You have 999,999 Point \n ซื้อของเพื่อสะสมเเต้มเพิ่ม 😆" 
                    },
                ];
                console.log("messageAll -> ", messageAll);
                return client.replyMessage(event.replyToken, messageAll);
            } catch (error) {
                console.log(error);
            }
        }

        // PROMOTION
        else if (event.message.text === "Promotion") {
            try {
                // const { data } = await axios.get(
                //     `{mock}https://localhost/PROMOTION`
                // ); 
                // console.log("Data -> ", data);
                messageAll = [
                    { type: "text", text: 
                        "promotion วันนี้ มื้อนี้อย่างคุ้ม! ปรากฏการณ์ลดเยอะกว่า รับส่วนลดสูงสุด 560 บาท " 
                    },
                ];
                console.log("messageAll -> ", messageAll);
                return client.replyMessage(event.replyToken, messageAll);
            } catch (error) {
                console.log(error);
            }
        }

        // ...
        else if (event.message.text === "...") {
            try {
                messageAll = [
                    {
                        "type": "template",
                        "altText": "This is a buttons template",
                        "template": {
                            "type": "buttons",
                            "thumbnailImageUrl": "https://example.com/bot/images/image.jpg",
                            "imageAspectRatio": "rectangle",
                            "imageSize": "cover",
                            "imageBackgroundColor": "#FFFFFF",
                            "title": "Menu",
                            "text": "Please select",
                            "defaultAction": {
                                "type": "uri",
                                "label": "View detail",
                                "uri": "http://example.com/page/123"
                            },
                            "actions": [
                                {
                                  "type": "postback",
                                  "label": "Buy",
                                  "data": "action=buy&itemid=123"
                                },
                                {
                                  "type": "postback",
                                  "label": "Add to cart",
                                  "data": "action=add&itemid=123"
                                },
                                {
                                  "type": "uri",
                                  "label": "View detail",
                                  "uri": "http://example.com/page/123"
                                }
                            ]
                        }
                      }
                ];
                console.log("messageAll -> ", messageAll);
                return client.replyMessage(event.replyToken, messageAll);
            } catch (error) {
                console.log(error);
            }
        }
      
    }
};

//  ________________________________________ section ADMIN ________________________________________

app.use(express.json());

//  ____________________ USERS_TABLE START ____________________

app.get("/users/:userId", async function (req, res) {
  const params = {
    TableName: USERS_TABLE,
    Key: {
      userId: req.params.userId,
    },
  };

  try {
    const { Item } = await dynamoDbClient.get(params).promise();
    if (Item) {
      const { userId, name, phone } = Item;
      //
      res.json({ userId, name, phone });
    } else {
      res
        .status(404)
        .json({ error: 'Could not find user with provided "userId"' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not retreive user" });
  }
});

app.post("/users", async function (req, res) {
    const { userId, name, phone } = req.body;
    if (typeof userId !== "string") {
      res.status(400).json({ error: '"userId" must be a string' });
    } else if (typeof name !== "string") {
      res.status(400).json({ error: '"name" must be a string' });
    } else if (typeof phone !== "string") {
      res.status(400).json({ error: '"phone" must be a string' });
    }
  
    const params = {
      TableName: USERS_TABLE,
      Item: {
        userId: userId,
        name: name,
        phone: phone
      },
    };

    console.log('🧑🏻 params ->', params)
    console.log('🧑🏻 TABLE ->', USERS_TABLE )
  
    try {
      await dynamoDbClient.put(params).promise();
      res.json({ userId, name, phone });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Could not create user" });
    }
});

//  ____________________ USERS_TABLE ENDER ____________________



//  ____________________ MASSAGR_TABLE START ____________________

app.post("/messages", async function (req, res) {
    const { messageId, name, text } = req.body;
    if (typeof messageId !== "string") {
      res.status(400).json({ error: '"messageId" must be a string' });
    } else if (typeof name !== "string") {
      res.status(400).json({ error: '"name" must be a string' });
    } 
  
    const params = {
      TableName: MESSAGE_TABLE,
      Item: {
        messageId: messageId,
        name: "-",
        text: text
      },
    };

    console.log('💬 params ->', params)
    console.log('💬 TABLE ->', MESSAGE_TABLE )
  
    try {
      await dynamoDbClient.put(params).promise();
      res.json({ messageId, name, text });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Could not create message" });
    }
  });

// doing !!

// 🟡 get only PK
app.get("/message/users/:PK", async function (req, res) {
    const params = {
      TableName: MESSAGE_TABLE,
      Key: {
        PK: req.params.PK,
      },
    };
  
    try {
      const { Item } = await dynamoDbClient.get(params).promise();
      if (Item) {
        const { PK, userId, text } = Item;
        //
        res.json({ PK, userId, text });
      } else {
        res
          .status(404)
          .json({ error: 'Could not find message' });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Could not retreive message" });
    }
  });

// 🔴 cannot get anything
// app.get("/message/users/:userId", async function ( req, res ) {
//     const params = {
//         TableName: MESSAGE_TABLE,
//         indexName: 'newest-message-table-dev',
//         KeyConditionExpression: '${queryKey} = :hkey',
//         ExpressionAttributeValues: {
//             ':hkey': 'queryValue',
//         },
//     };

//     const handler2 = async event => {
//         if (!event.pathParameters.userId){
//             return Response._400({ message: 'missing the userId from the path' });
//         }

//         const userId = event.pathParameters.userId;

//         const userShow = await query({
//             tableName: MESSAGE_TABLE,
//             index: 'newest-message-table-dev',
//             queryKey: 'userId',
//             queryValue: userId
//         })

//         return Response._200(userShow)
//     }

//     try {
//         const res = await dynamoDbClient.query(params).promise();
//         return res.Items || [];

//     } catch (error) {
//         console.log(error);
//     }
//   });
// doing !!

//  ____________________ MASSAGR_TABLE ENDER ____________________

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

app.listen(3000, () => {
    console.log("listening on 3000");
});

module.exports.handler = serverless(app);
