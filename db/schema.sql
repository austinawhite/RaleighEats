DROP TABLE IF EXITS categories CASCADE;
DROP TABLE IF EXISTS restaurants;

-- Create Category Table --

CREATE TABLE categories (
    id SERIAL PRIMARY KEY, 
    category_name TEXT NOT NULL
);

-- Create Restaurant Table --

CREATE TABLE resturants (
    id SERIAL PRIMARY KEY,
    restaurant_name TEXT NOT NULL,
    restaurant_location TEXT NOT NULL,
    phone TEXT NOT NULL UNIQUE,
    category_id INTEGER REFERENCES categories(id)
)

