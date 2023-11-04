
-- @block
CREATE TABLE users (
  username VARCHAR(255) PRIMARY KEY,
  password VARCHAR(255) NOT NULL,
  score INT DEFAULT 0
);

-- @block
-- Create the Objectives table
CREATE TABLE Objectives (
    obj_id INT PRIMARY KEY,
    obj_description VARCHAR(255)
);

-- @block
-- Create the Coordinates table
CREATE TABLE Coordinates (
    coordinate_id INT PRIMARY KEY,
    obj_id INT,
    lng DECIMAL(10, 6),
    lat DECIMAL(10, 6),
    FOREIGN KEY (obj_id) REFERENCES Objectives(obj_id)
);

-- @block
-- Create the ZoomLevels table with a composite primary key
CREATE TABLE ZoomLevels (
    coordinate_id INT,
    zoom INT,
    yRatio DECIMAL(3, 5),
    xRatio DECIMAL(1, 5),
    pitch DECIMAL(3, 5),
    heading DECIMAL(3, 5),
    labelH DECIMAL(3, 5),
    labelW DECIMAL(3, 5),
    PRIMARY KEY (coordinate_id, zoom),
    FOREIGN KEY (coordinate_id) REFERENCES Coordinates(coordinate_id)   
);
