import connect from "../../../utils/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import User from "../../../models/User";

export const POST = async (request) => {
  const { name, email, password } = await request.json();
  await connect();

  const user = await User.findOne({ email: email });
  if (user) {
    return new NextResponse("user already exists", {
      status: 500,
    });
  }

  const hashedPassword = await bcrypt.hash(password, 5);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    return new NextResponse("User has been created", {
      status: 201,
    });
  } catch (err) {
    console.log(err);
    return new NextResponse(err.message, {
      status: 500,
    });
  }
};
