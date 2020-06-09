import { Request, Response } from 'express';
import knex from '../database';

class CollectionItemsController {
  async index(request: Request, response: Response) {
    try {
      const items = await knex('collectionItems').select('*');
      const serializedItems = items.map(item => {
        return {
          id: item.id,
          name: item.title,
          imageUrl: `${process.env.APP_HOST}/uploads/${item.image}`,
        };
      });
      return response.json(serializedItems);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

export default CollectionItemsController;
