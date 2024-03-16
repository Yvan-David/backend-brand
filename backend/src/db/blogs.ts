import mongoose from "mongoose";
import {UserModel} from "./users"

const CommentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: UserModel,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const LikeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: UserModel,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    likes: [LikeSchema],
    comments: [CommentSchema],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },

});

export const BlogModel = mongoose.model('Blog', BlogSchema);
export const LikeModel = mongoose.model('Like', BlogSchema);
export const CommentModel = mongoose.model('Comment', BlogSchema);

export const getBlogs = () => BlogModel.find({})
export const getBlogByTitle = (title: string) => BlogModel.findOne({ title });
export const getBlogBySessionToken = (sessionToken: string) => BlogModel.findOne({
    'authentication.sessionToken': sessionToken,
});
export const getBlogById = (id: string) => BlogModel.findById(id);
export const createBlog = (values: Record<string, any>) => new BlogModel(values).save().then((blog) => blog.toObject);
export const deleteBlogById = (id: string) => BlogModel.findOneAndDelete({_id: id});
export const deleteLikeById = (id: string) => LikeModel.findOneAndDelete({_id: id});
export const updateBlogById = (id: string, values: Record<string, any>) => BlogModel.findByIdAndUpdate(id, values);
