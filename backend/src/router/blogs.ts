import express from 'express';

import { getAllBlogs, deleteBlog, updateBlog, create } from '../controllers/blogs';
import { isAuthenticated, isAdmin } from '../middlewares';

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
 */

export default (router: express.Router) => {
    router.get('/blogs', getAllBlogs);
    router.post('/blogs', isAdmin, create);
    router.delete('/blogs/:id', isAdmin, deleteBlog);
    router.patch('/blogs/:id',isAdmin, updateBlog);

};
