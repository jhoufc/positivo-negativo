import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    name: { type: String, required: true, /*unique: true,*/ },
    repeatble: {type: Boolean, required: true},
    category_id: {type: String, required: true},
    positive: {type: Boolean, required: true, default: false},
    created: {type: Date, default: Date.now}
});


export default mongoose.model('Task', TaskSchema);