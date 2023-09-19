//Server-side Javascript : Here Node.js server using Express.js framework is set up . Here , an Api endpoint is created]
// and listens for Post requests. When this one is received, it extracts the booking data from the req body
//it also sends a confimation email and then send a res back to the client indicating whether.




//Let's set up the server-side code to handle the booking system.
//We will use Node,js with Express,js for this purpose.
//First ,we will initialise the project running (npm init-y ) in the terminal  ,this will create a `package.json` for the project.
//Secondly , we will install Depencies for handling emails and server routing  (npm install express nodemailer body-parser)
//express :popular web app framework for Node.js and it's used for server routing and handling HTTP req and res
//nodemailer :library used for sending emails with Node.js .
//body-parser:middleware for parsing request bodies.



const cors  = require (`cors`);


//Set UP  of My Express Server (Server routing and handling HTTP req and res)


//importation of the Express.js framework to create and manage the web server using Node.js
const express = require (`express`);

//Importation of the `body-parser` middleware.It's used to parse the incoming request bodies (JSON and form data)
const bodyParser = require(`body-parser`);

//Importation the `nodemailer` library , which enables to send emails from Node.js app
const nodemailer =require (`nodemailer`);

//Creation of an instance of the Express application  which will be used to define the routes and set up the server
const app = express();

//Defining a the port number for the server to listen incoming request 
//As this is local development ,we will use a non-standard port :3000
const port = 3000;
app.use(cors());


//Sets up the `body-parser` middleware to handle URL-encoded form data.The `extended: false` option means that the values can be strings or arrays but not complex objects.
app.use(bodyParser.urlencoded({ extended: false}));

// Sets up the `body-parser` middleware to parse JSON data in the request body
app.use(bodyParser.json());


//Create  an Email Configuration
require (`dotenv`).config();  //Load environment variables form  .env file
// Create a transporter for sending emails using nodemailer
const transporterEmail = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE, // Use the email service specifies in the environment variables 
    auth: {
        user: process.env.EMAIL_USER, // Use the email address specifies in the environment variables
        pass: process.env.EMAIL_PASS, // Use email password specifies in the environment  variables 
    },
});

// Create the API Endpoint to handle booking submissions.
app.post('/api/bookings', (req, res) => {
    try {
        // Extract data from the request body.
        const { name, email, date, time, partySize } = req.body;

        // Create an email message.
        const mailOptions = {
            from: 'personalwebdevtest@gmail.com ',
            to: email, // Send confirmation email to the customer
            subject: 'Booking Confirmation',
            text: `Hello ${name},\n\nYour booking for ${partySize} people on \n ${date} \n at ${time} has been confirmed.\n\n\n\n We look forward to seeing you!`,
        };

        // Send the confirmation email.
        transporterEmail.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });

        // You can save the booking data to a database or calendar here.

        // Send a confirmation response to the client.
        res.status(200).json({ message: 'Booking successful!' });
    } catch (error) {
        console.error('Error handling booking:', error);
        res.status(500).json({ message: 'Booking failed.' });
    }
});

//Start of the Express Server  , causing it to listen on the specified port .
//When the server starts successfully , it logs a message  indicating which port  it's running on.
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});






