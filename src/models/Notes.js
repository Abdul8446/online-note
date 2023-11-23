import mongoose from "mongoose";

const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const notesSchema = new Schema(
  {
    note: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Notes || mongoose.model("Notes", notesSchema);
