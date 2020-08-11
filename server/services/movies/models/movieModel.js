const db = require('../config/config')
const { ObjectId } = require("mongodb")

const collectionName = process.env.COLLECTION_NAME || 'Movies'
const Movie = db.collection(collectionName)

class movieModel {
    static findAll() {
        return Movie.find({}).toArray()
    }

    static findMovie(movieId) {
        return Movie.findOne({ _id: ObjectId(movieId) })
    }

    static addMovie(newMovie) {
        return Movie.insertOne(newMovie)
    }

    static deleteMovie(movieId) {
        return Movie.deleteOne({ _id: ObjectId(movieId) })
    }

    static updateMovie(movieId, data) {
        return Movie.findOneAndUpdate({ _id: ObjectId(movieId) }, { $set: data })
    }
}

module.exports = movieModel 