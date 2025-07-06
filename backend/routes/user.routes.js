import { Router } from "express";
import { getUser, signin, logout, signup } from "../controllers/user.controller.js";

const router = Router()

router.post('/signup', signup)
router.post('/signin', signin)
router.get('/fetch-user', getUser)
router.post('/logout', logout)

export default router