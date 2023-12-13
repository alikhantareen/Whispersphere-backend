import * as mongoose from 'mongoose';

export const BlogSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    category: String,
    image: String,
    athor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    comments: [String],
    likes: {
      type: Number,
      default: 0,
    },
    read_time: String,
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);
