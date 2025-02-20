import express from "express";
import { fetchAdmins } from "../controller/userFunctions.js";
const router = express.Router();

router.get("/", async (req, res) => {
    fetchAdmins(req, res);
});

export default router;