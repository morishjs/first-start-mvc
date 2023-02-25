### 과제 1
1. `UserController`의 `findUser` 와 `createUser` 액션을 구현하세요.
   - `createUser`는 새로 생성된 유저를 반환해야 합니다.
     - 중복된 email 을 가입한 회원이 있으면 적절한 status code 를 리턴해야 합니다.
   - `findUser`는 주어진 id의 유저를 반환해야 합니다.
     - 주어진 id가 유저가 없다면 적절한 status code 를 리턴해야 합니다.
2. 마찬가지로 `UserController`의 `findUser` 와 `createUser` 액션을 구현하세요.
   - `createUser`는 새로 생성된 유저를 반환해야 합니다.
     - `createUser`의 리턴 타입은 `Promise<User | CreateUserErrors>` 입니다. 
     - `CreateUserErrors`는 다음과 같은 타입입니다.
       ```ts
       enum CreateUserErrors {
         AlreadyEmailExist
       };
       ```
   - `findUser`는 주어진 id의 유저를 반환해야 합니다.
     - `findUser`의 리턴 타입은 `Promise<User | FindUserErrors>` 입니다.
     - `FindUserErrors`는 다음과 같은 타입입니다.
       ```ts
       enum FindUserErrors {
         NotFound
       };
       ```
