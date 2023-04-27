INSERT INTO restaurants (id, restaurant_name, phone_number, street_address, city, zip code)
VALUES ( 'restaurant1', 'Cafe Rooster', '+358 20 711 8280', 'Torikatu 26', 'Oulu', '90100');

INSERT INTO reviews (id, review_title, review_body, stars, restaurant_id, user_id, images_id)
VALUES ( 'review1', 'title' , 'body' , '5' ,  'restaurant1', 'user', 'images');
