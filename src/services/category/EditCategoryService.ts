import prismaClient from "../../prisma";
import { EditCategoryRequest } from "../../models/interfaces/category/EditCategoryRequest";
import e from "express";

class EditCategoryService {
  async execute({ category_id, name }: EditCategoryRequest) {
    if (category_id === "" || name === "" || name === null || !name) {
      throw new Error("Invalid arguments");
    }

    const category = await prismaClient.category.update({
      where: {
        id: category_id,
      },
      data: {
        name: name,
      },
      select: {
        id: true,
        name: true,
      },
    });
    return category;
  }
}

export { EditCategoryService };
