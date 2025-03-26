require("dotenv").config();
const express = require("express");
const path = require('path');
const cors = require("cors");
const morgan = require("morgan");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("./db");
const app = express();


app.use(cors({
    origin: 'http://localhost:3000', // Adjust to your frontend domain
  }));
app.use(express.json());

app.use(morgan("dev"));

//get all restaurants
app.get("/api/yelp/v1/restaurants", async (req, res) => {
    try{
        // const results = await db.query("select * from restaurants");
        const restaurantRatingsData = await db.query("select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id;");
        res.status(200).json({
            status: "success",
            results: restaurantRatingsData.rows.length,
            data: {
                restaurants: restaurantRatingsData.rows,
            },
        });
    } catch (err){
        console.log(err);
    }
});

//get one restaurant
app.get("/api/yelp/v1/restaurants/:id", async (req, res) => {
    try{
        const restaurant = await db.query("select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id where id = $1;", [req.params.id]);
        const reviews = await db.query("select * from reviews where restaurant_id = $1;", [req.params.id]);
        res.status(200).json({
            status: "success",
            data: {
                restaurant: restaurant.rows[0],
                reviews: reviews.rows
            }
        });
    }catch (err){
        console.log(err);
    }
});

//create one restaurant
app.post("/api/yelp/v1/restaurants", async (req, res) => {
    try {
        const results = await db.query("INSERT INTO restaurants (name, location, price_range) values ($1, $2, $3) returning *;", [req.body.name, req.body.location, req.body.price_range]);
        console.log(results);
        res.status(201).json({
            status: "success",
            data: {
                restaurant: results.rows[0],
            },
        });
    } catch(err){
        console.log(err);
    }
});

//update restaurant
app.put("/api/yelp/v1/restaurants/:id", async (req, res) => {
    try{
        const results = await db.query("UPDATE restaurants SET name = $1, location = $2, price_range = $3 where id = $4 returning *;", [req.body.name, req.body.location, req.body.price_range, req.params.id]);
        res.status(200).json({
            status: "success",
            data: {
                restaurant: results.rows[0],
            },
        });
    } catch(err){
        console.log(err);
    }
});

//delete restaurant
app.delete("/api/yelp/v1/restaurants/:id", async (req, res) =>{
    try{
        const results = await db.query("DELETE FROM restaurants where id = $1;", [req.params.id]);
        res.status(204).json({
            status: "success",
        });
    }catch(err){
        console.log(err);
    }
});

app.post("/api/yelp/v1/restaurants/:id/addReview", async (req, res) => {
    try{
        const results = await db.query("INSERT INTO reviews (restaurant_id, name, review, rating) values ($1, $2, $3, $4) returning *;", [req.params.id, req.body.name, req.body.review, req.body.rating])
        res.status(201).json({
            status: "success",
            data: {
                review: results.rows[0],
            },
        })
    }catch(err){
        console.log(err)
    }
})


app.post("/api/users/v1/register", async (req, res) => {
    const { username, password, name } = req.body;
    try {
        const normalizedUsername = username.toLowerCase();
        const hashedPassword = await bcrypt.hash(password, 10);
        const results = await db.query(
            "INSERT INTO users (username, password, name) VALUES ($1, $2, $3) RETURNING id, username, name",
            [normalizedUsername, hashedPassword, name]
        );
        res.status(201).json({
            status: "success",
            data: {
                user: results.rows[0],
            },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: "error",
            message: "Failed to register user",
        });
    }
});

app.post("/api/users/v1/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const normalizedUsername = username.toLowerCase();
        const user = await db.query("SELECT * FROM users WHERE username = $1", [normalizedUsername]);

        if (user.rows.length === 0) {
            return res.status(401).json({
                status: "error",
                message: "Invalid username or password",
            });
        }

        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        if (!validPassword) {
            return res.status(401).json({
                status: "error",
                message: "Invalid username or password",
            });
        }

        const token = jwt.sign({ id: user.rows[0].id, username: user.rows[0].username }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        res.status(200).json({
            status: "success",
            data: {
                token,
                user: { id: user.rows[0].id, username: user.rows[0].username, name: user.rows[0].name },
            },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: "error",
            message: "Failed to log in",
        });
    }
});

app.get("/api/users/v1/profile", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1]; // Expect "Bearer <token>"
    if (!token) {
        return res.status(401).json({
            status: "error",
            message: "Unauthorized",
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await db.query("SELECT id, username, name FROM users WHERE id = $1", [decoded.id]);

        res.status(200).json({
            status: "success",
            data: {
                user: user.rows[0],
            },
        });
    } catch (err) {
        console.error(err);
        res.status(401).json({
            status: "error",
            message: "Invalid or expired token",
        });
    }
});

app.get("/api/users/v1/:username", async (req, res) => {
    const { username } = req.params;
    const normalizedUsername = username.toLowerCase();

    try {
        const userQuery = await db.query(
            "SELECT id, name, email, phone_number, age FROM users WHERE username = $1",
            [normalizedUsername]
        );

        if (userQuery.rows.length === 0) {
            return res.status(404).json({ status: "error", message: "User not found" });
        }

        const postsQuery = await db.query(
            "SELECT id, content, created_at FROM posts WHERE user_id = $1 ORDER BY created_at DESC",
            [userQuery.rows[0].id]
        );

        res.status(200).json({
            status: "success",
            data: {
                user: userQuery.rows[0],
                posts: postsQuery.rows,
            },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
});

app.put("/api/users/v1/:username", async (req, res) => {
    const { username } = req.params;
    const normalizedUsername = username.toLowerCase();
    const { name, email, phone_number, age } = req.body;

    try {
        const result = await db.query(
            "UPDATE users SET name = $1, email = $2, phone_number = $3, age = $4 WHERE username = $5 RETURNING id, name, email, phone_number, age",
            [name, email, phone_number, age, normalizedUsername]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ status: "error", message: "User not found" });
        }

        res.status(200).json({
            status: "success",
            data: { user: result.rows[0] },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
});

app.post("/api/users/v1/:username/posts", async (req, res) => {
    const { username } = req.params;
    const { content } = req.body;
    const normalizedUsername = username.toLowerCase();

    try {
        const userQuery = await db.query("SELECT id FROM users WHERE username = $1", [normalizedUsername]);

        if (userQuery.rows.length === 0) {
            return res.status(404).json({ status: "error", message: "User not found" });
        }

        const userId = userQuery.rows[0].id;

        const result = await db.query(
            "INSERT INTO posts (user_id, content) VALUES ($1, $2) RETURNING id, content, created_at",
            [userId, content]
        );

        res.status(201).json({
            status: "success",
            data: { post: result.rows[0] },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
});

app.get("/api/posts", async (req, res) => {
    try {
      const postsQuery = await db.query(
        `SELECT posts.id, posts.content, posts.created_at, 
                users.username, users.name 
         FROM posts 
         JOIN users ON posts.user_id = users.id 
         ORDER BY posts.created_at DESC`
      );
  
      res.status(200).json({
        status: "success",
        data: {
          posts: postsQuery.rows,
        },
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ status: "error", message: "Failed to fetch posts" });
    }
  });

  app.delete("/api/posts/:id", async (req, res) =>{
    try{
        await db.query("DELETE FROM posts where id = $1;", [req.params.id]);
        res.status(204).json({
            status: "success",
        });
    }catch(err){
        console.log(err);
    }
});

// Static files directory
const filesDir = path.join(__dirname, 'downloads');
app.use('/downloads', express.static(filesDir));

// Get list of available files
app.get('/api/projects', (req, res) => {
  const files = [
    { name: 'Windows Card Game', fileName: 'Card-Game.zip', description: 'A card game Ive been making for fun' },
    { name: 'Mac Card Game', fileName: 'CardGameApple.zip', description: 'The mac download for the same game' },
  ];
  res.status(200).json(files);
});

  

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`server is up and listening on port ${port}`);
})