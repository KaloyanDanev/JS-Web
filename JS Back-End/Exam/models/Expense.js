const { Schema, model } = require('mongoose');

const expenseSchema = new Schema({
    merchant: {
        type: String,
        required: true,
        minlength: [4 , 'Merchant should be at least 4 characters long']
    },

    date: {
        type: Date,
        default: Date.now
    },

    total:{
        type: Number,
        required: true,
        minValue: [0, 'The amount should be positive number']
    },

    category:{
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true,
        minlength: [10, 'Description should be at least 10 characters'],
        maxlength: [50, 'Description max characters is reached 50'],
    },

    report:{
        type: Boolean,
        required: true,
        default: false
    },

    userCreate: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

});

module.exports = model('Expense', expenseSchema);