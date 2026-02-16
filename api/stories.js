import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const stories = await prisma.story.findMany({
                orderBy: { createdAt: 'desc' },
            });
            res.status(200).json(stories);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to fetch stories' });
        }
    } else if (req.method === 'POST') {
        const { title, content, imageUrl } = req.body;
        try {
            const story = await prisma.story.create({
                data: {
                    title,
                    content,
                    imageUrl,
                },
            });
            res.status(201).json(story);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to create story' });
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
