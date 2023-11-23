import connect from "../../../../utils/db";
import { NextResponse } from "next/server";
import Notes from "../../../../models/Notes";

export const GET = async (request, { params }) => {
  const { id } = params;
  await connect();
  try {
    const notes = await Notes.find({ user: id }).sort({ createdAt: -1 });
    return new NextResponse(JSON.stringify(notes), {
      status: 201,
    });
  } catch (err) {
    console.log(err);
    return new NextResponse("Database Error", { status: 500 });
  }
};
export const PUT = async (request, { params }) => {
  const { id } = params;
  await connect();
  const { notes } = await request.json();

  try {
    await Notes.updateOne({ _id: id }, { $set: { note: notes } });
    return new NextResponse("Notes Updated", {
      status: 201,
    });
  } catch (err) {
    console.log(err);
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  const { id } = params;
  await connect();

  try {
    await Notes.deleteOne({ _id: id });
    return new NextResponse("Notes Deleted", {
      status: 201,
    });
  } catch (err) {
    console.log(err);
    return new NextResponse("Database Error", { status: 500 });
  }
};
