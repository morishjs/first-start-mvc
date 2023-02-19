import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Prisma, PrismaClient, User } from '@prisma/client';
import * as O from 'fp-ts/Option';
import _ from 'lodash';
import { CreateUserDto } from './dto/create-user.dto';
import {
  is,
  size,
  define,
  refine,
  object,
  string,
  number,
  assert,
} from 'superstruct';

const prisma = new PrismaClient();

// Runtime validation
const Signup = object({
  name: string(),
  age: number(),
  phone: string(),
  email: size(string(), 1, 5), // TODO: create custom email validation
});

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
    try {
      assert(user, Signup);
    } catch (e) {
      throw new UnprocessableEntityException('something went wrong');
      // TODO: throw more specific error message
    }

    try {
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
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new UnprocessableEntityException('Email is already taken');
        }
      }
    }
  }
}
