import {BadRequestException, Injectable} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { User } from '../user';
import * as O from 'fp-ts/Option';
import _ from 'lodash';
import { CreateUserDto } from './dto/create-user.dto';
import {isNil} from "@nestjs/common/utils/shared.utils";

const prisma = new PrismaClient();
@Injectable()
export class UserService {
  async findUser(id: string): Promise<O.Option<User>> {
    const data = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        phone: true,
        age: true,
        name: true,
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
