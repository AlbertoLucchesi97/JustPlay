CREATE TABLE users (
    id BIGINT PRIMARY KEY IDENTITY (1, 1) NOT NULL,
    admin BIT NULL,
    auth_id VARCHAR (255) NULL,
    email VARCHAR(255) NULL
);

CREATE TABLE videogames (
	id BIGINT PRIMARY KEY IDENTITY (1, 1) NOT NULL,
	cover VARCHAR(255) NULL,
	genre VARCHAR(255) NULL,
	publisher VARCHAR(255) NULL,
	software_house VARCHAR(255) NULL,
	synopsis VARCHAR(255) NULL,
	title VARCHAR(255) NULL,
	trailer VARCHAR(255) NULL,
	release_date DATE NULL
);

CREATE TABLE videogames_owned (
	id BIGINT PRIMARY KEY IDENTITY (1, 1) NOT NULL,
	user_email VARCHAR(255) NULL,
	videogame_id BIGINT NULL
);

CREATE TABLE videogames_wishlist (
	id BIGINT PRIMARY KEY IDENTITY (1, 1) NOT NULL,
	user_email VARCHAR(255) NULL,
	videogame_id BIGINT NULL
);