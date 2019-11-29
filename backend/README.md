# This project was bootstrapped with `npm`

This is the backend service for the Innovaccer SD problem statement.

## Setup Instructions

```javascript
npm backend
npm install
```

You will need to create the following things.

### Twilio

SMS to the host are being sent using the Twilio API. You may either use my credentials which are part of the free trial but please not that they may run out soon. Also, I'm not sure but SMS don't work after midnight.

The other way is to create a new Twilio account and use your new credentials and place them in `config.js`.

```javascript
TWILIO_SID: "<enter-your-twilio-sid-here>",
TWILIO_AUTH_TOKEN: "<enter-your-twilio-auth-token-here>",
TWILIO_NUMBER: "<enter-your-twilio-number-here>",
```

### Mailtrap

I am using mailtrap to fake a SMTP server for emails and hence need a Mailtrap account.

Here also you may use my credentials but you can send max upto 50 emails per day on the free trial.

```javascript
SMTP_CREDENTIALS: {
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "<enter-your-mailtap-userid>",
            pass: "<enter-your-mailtrap-password"
        }
    },
    SENDER_ADDRESS: "reception@innovaccer.com",
```

You can choose any sender's address above.

### MongoDB

The database of choice is **mongoDb**. You will need a database and a table which after creation you can input in `config.js` like below.

```
MONGO_URL: "<enter-mongo-host-url>", //if local -> mongodb://localhost:27017/
MONGO_DB: "<enter-databse-name>",
MONGO_TABLE: "<enter-collection-name"
```

The schema is of the below form

```json
{
    "_id": "ObjectId("r29f2mc20302423")",
    "visitor": {
        "name": "A",
        "email": "b@email.com",
        "phoneNumber": "+91034802492"
    },
    "host": {
        "name": "A",
        "email": "b@email.com",
        "phoneNumber": "+91034802492"
    },
    "checkIn":"Fri, 29 Nov 2019 10:17:08 GMT",
    "checkOut":"Fri, 29 Nov 2019 10:17:08 GMT",
    "otp":344324
}
```

Finally run `npm start`. The server will automatically start at port 5000. If you wish to change the PORT numbr then you can do so by changing the **PORT** in `config.js`.

## Endpoints

### /entry/new

Requires data in the form

```json
{
    "visitor": {
        "name": "A",
        "email": "b@email.com",
        "phoneNumber": "+91034802492"
    },
    "host": {
        "name": "A",
        "email": "b@email.com",
        "phoneNumber": "+91034802492"
    },
    "checkIn": "Fri, 29 Nov 2019 10:17:08 GMT"
}
```

Response is whatever eac server sends back with success. Plus an OTP with status 200.

### /exit

Requires data in the form

```json
{
    "checkOut": "Fri, 29 Nov 2019 10:17:08 GMT",
    "otp": 344324,
    "phoneNumber": "+91034802492"
}
```

## Dependencies

The backend has a lot of dependencies.

1. ExpressJS
2. Nodemailer
3. Twilio
4. Cors
5. Body-parser
6. MongoDB
7. Nodemon
