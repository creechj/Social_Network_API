const { Schema, model } = require('mongoose');
// User:
const userSchema = new Schema(
    {
    // username
        // String
        // Unique
        // Required
        // Trimmed
        
        username: { 
            type: String,
            unique: true,
            required: true,
            trim: true
        },
    // email
        // String
        // Required
        // Unique
        // Must match a valid email address (look into Mongoose's matching validation)
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+\@.+\..+/, 'Not a valid email address'],
        },
    // thoughts
        // Array of _id values referencing the Thought model
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],
    // friends
        // Array of _id values referencing the User model (self-reference)
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            }
        ],
    },
    // Schema Settings:
        // Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// Schema Settings:
        // Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
userSchema.virtual('friendCount')
    .get(function () {
        return this.friends.length;
    });

const User = model('user', userSchema);

module.exports = User;