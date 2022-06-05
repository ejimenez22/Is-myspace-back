const { Schema, model, Types } = require('mongoose')

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: 'Email address is required!',
            unique: true,
            match: '/.+\@.+\..+/'
        },
        thoughts: [],
        friends: []
    }
)

UserSchema.virtual('friendCount').get(function() {
    return this.friends.reduce((total, friends) => total + friends.length + 1, 0)
})

const User = model('User', UserSchema)

module.exports = User