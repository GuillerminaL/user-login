import mongoose, { InferSchemaType, Schema } from 'mongoose';

const userSchema = new Schema({
  given_name: {
    type: String,
    required: true,
  },
  family_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  photoURL: {
    type: String,
    required: false,
  },
  accountId: {
    type: String,
    required: false,
  },
  provider: {
    type: String,
    required: false,
  },
  active: {
    type: Boolean,
    required: false,
    default: true,
  },
});

export type UserType = InferSchemaType<typeof userSchema>;

export default mongoose.model('User', userSchema);
