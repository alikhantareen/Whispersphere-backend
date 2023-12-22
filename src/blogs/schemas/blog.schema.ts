import * as mongoose from 'mongoose';

export const BlogSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    category: String,
    image: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    comments: [
      {
        user: String,
        content: String,
        createdAt: Date,
      },
    ],
    likes: [String],
    read_time: String,
    views: [String],
  },
  {
    timestamps: true,
  },
);
