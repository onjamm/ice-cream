// Import the express module
import express from 'express';

// Create an instance of an Express application
const app = express();

// Define the port number where our server will listen
const PORT = 3006;

const orders = [];
//Set view engine to ejs
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true}));

app.use(express.static('public'));

// Define a default "route" ('/')
// req: contains information about the incoming request
// res: allows us to send back a response to the client
app.get('/', (req, res) => {
    res.render('home');
});

app.post('/submit-order', (req, res) => {
    //Create JSON object to store order data
    const order = {
        name: req.body.fname;
        email: req.body.email:
        flavor: req.body.flavor;
        cone: req.body.cone;
    }

    //add order
    orders.push(order);

    res.render('confirmation' {order})
});, 


app.get('/admin', (req, res) => {
    res.render('admin', {orders})
})

app.get('/confirmation' (req, res) => {
    res.render('confirmation');
} )


// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

