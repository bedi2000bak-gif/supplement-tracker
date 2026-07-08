-- Supplement Tracker database schema
-- Create the database first: createdb supplement_tracker
-- Then apply this file:     psql -d supplement_tracker -f db/schema.sql

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE supplements (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    dosage VARCHAR(100)
);

CREATE TABLE intake_logs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    supplement_id INTEGER REFERENCES supplements(id) ON DELETE CASCADE,
    date DATE NOT NULL,

    -- A supplement can only be logged once per user and day
    CONSTRAINT unique_intake_per_day UNIQUE (user_id, supplement_id, date)
);
