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
        required: false 
    },
    location: {
        type: String,
        required: false 
    },
    time: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: false 
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    image: {
        type: String,
        required: false
    },
    excerpt: {
        type: String,
        required: false
    },
    rating: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

const Show = mongoose.models.Show || mongoose.model('Show', showSchema);

export default Show;