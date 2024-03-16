import express from 'express';

import authentication from './authentication';
import users from './users';
import blogs from './blogs';
import messages from './messages';

/**
 * @openapi
 * components:
 *   schemas:
 *     Blog:
 *       type: object
 *       required:
 *         - title
 *         - body
 *       properties:
 *         title:
 *           type: string
 *           description: The title of your blog
 *         body:
 *           type: string
 *           description: the body or content of your blog
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: The user username
 *         email:
 *           type: string
 *           description: the email address of the user
 *         password:
 *           type: string
 *           description: a password to authenticate
 *     Message:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - body
 *       properties:
 *         name:
 *           type: string
 *           description: The sendr name
 *         email:
 *           type: string
 *           description: the email address of the sender
 *         body:
 *           type: string
 *           description: the message content
 *     Comments:
 *       type: object
 *       required:
 *         - user
 *         - text
 *       properties:
 *         user:
 *           type: object
 *           description: The user objectId
 *         text:
 *           type: string
 *           description: the comments content
 *     Likes:
 *       type: object
 *       required:
 *         - user
 *       properties:
 *         user:
 *           type: object
 *           description: The user objectId
 */


const router = express.Router();

export default (): express.Router => {
    authentication(router);
    users(router);
    blogs(router);
    messages(router);

    return router;
};
