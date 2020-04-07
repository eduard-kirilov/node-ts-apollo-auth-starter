/**
 * Node, Mongo, GraphQL - Starter Kit
 * https://github.com/eduard-kirilov/Online-store-5-api-products
 * Copyright (c) 2020 Eduard Kirilov | MIT License
 */

import bcrypt from 'bcrypt';
import crypto from 'crypto';
import mongoose from 'mongoose';
import { IUser } from '../utils/interface';

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
    passwordResetToken: String,
    passwordResetExpires: Date,
    profile: {
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
  const user: IUser = this;
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
