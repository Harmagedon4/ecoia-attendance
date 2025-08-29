

CREATE TABLE IF NOT EXISTS attendance (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  type ENUM('arrival','departure') NOT NULL,
  timestamp DATETIME NOT NULL
);
