import { User } from '@/models';
import HttpError from '@/utils/HttpError';
import HttpResponse from '@/utils/HttpResponse';
import catchAsync from '@/utils/catchAsync';
import bcrypt from 'bcryptjs';

export const validateUsername = catchAsync(async (req, res) => {
  const { username } = req.body;
  const user = await User.findOne({ username });

  if (!username) {
    throw new HttpError(400, 'Username is required!');
  }

  if (user) {
    throw new HttpError(400, 'Username already taken!');
  }

  return res.json(
    new HttpResponse(200, {
      message: 'Username is available',
      success: true,
    }),
  );
});

export const validateEmail = catchAsync(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new HttpError(400, 'Email is required!');
  }

  const user = await User.findOne({ email });

  if (user) {
    throw new HttpError(400, 'Email already taken!');
  }

  return res.json(
    new HttpResponse(200, {
      message: 'Email is available',
      success: true,
    }),
  );
});

export const registerUser = catchAsync(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    throw new HttpError(400, 'All fields are required!');
  }

  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existingUser) {
    throw new HttpError(400, 'User with email or username already exists!');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  const createdUser = await User.findOne({ _id: user._id }).select('-password');

  // TODO: Send email verification link to user email

  return res.json(
    new HttpResponse(201, {
      message: 'User registered successfully!',
      user: createdUser,
      success: true,
    }),
  );
});

export const loginUser = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new HttpError(400, 'Email and password are required!');
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new HttpError(404, 'User not found!');
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new HttpError(400, 'Invalid email or password!');
  }

  return res;
});
