INSERT INTO restaurants (id, restaurant_name, phone_number, street_address, city, zip code)
VALUES ('restaurant2', 'Da Max', '+358 8 378486', 'Kauppurienkatu 5', 'Oulu', '90100');

INSERT INTO reviews (id, review_title, review_body, stars, restaurant_id, user_id, images_id)
VALUES ( 'review2', 'title' , 'body' , '3' ,  'restaurant2', 'user', 'images');