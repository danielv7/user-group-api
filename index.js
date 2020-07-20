const express = require('express');
const app =  express();
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require("./dbconfig")

const {registerValidation, loginValidation} = require("./validation");


//middleware
app.use(cors());
app.use(express.json()); //req.body

// /api/auth/
const authRoute = require('./routes/auth');
//app.use('/api/get', getRoute);
app.use('/api/auth', authRoute);


//Main Routes

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


    //hash password code for production environment.

    try { 
        const { userEmail } = req.body; 
        const { name } = req.body; 
        const {password } = req.body; 

        const newUser = await pool.query( 
            "INSERT INTO users (userEmail, name, password) VALUES ($1, $2, $3) RETURNING *", 
            [userEmail, name, password] 
        );
        //res.json(newUser.rows[0]);
        //returning only userid and name
        res.json({userid: newUser.rows[0].userid, name: newUser.rows[0].name});

    } catch (err) { 
        //res.status(400).send();
        //if(err) return res.status(400).send(err);
        res.status(400).send(err);
        
    }
   
});
//Logging In, Assigned Token, and giving back userid.
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

        //Createing and assigning a token: "j234l2j34gnewlert4" should be a hidden ENV variable for production
        const token = jwt.sign({userid: user.rows[0].userid}, "j234l2j34gnewlert4");
        res.header('auth-token', token).send(token);
       
        //res.send("Loged In");

   
});



//Start listeing
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
//app.listen(3000);
//node app.js
//node index

