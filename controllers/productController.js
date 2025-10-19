import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export const createProduct = async (req, res) => {
    const { title, description, price } = req.body;

    if (!title || !description || !price) {
        return res.status(422).json({ error: "All fields required" });
    }

    try {

        const product = await prisma.product.create({ data: { title, description, price } });
        res.status(201).json({ message: `${title} is create successful` })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
}

export const getAllProduct = async (req, res) => {
    try {
        const allProduct = await prisma.product.findMany();
        res.status(201).json(allProduct);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Server error" });
    }
}

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { title, description, price } = req.body;

    try {
        const existing = await prisma.product.findUnique({
            where: { id: Number(id) },
        });
        if (!existing) {
            return res.status(404).json({ error: "Product not found" });
        }

        const updated = await prisma.product.update({
            where: { id: Number(id) },
            data: {
                title,
                description,
                price: price ? parseFloat(price) : existing.price,
            },
        });
        res.status(200).json({ message: "update successfule", updated });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }

}