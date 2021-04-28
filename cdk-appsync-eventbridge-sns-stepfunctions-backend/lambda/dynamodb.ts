const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

export type PayloadType = {
    operationSuccessful: boolean,
    SnsMessage?: string
}

exports.handler = async(event) => {
    console.log("dynamodbHandler event", event);


    //initailly returningPayload
    let returningPayload: PayloadType = {
        operationSuccessful: false,
        SnsMessage: ''
    }
    //may updated if try success


    if(event["detail-type"] === "addBookmark") {
        const params = {
            TableName: process.env.TABLE_NAME || '',
            Item: {
                ...event.detail
            }
        }

        try {
            await docClient.put(params).promise();            //add specific data into database
            returningPayload.operationSuccessful = true;
            returningPayload.SnsMessage = 'REQUEST of addBookmark';
        }
        catch (err) {
            console.log(err);
        }
    }

    else if(event["detail-type"] === "delBookmark") {
        const params = {
            TableName: process.env.TABLE_NAME || '',
            Key: {                                            //pass Key's id to hold specific data
                id: event.detail.id
            }
        }

        try {
            await docClient.delete(params).promise();         //delete that specific id's data 
            returningPayload.operationSuccessful = true;
            returningPayload.SnsMessage = 'REQUEST of delBookmark';
        }
        catch (err) {
            console.log(err);
        }
    }


    //returning RESPONSE
    return returningPayload;
}