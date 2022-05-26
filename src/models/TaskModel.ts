import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    name: { type: String, required: true, /*unique: true,*/ },
    repeatble: {type: Boolean, required: true},
    positive: {type: Boolean, required: true, default: false},
    start_date: {type: Date, required: true},
    created: {type: Date, default: Date.now},
    category_id: {type: Schema.Types.ObjectId, ref: "Category"}

});


export default mongoose.model('Task', TaskSchema);