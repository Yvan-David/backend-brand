import express from 'express';
import bcrypt from 'bcrypt';
import { getUserByEmail, createUser, getUserById } from '../db/users';
import jwt from 'jsonwebtoken';
export const login = async (req: express.Request, res: express.Response) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        if (!email || !password) {
            return res.sendStatus(400);
        }

        const user = await getUserByEmail(email);

        if (!user) {
            return res.status(400).json({message: "problem with getting the user"});
        }
        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword){
            return res.status(403).json({message: "invalid email or password"});
        }

        const token = jwt.sign({userId: user._id}, 'Mysecret');
        res.cookie('token1', token, {httpOnly: true});
        await user.save();
        res.status(201)
        .header('Authorization', `Bearer ${token}`)
        .send({ message: 'User created successfully', token, user });

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const register = async (req: express.Request, res: express.Response) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const username = req.body.username;

        if (!email || !password || !username){
            return res.sendStatus(400);
        }

        const existingUser = await getUserByEmail(email);

        if (existingUser) {
            return res.sendStatus(400)
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await createUser({
            email,
            username,
            password: hashedPassword,
        });


        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}
