const { Schema, Types } = require('mongoose');
// Reaction (SCHEMA ONLY)
const reactionSchema = new Schema(
    {
    // reactionId
        // Use Mongoose's ObjectId data type
        // Default value is set to a new ObjectId
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
    // reactionBody
        // String
        // Required
        // 280 character maximum
        reactionBody: {
            type: String,
            required: true,
            maxLength: [280, 'Max 280 characters reached'],
        },
    // username
        // String
        // Required
        username: {
            type: String,
            requried: true,
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
    }
);

// Schema Settings:
// This will not be a model, but rather will be used as the reaction field's subdocument schema in the Thought model.

module.exports = reactionSchema;