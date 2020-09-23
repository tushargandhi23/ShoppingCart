import app from "./app";
import {ReceiveSQSMessage} from './messaging/receive.message';
const PORT = process.env.PORT || 3001;

const receiveMessages : ReceiveSQSMessage = new ReceiveSQSMessage();
receiveMessages.receiveMessage();


app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
});

