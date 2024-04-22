import mongoose, { Schema } from 'mongoose';

const refreshTokenSchema = new Schema({
  refreshToken: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
});

export default mongoose.model('RefreshToken', refreshTokenSchema);
