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
    });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to delete users" });
  }
};
export const savePost = async (req, res) => {
  const { postId } = req.body;
  const tokenUserId = req.userId;
  try {
    const savedPost = await prisma.savedPost.findUnique({
      where: {
        userId_postId: {
          postId,
          userId: tokenUserId,
        },
      },
    });
    if (savedPost) {
      await prisma.savedPost.delete({
        where: {
          id: savedPost.id,
        },
      });
      res.status(200).json({ message: "post removed from saved list" });
    } else {
      await prisma.savedPost.create({
        data: {
          postId,
          userId: tokenUserId,
        },
      });
      res.status(200).json({ message: "post saved" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to delete users" });
  }
};

export const profilePosts = async (req, res) => {
  const tokenUserId = req.params.userId;
  try {
    const userPosts = await prisma.post.findMany({
      where: { userId: tokenUserId },
    });

    const saved = await prisma.savedPost.findMany({
      where: { userId: tokenUserId },
      include: {
        post: true,
      },
    });
    const savedPost = saved.map((item) => item.post);
    res.status(200).json({ userPosts, savedPost });
  } catch (error) {
    res.status(500).json({ message: "failed to get profile post" });
  }
};
