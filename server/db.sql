drop database if exists restaurant_reviews_db;

CREATE DATABASE restaurant_reviews_db;

\C restaurant_reviews_db;

CREATE TABLE restaurants (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  phone_number TEXT
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL,
  email TEXT NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  rating_id INTEGER NOT NULL REFERENCES ratings(id),
  restaurant_id INTEGER NOT NULL REFERENCES restaurants(id),
  user_id INTEGER NOT NULL REFERENCES users(id),
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE ratings (
  id SERIAL PRIMARY KEY,
  stars INT NOT NULL CHECK (rating >= 1 AND rating <= 5)
);

CREATE TABLE user_reviews (
  user_id INTEGER NOT NULL REFERENCES users(id),
  restaurant_id INTEGER NOT NULL REFERENCES restaurants(id),
  review_id INTEGER NOT NULL REFERENCES reviews(id),
  PRIMARY KEY (user_id, restaurant_id, review_id)
);
