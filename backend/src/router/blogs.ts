import express from 'express';

import { getAllBlogs,getBlog, deleteBlog, updateBlog, create, likeBlog, commentOnBlog, deleteLike, getcommentOnBlog } from '../controllers/blogs';
import { isAuthenticated, isAdmin, isOwner } from '../middlewares/index';
import upload from '../middlewares/multer';

/**
 *  @openapi
 * tags:
 *   name: Blogs
 *   description: The Blogs managing API 
 * /blogs:
 *   get:
 *     summary: Lists all the blogs
 *     tags: [Blogs]
 *     responses:
 *       200:
 *         description: All blogs that were posted
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Blog'
 *       403:
 *         description: Admin privileges needed
 *   post:
 *     summary: Creates a blog
 *     tags: [Blogs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Blog'
 *     responses:
 *       200:
 *         description: The created Blog
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Blog'
 *       403:
 *         description: Admin privileges needed
 * /blogs/{id}:
 *   get:
 *     summary: Get a blog by id
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The blog id
 *     responses:
 *       200:
 *         description: The blog as a response by id
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Blog'
 *       403:
 *         description: Admin Privileges needed or The blog was not found
 *   patch:
 *     summary: Update a blog by id
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Blog id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Blog'
 *     responses:
 *       200:
 *         description: The blog was updated
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Blog'
 *       403:
 *         description: Admin Privileges needed or The blog was not found
 *   delete:
 *     summary: Remove a blog by id
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The blog id
 *     responses:
 *       200:
 *         description: The blog has been removed
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Blog'
 *       403:
 *         description: Admin Privileges needed or The blog was not found
 * /blogs/{id}/like/{userId}:
 *   post:
 *     summary: Creates a like
 *     tags: [Likes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: blog id
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: user id
 *     responses:
 *       200:
 *         description: The User liked the blog
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Likes'
 *       403:
 *         description: Admin privileges needed
 * /blogs/{id}/like/{userId}/{likeId}:
 *   delete:
 *     summary: Remove a like
 *     tags: [Likes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The blog id
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *       - in: path
 *         name: likeId
 *         schema:
 *           type: string
 *         required: true
 *         description: The like id
 *     responses:
 *       200:
 *         description: The like on the blog has been removed
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Likes'
 *       403:
 *         description: The blog or user was not found
 * /blogs/{id}/comment/{userId}:
 *   post:
 *     summary: Creates a comment
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: blog id
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: user id
 *     responses:
 *       200:
 *         description: The User created comment on the blog
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comments'
 *       403:
 *         description: user or blog not found
 */

export default (router: express.Router) => {
    router.get('/blogs', getAllBlogs);
    router.get('/blogs/:id', getBlog);
    router.post('/blogs', isAdmin, create);
    router.delete('/blogs/:id', isAdmin, deleteBlog);
    router.patch('/blogs/:id',isAdmin, updateBlog);
    router.post('/blogs/:id/like/:userId', isAuthenticated, isOwner, likeBlog);
    router.delete('/blogs/:id/like/:userId/:likeId', isAuthenticated, isOwner, deleteLike);
    router.get('/blogs/:id/comment',getcommentOnBlog);
    router.post('/blogs/:id/comment/:userId',isAuthenticated,isOwner, commentOnBlog);

};
