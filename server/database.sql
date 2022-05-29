CREATE DATABASE todo;

CREATE TABLE todo_list(
    todo_list_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);
