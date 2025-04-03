import { Router } from "express";
import * as activeLogControllers from "./active-logo-module.controllers";

const router = Router();

router.get(
  "/get-all-active-logs",
  activeLogControllers.getAllActiveLogs,
);

export default router;