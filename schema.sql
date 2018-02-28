CREATE DATABASE doggiePlayDate_db;
USE doggiePlayDate_db;
CREATE TABLE dogOwner (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_login VARCHAR(255), -- email address Should we encrypt?
    user_passwd VARCHAR(50), -- to be encrypted 
    fname VARCHAR(255) NOT NULL,
    lname VARCHAR(255) NOT NULL,
    addr1 VARCHAR(255) NOT NULL,
    addr2 VARCHAR(255) NOT NULL,
    city VARCHAR(25) NOT NULL,
    state CHAR(2) NOT NULL,
    zip VARCHAR(25) NOT NULL,
    owner_profile VARCHAR(500), -- 500 character limit
    created_at DATETIME NOT NULL, -- SHOULD NOT CHANGE AFTER INITIAL ENTRY
    updated_at DATETIME NOT NULL DEFAULT ON UPDATE CURRENT_TIMESTAMP ON DELETE RESTRICT
);
CREATE TABLE dog (
    id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
    owner_id INT NOT NULL,
    dog_name VARCHAR(50) NOT NULL,
    breed VARCHAR(50) NOT NULL,
    sex CHAR(1) NOT NULL, -- M or F 
    age TINYINT NOT NULL, -- do we store as months and years? Should we calculat age and change age to birthdate?
    dog_weight SMALLINT NOT NULL,
    demeanor VARCHAR(25) NOT NULL,
    energylvl VARCHAR(25) NOT NULL,
    size CHAR(2) NOT NULL,  -- sm, md, lg, xl
    created_at DATETIME NOT NULL, -- SHOULD NOT CHANGE AFTER INITIAL ENTRY
    updated_at DATETIME DEFAULT ON UPDATE CURRENT_TIMESTAMP,
    INDEX (owner_id),
    FOREIGN KEY(owner_id) REFERENCES(dogOwner, id) ON UPDATE CASCADE ON DELETE RESTRICT,
);
CREATE TABLE owner_pic(
    id INTEGER AUTO_INCREMENT NOT NULL,
    owner_id INTEGER NOT NULL PRIMARY KEY,
    pic_name VARCHAR(50),
    pic_ref VARCHAR(50), -- for future use to store CDN reference
    pic BLOB, --pic storage in database
    created_at DATETIME NOT NULL, -- SHOULD NOT CHANGE AFTER INITIAL ENTRY
    updated_at DATETIME DEFAULT ON UPDATE CURRENT_TIMESTAMP,
    INDEX(owner_id),
    FOREIGN KEY (owner_id) REFERENCES (dogOwner, id) ON UPDATE CASCADE ON DELETE RESTRICT,
);