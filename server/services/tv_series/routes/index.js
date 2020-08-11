const router = require("express").Router();
const TvSeriesController = require('../controllers/TvSeriesController');


router.get("/", TvSeriesController.findAll);
router.get("/:TvSeriesId", TvSeriesController.findTvSeries);
router.post("/add", TvSeriesController.addTvSeries);
router.put("/:TvSeriesId", TvSeriesController.updateTvSeries);
router.delete("/:TvSeriesId", TvSeriesController.deleteTvSeries);

module.exports = router;
