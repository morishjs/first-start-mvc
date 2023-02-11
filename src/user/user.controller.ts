import { Controller, Get, Post, Render } from '@nestjs/common';
import { User } from '../user';
import { UserService } from './user.service';
import * as O from 'fp-ts/Option';
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/find-user')
  @Render('find-user')
  async findUser(): Promise<{ user: User }> {
    const user = await this.userService.findUser(0);

    if (O.isSome(user)) {
      return { user: user.value as User };
    } else {
      return { user: new User() };
    }
  }

  @Post('/create-user')
  async createUser(): Promise<{ id: number }> {
    const userId = await this.userService.createUser({
      name: 'jueun2',
      age: 20,
      phone: '01095996425',
      email: 'juepark42@gmail.com',
    });

    if (O.isSome(userId)) {
      return { id: userId.value };
    } else {
      return { id: null };
    }
  }
}
