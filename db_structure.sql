CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(16) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    surname VARCHAR(255) NOT NULL,
    propic VARCHAR(255)
) Engine = InnoDB;

CREATE TABLE songs (
    id VARCHAR(255) NOT NULL,
    user_id INTEGER NOT NULL,
    content json,
    INDEX idx_user(user_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY(id, user_id)
) Engine = InnoDB;

CREATE TABLE progressions
(	
	id INTEGER PRIMARY KEY AUTO_INCREMENT,
	prog VARCHAR(255) NOT NULL,	
	n_chords INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    INDEX idx_user(user_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
)Engine='InnoDB';	



CREATE TABLE compositions
(
	id INTEGER PRIMARY KEY AUTO_INCREMENT,
	song_id VARCHAR(255),	
	progression_id INTEGER,
    user_id INTEGER NOT NULL,
    INDEX idx_song(song_id),
	INDEX idx_prog(progression_id),	
    INDEX idx_user(user_id),
    FOREIGN KEY (song_id) REFERENCES songs(id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (progression_id) REFERENCES progressions(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
)Engine='InnoDB';