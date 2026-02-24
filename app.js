// Import the express module
import express from 'express';

// Create an instance of an Express application
const app = express();

// Define the port number where our server will listen
const PORT = 3000;

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

const orders = [];

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/thank-you', (req, res) => {
    res.render('confirmation');
});

app.post('/thank-you', (req, res) => {
    const { flavor, toppings } = req.body;
    orders.push({ flavor, toppings });
    res.render('confirmation', { flavor, toppings });
});
// Define a default "route" ('/')
// req: contains information about the incoming request
// res: allows us to send back a response to the client

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

