import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is must'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is must'],
    trim: true,
    unique: true,
    validate: {
      //[validator.isEmail, 'Please provide a valid email']
      validator: (val) => validator.isEmail(val),
      message: 'Please provide a valid email'
    }
  },
  photo: {
    type: String,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is must'],
    trim: true,
    minlength: [8, 'Password must be at least 8 ']
  },
  confirmPassword: {
    type: String,
    required: [true, 'ConfirmPassword is must'],
    trim: true
  }
});
const User = mongoose.models('User', userSchema);

export default User;
