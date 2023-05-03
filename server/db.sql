drop database if exists restaurant_reviews_db;

CREATE DATABASE restaurant_reviews_db;

\C restaurant_reviews_db;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE images (
  id  serial primary key,
  img_title varchar(255) NOT NULL,
  img_name varchar(255) NOT NULL,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE restaurants (
  id SERIAL PRIMARY KEY,
  restaurant_name VARCHAR(255) NOT NULL,
  phone_number VARCHAR(255),
  street_address VARCHAR(255) NOT NULL,
  city VARCHAR(255),
  zip_code VARCHAR(255),
  user_id INT NOT NULL REFERENCES users(id) ON DELETE RESTRICT ON UPDATE CASCADE,
  images_id INT REFERENCES images(id) ON DELETE SET NULL ON UPDATE CASCADE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  review_title VARCHAR(255) NOT NULL,
  review_body TEXT NOT NULL,
  stars INT NOT NULL CHECK (stars >= 1 AND stars <= 5),
  restaurant_id INT NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE ON UPDATE CASCADE,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE RESTRICT ON UPDATE CASCADE,
  images_id INT REFERENCES images(id) ON DELETE SET NULL ON UPDATE CASCADE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- username VARCHAR(255) NOT NULL REFERENCES users(username) ON DELETE RESTRICT ON UPDATE CASCADE,
