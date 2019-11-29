module.exports = {
    PORT: 5000,
    HOST_EMAIL_TEMPLATE:
        '<!DOCTYPE html><html lang="en"><head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <meta http-equiv="X-UA-Compatible" content="ie=edge"> <style>table{width:75%;}table, th, td{border: 1px solid black; border-collapse: collapse;}th, td{padding: 15px; text-align: center;}table#t01 tr:nth-child(even){background-color: #eee;}table#t01 tr:nth-child(odd){background-color: #fff;}table#t01 th{background-color: #EF1F79; color: white;}</style></head><body> <p> Hi ${HOST_NAME}! <br><br>You have a visitor waiting for you in the lounge. <table id="t01"> <tr> <th>Item</th> <th>Detail</th> </tr><tr> <td>Full Name</td><td>${VISITOR_NAME}</td></tr><tr> <td>Email</td><td>${VISITOR_EMAIL}</td></tr><tr> <td>Phone Number</td><td>${VISITOR_NUMBER}</td></tr><tr> <td>Check-In Time</td><td>${VISITOR_CHECKIN}</td></tr></table> <br>Have a good day! <br>_______________ <br>The Reception </p></body></html>',
    VISITOR_EMAIL_TEMPLATE:
        '<!DOCTYPE html><html lang="en"><head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <meta http-equiv="X-UA-Compatible" content="ie=edge"> <style>table{width: 75%;}table, th, td{border: 1px solid black; border-collapse: collapse;}th, td{padding: 15px; text-align: center;}table#t01 tr:nth-child(even){background-color: #eee;}table#t01 tr:nth-child(odd){background-color: #fff;}table#t01 th{background-color: #EF1F79; color: white;}</style></head><body> <p> Hi ${VISITOR_NAME}! <br><br>Thank you for visiting Innovaccer!! <table id="t01"> <tr> <th>Item</th> <th>Detail</th> </tr><tr> <td>Full Name</td><td>${VISITOR_FULL_NAME}</td></tr><tr> <td>Phone</td><td>${VISITOR_NUMBER}</td></tr><tr> <td>Host Name</td><td>${HOST_NAME}</td></tr><tr> <td>Check-In Time</td><td>${VISITOR_CHECKIN}</td></tr><tr> <td>Check-Out Time</td><td>${VISITOR_CHECKOUT}</td></tr></table> <br>Have a good day! <br>Best, <br>_______________ <br>The Reception <br>Innovaccer</p></body></html>',
    SMS_TEMPLATE:
        "Hi, ${HOST_NAME}.\n\nYou have a visitor waiting for you in the reception.\n\nVISITOR DETAILS\nName: ${VISITOR_NAME}\nEmail: ${VISITOR_EMAIL}\nPhone Number: ${VISITOR_NUMBER}\nCheck-In Time: ${VISITOR_CHECKIN}\n\nHave a good day!\n_______________\nThe Reception\nInnovaccer",
    SMTP_CREDENTIALS: {
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "d68f7efbc3fe68",
            pass: "d2ad084b4492e1"
        }
    },
    SENDER_ADDRESS: "reception@innovaccer.com",
    TWILIO_SID: "ACa5ed9a9cd08d1ae49f858948ccec737b",
    TWILIO_AUTH_TOKEN: "7787f3ba81d81bfe3e5188198a1becb9",
    TWILIO_NUMBER: "+19177253226",
    MONGO_URL: "mongodb://localhost:27017/",
    MONGO_DB: "innovaccer",
    MONGO_TABLE: "guests"
};
