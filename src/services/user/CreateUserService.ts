import prismaClient from '../../prisma';
import { hash } from "bcryptjs";
import { UserRequest } from "../../models/interfaces/user/UserRequest"

class CreateUserService {
  async execute({ name, email, password }: UserRequest) {
      if (!email) {
          throw new Error("Email incorrect");
      }

      const userAlreadyExists = await prismaClient.user.findFirst({
          where: {
              email: email
          }
      })

      if (userAlreadyExists) {
          throw new Error("Email already exists");
      }

        // Encriptando a senha do usuário
      const passwordHash = await hash(password, 8);

        // Criando usuário
      const user = prismaClient.user.create({
          data: {
              name: name,
              email: email,
              password: passwordHash
          },
          select: { // o que vai ser exibido depois de criar o user
              id: true,
              name: true,
              email: true
          }
      })

      return user;
  }
}

export { CreateUserService }
