const router = require('express').Router();
const pool = require("../dbconfig")
const verify = require('./verifyToken');

const { groupValidation, memberValidation } = require("../validation");

//Auth token routes only accessible using key: auth-token, value: "userToken"


router.get('/', verify,(req, res) => {
    //res.json("TOKEN data");
    //res.send(req.user);
    res.json({userid: req.user.userid});

});


//POST: http://localhost:3000/api/auth/newgroup
router.post("/newgroup", verify, async (req, res) => {

    //validate group information
    const { error } = groupValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //check if user has a group created with the same name.
    userId = req.user.userid;
    groupName = req.body.groupName;
    const groupNameCheck = await pool.query( 
        "SELECT groupName FROM createdGroups WHERE userId = $1 AND groupName =  $2", 
        [userId, groupName] 
    );
    if (groupNameCheck.rows[0]) return res.status(400).send('You already created group with this name.')

    try {
        const userId = req.user.userid;
        const groupName = req.body.groupName;

        const newGroup = await pool.query( 
            "INSERT INTO createdGroups (userId, groupName) VALUES ($1, $2) RETURNING *", 
            [userId, groupName] 
        );
        res.json(newGroup.rows[0]);
        
    } catch (err) {
        res.status(400).send(err);
    }
   
});


//POST http://localhost:3000/api/auth/newmember/:groupid
router.post("/newmember/:groupid", verify, async (req, res) => {

    //validate new Member information
    const { error } = memberValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //checking if member to add is alreading member of group
    const {groupid} = req.params;
    const {email} = req.body;

    const groupMemberCheck = await pool.query( 
        "SELECT email FROM groupMembers WHERE groupId = $1 AND email =  $2", 
        [groupid, email] 
    );
    if (groupMemberCheck.rows[0]) return res.status(400).send('Email address already belongs to this group.')

    try {
        const {groupid} = req.params;
        const {email} = req.body;

        const newMember = await pool.query( 
            "INSERT INTO groupMembers (groupId, email) VALUES ($1, $2) RETURNING *", 
            [groupid, email] 

        );
        res.json(newMember.rows[0]);
        //res.json({groupId: groupid, email: email});
    } catch (err) {
        //console.error(err.message);
        res.status(400).send(err);
    }
   
});

//http://localhost:3000/api/auth/groupscreated
router.get("/groupscreated", verify, async (req, res) => {


    try {
        const userId = req.user.userid;

        const createdGroups = await pool.query( 
            "SELECT groupName FROM createdGroups WHERE userID = $1", 
            [userId] 

        );
        res.json(createdGroups.rows);
        //res.json({groupId: groupid, email: email});
        
    } catch (err) {
        //console.error(err.message);
        res.status(400).send(err);
    }
   
});

//http://localhost:3000/api/auth/groupmembers/:groupid
router.get("/groupmembers/:groupid", verify, async (req, res) => {


    try {
        const {groupid} = req.params;

        const membersOfGroup = await pool.query( 
            "SELECT email FROM groupMembers WHERE groupId = $1", 
            [groupid] 

        );
        res.json(membersOfGroup.rows);
        //res.json({groupId: groupid, email: email});
        
    } catch (err) {
        //console.error(err.message);
        res.status(400).send(err);
    }
   
});


module.exports = router;