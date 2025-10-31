--
-- Table structure for table `admin`
--
DROP TABLE IF EXISTS admin;

CREATE TABLE IF NOT EXISTS admin (
  ssn TEXT NOT NULL,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  password TEXT NOT NULL,
  birthday DATE DEFAULT NULL,
  PRIMARY KEY (ssn)
);

--
-- Dumping data for table `admin`
--

INSERT INTO admin (ssn, email, name, password, birthday) 
VALUES 
  ('ADM001', 'alice.johnson@example.com', 'Alice Johnson', '$2b$10$QW5Mbg/Ht8vNF.loJV7C5OaNUusJc7r7wnDz1d4/nzfAXqMir6MEG', '1965-03-15'),
  ('ADM002', 'brian.smith@example.com', 'Brian Smith', '$2b$10$QW5Mbg/Ht8vNF.loJV7C5OaNUusJc7r7wnDz1d4/nzfAXqMir6MEG', '1970-07-22'),
  ('ADM003', 'catherine.lee@example.com', 'Catherine Lee', '$2b$10$QW5Mbg/Ht8vNF.loJV7C5OaNUusJc7r7wnDz1d4/nzfAXqMir6MEG', '1972-05-10'),
  ('ADM004', 'daniel.brown@example.com', 'Daniel Brown', '$2b$10$QW5Mbg/Ht8vNF.loJV7C5OaNUusJc7r7wnDz1d4/nzfAXqMir6MEG', '1968-11-30'),
  ('ADM005', 'elizabeth.davis@example.com', 'Elizabeth Davis', '$2b$10$QW5Mbg/Ht8vNF.loJV7C5OaNUusJc7r7wnDz1d4/nzfAXqMir6MEG', '1975-01-18'),
  ('ADM006', 'frank.wilson@example.com', 'Frank Wilson', '$2b$10$QW5Mbg/Ht8vNF.loJV7C5OaNUusJc7r7wnDz1d4/nzfAXqMir6MEG', '1967-04-25'),
  ('ADM007', 'grace.moore@example.com', 'Grace Moore', '$2b$10$QW5Mbg/Ht8vNF.loJV7C5OaNUusJc7r7wnDz1d4/nzfAXqMir6MEG', '1973-09-05'),
  ('ADM008', 'henry.taylor@example.com', 'Henry Taylor', '$2b$10$QW5Mbg/Ht8vNF.loJV7C5OaNUusJc7r7wnDz1d4/nzfAXqMir6MEG', '1969-12-12'),
  ('ADM009', 'irene.anderson@example.com', 'Irene Anderson', '$2b$10$QW5Mbg/Ht8vNF.loJV7C5OaNUusJc7r7wnDz1d4/nzfAXqMir6MEG', '1971-06-17'),
  ('ADM010', 'jack.martin@example.com', 'Jack Martin', '$2b$10$QW5Mbg/Ht8vNF.loJV7C5OaNUusJc7r7wnDz1d4/nzfAXqMir6MEG', '1966-08-03'),
  ('ADM011', 'karen.thomas@example.com', 'Karen Thomas', '$2b$10$QW5Mbg/Ht8vNF.loJV7C5OaNUusJc7r7wnDz1d4/nzfAXqMir6MEG', '1974-02-28'),
  ('ADM012', 'leo.jackson@example.com', 'Leo Jackson', '$2b$10$QW5Mbg/Ht8vNF.loJV7C5OaNUusJc7r7wnDz1d4/nzfAXqMir6MEG', '1970-10-14'),
  ('ADM013', 'mia.white@example.com', 'Mia White', '$2b$10$QW5Mbg/Ht8vNF.loJV7C5OaNUusJc7r7wnDz1d4/nzfAXqMir6MEG', '1968-03-09'),
  ('ADM014', 'nathan.harris@example.com', 'Nathan Harris', '$2b$10$QW5Mbg/Ht8vNF.loJV7C5OaNUusJc7r7wnDz1d4/nzfAXqMir6MEG', '1973-07-01'),
  ('ADM015', 'olivia.martinez@example.com', 'Olivia Martinez', '$2b$10$QW5Mbg/Ht8vNF.loJV7C5OaNUusJc7r7wnDz1d4/nzfAXqMir6MEG', '1976-05-23'),
  ('ADM016', 'paul.clark@example.com', 'Paul Clark', '$2b$10$QW5Mbg/Ht8vNF.loJV7C5OaNUusJc7r7wnDz1d4/nzfAXqMir6MEG', '1965-09-30'),
  ('ADM017', 'quincy.rodriguez@example.com', 'Quincy Rodriguez', '$2b$10$QW5Mbg/Ht8vNF.loJV7C5OaNUusJc7r7wnDz1d4/nzfAXqMir6MEG', '1972-12-08'),
  ('ADM018', 'rachel.lewis@example.com', 'Rachel Lewis', '$2b$10$QW5Mbg/Ht8vNF.loJV7C5OaNUusJc7r7wnDz1d4/nzfAXqMir6MEG', '1969-11-11'),
  ('ADM019', 'steven.walker@example.com', 'Steven Walker', '$2b$10$QW5Mbg/Ht8vNF.loJV7C5OaNUusJc7r7wnDz1d4/nzfAXqMir6MEG', '1971-04-02'),
  ('ADM020', 'tina.hall@example.com', 'Tina Hall', '$2b$10$QW5Mbg/Ht8vNF.loJV7C5OaNUusJc7r7wnDz1d4/nzfAXqMir6MEG', '1974-06-19');

--
-- Table structure for table `approves`
--

-- Drop the table if it already exists
DROP TABLE IF EXISTS approves;

-- Create the approves table
CREATE TABLE IF NOT EXISTS approves (
  ssn TEXT NOT NULL,
  user_email TEXT NOT NULL,
  recipe_id INTEGER NOT NULL,
  PRIMARY KEY (ssn, user_email, recipe_id),
  FOREIGN KEY (ssn) REFERENCES admin(ssn) ON DELETE CASCADE,
  FOREIGN KEY (user_email, recipe_id) REFERENCES mealplans(user_email, recipe_id) ON DELETE CASCADE
);

-- Create an index for user_email and recipe_id (equivalent to the KEY in MySQL)
CREATE INDEX IF NOT EXISTS idx_user_email_recipe_id ON approves(user_email, recipe_id);


--
-- Dumping data for table `approves`
--

-- Insert the data into the `approves` table
INSERT INTO approves (ssn, user_email, recipe_id) 
VALUES 
  ('ADM001', 'user.alex@example.com', 1),
  ('ADM002', 'user.beth@example.com', 2),
  ('ADM003', 'user.charlie@example.com', 3),
  ('ADM004', 'user.daisy@example.com', 4),
  ('ADM005', 'user.edward@example.com', 5),
  ('ADM006', 'user.fiona@example.com', 6),
  ('ADM007', 'user.george@example.com', 7),
  ('ADM008', 'user.hannah@example.com', 8),
  ('ADM009', 'user.ian@example.com', 9),
  ('ADM010', 'user.julia@example.com', 10),
  ('ADM011', 'user.kevin@example.com', 11),
  ('ADM012', 'user.linda@example.com', 12),
  ('ADM013', 'user.michael@example.com', 13),
  ('ADM014', 'user.nora@example.com', 14),
  ('ADM015', 'user.oliver@example.com', 15),
  ('ADM016', 'user.patricia@example.com', 16),
  ('ADM017', 'user.quinn@example.com', 17),
  ('ADM018', 'user.rachel@example.com', 18),
  ('ADM019', 'user.sam@example.com', 19),
  ('ADM020', 'user.ted@example.com', 20);

--
-- Table structure for table `category`
--

-- Drop the table if it already exists
DROP TABLE IF EXISTS category;

-- Create the category table
CREATE TABLE IF NOT EXISTS category (
  type TEXT NOT NULL,
  PRIMARY KEY (type)
);

--
-- Dumping data for table `category`
--

-- Insert the data into the `category` table
INSERT INTO category (type)
VALUES 
  ('Baking'),
  ('BBQ'),
  ('Breakfast'),
  ('Dessert'),
  ('Dinner'),
  ('Gluten-Free'),
  ('Grill'),
  ('Instant Pot'),
  ('Keto'),
  ('Lunch'),
  ('Mediterranean'),
  ('Paleo'),
  ('Salad'),
  ('Seafood'),
  ('Slow Cooker'),
  ('Snack'),
  ('Soup'),
  ('Stew'),
  ('Vegan'),
  ('Vegetarian');


--
-- Table structure for table `comments`
--

-- Drop the table if it already exists
DROP TABLE IF EXISTS comments;

-- Create the comments table
CREATE TABLE IF NOT EXISTS comments (
  comment_id INTEGER PRIMARY KEY AUTOINCREMENT,
  text TEXT,
  images TEXT DEFAULT NULL,
  user_email TEXT DEFAULT NULL,
  recipe_id INTEGER DEFAULT NULL,
  monitored_by TEXT DEFAULT NULL,
  FOREIGN KEY (user_email) REFERENCES users(email) ON DELETE CASCADE,
  FOREIGN KEY (recipe_id) REFERENCES recipe(recipe_id) ON DELETE CASCADE,
  FOREIGN KEY (monitored_by) REFERENCES admin(ssn) ON DELETE CASCADE
);

-- Optional: Create indexes for user_email, recipe_id, and monitored_by
CREATE INDEX IF NOT EXISTS idx_user_email ON comments(user_email);
CREATE INDEX IF NOT EXISTS idx_recipe_id ON comments(recipe_id);
CREATE INDEX IF NOT EXISTS idx_monitored_by ON comments(monitored_by);


--
-- Dumping data for table `comments`
--

-- Insert the data into the comments table
INSERT INTO comments (comment_id, text, images, user_email, recipe_id, monitored_by)
VALUES 
  (2, 'Loved the vibrant flavors in this smoothie bowl!', 'smoothie.jpg', 'user.alex@example.com', 1, 'ADM001'),
  (3, 'The chicken wrap was both filling and fresh.', 'wrap.jpg', 'user.beth@example.com', 2, 'ADM002'),
  (4, 'This bolognese is a new family favorite.', 'pasta.jpg', 'user.charlie@example.com', 3, 'ADM003'),
  (5, 'Avocado toast done right – so crisp and creamy!', 'avocado_toast.jpg', 'user.daisy@example.com', 4, 'ADM004'),
  (6, 'Chocolate cake that melts in your mouth!', 'choc_cake.jpg', 'user.edward@example.com', 5, 'ADM005'),
  (7, 'The stir-fry had a perfect balance of spice and zest.', 'stirfry.jpg', 'user.fiona@example.com', 6, 'ADM006'),
  (8, 'Refreshing salad with a kick of lime – love it!', 'quinoa_salad.jpg', 'user.george@example.com', 7, 'ADM007'),
  (9, 'These pancakes are a game changer for gluten-free breakfasts.', 'pancakes.jpg', 'user.hannah@example.com', 8, 'ADM008'),
  (10, 'Steak was grilled to perfection with a delicious herb butter.', 'steak.jpg', 'user.ian@example.com', 9, 'ADM009'),
  (11, 'Roasted chicken that’s juicy and full of flavor.', 'roasted_chicken.jpg', 'user.julia@example.com', 10, 'ADM010'),
  (12, 'The Greek salad was fresh and tangy – a delight!', 'greek_salad.jpg', 'user.kevin@example.com', 11, 'ADM011'),
  (13, 'Salmon with lemon and garlic is now my go-to dish.', 'salmon.jpg', 'user.linda@example.com', 12, 'ADM012'),
  (14, 'A garden salad that truly tastes like summer.', 'garden_salad.jpg', 'user.michael@example.com', 13, 'ADM013'),
  (15, 'This tomato basil soup warms the heart on cold days.', 'tomato_soup.jpg', 'user.nora@example.com', 14, 'ADM014'),
  (16, 'The beef stew is rich and comforting – just like home cooking.', 'beef_stew.jpg', 'user.oliver@example.com', 15, 'ADM015'),
  (17, 'Pulled pork that is smoky, tender, and utterly delicious.', 'pulled_pork.jpg', 'user.patricia@example.com', 16, 'ADM016'),
  (18, 'Veggie skewers that burst with flavor and color.', 'veg_skewers.jpg', 'user.quinn@example.com', 17, 'ADM017'),
  (19, 'Blueberry muffins that are soft, moist, and perfectly sweet.', 'muffins.jpg', 'user.rachel@example.com', 18, 'ADM018'),
  (20, 'Lamb curry that is both spicy and heartwarming.', 'lamb_curry.jpg', 'user.sam@example.com', 19, 'ADM019'),
  (21, 'Chili that’s rich, hearty, and full of bold flavors.', 'chili.jpg', 'user.ted@example.com', 20, 'ADM020');


--
-- Table structure for table `dietarypreference`
--

DROP TABLE IF EXISTS dietarypreference;

CREATE TABLE dietarypreference (
  name TEXT PRIMARY KEY
);

-- Inserting data into `dietarypreference`
INSERT INTO dietarypreference (name) VALUES 
('Dairy-Free'),
('Eco-Friendly'),
('Farm-to-Table'),
('Gluten-Free'),
('High-Protein'),
('Keto'),
('Low-Carb'),
('Low-Fat'),
('Low-Sodium'),
('Mediterranean'),
('Nut-Free'),
('Organic'),
('Paleo'),
('Pescatarian'),
('Plant-Based'),
('Raw'),
('Sugar-Free'),
('Vegan'),
('Vegetarian'),
('Whole30');

-- Table structure for table `follows`
DROP TABLE IF EXISTS follows;

CREATE TABLE follows (
  follower_email TEXT NOT NULL,
  followee_email TEXT NOT NULL,
  PRIMARY KEY (follower_email, followee_email),
  FOREIGN KEY (follower_email) REFERENCES users(email) ON DELETE CASCADE,
  FOREIGN KEY (followee_email) REFERENCES users(email) ON DELETE CASCADE
);

-- Inserting data into `follows`
INSERT INTO follows (follower_email, followee_email) VALUES
('user.sam@example.com','user.alex@example.com'),
('user.ted@example.com','user.beth@example.com'),
('user.alex@example.com','user.charlie@example.com'),
('user.beth@example.com','user.daisy@example.com'),
('user.charlie@example.com','user.edward@example.com'),
('user.daisy@example.com','user.fiona@example.com'),
('user.edward@example.com','user.george@example.com'),
('user.fiona@example.com','user.hannah@example.com'),
('user.george@example.com','user.ian@example.com'),
('user.hannah@example.com','user.julia@example.com'),
('user.ian@example.com','user.kevin@example.com'),
('user.julia@example.com','user.linda@example.com'),
('user.kevin@example.com','user.michael@example.com'),
('user.linda@example.com','user.nora@example.com'),
('user.michael@example.com','user.oliver@example.com'),
('user.nora@example.com','user.patricia@example.com'),
('user.oliver@example.com','user.quinn@example.com'),
('user.patricia@example.com','user.rachel@example.com'),
('user.quinn@example.com','user.sam@example.com'),
('user.rachel@example.com','user.ted@example.com');

-- Table structure for table `has`
DROP TABLE IF EXISTS has;

CREATE TABLE has (
  user_email TEXT NOT NULL,
  dietary_name TEXT NOT NULL,
  PRIMARY KEY (user_email, dietary_name),
  FOREIGN KEY (user_email) REFERENCES users(email) ON DELETE CASCADE,
  FOREIGN KEY (dietary_name) REFERENCES dietarypreference(name) ON DELETE CASCADE
);

-- Inserting data into `has`
INSERT INTO has (user_email, dietary_name) VALUES
('user.george@example.com','Dairy-Free'),
('user.rachel@example.com','Eco-Friendly'),
('user.sam@example.com','Farm-to-Table'),
('user.fiona@example.com','Gluten-Free'),
('user.beth@example.com','High-Protein'),
('user.julia@example.com','Keto'),
('user.alex@example.com','Low-Carb'),
('user.michael@example.com','Low-Fat'),
('user.linda@example.com','Low-Sodium'),
('user.oliver@example.com','Mediterranean'),
('user.hannah@example.com','Nut-Free'),
('user.ian@example.com','Organic'),
('user.kevin@example.com','Paleo'),
('user.edward@example.com','Pescatarian'),
('user.ted@example.com','Plant-Based'),
('user.quinn@example.com','Raw'),
('user.nora@example.com','Sugar-Free'),
('user.charlie@example.com','Vegan'),
('user.daisy@example.com','Vegetarian'),
('user.patricia@example.com','Whole30');

-- Table structure for table `ingredient`
DROP TABLE IF EXISTS ingredient;

CREATE TABLE ingredient (
  name TEXT PRIMARY KEY,
  calories INTEGER
);

-- Inserting data into `ingredient`
INSERT INTO ingredient (name, calories) VALUES
('Avocado',160),
('Basil',22),
('Beef',250),
('Bell Pepper',31),
('Broccoli',55),
('Carrot',41),
('Cheese',402),
('Chicken Breast',165),
('Egg',155),
('Garlic',149),
('Milk',42),
('Mushroom',22),
('Olive Oil',884),
('Onion',40),
('Potato',77),
('Quinoa',120),
('Rice',130),
('Salmon',208),
('Spinach',23),
('Tomato',20);

-- Drop the table if it exists
DROP TABLE IF EXISTS mealplans;

-- Create the 'mealplans' table
CREATE TABLE mealplans (
  user_email TEXT NOT NULL,
  recipe_id INTEGER NOT NULL,
  PRIMARY KEY (user_email, recipe_id),
  FOREIGN KEY (user_email) REFERENCES users (email) ON DELETE CASCADE,
  FOREIGN KEY (recipe_id) REFERENCES recipe (recipe_id) ON DELETE CASCADE
);

-- Insert data into 'mealplans'
INSERT INTO mealplans (user_email, recipe_id) VALUES
  ('user.alex@example.com', 1),
  ('user.beth@example.com', 2),
  ('user.charlie@example.com', 3),
  ('user.daisy@example.com', 4),
  ('user.edward@example.com', 5),
  ('user.fiona@example.com', 6),
  ('user.george@example.com', 7),
  ('user.hannah@example.com', 8),
  ('user.ian@example.com', 9),
  ('user.julia@example.com', 10),
  ('user.kevin@example.com', 11),
  ('user.linda@example.com', 12),
  ('user.michael@example.com', 13),
  ('user.nora@example.com', 14),
  ('user.oliver@example.com', 15),
  ('user.patricia@example.com', 16),
  ('user.quinn@example.com', 17),
  ('user.rachel@example.com', 18),
  ('user.sam@example.com', 19),
  ('user.ted@example.com', 20);


-- Drop the table if it exists
DROP TABLE IF EXISTS prepares;

-- Create the 'prepares' table
CREATE TABLE prepares (
  user_email TEXT NOT NULL,
  recipe_id INTEGER NOT NULL,
  PRIMARY KEY (user_email, recipe_id),
  FOREIGN KEY (user_email) REFERENCES users (email) ON DELETE CASCADE,
  FOREIGN KEY (recipe_id) REFERENCES recipe (recipe_id) ON DELETE CASCADE
);

-- Insert data into 'prepares'
INSERT INTO prepares (user_email, recipe_id) VALUES
  ('user.alex@example.com', 1),
  ('user.beth@example.com', 2),
  ('user.charlie@example.com', 3),
  ('user.daisy@example.com', 4),
  ('user.edward@example.com', 5),
  ('user.fiona@example.com', 6),
  ('user.george@example.com', 7),
  ('user.hannah@example.com', 8),
  ('user.ian@example.com', 9),
  ('user.julia@example.com', 10),
  ('user.kevin@example.com', 11),
  ('user.linda@example.com', 12),
  ('user.michael@example.com', 13),
  ('user.nora@example.com', 14),
  ('user.oliver@example.com', 15),
  ('user.patricia@example.com', 16),
  ('user.quinn@example.com', 17),
  ('user.rachel@example.com', 18),
  ('user.sam@example.com', 19),
  ('user.ted@example.com', 20);


-- Drop the table if it exists
DROP TABLE IF EXISTS rating;

-- Create the 'rating' table
CREATE TABLE rating (
  user_email TEXT NOT NULL,
  recipe_id INTEGER NOT NULL,
  number_of_stars INTEGER DEFAULT NULL,
  PRIMARY KEY (user_email, recipe_id),
  FOREIGN KEY (user_email) REFERENCES users (email) ON DELETE CASCADE,
  FOREIGN KEY (recipe_id) REFERENCES recipe (recipe_id) ON DELETE CASCADE,
  CHECK (number_of_stars >= 1 AND number_of_stars <= 5)
);

-- Insert data into 'rating'
INSERT INTO rating (user_email, recipe_id, number_of_stars) VALUES
  ('user.alex@example.com', 1, 5),
  ('user.beth@example.com', 2, 3),
  ('user.charlie@example.com', 3, 4),
  ('user.daisy@example.com', 4, 2),
  ('user.edward@example.com', 5, 5),
  ('user.fiona@example.com', 6, 4),
  ('user.george@example.com', 7, 3),
  ('user.hannah@example.com', 8, 2),
  ('user.ian@example.com', 9, 4),
  ('user.julia@example.com', 10, 5),
  ('user.kevin@example.com', 11, 3),
  ('user.linda@example.com', 12, 4),
  ('user.michael@example.com', 13, 5),
  ('user.nora@example.com', 14, 2),
  ('user.oliver@example.com', 15, 3),
  ('user.patricia@example.com', 16, 4),
  ('user.quinn@example.com', 17, 5),
  ('user.rachel@example.com', 18, 3),
  ('user.sam@example.com', 19, 4),
  ('user.ted@example.com', 20, 5);


-- Table structure for table `recipe`
DROP TABLE IF EXISTS recipe;

CREATE TABLE recipe (
  recipe_id INTEGER PRIMARY KEY,
  name TEXT,
  description TEXT,
  instructions TEXT,
  created_by TEXT,
  category_type TEXT,
  image_url TEXT,
  FOREIGN KEY (created_by) REFERENCES users(email) ON DELETE CASCADE,
  FOREIGN KEY (category_type) REFERENCES category(type) ON DELETE CASCADE
);

-- Inserting data into `recipe` table
INSERT INTO recipe (recipe_id, name, description, instructions, created_by, category_type, image_url) VALUES
(1, 'Sunrise Smoothie Bowl', 'A refreshing breakfast bowl with fruits, yogurt, and granola.', 'Blend mixed berries and banana with yogurt; top with granola and honey.', 'user.alex@example.com', 'Breakfast', 'https://images.unsplash.com/photo-1592503469196-3a7880cc2d05?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
(2, 'Hearty Chicken Wrap', 'A fulfilling wrap featuring grilled chicken and crisp veggies.', 'Grill chicken, slice thinly, and wrap with lettuce, tomato, and a light dressing.', 'user.beth@example.com', 'Lunch', 'https://plus.unsplash.com/premium_photo-1679287668420-80c27ea4fb31?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
(3, 'Spaghetti Bolognese', 'Classic Italian pasta with a rich, savory meat sauce.', 'Cook spaghetti and simmer ground beef with tomatoes and herbs.', 'user.charlie@example.com', 'Dinner', 'https://plus.unsplash.com/premium_photo-1677000666741-17c3c57139a2?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c3BhZ2hldHRpfGVufDB8fDB8fHww'),
(4, 'Crispy Avocado Toast', 'Toasted artisanal bread topped with mashed avocado and a sprinkle of chili flakes.', 'Toast bread, mash avocado with lime juice, and season lightly.', 'user.daisy@example.com', 'Snack', 'https://plus.unsplash.com/premium_photo-1676106623583-e68dd66683e3?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXZvY2FkbyUyMHRvYXN0fGVufDB8fDB8fHww'),
(5, 'Decadent Chocolate Cake', 'A moist and rich chocolate cake layered with ganache.', 'Mix cocoa with flour, bake, and frost with chocolate ganache.', 'user.edward@example.com', 'Dessert', 'https://plus.unsplash.com/premium_photo-1715015440855-7d95cf92608a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2hvY29sYXRlJTIwY2FrZXxlbnwwfHwwfHx8MA%3D%3D'),
(6, 'Zesty Veggie Stir-Fry', 'A colorful medley of vegetables stir-fried with a tangy sauce.', 'Sauté bell peppers, broccoli, and carrots with soy sauce and ginger.', 'user.fiona@example.com', 'Vegetarian', 'https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3RpciUyMGZyeXxlbnwwfHwwfHx8MA%3D%3D'),
(7, 'Quinoa & Black Bean Salad', 'A nutritious, protein-packed vegan salad.', 'Combine cooked quinoa, black beans, corn, and avocado; dress with lime vinaigrette.', 'user.george@example.com', 'Vegan', 'https://plus.unsplash.com/premium_photo-1705207702013-368450377046?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHF1aW5vYSUyMHNhbGFkfGVufDB8fDB8fHww'),
(8, 'Almond Flour Pancakes', 'Light and fluffy pancakes made with almond flour for a gluten-free treat.', 'Mix almond flour with eggs and milk; fry in a nonstick pan until golden.', 'user.hannah@example.com', 'Gluten-Free', 'https://images.unsplash.com/photo-1612182062633-9ff3b3598e96?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGFuY2FrZXN8ZW58MHx8MHx8fDA%3D'),
(9, 'Grilled Steak with Herb Butter', 'Juicy steak grilled to perfection and topped with a dollop of herb-infused butter.', 'Season steak, grill to desired doneness, and add herb butter on top.', 'user.ian@example.com', 'Keto', 'https://plus.unsplash.com/premium_photo-1723478557023-1f739ec06671?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c3RlYWt8ZW58MHx8MHx8fDA%3D'),
(10, 'Herb-Roasted Chicken', 'A paleo-friendly roast chicken infused with fresh herbs.', 'Marinate chicken in herbs and olive oil; roast until the skin is crispy.', 'user.julia@example.com', 'Paleo', 'https://images.unsplash.com/photo-1727775827746-3c2a8b7885ae?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cm9hc3RlZCUyMGNoaWNrZW58ZW58MHx8MHx8fDA%3D'),
(11, 'Greek Salad', 'A crisp salad with cucumbers, olives, feta, and a zesty dressing.', 'Toss chopped veggies with olive oil, lemon, and oregano.', 'user.kevin@example.com', 'Mediterranean', 'https://plus.unsplash.com/premium_photo-1667215177072-6539146bc577?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z3JlZWslMjBzYWxhZHxlbnwwfHwwfHx8MA%3D%3D'),
(12, 'Lemon Garlic Salmon', 'Salmon fillet baked with lemon slices and garlic for a burst of flavor.', 'Season salmon, layer with lemon and garlic, then bake until flaky.', 'user.linda@example.com', 'Seafood', 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2FsbW9ufGVufDB8fDB8fHww'),
(13, 'Fresh Garden Salad', 'A light salad featuring mixed greens and seasonal vegetables.', 'Combine greens, tomatoes, and cucumbers; drizzle with balsamic vinaigrette.', 'user.michael@example.com', 'Salad', 'https://plus.unsplash.com/premium_photo-1673590981774-d9f534e0c617?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2FsYWR8ZW58MHx8MHx8fDA%3D'),
(14, 'Roasted Tomato Basil Soup', 'A comforting soup made from roasted tomatoes and fresh basil.', 'Roast tomatoes, blend with basil and broth, then simmer for flavor.', 'user.nora@example.com', 'Soup', 'https://images.unsplash.com/photo-1629978444632-9f63ba0eff47?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dG9tYXRvJTIwc291cHxlbnwwfHwwfHx8MA%3D%3D'),
(15, 'Beef and Barley Stew', 'A hearty stew loaded with tender beef, barley, and root vegetables.', 'Brown beef, add barley and vegetables, then simmer slowly until tender.', 'user.oliver@example.com', 'Stew', 'https://plus.unsplash.com/premium_photo-1669261881599-b72c96fc8d20?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmVlZiUyMGFuZCUyMGJhcmxleSUyMHN0ZXd8ZW58MHx8MHx8fDA%3D'),
(16, 'Smoked Pulled Pork', 'Slow-smoked pork shoulder pulled apart and served with tangy BBQ sauce.', 'Smoke pork until tender, shred it, and mix with homemade BBQ sauce.', 'user.patricia@example.com', 'BBQ', 'https://plus.unsplash.com/premium_photo-1664476636559-6dbd29f4c31e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHVsbGVkJTIwcG9ya3xlbnwwfHwwfHx8MA%3D%3D'),
(17, 'Grilled Vegetable Skewers', 'Seasonal vegetables skewered and grilled to perfection.', 'Thread vegetables onto skewers, brush with olive oil, and grill until charred.', 'user.quinn@example.com', 'Grill', 'https://plus.unsplash.com/premium_photo-1695658518214-1d9095fac5cc?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8R3JpbGxlZCUyMFZlZ2V0YWJsZSUyMFNrZXdlcnN8ZW58MHx8MHx8fDA%3D'),
(18, 'Blueberry Muffins', 'Moist muffins bursting with fresh blueberries and a hint of lemon.', 'Fold blueberries into batter and bake until light and fluffy.', 'user.rachel@example.com', 'Baking', 'https://images.unsplash.com/photo-1637087788517-c63086ec5b7e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Ymx1ZWJlcnJ5JTIwbXVmZmluc3xlbnwwfHwwfHx8MA%3D%3D'),
(19, 'Slow-Cooked Lamb Curry', 'A fragrant lamb curry slow-cooked with spices and tomatoes.', 'Brown lamb, add spices and tomatoes, and simmer in a slow cooker.', 'user.sam@example.com', 'Slow Cooker', 'https://images.unsplash.com/photo-1708782344137-21c48d98dfcc?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
(20, 'Instant Pot Chili', 'A quick, hearty chili made in the Instant Pot with beans and ground beef.', 'Sauté ingredients in the Instant Pot and pressure cook for a robust chili.', 'user.ted@example.com', 'Instant Pot', 'https://images.unsplash.com/photo-1633983055303-2e33e153b7dc?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hpbGl8ZW58MHx8MHx8fDA%3D');


-- Table structure for table `recipeingredient`
DROP TABLE IF EXISTS recipeingredient;

CREATE TABLE recipeingredient (
  recipe_id INTEGER NOT NULL,
  ingredient_name TEXT NOT NULL,
  PRIMARY KEY (recipe_id, ingredient_name),
  FOREIGN KEY (recipe_id) REFERENCES recipe(recipe_id) ON DELETE CASCADE,
  FOREIGN KEY (ingredient_name) REFERENCES ingredient(name) ON DELETE CASCADE
);

-- Inserting data into `recipeingredient`
INSERT INTO recipeingredient (recipe_id, ingredient_name) VALUES
(19,'Avocado'),
(6,'Basil'),
(9,'Beef'),
(12,'Bell Pepper'),
(3,'Broccoli'),
(11,'Carrot'),
(18,'Cheese'),
(2,'Chicken Breast'),
(16,'Egg'),
(5,'Garlic'),
(17,'Milk'),
(13,'Mushroom'),
(4,'Olive Oil'),
(10,'Onion'),
(20,'Potato'),
(15,'Quinoa'),
(14,'Rice'),
(7,'Salmon'),
(8,'Spinach'),
(1,'Tomato');

-- Table structure for table `restricts`
DROP TABLE IF EXISTS restricts;

CREATE TABLE restricts (
  dietary_name TEXT NOT NULL,
  ingredient_name TEXT NOT NULL,
  PRIMARY KEY (dietary_name, ingredient_name),
  FOREIGN KEY (dietary_name) REFERENCES dietarypreference(name) ON DELETE CASCADE,
  FOREIGN KEY (ingredient_name) REFERENCES ingredient(name) ON DELETE CASCADE
);

-- Inserting data into `restricts`
INSERT INTO restricts (dietary_name, ingredient_name) VALUES
('Farm-to-Table','Avocado'),
('Gluten-Free','Basil'),
('Organic','Beef'),
('Low-Sodium','Bell Pepper'),
('Vegan','Broccoli'),
('Paleo','Carrot'),
('Eco-Friendly','Cheese'),
('High-Protein','Chicken Breast'),
('Whole30','Egg'),
('Pescatarian','Garlic'),
('Raw','Milk'),
('Low-Fat','Mushroom'),
('Vegetarian','Olive Oil'),
('Keto','Onion'),
('Plant-Based','Potato'),
('Mediterranean','Quinoa'),
('Sugar-Free','Rice'),
('Dairy-Free','Saxlmon'),
('Nut-Free','Spinach'),
('Low-Carb','Tomato');

-- Table structure for table `users`
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  email TEXT PRIMARY KEY,
  password TEXT NOT NULL,
  name TEXT,
  birthday TEXT,
  verified INTEGER DEFAULT 0
);

-- Inserting data into `users` table
INSERT INTO users (email, password, name, birthday, verified) VALUES
('user.alex@example.com','$2b$10$Uv/ZdfZ.1FLpvP.O8NReYe18UVVw33RZl0MqjG3nvsXYHKCg9zikO','Alex Murphy','1990-02-14',1),
('user.beth@example.com','$2b$10$Uv/ZdfZ.1FLpvP.O8NReYe18UVVw33RZl0MqjG3nvsXYHKCg9zikO','Bethany Carter','1991-03-22',0),
('user.charlie@example.com','$2b$10$Uv/ZdfZ.1FLpvP.O8NReYe18UVVw33RZl0MqjG3nvsXYHKCg9zikO','Charlie Day','1992-04-10',1),
('user.daisy@example.com','$2b$10$Uv/ZdfZ.1FLpvP.O8NReYe18UVVw33RZl0MqjG3nvsXYHKCg9zikO','Daisy Ridley','1993-05-18',0),
('user.edward@example.com','$2b$10$Uv/ZdfZ.1FLpvP.O8NReYe18UVVw33RZl0MqjG3nvsXYHKCg9zikO','Edward Norton','1994-06-25',1),
('user.fiona@example.com','$2b$10$Uv/ZdfZ.1FLpvP.O8NReYe18UVVw33RZl0MqjG3nvsXYHKCg9zikO','Fiona Gallagher','1995-07-30',0),
('user.george@example.com','$2b$10$Uv/ZdfZ.1FLpvP.O8NReYe18UVVw33RZl0MqjG3nvsXYHKCg9zikO','George Clooney','1996-08-12',1),
('user.hannah@example.com','$2b$10$Uv/ZdfZ.1FLpvP.O8NReYe18UVVw33RZl0MqjG3nvsXYHKCg9zikO','Hannah Montana','1997-09-05',0),
('user.ian@example.com','$2b$10$Uv/ZdfZ.1FLpvP.O8NReYe18UVVw33RZl0MqjG3nvsXYHKCg9zikO','Ian Somerhalder','1998-10-20',1),
('user.julia@example.com','$2b$10$Uv/ZdfZ.1FLpvP.O8NReYe18UVVw33RZl0MqjG3nvsXYHKCg9zikO','Julia Roberts','1999-11-15',0),
('user.kevin@example.com','$2b$10$Uv/ZdfZ.1FLpvP.O8NReYe18UVVw33RZl0MqjG3nvsXYHKCg9zikO','Kevin Spacey','2000-12-01',1),
('user.linda@example.com','$2b$10$Uv/ZdfZ.1FLpvP.O8NReYe18UVVw33RZl0MqjG3nvsXYHKCg9zikO','Linda Hamilton','2001-01-11',0),
('user.michael@example.com','$2b$10$Uv/ZdfZ.1FLpvP.O8NReYe18UVVw33RZl0MqjG3nvsXYHKCg9zikO','Michael B. Jordan','2002-02-22',1),
('user.nora@example.com','$2b$10$Uv/ZdfZ.1FLpvP.O8NReYe18UVVw33RZl0MqjG3nvsXYHKCg9zikO','Nora Jones','2003-03-03',0),
('user.oliver@example.com','$2b$10$Uv/ZdfZ.1FLpvP.O8NReYe18UVVw33RZl0MqjG3nvsXYHKCg9zikO','Oliver Stone','2004-04-14',1),
('user.patricia@example.com','$2b$10$Uv/ZdfZ.1FLpvP.O8NReYe18UVVw33RZl0MqjG3nvsXYHKCg9zikO','Patricia Arquette','2005-05-05',0),
('user.quinn@example.com','$2b$10$Uv/ZdfZ.1FLpvP.O8NReYe18UVVw33RZl0MqjG3nvsXYHKCg9zikO','Quinn Shephard','2006-06-16',1),
('user.rachel@example.com','$2b$10$Uv/ZdfZ.1FLpvP.O8NReYe18UVVw33RZl0MqjG3nvsXYHKCg9zikO','Rachel McAdams','2007-07-27',0),
('user.sam@example.com','$2b$10$Uv/ZdfZ.1FLpvP.O8NReYe18UVVw33RZl0MqjG3nvsXYHKCg9zikO','Sam Worthington','2008-08-08',1),
('user.ted@example.com','$2b$10$Uv/ZdfZ.1FLpvP.O8NReYe18UVVw33RZl0MqjG3nvsXYHKCg9zikO','Ted Danson','2009-09-19',0);

-- Drop the table if it exists
DROP TABLE IF EXISTS verifies;

-- Create the 'verifies' table
CREATE TABLE verifies (
  admin_ssn TEXT NOT NULL,
  user_email TEXT NOT NULL,
  PRIMARY KEY (admin_ssn, user_email),
  FOREIGN KEY (admin_ssn) REFERENCES admin (ssn) ON DELETE CASCADE,
  FOREIGN KEY (user_email) REFERENCES users (email) ON DELETE CASCADE
);

-- Insert data into 'verifies'
INSERT INTO verifies (admin_ssn, user_email) VALUES
  ('ADM001', 'user.alex@example.com'),
  ('ADM002', 'user.beth@example.com'),
  ('ADM003', 'user.charlie@example.com'),
  ('ADM004', 'user.daisy@example.com'),
  ('ADM005', 'user.edward@example.com'),
  ('ADM006', 'user.fiona@example.com'),
  ('ADM007', 'user.george@example.com'),
  ('ADM008', 'user.hannah@example.com'),
  ('ADM009', 'user.ian@example.com'),
  ('ADM010', 'user.julia@example.com'),
  ('ADM011', 'user.kevin@example.com'),
  ('ADM012', 'user.linda@example.com'),
  ('ADM013', 'user.michael@example.com'),
  ('ADM014', 'user.nora@example.com'),
  ('ADM015', 'user.oliver@example.com'),
  ('ADM016', 'user.patricia@example.com'),
  ('ADM017', 'user.quinn@example.com'),
  ('ADM018', 'user.rachel@example.com'),
  ('ADM019', 'user.sam@example.com'),
  ('ADM020', 'user.ted@example.com');