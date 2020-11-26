CREATE DATABASE IF NOT EXISTS mydb;

USE mydb;

CREATE TABLE IF NOT EXISTS Users (
  id VARCHAR(45) NOT NULL,
  password VARCHAR(45) NOT NULL,
  name VARCHAR(20),
  gender VARCHAR(1),
  birth DATE,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS Posts (
  _id VARCHAR(256) NOT NULL,
  user_id VARCHAR(45) NOT NULL,
  timestamp TIMESTAMP,
  title VARCHAR(64),
  contents VARCHAR(2048),
  PRIMARY KEY (user_id)
);

CREATE TABLE IF NOT EXISTS Comments (
  _id VARCHAR(256) NOT NULL,
  post_id VARCHAR(256) NOT NULL,
  user_id VARCHAR(45) NOT NULL,
  timestamp TIMESTAMP,
  contents VARCHAR(512),
  PRIMARY KEY (user_id)
);

INSERT INTO Users (id, password, name, gender, birth) VALUES ('dkdlel123', '1234', "홍길동", "M", "1995-01-10");
INSERT INTO Posts (_id, user_id, timestamp, title, contents) VALUES ('1', 'dkdlel123', '2020-11-26 00:00:01', "게시글", "게시글입니다");
INSERT INTO Comments (_id, post_id, user_id, timestamp, contents) VALUES ('1', '1', 'dkdlel123', '2020-11-26 00:10:01', "댓글입니다" );

SELECT password FROM Users WHERE id='dkdlel123';
SELECT contents FROM Posts WHERE user_id='dkdlel123';
SELECT contents FROM Comments WHERE user_id='dkdlel123';
