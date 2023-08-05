import { Schema, model } from 'mongoose';

const User = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default model('User', User);
