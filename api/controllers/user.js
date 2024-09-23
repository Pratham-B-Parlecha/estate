import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
  try {
    const user = await prisma.user.findMany();
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get users" });
  }
};
export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get user" });
  }
};
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const userTokenId = req.userId;
  const { password, avatar, ...inputs } = req.body;

  if (id !== userTokenId) {
    return res.status(403).json({ message: "Not authorized" });
  }

  let updatedPassword = null;
  try {
    if (password) {
      updatedPassword = await bcrypt.hash(password, 10);
    }
    const updateUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        ...inputs,
        ...(updatedPassword && { password: updatedPassword }),
        ...(avatar && { avatar }),
      },
    });
    const { password: userPassword, ...user } = updateUser;
    res.status(200).json(updateUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to update users" });
  }
};
export const deleteUser = async (req, res) => {
    const { id } = req.params;
    const userTokenId = req.userId;
  
    if (id !== userTokenId) {
      return res.status(403).json({ message: "Not authorized" });
    }
  try {
    const deleteUser = await prisma.user.delete({
        where: {
          id,
        },
    })
    res.status(200).json({message: "User deleted successfully"})
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to delete users" });
  }
};
