import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    body: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

});

export const MessageModel = mongoose.model('Message', MessageSchema);

export const getMessages = () => MessageModel.find({})
export const getMessagesByEmail = (email: string) => MessageModel.find({ email });
export const createMessage = (values: Record<string, any>) => new MessageModel(values).save().then((message) => message.toObject);
export const getMessageById = (id: string) => MessageModel.findById(id);
