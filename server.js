const express = require('express');
const { login } = require('./routes/login');
const { home } = require('./routes/home');
const { signup } = require('./routes/signup');
const { addCourse } = require('./routes/courses/courses.add');
const { authenticateToken } = require('./auth/jwt.auth.middleware');
const { allCourses } = require('./routes/courses/courses.all');
const { dropCourse } = require('./routes/courses/corses.drop');
const { updateCourse } = require('./routes/courses/courses.update');
const { addStudent } = require('./routes/students/students.add');
const { allStudents } = require('./routes/students/students.all');
const { dropStudent } = require('./routes/students/students.drop');
const { updateStudent } = require('./routes/students/students.update');



const App = express()
App.use(express.json({extended: false}));

// home route
App.get('/',home)

// unprotected routes
App.post('/login', login);

//  Protected routes Requires Authentication Token
App.post('/signup', signup);

// CRUD OPERATIONS on Courses Table
App.post('/courses/new', authenticateToken, addCourse);
App.get('/courses/all', authenticateToken, allCourses);
App.delete('/courses/drop', authenticateToken, dropCourse);
App.patch('/courses/update', authenticateToken, updateCourse);

// CRUD OPERATIONS on Students Table
App.post('/students/new', authenticateToken, addStudent);
App.get('/students/all', authenticateToken, allStudents);
App.delete('/students/drop', authenticateToken, dropStudent);
App.patch('/students/update', authenticateToken, updateStudent);


App.listen(3000);