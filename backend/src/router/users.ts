import express from 'express';

import { getAllUsers, deleteUser, updateUser } from '../controllers/users';
import { isAuthenticated, isOwner } from '../middlewares';

export default (router: express.Router) => {
    /**
     * @openapi
     * /users:
     *  get:
     *  tags:
     *  - users
     *  description: get all users
     *  responses:
     *  200: App is up and running
     */
    router.get('/users', isAuthenticated, getAllUsers);
    router.delete('/users/:userId', isAuthenticated, isOwner, deleteUser);
    router.patch('/users/:userId', isAuthenticated, isOwner, updateUser);
};
