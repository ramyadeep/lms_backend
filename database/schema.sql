USE DATABASE LMS;

DROP TABLE Admins;


CREATE TABLE Admins (
    id INT(100) PRIMARY KEY AUTO_INCREMENT,
    f_name CHAR(100) NOT NULL,
    l_name CHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    contact VARCHAR(100)
);

DROP TABLE Department;

CREATE TABLE Departments (
    dept_id INT(100) PRIMARY KEY AUTO_INCREMENT,
    dept_name CHAR(100) NOT NULL
);

DROP TABLE Faculty;

CREATE TABLE Faculties (
    id INT(100) PRIMARY KEY AUTO_INCREMENT,
    f_name CHAR(100) NOT NULL,
    l_name CHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    contact VARCHAR(100),
    dept_id INT(100),
    FOREIGN KEY(dept_id) REFERENCES Department(dept_id)
);

DROP TABLE Students;

CREATE TABLE Student (
    id INT(100) PRIMARY KEY AUTO_INCREMENT,
    f_name CHAR(100) NOT NULL,
    l_name CHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    contact VARCHAR(100),
    dept_id INT(100),
    FOREIGN KEY(dept_id) REFERENCES Department(dept_id)
);

DROP TABLE Courses;

CREATE TABLE Courses (
    INT(100) PRIMARY KEY AUTO_INCREMENT,
    c_name CHAR(100) NOT NULL,
    f_id INT(100),
    dept_id INT(100),
    FOREIGN KEY(f_id) REFERENCES Faculty(id),
    FOREIGN KEY(dept_id) REFERENCES Department(dept_id)
);