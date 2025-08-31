import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  tittle: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
  type: String,
  enum: ["pending", "completed", "in-progress"],
  default: "pending"
},

});

export default mongoose.model('Task', taskSchema);
