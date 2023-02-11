import { Controller, Get, Render } from '@nestjs/common';
import { User } from '../user';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/find-user')
  @Render('find-user')
  findUser(): { user: User } {
    const user = this.userService.findUser(0);
    return { user };
  }

  //TODO: createUser 생성
}
