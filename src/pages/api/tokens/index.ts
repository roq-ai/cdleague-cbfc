import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { tokenValidationSchema } from 'validationSchema/tokens';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getTokens();
    case 'POST':
      return createToken();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getTokens() {
    const data = await prisma.token
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'token'));
    return res.status(200).json(data);
  }

  async function createToken() {
    await tokenValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.purchase?.length > 0) {
      const create_purchase = body.purchase;
      body.purchase = {
        create: create_purchase,
      };
    } else {
      delete body.purchase;
    }
    const data = await prisma.token.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
