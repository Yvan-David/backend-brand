import { getAllUsers, deleteUser, updateUser } from '../controllers/users';
import { Request, Response } from 'express';
import { getUsers, deleteUserById, getUserById } from '../db/users';

// Mock the users module
jest.mock('../db/users', () => ({
    getUsers: jest.fn(),
    deleteUserById: jest.fn(),
    getUserById: jest.fn(),
}));

describe('Express Routes', () => {
    describe('getAllUsers', () => {
        it('should get all users', async () => {
            const req = {} as Request;
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
                sendStatus: jest.fn(),
            } as Partial<Response<any, Record<string, any>>> as any;

            (getUsers as jest.Mock).mockResolvedValue(['user1', 'user2']);

            await getAllUsers(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(['user1', 'user2']);
        });

        it('should handle error when getting users', async () => {
            const req = {} as Request;
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
                sendStatus: jest.fn(),
            } as Partial<Response<any, Record<string, any>>> as any;

            (getUsers as jest.Mock).mockRejectedValue(new Error('Database error'));

            await getAllUsers(req, res);

            expect(res.sendStatus).toHaveBeenCalledWith(400);
        });
    });

    describe('deleteUser', () => {
        it('should delete a user', async () => {
            const req = {} as Request;
            const res = {
                json: jest.fn(),
                sendStatus: jest.fn(),
            } as Partial<Response<any, Record<string, any>>> as any;

            (deleteUserById as jest.Mock).mockResolvedValue({ id: 'userId', username: 'user1' });

            await deleteUser(req, res);

            expect(res.json).toHaveBeenCalledWith({ id: 'userId', username: 'user1' });
        });

        it('should handle error when deleting a user', async () => {
            const req = {} as Request;
            const res = {
                json: jest.fn(),
                sendStatus: jest.fn(),
            } as Partial<Response<any, Record<string, any>>> as any;

            (deleteUserById as jest.Mock).mockRejectedValue(new Error('Database error'));

            await deleteUser(req, res);

            expect(res.sendStatus).toHaveBeenCalledWith(400);
        });
    });

    describe('updateUser', () => {
        it('should update a user', async () => {
            const req = {} as Request;
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
                sendStatus: jest.fn(),
            } as Partial<Response<any, Record<string, any>>> as any;

            (getUserById as jest.Mock).mockResolvedValue({ id: 'userId', username: 'user1', save: jest.fn() });

            await updateUser(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ id: 'userId', username: 'newUsername' });
        });

        it('should handle error when updating a user', async () => {
            const req = {} as Request;
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
                sendStatus: jest.fn(),
            } as Partial<Response<any, Record<string, any>>> as any;

            (getUserById as jest.Mock).mockRejectedValue(new Error('Database error'));

            await updateUser(req, res);

            expect(res.sendStatus).toHaveBeenCalledWith(400);
        });
    });

});
