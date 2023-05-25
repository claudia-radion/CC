CREATE TABLE friends (
    id int NOT,
    first_name varchar(255) NOT NULL,
    last_name varchar(255),
    email varchar(225),
    birth date,
    PRIMARY KEY (ID)
);

INSERT INTO friends VALUES(1, 'Claudia', 'Radion', 'radion_claudia@yahoo.com', '1998-05-24');

SELECT * FROM friends;

-- mysql -h databasepersons.c647eyfniogy.us-east-1.rds.amazonaws.com -P 3306 -u admin -p
-- password: admin123