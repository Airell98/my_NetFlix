const db = require('../config/config')
const { ObjectId } = require("mongodb")

const collectionName = process.env.COLLECTION_NAME || 'Movies'
const TvSeries = db.collection(collectionName)

class TvSeriesModel {
    static findAll() {
        return TvSeries.find({}).toArray()
    }

    static findTvSeries(TvSeriesId) {
        return TvSeries.findOne({ _id: ObjectId(TvSeriesId) })
    }

    static addTvSeries(newTvSeries) {
        return TvSeries.insertOne(newTvSeries)
    }

    static deleteTvSeries(TvSeriesId) {
        return TvSeries.deleteOne({ _id: ObjectId(TvSeriesId) })
    }

    static updateTvSeries(TvSeriesId, data) {
        return TvSeries.findOneAndUpdate({ _id: ObjectId(TvSeriesId) }, { $set: data })
    }
}

module.exports = TvSeriesModel 