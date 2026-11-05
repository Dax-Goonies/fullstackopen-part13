/* Create new table for blogs */
CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author TEXT,
  url TEXT NOT NULL,
  title TEXT NOT NULL,
  likes INTEGER DEFAULT 0
);

/* Add two blogs */
INSERT INTO blogs (author, url, title, likes) 
VALUES (
  'Matti Luukkainen', 
  'https://courses.mooc.fi/org/uh-cs/courses/full-stack-open-relational-databases', 
  'Relational databases', 
  7
);
INSERT INTO blogs (author, url, title) 
VALUES (
  'Robin Hobb', 
  'https://en.wikipedia.org/wiki/Farseer_trilogy', 
  'Royal Assassin'
);

/* Checking that the two added blogs are indeed present in the DB */
SELECT * FROM blogs;