import asyncHandler from "express-async-handler";
import UserModel from "../models/userModel.js";
import TicketModel from "../models/ticketModel.js";
import NoteModel from "../models/noteModel.js";

export const getNotes = asyncHandler(async (req, res) => {
  //get user using the id in the jwt
  const user = await UserModel.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not Found");
  } else {
    const ticket = await TicketModel.findById(req.params.ticketId);
    if (ticket.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error("User Not Authorized");
    } else {
      const notes = await NoteModel.find({ ticket: req.params.ticketId });
      res.status(200).json(notes);
    }
  }
});

export const addNote = asyncHandler(async (req, res) => {
  //get user using the id in the jwt
  const user = await UserModel.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not Found");
  } else {
    const ticket = await TicketModel.findById(req.params.ticketId);
    if (ticket.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error("User Not Authorized");
    } else {
      const note = await NoteModel.create({
        text: req.body.text,
        isStaff: false,
        ticket: req.params.ticketId,
        user: req.user.id,
      });
      res.status(201).json(note);
    }
  }
});
