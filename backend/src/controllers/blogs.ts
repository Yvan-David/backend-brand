import express from 'express';

import { deleteBlogById, getBlogById, getBlogs, createBlog, getBlogByTitle } from '../db/blogs';

export const getAllBlogs = async (req: express.Request, res: express.Response) => {
    try {
        const users = await getBlogs();

        return res.status(200).json(users);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
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
        const {title, body, createdAt} = req.body;

        if (!title || !body){
            return res.sendStatus(400);
        }

        const existingBlog = await getBlogByTitle(title);

        if (existingBlog) {
            return res.sendStatus(400)
        }

        const blog = await createBlog({
            title,
            body
        });

        return res.status(200).json(blog).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}
