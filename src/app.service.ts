import { Injectable } from '@nestjs/common';
import { User } from './user';
import { PrismaClient } from '@prisma/client';
import * as O from 'fp-ts/Option';

const prisma = new PrismaClient();
@Injectable()
export class AppService {
  async getUser(): Promise<any> {
    // read from db
    const user = await prisma.user.findUnique({
      where: {
        id: 0,
      },
    });

    console.log(user);

    return user;
  }

  getUsers(): User[] {
    const user1 = new User();
    user1.age = 20;
    user1.name = 'junsuk';
    user1.phone = '01087706498';

    const user2 = new User();
    user2.name = 'jueun';
    user2.age = 20;
    user2.phone = '01095996425';

    return [user1, user2];
  }
}
