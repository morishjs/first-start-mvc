import { Injectable } from '@nestjs/common';
import { User } from '../user';

@Injectable()
export class UserService {
  // TODO: 실제로 DB에서 가져오기
  findUser(id: number): User {
    const user1 = new User();
    user1.age = 20;
    user1.name = 'junsuk';
    user1.phone = '01087706498';

    return user1;
  }
}
