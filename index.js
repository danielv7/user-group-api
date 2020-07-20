const express = require('express');
const app =  express();
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {registerValidation, loginValidation} = require("./validation");

const pool = require("./dbconfig")

//middleware
app.use(cors());
app.use(express.json()); //req.body



// /api/auth/
const authRoute = require('./routes/auth');
//app.use('/api/get', getRoute);
app.use('/api/auth', authRoute);



// main routes
//creating a new user
app.post("/api/newuser", async (req, res) => {

    //Validating user before creation
    const { error } = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //check if user emails is already in
    userEmail = req.body.userEmail;
    const checkEmail = await pool.query( 
        "SELECT userEmail FROM users WHERE userEmail = $1", [userEmail] 
    );
    if (checkEmail.rows[0]) return res.status(400).send('Email already exsits')


    //hash password code for production environment

    try { 
         //creating new user
        const { userEmail } = req.body; 
        const { name } = req.body; 
        const {password } = req.body; 

        const newUser = await pool.query( 
            "INSERT INTO users (userEmail, name, password) VALUES ($1, $2, $3) RETURNING *", 
            [userEmail, name, password] 
        );
        
        //res.json(newUser.rows[0]);
        //returning only userid
        res.json({userid: newUser.rows[0].userid});

    } catch (err) { 
        //res.status(400).send();
        //if(err) return res.status(400).send(err);
        res.status(400).send(err);
        
    }
  
   
});
//Logging in assigned token and gives back userid
app.post("/api/login", async (req, res) => {

    //validate login information
    const { error } = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

        //check if user emails is in database
        userEmail = req.body.userEmail;
        const user = await pool.query( 
            "SELECT userEmail, password, userId FROM users WHERE userEmail = $1", [userEmail] 
        );
        //res.send(user.rows[0].password);
        if (!user.rows[0]) return res.status(400).send('Email address is not found')
        //checking if password is correct and matches email
        const validPassword = await (user.rows[0].password) == req.body.password;
        if(!validPassword) return res.status(400).send('Password is incorrect');

        //create and assign a token: "j234l2j34gnewlert4" should be a hidden ENV variable for production
        const token = jwt.sign({userid: user.rows[0].userid}, "j234l2j34gnewlert4");
        res.header('auth-token', token).send(token);

       
        //res.send("Loged In");

   
});



///Extra API Points
//get all users
app.get("/api/user", async (req, res) => {
    try {
        const allUsers = await pool.query("SELECT * FROM users");
        res.json(allUsers.rows);
    } catch (err) {
        console.error(err.message);
    }
   
});

//get user
app.get("/api/user/:userid", async (req, res) => {
    try {
        const {userid} = req.params;
        const user = await pool.query("SELECT * FROM users WHERE userId = $1", [userid])
        
        res.json(user.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
   
});

//update user name
app.put("/api/user/:userid", async (req, res) => {
    try {
        const {userid} = req.params;
        const {name} = req.body;
        const updateUserName = await pool.query("UPDATE users set name = $1 WHERE userId = $2", 
        [name, userid]
        );
        
        res.json("User name was updated");

    } catch (err) {
        console.error(err.message);
    }
   
});



//Start listeing
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
//app.listen(3000);
//node app.js
//node index

