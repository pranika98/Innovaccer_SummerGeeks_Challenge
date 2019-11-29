const express = require("express");
const parser = require("body-parser");
const config = require("./config");
const cors = require("cors");

const { sendEmail, sendSMS, storeEntry, updateEntry } = require("./helpers");

const message_template = require("./config").SMS_TEMPLATE;
const sms_number = require("./config").TWILIO_NUMBER;
const host_email_template = require("./config").HOST_EMAIL_TEMPLATE;
const visitor_email_template = require("./config").VISITOR_EMAIL_TEMPLATE;

const MongoClient = require("mongodb").MongoClient;
const url = require("./config").MONGO_URL;
const dbName = require("./config").MONGO_DB;
const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const app = express();
// app.use(express.json());
app.use(parser.json()); // to support JSON-encoded bodies
app.use(
    parser.urlencoded({
        // to support URL-encoded bodies
        extended: true
    })
);
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    // res.header(
    //     "Access-Control-Allow-Headers",
    //     "Origin, X-Requested-With, Content-Type, Accept"
    // );
    next();
});
app.get("/", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");
    res.send({ key: "value" });
});

app.post("/entry/new", (req, res) => {
    // backend receives the visitor and host details from the front end and stores it in file
    // console.log(req.body)
    // console.log(res.)
    const { visitor, host, checkIn } = req.body;
    const emailBody = {
        from: config.SENDER_ADDRESS,
        to: host.email,
        subject: `Hi ${host.name}. You have a visitor!`,
        html: host_email_template
            .replace("${HOST_NAME}", host.name)
            .replace("${VISITOR_NAME}", visitor.name)
            .replace("${VISITOR_EMAIL}", visitor.email)
            .replace("${VISITOR_NUMBER}", visitor.phoneNumber)
            .replace("${VISITOR_CHECKIN}", checkIn)
    };
    const sms = {
        to: host.phoneNumber,
        from: sms_number,
        body: message_template
            .replace("${HOST_NAME}", host.name)
            .replace("${VISITOR_NAME}", visitor.name)
            .replace("${VISITOR_EMAIL}", visitor.email)
            .replace("${VISITOR_NUMBER}", visitor.phoneNumber)
            .replace("${VISITOR_CHECKIN}", checkIn)
    };
    // storing information to the database
    let resp = {};
    storeEntry(req.body, db)
        .then(response => {
            resp = { ...response };
        })
        .then(() => sendEmail(emailBody))
        .then(data => {
            resp.email = {
                status: true,
                response: {
                    response: data.response,
                    envelope: { ...data.envelope }
                }
            };
        })
        .then(() => sendSMS(sms)) // send sms to host
        .then(data => {
            resp.sms = {
                status: true,
                response: {
                    from: data.from,
                    to: data.to,
                    dateCreated: data.dateCreated
                }
            };
            // console.log(1, resp);
            if (resp.email.status && resp.sms.status)
                return res.status(200).json(resp);
            else return res.status(500).json(resp);
        })
        .catch(err => {
            resp.err = err;
            // console.log(2, resp);
            return res.status(500).json(resp);
        });
});

// app.post('entry/old', (req, res) => {})
// app.get('details', (req, res) => {})
app.post("/exit", (req, res) => {
    // once the guest checks out then he/she should receive an email stating the following
    const { body } = req;
    // console.log(body);
    const emailBody = {
        from: config.SENDER_ADDRESS,
        subject: "Thank you visiting Innovaccer"
    };
    updateEntry(body, db)
        .then(data => {
            if (data.message && data.message === "invalid input")
                throw new Error("invalid input");
            else {
                // console.log(data.value);
                const { checkIn, checkOut, visitor, host } = data.value;
                emailBody.to = visitor.email;
                emailBody.html = visitor_email_template
                    .replace("${HOST_NAME}", host.name)
                    .replace("${VISITOR_NAME}", visitor.name)
                    .replace("${VISITOR_FULL_NAME}", visitor.name)
                    .replace("${VISITOR_NUMBER}", visitor.phoneNumber)
                    .replace("${VISITOR_CHECKIN}", checkIn)
                    .replace("${VISITOR_CHECKOUT}", checkOut);
                return emailBody;
            }
        })
        .then(body => sendEmail(body))
        .then(response => {
            // console.log(response);
            return res.status(200).json("OK");
        })
        .catch(err => {
            if (err.message === " invalid input")
                return res.status(400).json(err);
            else return res.status(500).json(err);
        });
});

client.connect((err, client) => {
    if (err) return console.log(err);
    db = client.db(dbName); // whatever your database name is
    app.listen(config.PORT, () =>
        console.log(`Listening on port ${config.PORT}.`)
    );
});
