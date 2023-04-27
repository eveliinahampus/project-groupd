INSERT INTO restaurants (id, restaurant_name, phone_number, street_address, city, zip code)
VALUES ( 'restaurant3', 'Harald Oulu', '+358 44 766 8000', 'Kirkkokatu 16', 'Oulu', '90100');

INSERT INTO reviews (id, review_title, review_body, stars, restaurant_id, user_id, images_id)
VALUES ( 'review3', 'title' , 'body' , '4' ,  'restaurant3', 'user', 'images');