import { User } from '@/models';
import HttpError from '@/utils/HttpError';
import HttpResponse from '@/utils/HttpResponse';
import catchAsync from '@/utils/catchAsync';

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

  const user = await User.create({
    username,
    email,
    password,
  });

  const createdUser = await User.findOne({ _id: user._id }).select('-password');

  return res.json(
    new HttpResponse(201, {
      message: 'User registered successfully!',
      user: createdUser,
      success: true,
    }),
  );
});
