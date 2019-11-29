This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Setup Instructions
```
cd frontend/
npm install
npm start
```

The node server will automatically start on port 3000.

## Routes

### /
On starting the server you will land on this page. It is the introduction page. You will have 2 options.
* Check In
* Check Out

### /home
This is the main page. Wherein you have to fill in the form to checkin. The page will not proceed unless you put in all the details in the correct format so a phone number has to be in digits and email should be of the correct format.

On submitting the form, __please wait__ for 5 seconds as it will only proceed to the next page when the correct response comes back from the receiver. If the form is not of the correct format or there was some error on the backend it will not proceed.

The host will receive an SMS and email after the visitor has successfully checked in.


### /confirmation
This is the page that you land up in after the visitor has filled the form. They will receive an OTP which they will have to remember as they will need it to checkout.

### /checkout
This page is for when the visitor wants to checkout. They will need to input their mobile number which they used while checking in and the OTP which they will  have recived to checkout
## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Dependencies
The front end framework used ReactJS and Ant Design. For it to work completely you will need the following packages:
1. ReactJS
2. Ant Design
3. Axios
4. React-router-dom