import express from 'express';

import { getAllUsers, deleteUser, updateUser, getUser } from '../controllers/users';
import { isAdmin, isAuthenticated, isOwner } from '../middlewares';

/**
 *  @openapi
 * tags:
 *   name: Users
 *   description: The Users managing API 
 * /users:
 *   get:
 *     summary: Lists all the users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: All users who signed up
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       403:
 *         description: Admin privileges needed
 * /users/{id}:
 *   get:
 *     summary: Get a user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The user as a response by id
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/User'
 *       403:
 *         description: Admin Privileges needed or The user was not found
 *   patch:
 *     summary: Update a user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was updated
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/User'
 *       403:
 *         description: Admin Privileges needed or The user was not found
 *   delete:
 *     summary: Remove a user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The user has been removed
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/User'
 *       403:
 *         description: Admin Privileges needed or The user was not found
 */

export default (router: express.Router) => {

    router.get('/users', isAdmin, getAllUsers);
    router.get('/users/:userId', isAdmin, getUser);
    router.delete('/users/:userId', isAuthenticated, isOwner, deleteUser);
    router.patch('/users/:userId', isAuthenticated, isOwner, updateUser);
};
