import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import * as O from 'fp-ts/Option';
import { PrismaService } from 'src/prisma.service';
import { userSchema } from 'src/validation-schema/user';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findUser(id: string): Promise<O.Option<User>> {
    const data = await this.prisma.user.findUnique({
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
      await userSchema.validate(user, { strict: true });
    } catch (e) {
      throw new UnprocessableEntityException(
        e.errors[0] ?? 'Validation failed',
      );
    }

    try {
      const data = await this.prisma.user.create({
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
