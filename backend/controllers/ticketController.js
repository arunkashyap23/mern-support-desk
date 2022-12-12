import asyncHandler from "express-async-handler";
import UserModel from "../models/userModel.js";
import TicketModel from "../models/ticketModel.js";

export const getTickets = asyncHandler(async (req, res) => {
  //get user using the id in the jwt
  const user = await UserModel.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not Found");
  } else {
    const tickets = await TicketModel.find({ user: req.user.id });
    res.status(200).json(tickets);
  }
});

export const getTicket = asyncHandler(async (req, res) => {
  //get user using the id in the jwt
  const user = await UserModel.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not Found");
  } else {
    const ticket = await TicketModel.findById(req.params.id);
    if (!ticket) {
      res.status(404);
      throw new Error("ticket not found");
    } else {
      if (ticket.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("Not Authorized");
      } else {
        res.status(200).json(ticket);
      }
    }
  }
});

export const createTicket = asyncHandler(async (req, res) => {
  const { product, description } = req.body;
  if (!product || !description) {
    res.status(400);
    throw new Error("Please add a product and description");
  } else {
    const user = await UserModel.findById(req.user.id);

    if (!user) {
      res.status(401);
      throw new Error("User not Found");
    } else {
      const ticket = await TicketModel.create({
        product,
        description,
        user: req.user.id,
        status: "new",
      });
      res.status(201).json(ticket);
    }
  }
});

export const deleteTicket = asyncHandler(async (req, res) => {
  //get user using the id in the jwt
  const user = await UserModel.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not Found");
  } else {
    const ticket = await TicketModel.findById(req.params.id);
    if (!ticket) {
      res.status(404);
      throw new Error("ticket not found");
    } else {
      if (ticket.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("Not Authorized");
      } else {
        await ticket.remove();
        res.status(200).json({ success: true });
      }
    }
  }
});

export const updateTicket = asyncHandler(async (req, res) => {
  //get user using the id in the jwt
  const user = await UserModel.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not Found");
  } else {
    const ticket = await TicketModel.findById(req.params.id);
    if (!ticket) {
      res.status(404);
      throw new Error("ticket not found");
    } else {
      if (ticket.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("Not Authorized");
      } else {
        const updatedTicket = await TicketModel.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
        );
        res.status(200).json(updatedTicket);
      }
    }
  }
});
