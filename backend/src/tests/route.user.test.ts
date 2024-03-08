import express from 'express';
import supertest from 'supertest';
import router from '../router/index';
import {deleteUser, getAllUsers, getUser, updateUser} from '../controllers/users'

const request = supertest(router);

describe('User Routes', () => {
  it('GET /users should return all users with admin privileges', async () => {
    const response = await request.get('/users').expect(200);
    // Add assertions based on your expected response
    expect(response.body).toEqual(getAllUsers);
  });

  it('GET /users/:userId should return a user with admin privileges', async () => {
    const userId = '65e55753512a13e265abcb97';
    const response = await request.get(`/users/${userId}`).expect(200);
    // Add assertions based on your expected response
    expect(response.body).toEqual(getUser);
  });

  it('PATCH /users/:userId should update a user with authentication and ownership', async () => {
    const userId = '65e55753512a13e265abcb97';
    const updatedUserData = { "username": "felix" };
    const response = await request
      .patch(`/users/${userId}`)
      .send(updatedUserData)
      .expect(200);
    // Add assertions based on your expected response
    expect(response.body).toEqual(updateUser);
  });

  it('DELETE /users/:userId should delete a user with authentication and ownership', async () => {
    const userId = '65e55753512a13e265abcb97';
    const response = await request
      .delete(`/users/${userId}`)
      .expect(200);
    // Add assertions based on your expected response
    expect(response.body).toEqual(deleteUser);
  });
});

