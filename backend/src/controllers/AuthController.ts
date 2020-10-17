import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';





import userView from '../views/users_view';

import User from '../models/User';
import { isBuffer } from 'util';
export default {
async authenticate(request: Request, response: Response) {
  const usersRepository = getRepository(User);

  const {
    name,
    email,
    password,
  } = request.body;


  const user = await usersRepository.findOne({ where:{email}})

  if(!user){
    return response.status(401);
  }
  const isValidPassword = await bcrypt.compare(password, user.password);

  if(!isValidPassword){
    return response.status(401);
  }


  const token = jwt.sign({
    id : user.id },
    'secret',
    {expiresIn: '1d'});
  
  return response.json({ user, token});

  

}
}