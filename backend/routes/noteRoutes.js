import express from "express";
import { getNotes, addNote } from "../controllers/noteController.js";
import protect from "../middleware/authMiddleware.js";

const noteRouter = express.Router({ mergeParams: true });

noteRouter.route("/").get(protect, getNotes).post(protect, addNote);

export default noteRouter;
