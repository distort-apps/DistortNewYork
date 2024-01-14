import mongoose from 'mongoose';

const showSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    genre: {
        type: String,
        required: false // Set to false if the field is not mandatory
    },
    location: {
        type: String,
        required: false // Set to false if the field is not mandatory
    },
    time: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: false // Set to false if the field is not mandatory
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    image: {
        type: String,
        required: false // Set to false if the field is not mandatory
    },
    excerpt: {
        type: String,
        required: false // Set to false if the field is not mandatory
    },
    rating: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

const Show = mongoose.models.Show || mongoose.model('Show', showSchema);

export default Show;