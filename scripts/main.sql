-- Execute the following command to run this script on the psql shell => \i <absolute path to file>

CREATE TABLE users (
  id UUID PRIMARY KEY,
  spotify_id VARCHAR(32) NOT NULL,
  username VARCHAR(32) NOT NULL,
  thumbnail VARCHAR(2100) NOT NULL,
  created_at TIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE rooms (
  id UUID PRIMARY KEY,
  roomname VARCHAR(24) NOT NULL UNIQUE,
  host UUID REFERENCES users(id) NOT NULL,
  active BOOLEAN DEFAULT 'true',
  created_at TIME DEFAULT CURRENT_TIMESTAMP
);

-- Example data
-- INSERT INTO users(id, spotify_id, username, thumbnail)
-- VALUES('d827e187-d1b4-40f5-8d72-fdd03337b912', 'abc123', 'myusername', 'aws.s3.create');

-- INSERT INTO rooms(id, roomname, host)
-- VALUES(uuid_generate_v4(), 'myroom', 'd827e187-d1b4-40f5-8d72-fdd03337b912');