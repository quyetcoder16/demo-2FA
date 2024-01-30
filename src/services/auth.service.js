import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const getUserByEmailService = async (email) => {
    const user = await prisma.users.findFirst({
        where: {
            email
        }
    });
    if (user) return user;
    else return false;
}

const getUSerByUserIdService = async (userId) => {
    const user = await prisma.users.findFirst({
        where: {
            user_id: +userId
        }
    });
    if (user) return user;
    else return false;
}

const createNewUserService = async (newUser) => {
    await prisma.users.create({
        data: newUser
    });
}

export {
    getUserByEmailService,
    createNewUserService,
    getUSerByUserIdService,
}