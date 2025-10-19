import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient();

export const register = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
        return res.status(422).json({ error: "All fields required" });
    }

    try {
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return res.status(400).json({ error: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                password: hashedPassword
            }
        });

        console.log(user)
        res.status(201).json({ message: "User registered successfully" })

    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.status(422).json({ error: "All fields required" });

    try {

        const user = await prisma.user.findUnique({ where: { email } })
        if (!user) return res.status(400).json({ error: "Invalid credentials" });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ error: "Invalid credentials" });

        const token = jwt.sign({ id: user.id, email: user.email }, "mysupersecretkey123", { expiresIn: '1h' })
        res.status(201).json({ message: "Logged in", token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const allUsers = await prisma.user.findMany();
        res.status(201).json(allUsers);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Server error" });
    }
}

