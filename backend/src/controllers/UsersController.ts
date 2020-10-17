import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';



import userView from '../views/users_view';

import User from '../models/User';
export default {
async create(request: Request, response: Response) {
  const usersRepository = getRepository(User);

  const {
    name,
    email,
    password,
  } = request.body;


  const userExists = await usersRepository.findOne({ where:{email}})

  if(userExists){
    return response.sendStatus(409);
  }
  const data = {
   name,
   email,
   password
  };

  
  const schema = Yup.object().shape({
    name: Yup.string().required('Nome obrigatório.'),
    email: Yup.string().required('Email obrigatório.'),
    password: Yup.string().required('Senha é  obrigatória.'),
  });
  

  await schema.validate(data, {
    abortEarly: false,

  });
  const user = usersRepository.create(data);
  await usersRepository.save(user);


  
  return response.json(user);


}
}