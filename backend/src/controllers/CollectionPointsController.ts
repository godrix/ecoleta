import { Request, Response } from 'express';
import knex from '../database';

class CollectionPointsController {
  async create(request: Request, response: Response) {
    try {
      const {
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf,
        items,
      } = request.body;

      const trx = await knex.transaction();

      const collectionPoint = {
        image: request.file.filename,
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf,
      };

      const [collectionPointsId] = await trx('collectionPoints')
        .returning('id')
        .insert(collectionPoint);

      const pointItems = items
        .split(',')
        .map((item: string) => Number(item.trim()))
        .map((collectionItemsId: number) => {
          return {
            collectionItemsId,
            collectionPointsId,
          };
        });

      await trx('pointsItems').insert(pointItems);
      trx.commit();
      return response.json({
        id: collectionPointsId,
        ...collectionPoint,
      });
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  async show(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const collectionPoint = await knex('collectionPoints')
        .where('id', id)
        .first();

      if (!collectionPoint) {
        throw new Error('Nenhum ponto encontrado');
      }

      const collectionItems = await knex('collectionItems')
        .join(
          'pointsItems',
          'collectionItems.id',
          '=',
          'pointsItems.collectionItemsId',
        )
        .where('pointsItems.collectionPointsId', id)
        .select('collectionItems.title');

      const serializePoint = {
        ...collectionPoint,
        imageUrl: `${process.env.APP_HOST}/uploads/${collectionPoint.image}`,
      };

      return response.json({
        collectionPoint: serializePoint,
        collectionItems,
      });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  async index(request: Request, response: Response) {
    try {
      const { city, uf, items } = request.query;

      const parsedItems = String(items)
        .split(',')
        .map(item => Number(item.trim()));

      const collectionPoints = await knex('collectionPoints')
        .join(
          'pointsItems',
          'collectionPoints.id',
          '=',
          'pointsItems.collectionPointsId',
        )
        .whereIn('pointsItems.collectionItemsId', parsedItems)
        .where('city', String(city))
        .where('uf', String(uf))
        .distinct()
        .select('collectionPoints.*');

      const serializePoint = collectionPoints.map(point => {
        return {
          ...point,
          imageUrl: `${process.env.APP_HOST}/uploads/${point.image}`,
        };
      });
      return response.json(serializePoint);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export default CollectionPointsController;
