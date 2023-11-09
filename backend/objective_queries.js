import db from "./database.js";

// don't forget beginTransaction, commit and rollback for post requests!

async function add_objective(req, res) {
  // TODO: check objective does not already exist.
  console.log(req.body);
  const { description, info } = req.body;
  try {
    await db.beginTransaction();
    const [insertObjectiveResult] = await db.query(
      "INSERT INTO Objectives (obj_description) VALUES (?)",
      [description]
    );
    console.log("inserted objective");
    const objectiveId = insertObjectiveResult.insertId;

    for (const coordinate of info) {
      const [coordinateResult] = await db.query(
        "SELECT * FROM Coordinates WHERE obj_id = ? AND lng = ? AND lat = ?",
        [objectiveId, coordinate.lng, coordinate.lat]
      );
      if (coordinateResult.length > 0) {
        await db.query(
          "INSERT INTO ZoomLevels (coordinate_id, zoom, yRatio, xRatio, pitch, heading, labelH, labelW) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
          [
            coordinateResult[0].coordinate_id,
            coordinate.zoom,
            coordinate.yRatio,
            coordinate.xRatio,
            coordinate.pitch,
            coordinate.heading,
            coordinate.labelH,
            coordinate.labelW,
          ]
        );
      } else {
        const [insertCoordinatesResult] = await db.query(
          "INSERT INTO Coordinates (obj_id, lng, lat) VALUES (?, ?, ?)",
          [objectiveId, coordinate.lng, coordinate.lat]
        );

        console.log("twice?");
        const coordinateId = insertCoordinatesResult.insertId;

        await db.query(
          "INSERT INTO ZoomLevels (coordinate_id, zoom, yRatio, xRatio, pitch, heading, labelH, labelW) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
          [
            coordinateId,
            coordinate.zoom,
            coordinate.yRatio,
            coordinate.xRatio,
            coordinate.pitch,
            coordinate.heading,
            coordinate.labelH,
            coordinate.labelW,
          ]
        );
      }
    }
    await db.commit();
    res.status(200).json({ message: "Objective added" });
  } catch (err) {
    await db.rollback();
    res.status(500).json({ error: err?.message });
  }
}

async function get_all_objectives(_, res) {
  try {
    const [result] = await db.query(
      `SELECT * FROM Objectives, Coordinates, ZoomLevels WHERE Objectives.obj_id = Coordinates.obj_id AND Coordinates.coordinate_id = ZoomLevels.coordinate_id;`
    );
    if (result.length === 0) {
      res.status(404).json({ error: "Objectives not found" });
      return;
    }
    console.log("Objectives retrieved");
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err });
  }
}

async function get_random_objective(_, res) {
  try {
    const [result] = await db.query(
      `SELECT obj_id FROM Objectives ORDER BY RAND() LIMIT 1;`
    );
    if (result.length === 0) {
      res.status(404).json({ error: "Objective not found" });
      return;
    }
    get_objective_by_id({ params: { id: result[0].obj_id } }, res);
  } catch (err) {
    res.status(500).json({ error: err });
  }
}

async function get_objective_by_id(req, res) {
  try {
    const [result] = await db.query(
      `SELECT * FROM Objectives, Coordinates, ZoomLevels 
        WHERE
        Objectives.obj_id = ? AND 
        Objectives.obj_id = Coordinates.obj_id AND Coordinates.coordinate_id = ZoomLevels.coordinate_id;`,
      [req.params.id]
    );
    if (result.length === 0) {
      res.status(404).json({ error: "Objective not found" });
      return;
    }
    console.log("Objectives retrieved");
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err });
  }
}

async function remove_objective(req, res) {
  try {
    const [result] = await db.query(
      `DELETE FROM Objectives WHERE obj_id = ?;`,
      [req.params.id]
    );
    if (result.affectedRows === 0) {
      res.status(404).json({ error: "Objective not found" });
      return;
    }
    console.log("Objectives retrieved");
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err });
  }
}

export {
  add_objective,
  get_all_objectives,
  get_random_objective,
  get_objective_by_id,
  remove_objective,
};
