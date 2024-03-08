import express from "express";
import path from "path";

import {login, register } from "../controllers/authentication";
import {isAdmin, isAuthenticated, isOwner} from "../middlewares/index"

export default (router: express.Router) => {

    router.use('/public', express.static(path.join(__dirname, '../public')))

    router.get('/home', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/html/home.html'))
    })

    router.get('/login', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/html/login.html'))
    })

    router.get('/signup', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/html/signup.html'))
    })

    router.post('/signup', register);
    router.post('/login', login);

    router.get('/home/:userId',isAuthenticated, isOwner, (req, res) => {
        res.sendFile(path.join(__dirname, '../public/html/user.html'))
    });

    router.get('/admin',isAdmin, (req, res) => {
        res.sendFile(path.join(__dirname, '../public/html/admin.html'))
    });

    router.get('/logout', (req, res) => {
        res.clearCookie('AD-AUTH', { domain: 'localhost', path: '/' });
        res.redirect('/login');
    });

};
