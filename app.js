// Import the express module
import express from "express";

//import mysql
import mysql2 from "mysql2";
//import dotenv
import dotenv from "dotenv";

// load environment variables from .env file
dotenv.config();

console.log("DB_HOST:", prcoess.env.DB_HOST);
// Create an instance of an Express application
const app = express();

// Define the port number where our server will listen
const PORT = 3010;

app.use(express.static("public"));

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

const orders = [];

// Create a database connections pool
const pool = mysql2
  .createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  })
  .promise();

//Database test route
app.get("/db-test", async (req, res) => {
  try {
    const orders = await pool.query("SELECT * FROM orders");
    res.send(orders[0]);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).send("Database error: " + err.message);
  }
});

app.get("/", (req, res) => {
  res.render("home");
});

//You said to do the confirm route, but this is what handles my form submissions so I'm going to use this
app.post("/order-button", async (req, res) => {
  try {
    // Get form data from req.body
    const order = req.body;

    // Log the order data for debugging
    console.log("New order submitted:", order);

    //convert toppings array to comma-separated string
    order.toppings = Array.isArray(order.toppings)
      ? order.toppings.join(", ")
      : order.toppings || "None";

    //sql insert query with palceholds to prevent sql injection
    const sql =
      "INSERT INTO orders (customer, email, flavor, cone, toppings) VALUES (?, ?, ?, ?, ?)";

    //Create JSON object to store order data
    //parameters array must match the order of ? placeholds
    const params = [
      order.customer,
      order.email,
      order.flavor,
      order.cone,
      order.toppings,
    ];

    //Execute the query and grab the primary key of the new row
    const result = await pool.execute(sql, params);
    console.log("Order saved with ID:", result[0].insertId);

    res.render("confirmation", { order });
  } catch (err) {
    console.error("Error saving order:", err);
    res
      .status(500)
      .send(
        "Sorry, there was an error processing your order. Please try again.",
      );
  }
});

app.get("/admin", async (req, res) => {
  try {
    // Fetch all orders from database, newest first
    const [orders] = await pool.query(
      "SELECT * FROM orders ORDER BY timestamp DESC",
    );

    //Render the admin page
    res.render("admin", { orders });
  } catch (err) {
    console.error("Database error: ", err);
    res.status(500).send("Error loading orders: " + err.message);
  }
});

// Define a default "route" ('/')
// req: contains information about the incoming request
// res: allows us to send back a response to the client

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
