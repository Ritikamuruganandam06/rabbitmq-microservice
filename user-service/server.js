const express = require("express");

const {
  connectRabbitMQ,
  getChannel
} = require("./rabbitmq");

const app = express();

app.use(express.json());

app.post("/register", async (req, res) => {

  const { name, email } = req.body;

  const channel = getChannel();

  const message = {
    name,
    email
  };

  channel.sendToQueue(
    "user_registered",
    Buffer.from(
      JSON.stringify(message)
    )
  );

  res.json({
    success: true,
    message: "User registered"
  });
});

app.listen(3000, async () => {

  await connectRabbitMQ();

  console.log(
    "User Service Running"
  );
});