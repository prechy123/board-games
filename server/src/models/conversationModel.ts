import mongoose from "mongoose";
const Schema = mongoose.Schema;

const conversationSchema = new Schema(
  {
    members: [
      {
        type: Schema.Types.ObjectId,
      },
    ],
    messages: [
      {
        author: Schema.Types.ObjectId,
        body: String,
        time: new Date(),
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Conversation = mongoose.model("Conversation", conversationSchema);
export default Conversation;
