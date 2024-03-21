
import express from 'express';
import {cloudinary } from '../helpers/index';


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
        const { title, body } = req.body;
        const { id } = req.params;
        let image = null;

        // If a file is uploaded, upload it to cloudinary
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            console.log('Cloudinary upload result:', result); 
            image = result ? result.secure_url : null;
        }

        // Fetch the blog post by ID
        let blog = await getBlogById(id);
        console.log(blog)
        if (!blog) {
            return res.status(404).json({ error: 'Blog post not found' });
        }

        // Update the blog post with new data
        blog.image = image || blog.image; // If image is not uploaded, keep the existing image
        blog.body = body || blog.body; // If body is not provided, keep the existing body
        blog.title = title || blog.title; // If title is not provided, keep the existing title

        // Save the updated blog post
        blog = await blog.save();

        // Send response indicating success
        return res.status(200).json({ blog, message: 'Blog updated!' });
    } catch (err) {
        console.error('Error updating blog:', err);
        return res.status(500).json({ message: 'Failed to update blog' });
    }
};

export const create = async (req: express.Request, res: express.Response) => {
    try {
        let img = null;
  
        if (req.file) {
          const result = await cloudinary.uploader.upload(req.file.path);
          img = result ? result.secure_url : null;
        }

        console.log("Received request to create blog:", req.body);
       const {title, body} = req.body;

       if (!title || !body){
        console.log("Invalid request body:", req.body);
           return res.status(400);
       }

       const existingBlog = await getBlogByTitle(title);

        if (existingBlog) {
            console.log("Blog with title already exists:", title);
            return res.status(400).json({message: "Blog with same title already exists"});
        
        }
  
        console.log("Image uploaded successfully:", img);
        const blog = await createBlog({
            title,
            body,
            image: img
        });
        console.log("Blog created successfully:", blog);

        return res.status(200).json(blog).end();

    } catch (error) {
        console.error("Error occurred while creating blog:", error);
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

