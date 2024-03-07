import express from 'express';

import { getAllBlogs, deleteBlog, updateBlog, create } from '../controllers/blogs';
import { isAuthenticated, isAdmin } from '../middlewares';

export default (router: express.Router) => {
    router.get('/blogs', getAllBlogs);
    router.post('/blogs', isAdmin, create);
    router.delete('/blogs/:id', isAdmin, deleteBlog);
    router.patch('/blogs/:id',isAdmin, updateBlog);

};
