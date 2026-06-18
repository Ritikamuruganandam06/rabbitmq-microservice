const amqp = require("amqplib");

async function consume() {

  const connection =
    await amqp.connect(
      "amqp://localhost"
    );

  const channel =
    await connection.createChannel();

  await channel.assertQueue(
    "user_registered"
  );

  console.log(
    "Waiting for messages.."
  );

  channel.consume(
    "user_registered",
    (msg) => {

      const user =
        JSON.parse(
          msg.content.toString()
        );

      console.log(
        `Welcome email sent to ${user.email}`
      );

      channel.ack(msg);
    }
  );
}

consume();