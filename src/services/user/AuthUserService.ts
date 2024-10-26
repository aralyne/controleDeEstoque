import { AuthRequest } from "../../models/interfaces/auth/AuthRequest"
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import prismaClient from '../../prisma';

class AuthUserService{
  async execute({email, password}: AuthRequest){
    const user = await prismaClient.user.findFirst({
      where:{
        email: email
      }
    })

    if(!user){
      throw new Error("Wrong username or password!")
    }

    if (!email || !password) {
      throw new Error("Email or password is nil");
    }

    const password_verify = await compare(password, user?.password)

    if (!password_verify){
      throw new Error("Wrong password");
    }

    const token = sign({ 
      email: user?.email,
      name: user?.name
    },
      process.env.JWT_SECRET as string,
      {
        subject: user?.id,
        expiresIn: "1d"
      }
    );

    return {
      id: user?.id,
      name: user?.name,
      email: user?.email,
      token: token
    }
  }
}

export { AuthUserService }
