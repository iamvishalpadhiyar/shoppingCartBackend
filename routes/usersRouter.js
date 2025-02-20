import express from 'express';
import { createUser, deleteUser, fetchUsers, setLogIn, setLogout, updateUser } from '../controller/userFunctions.js';
const router = express.Router();

router.get("/", async (req, res) => {
    await fetchUsers(req, res);
});

router.post("/", async (req, res) => {
    const { action } = req.body;
    if(action === "createUser"){
        await createUser(req, res);
    }
    else if(action === "login"){
        await setLogIn(req, res);
    }
    else if(action === "logout"){
        await setLogout(req, res);
    }
});

router.put("/", async (req, res) => {
    await updateUser(req, res);
});

router.delete("/", async (req, res) => {
    await deleteUser(req, res);
})

export default router;