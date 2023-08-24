CREATE DATABASE database_links;
USE database_links;

CREATE TABLE users (
    id INT(11) NOT NULL,
    username VARCHAR(16),
    password VARCHAR(60),
    fullname VARCHAR(100)
);


ALTER TABLE users 
    ADD PRIMARY KEY(id);
ALTER TABLE users
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;


DESCRIBE users;

/*links table*/

CREATE TABLE links (
    id INT(11) NOT NULL,
    title VARCHAR(16),
    url VARCHAR(60),
    description TEXT,
    user_id INT(11),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);

ALTER TABLE links
    ADD PRIMARY KEY(id);
    MODIFY id INT(11)NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;


ALTER TABLE links
    MODIFY id INT(11)NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

DESCRIBE links;  