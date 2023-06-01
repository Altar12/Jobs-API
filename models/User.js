const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        minLength: 3,
        maxLength: 30
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                'Please provide a valid email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minLength: 8
    }
});

UserSchema.pre('save', async function() {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
});

UserSchema.methods.createJWT = function() {
    // convert to number to be interpreted as seconds
    // providing string value (without any unit) is interpreted as milliseconds by default
    const expirtaionTime = Number(process.env.JWT_LIFETIME);
    const token = jwt.sign({ userID: this._id, name: this.name }, process.env.JWT_SECRET, { expiresIn: expirtaionTime });
    return token;
};

UserSchema.methods.isPassword = async function(suppliedPassword) {
    const result = await bcrypt.compare(suppliedPassword, this.password);
    return result;
};

module.exports = mongoose.model('User', UserSchema);