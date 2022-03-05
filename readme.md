# lms_backend
A  Backend for Learning Management System Nodejs and MySQL.

To run the project follow the following steps:

1. The project expects a MySQL database at localhost:3306, with username: 'root' and password: ''. So use whatever platform you like and create a database connection Or update the lms_backend\database\db.js as per your database configuration.

2. You need to execute the schema.sql file for initializing the database first.

3. cd into the project root directory and run 'npm i' to initialize the project.

4. Start the project by using 'npm start' in the terminal. Make sure you are in the project directory.

5. You can now use POSTMAN or any other client to try out the API end-points (localhost:3000). Note: Other than the login route, all the other requires you to attach the JWT token into the bearer token in order to work.
