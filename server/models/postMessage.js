const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    make: String,
    model: String,
    year: String,
    mileage: String,
    vin: String,
    amountPaid: String,
    listingAmount: String,
    selectedFile: String,
    datePurchased: {
        type: Date,
        default: new Date(),
    },
    owner: String,
});

const PostMessage = mongoose.model('PostMessage', postSchema);

module.exports = { PostMessage }