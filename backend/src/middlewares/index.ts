import express from 'express';
import {get, merge} from 'lodash';
import jwt, {JwtPayload} from 'jsonwebtoken';

import { getUserById } from '../db/users';

export interface CustomRequest extends express.Request {
    userId?: string; // Add the 'id' property here
  }
export const isAdmin = async (req: CustomRequest, res: express.Response, next: express.NextFunction) => {
    try {
        // Extract the Authorization header from the request
        const authorizationHeader = req.headers.authorization;
       // console.log(authorizationHeader)
        let token: string;

        if (authorizationHeader) {
            const tokenParts = authorizationHeader.split(' ');
            if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
                return res.status(403).json({ message: "Invalid authorization header format" });
            }
    
            token = tokenParts[1];
            
           // return res.status(403).json({ message: "No authorization header provided" });
        }else {
            token = req.cookies.token1;
        }

        if (!token) {
            return res.status(403).json({ message: "no sessionToken0" });
        }
        const decoded = jwt.verify(token, 'Mysecret')  as JwtPayload & {userId:string}
        if(!(decoded.userId === '65f79e312849bf24d1f419c8')){
            return res.status(403).json({message: "unauthorised"});
        }

        return next();

    } catch (error) {
        console.log(error)
        return res.status(400).json({message: "isAdmin Error"});
    }
}

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const token = req.cookies.token1;
        if(!token) {
            return res.status(403).json({message: "no token"});
        }
        const decoded = jwt.verify(token, 'Mysecret')  as JwtPayload & {userId:string}
        const id = decoded.userId;

        const existingUser = await getUserById(id);

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
