const express = require("express");
const session = require("express-session");

const app = express();
app.use(express.json());

app.use(
  session({
    secret: "mySecretKey",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } 
  })
);


const USER = {
  username: "admin",
  password: "1234"
};


function isAuthenticated(req, res, next) {
  if (req.session.user) {
    return next();
  }
  return res.status(401).send("Unauthorized. Please login.");
}


app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === USER.username && password === USER.password) {
    
    req.session.user = { username };

    return res.send("Login Successful");
  } else {
    return res.status(401).send("Invalid Credentials");
  }
});


app.get("/dashboard", isAuthenticated, (req, res) => {
  res.send(`Welcome ${req.session.user.username} to Dashboard`);
});


app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Error logging out");
    }
    res.send("Logged out successfully");
  });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});