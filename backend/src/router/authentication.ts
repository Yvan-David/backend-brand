import express from "express";
import path from "path";

import {login, register } from "../controllers/authentication";

/**
 *  @openapi
 * tags:
 *   name: Auth
 *   description: The authentication managing API 
 * /signup:
 *   post:
 *     summary: Creates a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The created User
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       403:
 *         description: User exits
 * /login:
 *   post:
 *     summary: User logs in
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The User logged in succesfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       403:
 *         description: invalid email or password
 */

export default (router: express.Router) => {
    router.get('/', async (req: express.Request, res: express.Response) => {
        try {
            res.status(200).json({message: "server backend is running"});
        } catch(error){
            res.status(400).json({message: error});
        }
    });
    router.post('/signup', register);
    router.post('/login', login);

};
