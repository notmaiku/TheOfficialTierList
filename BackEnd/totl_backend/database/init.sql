CREATE TABLE IF NOT EXISTS users (
  id          SERIAL PRIMARY KEY,
  username    VARCHAR(64) NOT NULL UNIQUE,
  password    VARCHAR(64) NOT NULL,
  deleted_at  TIMESTAMP DEFAULT NULL,
  token       TEXT DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS tiers (
  id            SERIAL PRIMARY KEY,
  title         TEXT NOT NULL,
  image         BYTEA DEFAULT NULL,
  tier          VARCHAR(10) NOT NULL,
  kind          VARCHAR(50) DEFAULT 'normal',
  updated_at    TIMESTAMP DEFAULT NULL,
  deleted_at    TIMESTAMP DEFAULT NULL,
  user_id       INTEGER DEFAULT NULL, 
  game          VARCHAR(256) NOT NULL
);

CREATE TABLE IF NOT EXISTS colors(
  id SERIAL PRIMARY KEY,
  kind VARCHAR(50) DEFAULT 'normal',
  start_color VARCHAR(256) DEFAULT NULL,
  end_color VARCHAR(256) DEFAULT NULL,
  game VARCHAR(256) NOT NULL
);


