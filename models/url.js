// Importing Mongoose
const mongoose = require('mongoose');

// Defining the URL Schema
const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true,
    },
    redirectUrl: {
        type: String,
        required: true,
    },
    visitHistory: [
        {
            timestamps: { type: Number },  // Storing visit timestamp
        },
    ],
    expires_at: {
        type: Date,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
},
{
    timestamps: true,  // Automatically adds createdAt and updatedAt fields
});

// Creating the Model
const URL = mongoose.model('url', urlSchema);

// Exporting the Model
module.exports = URL;
