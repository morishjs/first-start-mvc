import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { User } from '../user';
import * as O from 'fp-ts/Option';
import _ from 'lodash';

const prisma = new PrismaClient();
@Injectable()
export class UserService {
  async findUser(id: number): Promise<O.Option<User>> {
    const data = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        phone: true,
        age: true,
        name: true,
      },
    });

    if (data) {
      return O.some(data as User);
    }

    return O.none;
  }
}
