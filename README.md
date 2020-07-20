# Simple user-group-api project 


## Documention of project

The project will a 5 API endpoints 

- Creat a user
- login in
- create groups
- add members to a given group
- Get groups created by user
- Get members of given groups

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



- Estimate time spent on project 7 hours


## Author

- Daniel Vaughan

## License

This project is open source and available under the ISC (LICENSE).
