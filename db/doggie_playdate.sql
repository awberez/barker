CREATE DATABASE IF NOT exists doggiePlayDate_db;
USE doggiePlayDate_db;
CREATE TABLE IF NOT exists dogOwner (
    id NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_login VARCHAR(255) NOT NULL, -- email address Should we encrypt?
    user_passwd VARCHAR(50) NOT NULL, -- to be encrypted 
    fname VARCHAR(255) NULL,
    lname VARCHAR(255)NULL,
    addr1 VARCHAR(255)NULL,
    addr2 VARCHAR(255)NULL,
    city VARCHAR(25)NULL,
    state CHAR(2)NULL,
    zip VARCHAR(25)NULL,
    owner_profile VARCHAR(500), -- 500 character limit
    created_at DATETIME DEFAULT NOW(), -- SHOULD NOT CHANGE AFTER INITIAL ENTRY
    updated_at DATETIMENULL ON UPDATE CURRENT_TIMESTAMP 
);
CREATE TABLE IF NOT exists dog (
    id INTEGER AUTO_INCREMENTNULL PRIMARY KEY,
    owner_id INT NOT NULL,
    dog_name VARCHAR(50)NULL,
    breed VARCHAR(50)NULL,
    sex CHAR(1)NULL, -- M or F 
    age TINYINTNULL, -- do we store as months and years? Should we calculat age and change age to birthdate?
    dog_weight SMALLINT NULL,
    demeanor VARCHAR(25)NULL,
    energylvl VARCHAR(25)NULL,
    size CHAR(2) NULL,  -- sm, md, lg, xl
    created_at DATETIME DEFAULT NOW(), -- SHOULD NOT CHANGE AFTER INITIAL ENTRY
    updated_at DATETIMENULL ON UPDATE CURRENT_TIMESTAMP,
    INDEX(owner_id),
    FOREIGN KEY(owner_id) REFERENCES dogOwner(id) ON UPDATE CASCADE ON DELETE RESTRICT
);
CREATE TABLE IF NOT exists owner_pic(
    id INTEGER AUTO_INCREMENTNULL PRIMARY KEY,
    owner_id IN NOT NULL,
    pic_name VARCHAR(50),
    pic_ref VARCHAR(50), -- for future use to store CDN reference
    pic BLOB, -- pic storage in database
    created_at DATETIME DEFAULT NOW(), -- SHOULD NOT CHANGE AFTER INITIAL ENTRY
    updated_at DATETIMENULL ON UPDATE CURRENT_TIMESTAMP,
    INDEX(owner_id),
    FOREIGN KEY (owner_id) REFERENCES dogOwner(id) ON UPDATE CASCADE ON DELETE RESTRICT
);