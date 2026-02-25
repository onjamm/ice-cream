// Import the express module
import express from "express";

// Create an instance of an Express application
const app = express();

// Define the port number where our server will listen
const PORT = 3010;

app.use(express.static("public"));

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

const orders = [];

app.get("/", (req, res) => {
  res.render("home");
});

app.post("/order-button", (req, res) => {
  //Create JSON object to store order data
  const order = {
    timestamp: new Date(),
    name: req.body.name,
    email: req.body.email,
    flavor: req.body.flavor,
    cone: req.body.cone,
    toppings: req.body.toppings ? req.body.toppings : "None",
  };

  //add order
  orders.push(order);

  res.render("confirmation", { order });
});

app.get("/admin", (req, res) => {
  res.render("admin", { orders });
});

app.get("/confirmation", (req, res) => {
  res.render("confirmation", { order });
});
// Define a default "route" ('/')
// req: contains information about the incoming request
// res: allows us to send back a response to the client

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
