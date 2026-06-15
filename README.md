# RabbitMQ User Registration Microservice

## Overview

This project demonstrates asynchronous communication between microservices using RabbitMQ.

When a user registers, the User Service publishes a message to RabbitMQ. The Email Service consumes the message and simulates sending a welcome email.

No direct communication exists between the services.

---

## Architecture

```text
                    POST /register
                           |
                           v
                  +----------------+
                  |  User Service  |
                  |   (Producer)   |
                  +----------------+
                           |
                    Publish Message
                           |
                           v
                  +----------------+
                  |    RabbitMQ    |
                  | user_registered|
                  |     Queue      |
                  +----------------+
                           |
                    Consume Message
                           |
                           v
                  +----------------+
                  | Email Service  |
                  |   (Consumer)   |
                  +----------------+
                           |
                           v
        Welcome email sent to user@example.com
```

---

## Flow

### Step 1

Client sends:

```http
POST /register
```

Request Body:

```json
{
  "name": "Ritika",
  "email": "ritika@gmail.com"
}
```

### Step 2

User Service receives the request.

Creates a message:

```json
{
  "name": "Ritika",
  "email": "ritika@gmail.com"
}
```

### Step 3

User Service publishes the message to RabbitMQ.

Queue:

```text
user_registered
```

### Step 4

RabbitMQ stores the message until a consumer is available.

### Step 5

Email Service consumes the message.

Output:

```text
Welcome email sent to ritika@gmail.com
```

---

## Tech Stack

### User Service

- Node.js
- Express.js
- amqplib

### Email Service

- Node.js
- amqplib

### Messaging

- RabbitMQ

### Infrastructure

- Docker

---

## Project Structure

```text
rabbitmq-project/

│
├── user-service/
│   ├── server.js
│   ├── rabbitmq.js
│   └── package.json
│
├── email-service/
│   ├── consumer.js
│   └── package.json
│
└── README.md
```

---

## RabbitMQ Concepts Covered

### Producer

The User Service acts as a producer.

```text
User Service → RabbitMQ
```

### Queue

RabbitMQ stores messages inside:

```text
user_registered
```

### Consumer

Email Service acts as a consumer.

```text
RabbitMQ → Email Service
```

### Acknowledgement (ACK)

After processing a message:

```javascript
channel.ack(msg);
```

RabbitMQ removes the message from the queue.

---

## Running RabbitMQ

Start RabbitMQ using Docker:

```bash
docker run -d --hostname rabbitmq --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management
```

RabbitMQ Dashboard:

```text
http://localhost:15672
```

Credentials:

```text
Username: guest
Password: guest
```

---

## API

### Register User

```http
POST /register
```

Request:

```json
{
  "name": "Ritika",
  "email": "ritika@gmail.com"
}
```

Response:

```json
{
  "success": true,
  "message": "User registered"
}
```

---

## Expected Output

### User Service

```text
RabbitMQ Connected
User Service Running
```

### Email Service

```text
Waiting for messages...
Welcome email sent to ritika@gmail.com
```

---


---

## Learning Outcomes

By completing this project, you will understand:

- Asynchronous Communication
- RabbitMQ Basics
- Producers and Consumers
- Message Queues
- ACK/NACK
- Event-Driven Architecture
- Microservice Communication Patterns

This project serves as a foundation for building larger systems such as order processing, notification services, payment systems, and distributed microservices architectures.
