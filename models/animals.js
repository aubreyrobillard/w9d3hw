const mongoose = require('./connection');

const animalSchema = new mongoose.Schema ({
    species: String,
    extinct: Boolean,
    location: String,
    lifeExpectancy: Number
});

const AnimalModel = mongoose.model('animal', animalSchema);

module.exports = AnimalModel;

