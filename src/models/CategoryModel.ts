import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: {type: String, required: true},
    icon: {type: String, required: true},
    created: {type: Date, default: Date.now}
});

export default mongoose.model('Category', CategorySchema);
