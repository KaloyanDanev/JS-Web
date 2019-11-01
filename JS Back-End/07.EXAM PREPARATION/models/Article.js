const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const Schema = mongoose.Schema;
const Model = mongoose.model;
const { String, Number, Boolean, ObjectId, Date } = Schema.Types;

const articleSchema = new Schema({

    title: {
        type: String,
        required: true,
        unique: true
    },

    description: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        required: true
    },

    articleAuthor: {
        type: ObjectId,
        required: true
    }

});

module.exports = new Model('Article', articleSchema);