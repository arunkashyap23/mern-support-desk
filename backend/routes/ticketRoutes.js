import express from "express";
import {
  createTicket,
  deleteTicket,
  getTicket,
  getTickets,
  updateTicket,
} from "../controllers/ticketController.js";
import protect from "../middleware/authMiddleware.js";
import noteRouter from "./noteRoutes.js";

const ticketRouter = express.Router();

//Re-route into noteRouter
ticketRouter.use("/:ticketId/notes", noteRouter);

ticketRouter.route("/").get(protect, getTickets).post(protect, createTicket);

ticketRouter
  .route("/:id")
  .get(protect, getTicket)
  .put(protect, updateTicket)
  .delete(protect, deleteTicket);

export default ticketRouter;
