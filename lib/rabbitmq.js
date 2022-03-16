var amqp = require('amqplib/callback_api');

const RABBITMQ_URI = process.env.RABBITMQ_URI

async function writeMessageToQueue(message) {
  console.log("writing to queue")
  amqp.connect(RABBITMQ_URI, function (error0, connection) {
    if (error0) {
      console.log(error0)
      return false;
    }
    connection.createChannel(function (error1, channel) {
      if (error1) {
        console.log(error1)
        return false;
      }

      var queue = 'clients';

      channel.assertQueue(queue, {
        durable: false
      });
      channel.sendToQueue(queue, Buffer.from(message));

      console.log(" [x] Sending request for: %s", message);
      return true;
    });
  });
}

export default writeMessageToQueue