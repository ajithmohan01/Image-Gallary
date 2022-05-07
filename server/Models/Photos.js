const mongoose = require("mongoose")

const PhotosModel = mongoose.model("Photos", {
    image: {
        type: String,
        require:true
    },

    date: {
        type: Date,
        require:true
    }
})

module.exports = PhotosModel