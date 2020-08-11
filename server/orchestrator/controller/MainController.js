const axios = require("axios");
const MOVIE_URL = process.env.MOVIES_SERVICES_PATH || "http://localhost:3001/movies";
const TV_SERIES = process.env.TV_SERIES_SERVICES_PATH || "http://localhost:3002/tv";
const Redis = require("ioredis");
const redis = new Redis();

class MainController {

    // static findAll(req, res){   
    //     // res.status(200).json('oke dapat')
    //     axios.get('http://localhost:3001/movies')
    //     .then(response => { 
    //         console.log(response)
    //         res.status(200).json(response.data )
    //      })
    //     .catch(err => { 
    //         res.status(500).json({ inierror: err }) 
    //     })
    // }

    static async findAll(req, res) {
        try {
            const movies = await axios.get(MOVIE_URL);

            const tvSeries = await axios.get(TV_SERIES);
            return Promise.all([movies, tvSeries])
                .then(async (data) => {
                    const cacheData = await redis.get("entertainMe");
                    if (cacheData) {
                        res.status(200).json(JSON.parse(cacheData));
                    } else {
                        let allData = {};
                        for (let i = 0; i < data.length; i++) {
                            if (data[i].request.res.responseUrl == MOVIE_URL) {
                                allData.movies = data[i].data;
                            } else if (data[i].request.res.responseUrl == TV_SERIES) {
                                allData.tvSeries = data[i].data;
                            }
                        }
                        await redis.set("entertainMe", JSON.stringify(allData));
                        res.status(200).json(allData);
                    }
                })
                .catch((err) => {
                    console.log(err);
                    res.status(404).json(err);
                });

        } catch (err) {
            //   console.log(err);
            res.status(404).json(err);
        }
    }

    static async addMovie(req, res) {
      console.log('masuk ADDD controller')
        const { title, tags, overview, popularity, poster_path } = req.body;
        try {
            //add one movie
            const addOneMovie = await axios({
                url: `${MOVIE_URL}/add`,
                method: "POST",
                data: {
                    title,
                    tags,
                    overview,
                    popularity,
                    poster_path,
                },
            });
            // console.log(addOneMovie.data);
            let getData = await redis.get("entertainMe");
            if (getData) {
                await redis.del("entertainMe");
            } else {
                return res.status(201).json({
                    movie: addOneMovie.data,
                });
            }

        } catch (err) {
            //   console.log(err);
            return res.status(400).json(err);
        }
    }

    static async addTvSeries(req, res) {
        const { title, tags, overview, popularity, poster_path } = req.body;
        try {
            //add one tv series
            const addOneTvSeries = await axios({
                url: `${TV_SERIES}/add`,
                method: "POST",
                data: {
                    title,
                    tags,
                    overview,
                    popularity,
                    poster_path,
                },
            });
            // console.log(addOneTvSeries.data);
            let getData = await redis.get("entertainMe");
            if (getData) {
                await redis.del("entertainMe");
            } else {
                return res.status(201).json({
                    Tv_Series: addOneTvSeries.data,
                });
            }

        } catch (err) {
            //   console.log(err);
            return res.status(400).json(err);
        }
    }

}

module.exports = MainController;
