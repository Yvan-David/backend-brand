import express from 'express';
import supertest from 'supertest';
import app from '../router/index';
import { getAllBlogs } from 'controllers/blogs';

const request = supertest(app);

describe('Blog Routes', () => {
  it('GET /blogs should return all blogs', async () => {
    const response = await request.get('/blogs').expect(200);
  });

  it('POST /blogs should create a new blog with admin privileges', async () => {
    const newBlogData = { /* your new blog data */ };
    const response = await request
      .post('/blogs').expect(200);
  });

  it('DELETE /blogs/:id should delete a blog with admin privileges', async () => {
    const blogId = '65e55753512a13e265abcb97';
    const response = await request
      .delete(`/blogs/${blogId}`)
      .expect(200);
  });

  it('PATCH /blogs/:id should update a blog with admin privileges', async () => {
    const blogId = '65e55753512a13e265abcb97';
    const updatedBlogData = { "body": "warner" };
    const response = await request
      .patch(`/blogs/${blogId}`)
      .expect(200);
  });

  it('GET /blogs/:id should return a blog by id', async () => {
    const blogId = '65e55753512a13e265abcb97';
    const response = await request.get(`/blogs/${blogId}`).expect(200);
  });
});
