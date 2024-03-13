import express from 'express';
import {get, merge} from 'lodash';

import { getUserBySessionToken, getUserById } from '../db/users';


export const isAdmin = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const sessionToken = req.cookies['AD-AUTH'];

        if(!sessionToken) {
            return res.sendStatus(403);
        }

        const existingUser = await getUserBySessionToken(sessionToken);
        const admin = await getUserById("65e54669ef073ff3e093a2b2");

        if (!existingUser) {
            return res.status(403).json({message: "user"}).end();
        }

        if (!(existingUser._id.toString() === admin._id.toString())) {
            return res.status(403).json({message: "false"}).end();
        }

        merge(req, {identity: existingUser});

        return next();

    } catch (error) {
        console.log(error)
        return res.status(400).json({message: "isAdmin Error"});
    }
}

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const sessionToken = req.cookies['AD-AUTH'];

        if(!sessionToken) {
            return res.sendStatus(403);
        }

        const existingUser = await getUserBySessionToken(sessionToken);

        if (!existingUser) {
            return res.status(403).json({message: "falseAuth"});
        }

        merge(req, {identity: existingUser});

        return next();

    } catch (error) {
        console.log(error)
        return res.status(400).json({message: "isAuthenticated Error"});
    }
}

export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { userId } = req.params;
        const currentUserId = get(req, 'identity._id') as string;

        if (!currentUserId) {
            return res.status(403).json({message: "noId"});
        }

        if (currentUserId.toString() !== userId) {
            return res.status(403).json({message: "falseOwner"});
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(400).json({message: "isOwner Error"});
    }
};
