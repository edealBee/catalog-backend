import { Schema, model } from 'mongoose';

const Post = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    text: {
      type: String,
      required: true,
    },
    imageUrl: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    category: {
      type: String,
      default: 'Всё',
    },
  },
  {
    timestamps: true,
  },
);

export default model('Post', Post);
