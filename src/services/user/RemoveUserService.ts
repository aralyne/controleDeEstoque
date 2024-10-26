import prismaClient from "../../prisma";
import { RemoveUserRequest } from "../../models/interfaces/user/RemoveUserRequest";

class RemoveUserService {
  async execute({ user_id }: RemoveUserRequest) {

    try {
        const removeUser = await prismaClient.user.delete({
            where: {
              id: user_id,
            },
        });
      
        return removeUser;
    }
    catch (error) {
        throw new Error("User not found");
    }
  }
}

export { RemoveUserService };
