import express from "express";
import expressAsyncHandler from "express-async-handler";
import Contact from "../models/contactModel.js";
import { isAuth, isAdmin } from "../utils.js";

const contactRouter = express.Router();


contactRouter.get(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (contact) {
      res.send(contact);
    } else {
      res.status(404).send({ contact: "Message Not Found" });
    }
  })
);

contactRouter.post(
  "/contact",
  expressAsyncHandler(async (req, res) => {
    const newContact = new Contact({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
    });
    const contact = await newContact.save();
    res.send({
      _id: contact._id,
      name: contact.name,
      message: contact.message,
      user:req.user._id,
    });
  })
);


export default contactRouter;