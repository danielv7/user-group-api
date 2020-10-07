# Simple user-group-api project 


## Documention of Project

The project has 5 API endpoints:

- Creating a User
```
Post: http://localhost:3000/api/newuser
{
    "userEmail" : "dvaughan99@gmail.com",
    "name" : "Daniel Vaughan",
    "password" : "password1234"
}
```

- Logging In
- Returns Token
```
Post: http://localhost:3000/api/login
{
    "userEmail" : "dvaughan99@gmail.com",
    "password" : "password1234"
}
```

- Creating Group
- Token Required
```
Post: http://localhost:3000/api/auth/newgroup
{
    "groupName" : "Home and Garden"
}
```
- Adding Member to Given Group
- Token Required
```
Post: hhttp://localhost:3000/api/auth/newmember/:groupid
{
    "email" : "alyssa@gmail.com"
}
```
- Getting Groups Created by User
- Token Required
```
Get: http://localhost:3000/api/auth/groupscreated

```
- Getting Members of Given Group
- Token Required
```
Get:http://localhost:3000/api/auth/groupmembers/:groupid
```

## Installation

```
git clone https://github.com/danielv7/user-group-api
cd user-group-api
npm install
npm start
```

## postgres installation and set up.
```
brew install postgresql
brew services start postgresql
psql postgres
postgres=# CREATE ROLE usergroupapi3 WITH LOGIN PASSWORD 'password3';
postgres=# ALTER ROLE usergroupapi3 CREATEDB;
postgres=# \q
psql -d postgres -U usergroupapi3
postgres=> CREATE DATABASE userandgroupapi;
postgres=> \c userandgroupapi
```
Next you can create your database table using or running the database.sql file.

## Notes

- Estimate time spent on project 5 hours
- I would add a .env file for protecting certain critical information such as passwords and hashing code.


## Author

- Daniel Vaughan

## License

This project is open source and available under the ISC (LICENSE).
