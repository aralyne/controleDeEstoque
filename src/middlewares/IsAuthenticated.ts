import {Request, Response, NextFunction} from "express";
import { Payload } from "../models/interfaces/auth/Payload";
import { verify } from "jsonwebtoken";

export function IsAuthenticated(request: Request, response: Response, next: NextFunction){
  const authToken = request.headers.authorization;

  if (!authToken){
    return response.status(401).json({
      message: "Token is missing!"
    })
  }

  const [, token] = authToken.split(" ");

  try {
    const { sub } = verify(token, process.env.JWT_SECRET as string) as Payload;

    request.user_id = sub;

    return next();
  } catch (error) {
    return response.status(401).json({
      message: "Token is invalid!"
    })
  }
}
