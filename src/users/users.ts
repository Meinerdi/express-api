import express from "express";

const usersRouter = express.Router();

usersRouter.post("/login", (req, res) => {
    res.send("Login successful!");
})

usersRouter.post("/register", (req, res) => {
    res.send("Register successful!");
})

export { usersRouter };