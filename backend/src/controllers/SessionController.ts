import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';
import knex from '../database';

class SessionController {
  async create(request: Request, response: Response) {
    const { name, email, facebookId, userPicture } = request.body;

    const user = await knex('users')
      .where('facebookId', facebookId)
      .first()
      .select('id', 'name', 'email');

    const { secret, expiresIn } = authConfig.jwt;

    if (!user) {
      const [newUser] = await knex('users')
        .insert({ name, email, facebookId, userPicture })
        .returning(['id', 'name', 'email']);

      const token = sign({}, secret, {
        subject: newUser.id,
        expiresIn,
      });

      return response.json({ user: { name, email }, token });
    }

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return response.json({ user: { name, email }, token });
  }
}

export default SessionController;
