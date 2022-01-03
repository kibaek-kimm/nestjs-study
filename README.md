# Nestjs study

## Auth api
| Method and Route  |  Body or Query String | Description | Controller Method | Service Method |
|---|---|---|---|---|
| POST `/auth/signup` | Body - { email, password} | Create a new user | createUser | create |
| GET `/auth/:id` |  | Find a user with given id | findUser | findOne | findOne |
| GET `/auth?email={email}` |  | Find all users with given email | findAllUser | find |
| PATCH `/auth/:id` | Body - { email, password } | Update a user with given id | updateUser | update |
| DELETE `/auth/:id` |  | Delete user with given id | removeUser | remove |


## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
