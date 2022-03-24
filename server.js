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
const { addAssignment } = require('./routes/assignments/assignments.add');
const { allAssignments } = require('./routes/assignments/assignments.all');
const { marksAdd } = require('./routes/marks/marks.add');
const { marksAll } = require('./routes/marks/marks.get');


const App = express()
App.use(express.json({ extended: false }));

// home route
App.get('/', home)

// unprotected routes
App.post('/login', login);

//  Protected routes Requires Authentication Token
App.use(authenticateToken);  // use jwt authentication for the below routes
App.post('/signup', signup);

// CRUD OPERATIONS on Courses Table
App.post('/courses/new', addCourse);
App.get('/courses/all', allCourses);
App.delete('/courses/drop', dropCourse);
App.patch('/courses/update', updateCourse);

// CRUD OPERATIONS on Students Table
App.post('/students/new', addStudent);
App.get('/students/all', allStudents);
App.delete('/students/drop', dropStudent);
App.patch('/students/update', updateStudent);

// CRUD OPERATIONS on Marks Table
App.post('/marks/add', marksAdd);
App.get('/marks/all', marksAll);
// App.delete('/assignments/drop', dropStudent);
// App.patch('/assignments/update', updateStudent);

// CRUD OPERATIONS on Assignments Table
App.post('/assignments/new', addAssignment);
App.get('/assignments/all', allAssignments);
// App.delete('/assignments/drop', dropStudent);
// App.patch('/assignments/update', updateStudent);




App.listen(3000,()=> console.log('Server started'));