import { Injectable } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';
import * as O from 'fp-ts/Option';
import _ from 'lodash';
import { CreateUserDto } from './dto/create-user.dto';

const prisma = new PrismaClient();
@Injectable()
export class UserService {
  async findUser(id: string): Promise<O.Option<User>> {
    const data = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (data) {
      return O.some(data);
    }

    return O.none;
  }

  async createUser(user: CreateUserDto): Promise<O.Option<number>> {
    const data = await prisma.user.create({
      data: user,
      select: {
        id: true,
      },
    });

    if (data) {
      return O.some(data.id);
    }

    return O.none;
  }
}
