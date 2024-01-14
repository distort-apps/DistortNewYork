import mongoose from 'mongoose';

const cantactSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: false
    },
    date: {
        type: String,
        required: false
    },
    genre: {
        type: String,
        required: false // Set to false if the field is not mandatory
    },
    time: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: false // Set to false if the field is not mandatory
    },
    excerpt: {
        type: String,
        required: false // Set to false if the field is not mandatory
    },
    imageUrl: {
        type: String,
        required: false // Set to false if the field is not mandatory
    }
}, { timestamps: true });

const Contact = mongoose.models.Contact || mongoose.model('Contact', cantactSchema);

export default Contact;