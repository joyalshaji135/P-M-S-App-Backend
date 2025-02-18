import express from "express";
import * as authSuperAdminLoginControllers from "./authSuperAdminLoginControllers";

const router = express.Router();
router.post("/super-admin-login", authSuperAdminLoginControllers.superAdminLogin);
export default router;