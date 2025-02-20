import express from "express";
import { fetchMembers } from "../controller/userFunctions.js";
const router = express.Router();

router.get("/", async (req, res) => {
    await fetchMembers(req, res);
});

export default router;