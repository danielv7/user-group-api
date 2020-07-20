CREATE DATABASE userandgroupAPI;

CREATE TABLE users (
  userId INT GENERATED ALWAYS AS IDENTITY,
  userEmail VARCHAR (355) UNIQUE NOT NULL,
  name VARCHAR (50) NOT NULL,
  password VARCHAR (50) NOT NULL,
  PRIMARY KEY(userId)

);
CREATE TABLE createdGroups(
	groupId INT GENERATED ALWAYS AS IDENTITY,
    userId INT,
    groupName VARCHAR(50) NOT NULL,
    PRIMARY KEY(groupId),
    CONSTRAINT fk_user
        FOREIGN KEY(userId) 
            REFERENCES users(userId)

);
CREATE TABLE groupMembers(
	memberId INT GENERATED ALWAYS AS IDENTITY,
    groupId INT,
    email VARCHAR (355) NOT NULL,
    PRIMARY KEY(memberId),
    CONSTRAINT fk_group
        FOREIGN KEY(groupId) 
            REFERENCES createdGroups(groupId)
        
);

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO usergroupapi3;


INSERT INTO users (userEmail, name, password)
VALUES  ('dvaughan92@gmail.com', 'Daniel Vaughan', 'password123');

INSERT INTO createdGroups (userId, groupName)
VALUES  (1, 'Tech Group');


INSERT INTO groupMembers (groupId, email)
VALUES  (10, 'john@gmail.com');



/*
HERE IS A COMMENT

psql -d postgres -U usergroupapi3
\c userandgroupapi

\q | Exit psql connection
\c | Connect to a new database
\dt | List all tables
\du | List all roles
\list | List databases

*/

{
    "userEmail": "dan@gmail.com",
    "name": "Dan Von",
    "password": "password123"
}
{
    "groupid": 13,
    "userid": 91,
    "groupname": "Api Group"
}
{
    "groupid": 14,
    "userid": 91,
    "groupname": "Art Group"
}