/**
* Node, TS, Apollo, Auth, - Starter
* https://github.com/eduard-kirilov/node-ts-apollo-auth-starter
* Copyright (c) 2020 Eduard Kirilov | MIT License
*/
import bcrypt from 'bcrypt';
// import crypto from 'crypto';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    createdAt: String,
    updatedAt: String,
    passwordResetToken: String,
    passwordResetExpires: Date,
    profile: {
      role: {
        type: String,
        required: true,
      },
      name: String,
      gender: String,
      location: String,
      website: String,
      picture: String,
    },
  },
  { timestamps: true },
);

// Password hash middleware.
userSchema.pre('save', function save(next) {
  const user: any = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

// Helper method for validating user's password.
userSchema.methods.comparePassword = function comparePassword(
  password: string,
  cb: any,
) {
  bcrypt.compare(password, this.password, (
    err: object,
    isMatch: boolean
  ) => {
    cb(err, isMatch);
  });
};

export const User = mongoose.model('User', userSchema);
