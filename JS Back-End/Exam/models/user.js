const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: [4, 'Username should be at least 4 characters long and should consist only english letters and digits'],

    },
    password: {
        type: String,
        required: true,
        minlength: [8, 'Password should be at least 8 characters long']
    },

    amount: {
        type: Number,
        required: true,
        minValue: [0, 'The amount should be positive number']
    },

    createdArticles: [{
        type: Schema.Types.ObjectId,
        ref: 'Article'
    }],

    expenses: {
        type: [],
    },

    creator: [{
        type: Schema.Types.ObjectId,
        ref: 'Expense'
    }],
});


userSchema.methods = {
    matchPassword: function (password) {
        return bcrypt.compare(password, this.password)
    }
};

userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if (err) {
                next(err);
                return;
            }

            bcrypt.hash(this.password, salt, (err, hash) => {
                if (err) {
                    next(err);
                    return;
                }

                this.password = hash;
                next();
            })
        });

        return;
    }

    next();
});

module.exports = model('User', userSchema);