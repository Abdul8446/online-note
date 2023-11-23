import connect from "../../../utils/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import User from "../../../models/User";

export const POST = async (request) => {
  const { email, password } = await request.json();
  await connect();

  const user = await User.findOne({ email: email }).select({
    _id: 1,
    email: 1,
    password: 1,
    name: 1,
  });
  if (user) {
    const validPassword = await bcrypt.compare(password, user.password);
    if (validPassword) {
      const userObject = user.toObject();
      userObject.Logged = true;
      delete userObject.password;
      return new NextResponse(JSON.stringify(userObject), {
        status: 201,
      });
    } else {
      return new NextResponse("Invalid Password", {
        status: 400,
      });
    }
  }
  return new NextResponse("User Not Found", {
    status: 404,
  });
};
