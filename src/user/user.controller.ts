import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Render,
} from '@nestjs/common';
import { User } from '../user';
import { UserService } from './user.service';
import * as O from 'fp-ts/Option';
import { CreateUserDto } from './dto/create-user.dto';
import { isNil } from '@nestjs/common/utils/shared.utils';
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/users/:id')
  @Render('find-user')
  async findUser(@Param('id') id: string): Promise<{ user: User }> {
    const user = await this.userService.findUser(id);

    if (O.isSome(user)) {
      return { user: user.value };
    } else {
      throw new NotFoundException('Not existing user');
    }
  }

  @Post('/user')
  async createUser(@Body() request: CreateUserDto): Promise<{ id: number }> {
    if (isNil(request.email)) {
      throw new BadRequestException('Email is required');
    }
    if (isNil(request.age)) {
      throw new BadRequestException('Age is required');
    }

    const userId = await this.userService.createUser(request);

    if (O.isSome(userId)) {
      return { id: userId.value };
    } else {
      return { id: null };
    }
  }
}
