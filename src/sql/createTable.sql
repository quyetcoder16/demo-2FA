USE 2FA;


CREATE TABLE users(
	user_id INT PRIMARY KEY AUTO_INCREMENT,
	email VARCHAR(255),
	full_name VARCHAR(255),
	pass_word VARCHAR(255),
	secret_base32 VARCHAR(255),
	otpauth_url VARCHAR(255),
	avatar VARCHAR(255)
);