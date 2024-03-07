import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
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

export const getBlogs = () => BlogModel.find({})
export const getBlogByTitle = (title: string) => BlogModel.findOne({ title });
export const getBlogBySessionToken = (sessionToken: string) => BlogModel.findOne({
    'authentication.sessionToken': sessionToken,
});
export const getBlogById = (id: string) => BlogModel.findById(id);
export const createBlog = (values: Record<string, any>) => new BlogModel(values).save().then((blog) => blog.toObject);
export const deleteBlogById = (id: string) => BlogModel.findOneAndDelete({_id: id});
export const updateBlogById = (id: string, values: Record<string, any>) => BlogModel.findByIdAndUpdate(id, values);
