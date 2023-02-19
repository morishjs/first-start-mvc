import { Injectable } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';
import * as O from 'fp-ts/Option';
import { UserService } from './user/user.service';

const prisma = new PrismaClient();
@Injectable()
export class AppService {
  async getUser(): Promise<User> {
    const user = await prisma.user.findUnique({
      where: {
        id: 0,
      },
    });

    return user;
  }

  async getUsers(): Promise<User[]> {
    const users = await prisma.user.findMany({
      take: 2,
    });

    return users;
  }
}
