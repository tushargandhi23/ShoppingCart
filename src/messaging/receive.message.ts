import * as AWS from 'aws-sdk';
import {Consumer} from 'sqs-consumer';

export class ReceiveSQSMessage{

    // Create an SQS service object
    sqs : any;
    queueUrl : any;

    constructor(){
        AWS.config.loadFromPath('./dist/config/aws.config.json');
        this.sqs = new AWS.SQS({apiVersion: '2012-11-05'});
        this.queueUrl = "https://sqs.ap-south-1.amazonaws.com/714837985838/firstQueue.fifo";
        AWS.config.update({region : 'ap-south-1'});
    }

    receiveMessage() {
        console.log("Receiving messages!")
        const app = Consumer.create({
            queueUrl: this.queueUrl,
            handleMessage: async (message) => {
                console.log("Received Message: "+JSON.stringify(message));
            },
            sqs: this.sqs
        });
        
        app.on('error', (err) => {
            console.error(err.message);
        });
        
        app.on('processing_error', (err) => {
            console.error(err.message);
        });
        
        console.log('Catalogue update event receving messages');
        app.start();
    }

}


