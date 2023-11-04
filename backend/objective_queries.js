import db from "./database.js";

async function add_objective(req, res) {
  // TODO: check objective does not already exist.
  console.log(req.body);
  const objective = req.body;

  db.query(
    `INSERT INTO Objectives (obj_description) VALUES (?);
    INSERT INTO Coordinates (obj_id, lng, lat) VALUES (LAST_INSERT_ID(), ?, ?); 
    INSERT INTO ZoomLevels (coordinate_id, zoom, yRatio, xRatio, pitch, heading, labelH, labelW) VALUES (LAST_INSERT_ID(), ?, ?, ?, ?, ?, ?, ?);`,
    [
      objective.description,

      objective.lng,
      objective.lat,

      objective.zoom,
      objective.yRatio,
      objective.xRatio,
      objective.pitch,
      objective.heading,
      objective.labelH,
      objective.labelW,
    ],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        res.status(200).json({ message: "Objective added" });
      }
    }
  );
}

async function get_random_objective(_, res) {
  db.query(
    `SELECT obj_id FROM Objectives 
        ORDER BY RAND() 
        LIMIT 1;`,
    (err, result) => {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        get_objective_by_id({ params: { id: result[0].obj_id } }, res);
      }
    }
  );
}

async function get_objective_by_id(req, res) {
  db.query(
    `SELECT * FROM Objectives, Coordinates, ZoomLevels 
        WHERE
        Objectives.obj_id = ? AND 
        Objectives.obj_id = Coordinates.obj_id AND Coordinates.coordinate_id = ZoomLevels.coordinate_id;`,
    [req.params.id],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        if(result.length === 0) {
          res.status(404).json({ error: "Objective not found" });
          return;
        }
        console.log("Objectives retrieved");
        res.status(200).json(result);
      }
    }
  );
}

async function remove_objective(req, res) {
  db.query(
    `DELETE FROM Objectives WHERE obj_id = ?;`,
    [req.params.id],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        // check if objective was deleted
        if(result.affectedRows === 0) {
          res.status(404).json({ error: "Objective not found" });
          return;
        }
        console.log("Objectives retrieved");
        res.status(200).json(result);
      }
    }
  );
}

export {
  add_objective,
  get_random_objective,
  get_objective_by_id,
  remove_objective,
};
