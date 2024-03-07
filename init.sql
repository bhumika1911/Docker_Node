CREATE TABLE students
(
    id SERIAL PRIMARY KEY,
    name VARCHAR(200),
    email VARCHAR(200),
    age INT,
    dob DATE
);

INSERT INTO students VALUES
 ('A','a@gmail.com',12,'1-3-4'),
 ('B','b@gmail.com',15,'1-3-5'),
 ('C','c@gmail.com',17,'1-3-7');
