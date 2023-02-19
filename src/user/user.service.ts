import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Prisma, PrismaClient, User } from '@prisma/client';
import * as O from 'fp-ts/Option';
import _ from 'lodash';
import { CreateUserDto } from './dto/create-user.dto';
import { object, string, number } from 'yup';

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
    const userSchema = object({
      name: string(),
      age: number().required().positive().integer(),
      email: string().required().email(),
      phone: string(),
    });

    try {
      await userSchema.validate(user);
    } catch (e) {
      throw new UnprocessableEntityException(
        e.errors[0] ?? 'Validation failed',
      );
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
