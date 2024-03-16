import express from 'express';

import { getAllMessages, newMessage } from '../controllers/messages';
import { isAdmin } from '../middlewares';

/**
 *  @openapi
 * tags:
 *   name: Messages
 *   description: The Messages managing API 
 * /messages:
 *   get:
 *     summary: Lists all the messages sent
 *     tags: [Messages]
 *     parameters:
 *       - in: querry
 *         name: id
 *         schema:
 *           type: string
 *         description: get messages sent by a specified user with the id passed
 *     responses:
 *       200:
 *         description: All messages that have been sent
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Message'
 *       403:
 *         description: Admin privileges needed
 *   post:
 *     summary: Creates a message
 *     tags: [Messages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Message'
 *     responses:
 *       200:
 *         description: The created Message
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Message'
 *       403:
 *         description: Something went wrong
 */

export default (router: express.Router) => {

    router.get('/messages', isAdmin, getAllMessages);
    router.post('/messages', newMessage);
};
