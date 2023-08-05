const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');
// Thought:
const thoughtSchema = new Schema(
    {
    // thoughtText
        // String
        // Required
        // Must be between 1 and 280 characters
        thoughtText: {
            type: String,
            required: true,
            minLength: [1, 'Thought must have at least 1 character'],
            maxLength: [280, 'Max 280 characters reached'],
        },
    // createdAt
        // Date
        // Set default value to the current timestamp
        // Use a getter method to format the timestamp on query
        createdAt: {
            type: Date,
            default: Date.now,
            get: (date) => {
                return date.toISOString().split("T")[0];
            },
        },
    // username (The user that created this thought)
        // String
        // Required
        username: {
            type: String,
            required: true,
        },
    // reactions (These are like replies)
        // Array of nested documents created with the reactionSchema
        reactions: [Reaction],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// Schema Settings:
    // Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
thoughtSchema.virtual('reactionCount')
    .get(function () {
        return this.reactions.length;
    });

const Thought = model('thought', thoughtSchema);

module.exports = Thought;