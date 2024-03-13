import express from 'express';

import { getMessages, getMessagesByEmail, getMessageById, createMessage } from '../db/messages';

export const getAllMessages = async (req: express.Request, res: express.Response) => {
try {
        const { id, email } = req.query;

        if (id && typeof(id) === "string") {
            // If an ID is provided, get a specific message by ID
            const message = await getMessageById(id);

            if (!message) {
                return res.status(404).json({ message: "Message not found" });
            }

            return res.status(200).json(message);
        } else if (email && typeof(email) === "string") {
            // If an email is provided, get messages by email
            const messagesByEmail = await getMessagesByEmail(email);

            return res.status(200).json(messagesByEmail);
        } else {
            // If no ID or email is provided, get all messages
            const messages = await getMessages();

            return res.status(200).json(messages);
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Error processing the request" });
    }
};

export const newMessage = async (req: express.Request, res: express.Response) => {
    try {
        const {name, email, body} = req.body;

        if (!name || !body){
            return res.status(400).json({message: "name or body no provided"});
        }

        const message = await createMessage({
            name,
            email,
            body
        });

        return res.status(200).json(message).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}
