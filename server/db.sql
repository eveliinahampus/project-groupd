drop database if exists restaurant_reviews_db;

CREATE DATABASE restaurant_reviews_db;

\C restaurant_reviews_db;

CREATE TABLE images (
  id  serial primary key,
  title varchar(255) NOT NULL,
  name varchar(255) NOT NULL
);

CREATE TABLE restaurants (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone_number VARCHAR(100),
  street_address VARCHAR(255) NOT NULL,
  city VARCHAR(100),
  zip_code VARCHAR(100),
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  body TEXT NOT NULL,
  stars INT NOT NULL CHECK (stars >= 1 AND stars <= 5),
  restaurant_id INTEGER NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE ON UPDATE CASCADE,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
