import connect from "../../../utils/db";
import { NextResponse } from "next/server";
import Notes from "../../../models/Notes";

export const POST = async (request) => {
  const { user, note } = await request.json();
  await connect();

  try {
    await Notes.create({
      note,
      user,
    });
    return new NextResponse("Note has been created", {
      status: 201,
    });
  } catch (err) {
    console.log(err);
    return new NextResponse("Database Error", { status: 500 });
  }
};
