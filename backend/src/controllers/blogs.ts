
import express from 'express';
import cloudinary from '../helpers/index';


import {BlogModel, deleteBlogById, getBlogById, getBlogs, CommentModel, createBlog, getBlogByTitle, deleteLikeById } from '../db/blogs';

export const getAllBlogs = async (req: express.Request, res: express.Response) => {
    try {
        const blogs = await BlogModel.find({}).populate('likes.user comments.user');

        return res.status(200).json(blogs);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const getBlog = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({message: "no blog id"});
        }

        const blog = await BlogModel.findById(id).populate('likes.user comments.user');

        if (!blog) {
            return res.status(400).json({message: "No blog found"});
        }

        return res.status(200).json(blog);

    } catch (error) {
        console.log(error);
        return res.status(400).json({message: "getBlog Error"});
    }
};

export const deleteBlog = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;

        const deletedUser = await deleteBlogById(id);

        return res.json(deletedUser)

    } catch (error){
        console.log(error);
        return res.sendStatus(400);
    }
};

export const updateBlog = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const { body } = req.body;

        if (!body) {
            return res.sendStatus(400);
        }
        const blog = await getBlogById(id);

        blog.body = body;
        await blog.save();

        return res.status(200).json(body).end();

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
export const create = async (req: express.Request, res: express.Response) => {
    try {
/*         let image = null;
  
        if (req.file) {
          const result = await cloudinary.uploader.upload(req.file.path);
          image = result ? result.secure_url : null;
        }
   */
        const {title, body, image} = req.body;

        if (!title || !body){
            return res.status(400);
        }

        const existingBlog = await getBlogByTitle(title);

        if (existingBlog) {
            return res.sendStatus(400)
        }

        const blog = await createBlog({
            title,
            body,
            image
        });

        return res.status(200).json(blog).end();
    } catch (error) {
        console.log(error);
        return res.status(400).json({message: "failed to create blog"});
    }
}

export const likeBlog = async (req: express.Request, res: express.Response) => {
    try {
        const { id, userId } = req.params;

        const blog = await BlogModel.findById(id);

        if (!blog) {
            return res.status(404).json({message: "no blog"});
        }

        // Check if the user has already liked the blog
        const hasLiked = blog.likes.some((like) => like.user.toString() === userId);

        if (!hasLiked) {
            blog.likes.push({ user: userId });
            await blog.save();
        }

        return res.status(200).json(blog.likes);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const deleteLike = async (req: express.Request, res: express.Response) => {
    try {
        const { id, likeId, userId } = req.params;

        const blog = await BlogModel.findById(id);

        if (!blog) {
            return res.status(404).json({ message: "No blog found" });
        }

        // Check if the user has already liked the blog
        const hasLiked = blog.likes.some((like) => like._id.toString() === likeId && like.user.toString() === userId);

        if (!hasLiked) {
            return res.status(404).json({ message: "Like not found" });
        }
        const deletedLike = await deleteLikeById(likeId);

        // Filter out the like from the blog.likes array and cast the result
        delete blog.likes;

        await blog.save();

        // Delete the like from the database if needed
        

        return res.status(200).json({ message: "Like deleted successfully",  deletedLike});
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};


export const commentOnBlog = async (req: express.Request, res: express.Response) => {
    try {
        const { id, userId } = req.params;
        const { text } = req.body;

        if (!text || !userId) {
            return res.status(400).json({message: "no UserId or blog id"});
        }

        const blog = await BlogModel.findById(id);

        if (!blog) {
            return res.status(404).json({message: "no blog with that id"});
        }

        blog.comments.push({ user: userId, text });
        await blog.save();

        return res.status(200).json(blog.comments);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
export const getcommentOnBlog = async (req: express.Request, res: express.Response) => {
    try {
        const comments = await CommentModel.find({});

        return res.status(200).json(comments);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

