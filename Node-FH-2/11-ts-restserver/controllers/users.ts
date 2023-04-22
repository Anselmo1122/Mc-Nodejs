import { Request, Response } from "express";
import User from "../models/user";

export const obtainUsers = async (req: Request, res: Response) => {
  const users = await User.findAll();
  res.json({ users });
}

export const obtainUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await User.findByPk(id);

  if (!user) return res.status(404).json({ msg: `User with id ${ id } not found` });

  res.json({ user });
}

export const createUser = async (req: Request, res: Response) => {
  const { body } = req;

  try {

    const existEmail = await User.findOne({ 
      where: { email: body.email }
    });
    if (existEmail) {
      return res.status(400).json({
        msg: `There is already a user with the email ${body.email}`
      })
    }

    const user = await User.create(body);
    await user.save();

    res.json({ user })

  } catch (error) {

    console.error(error)
    res.status(500).json({
      msg: "Speak width de admin"
    })

  }
}

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  try {

    const user = await User.findByPk(id);
    if(!user) {
      return res.status(400).json({
        msg: `There is no user with id ${id}`
      })
    } 

    await user.update( body );

    res.json({ user });

  } catch (error) {

    console.error(error)
    res.status(500).json({
      msg: "Speak width de admin"
    })
    
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await User.findByPk(id);
  if(!user) {
    return res.status(400).json({
      msg: `There is no user with id ${id}`
    })
  } 

  // Eliminación física.
  // await user.destroy();

  await user.update({ state: false });

  res.json({ user });
}

