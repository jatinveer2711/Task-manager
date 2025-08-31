import express from "express";
import { createTask,getAllTasks,updateTask,deleteTask,searchFilter,filterandSort} from '../Controller/Task.controller.js';
import {authenticateUser} from '../middleware/user.middlware.js';

const router = express.Router();

router.post("/create",authenticateUser,createTask);
router.get("/all",authenticateUser,getAllTasks);
router.put("/update/:id",authenticateUser,updateTask)
router.delete("/delete/:id",authenticateUser,deleteTask)
router.get("/search",authenticateUser,searchFilter)
router.get("/filter",authenticateUser,filterandSort)
export default router;