const mongoose = require('mongoose');

const statusSchema = new mongoose.Schema({
    name: { type: String, required: true, minLength: 3, maxLength: 20 }
});

// Export model
module.exports = mongoose.model('Status', statusSchema);
