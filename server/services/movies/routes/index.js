const router = require("express").Router();
const MovieController = require('../controllers/MovieController');


router.get("/", MovieController.findAll);
router.get("/:movieId", MovieController.findMovie);
router.post("/add", MovieController.addMovie);
router.put("/:movieId", MovieController.updateMovie);
router.delete("/:movieId", MovieController.deleteMovie);

module.exports = router;
