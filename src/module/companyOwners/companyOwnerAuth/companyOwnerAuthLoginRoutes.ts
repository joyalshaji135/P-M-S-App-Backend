
// Import modules
import express from "express";

// Import controllers
import {
    companyOwnerLogin,} from "./companyOwnerAuthLoginControllers";

// Define routes
const router = express.Router();

router.post(
    "/company-owner-login",
     companyOwnerLogin,
);

export default router;