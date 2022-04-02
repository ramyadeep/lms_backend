// Departments
INSERT INTO Departments (dept_name) VALUES ('CSE');
INSERT INTO Departments (dept_name) VALUES ('CE');
INSERT INTO Departments (dept_name) VALUES ('ME');
INSERT INTO Departments (dept_name) VALUES ('ECE');

//Faculties

INSERT INTO Faculties () VALUES ();

// Courses




INSERT INTO assignments (topic,description,c_id,f_id) VALUES ('Functional Programming','Write a short note on Functional Programming','1','1');

INSERT INTO assignments (topic,description,c_id,f_id,deadline) VALUES ('Array','Array related questions....','1','1','2022-03-29');



/* Select all the student details joined with courses*/
SELECT s_id,f_name,l_name,c_name FROM enrollments 
INNER JOIN students on enrollments.s_id = students.id 
INNER JOIN courses on enrollments.c_id = courses.c_id;