const mailer = require("nodemailer");
const smtpCredetials = require("./config").SMTP_CREDENTIALS;
const transport = mailer.createTransport(smtpCredetials);

const accountSid = require("./config").TWILIO_SID;
const auth_token = require("./config").TWILIO_AUTH_TOKEN;
const twilio = require("twilio");

const collectionName = require("./config").MONGO_TABLE;

const updateEntry = (data, db) => {
    return new Promise((resolve, reject) => {
        db.collection(collectionName)
            .findOneAndUpdate(
                { "host.phoneNumber": data.phoneNumber, otp: Number(data.otp) },
                { $set: { checkOut: data.checkOut } }
            )
            .then(response => {
                // console.log("response",response);
                if (response.value === null)
                    reject({ message: "invalid input" });
                else {
                    resolve(response);
                }
            })
            .catch(err => {
                // console.log("err", err);
                reject(err);
            });
    });
};

const storeEntry = (data, db) => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    data.otp = otp;
    return new Promise((resolve, reject) => {
        db.collection(collectionName)
            .insertOne(data)
            .then(data => {
                // console.log("DB",data.insertedId)
                resolve({ id: data.insertedId, otp: otp });
            })
            .catch(err => {
                console.error(err);
                reject(err);
            });
    });
};

const sendSMS = (message, receiver) => {
    const client = new twilio(accountSid, auth_token);
    return client.messages.create(message);
};
const sendEmail = message => {
    // console.log(message);
    return new Promise((resolve, reject) => {
        transport.sendMail(message, (err, info) => {
            if (err) resolve(err);
            else resolve(info);
        });
    });
};

module.exports = {
    sendEmail,
    sendSMS,
    storeEntry,
    updateEntry
};
