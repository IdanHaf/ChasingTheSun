
-- @block
CREATE TABLE users (
  username VARCHAR(255) PRIMARY KEY,
  password VARCHAR(255) NOT NULL,
  score INT DEFAULT 0
);

-- @block
-- Create the Objectives table
CREATE TABLE Objectives (
    obj_id INT PRIMARY KEY AUTO_INCREMENT,
    obj_description VARCHAR(255)
);

-- @block
-- Create the Coordinates table
CREATE TABLE Coordinates (
    coordinate_id INT PRIMARY KEY AUTO_INCREMENT,
    obj_id INT,
    lng DECIMAL(15, 12),
    lat DECIMAL(15, 12),
    FOREIGN KEY (obj_id) REFERENCES Objectives(obj_id) ON DELETE CASCADE
);

-- @block
-- Create the ZoomLevels table with a composite primary key
CREATE TABLE ZoomLevels (
    coordinate_id INT,
    zoom INT,
    yRatio DECIMAL(8, 5),
    xRatio DECIMAL(6, 5),
    pitch DECIMAL(8, 5),
    heading DECIMAL(8, 5),
    labelH DECIMAL(8, 5),
    labelW DECIMAL(8, 5),
    PRIMARY KEY (coordinate_id, zoom),
    FOREIGN KEY (coordinate_id) REFERENCES Coordinates(coordinate_id) ON DELETE CASCADE
);



-- @block
DROP TABLE IF EXISTS ZoomLevels;
DROP TABLE IF EXISTS Coordinates;
DROP TABLE IF EXISTS Objectives;

