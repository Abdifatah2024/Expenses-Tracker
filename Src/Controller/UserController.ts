// import { Request, Response } from "express";
// import prisma from "../prisma";

// export const createUser = async (req: Request, res: Response) => {
//   const { fullName, email, password } = req.body;

//   try {
//     const user = await prisma.user.create({
//       data: { fullName, email, password },
//     });
//     res.status(201).json(user);
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// };

// export const getAllUsers = async (_req: Request, res: Response) => {
//   const users = await prisma.user.findMany();
//   res.json(users);
// };
import { Request, Response } from "express";
import prisma from "../prisma";
import bcrypt from "bcrypt";

export const createUser = async (req: Request, res: Response) => {
  const { fullName, email, password } = req.body;

  try {
    // Check if email already exists
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        fullName,
        email,
        password: hashedPassword,
      },
    });

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    res.status(201).json(userWithoutPassword);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllUsers = async (_req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      fullName: true,
      email: true,
      createdAt: true,
    },
  });

  res.json(users);
};
