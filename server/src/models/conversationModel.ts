import mongoose, { Schema } from "mongoose";

export interface IConversation extends Document {
  members: Schema.Types.ObjectId[];
  messages: [author: Schema.Types.ObjectId, body: String, time: Date];
}

const conversationSchema = new Schema<IConversation>(
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
