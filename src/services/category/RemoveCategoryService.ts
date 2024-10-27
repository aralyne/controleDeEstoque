import prismaClient from "../../prisma";
import { RemoveCategoryRequest } from "../../models/interfaces/category/RemoveCategoryRequest";

class RemoveCategoryService {
  async execute({ category_id }: RemoveCategoryRequest){
    try {
      if (category_id){
        const category = await prismaClient.category.delete({
          where: {
            id: category_id,
          },
        });
        return category;
      }
  }
    catch (error) {
      throw new Error("Category not found");
    }
  }
}

export { RemoveCategoryService };
