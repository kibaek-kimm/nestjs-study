/* eslint-disable prettier/prettier */
import { Test, TestingModule } from "@nestjs/testing";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { AuthService } from "./auth.service";
import { User } from "./user.entity";
import { NotFoundException } from "@nestjs/common";

describe("UsersController", () => {
  let controller: UsersController;
  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    // const users: Users[] = [];
    fakeUsersService = {
      findOne: (id: number) => {
        return Promise.resolve({ id, email: "asdf@asdff.com", password: "pass"} as User);
      },
      find: (email: string) => {
        return Promise.resolve([{ id: 1, email, password: "pass"} as User] );
      },
      // remove: (id: number) => {},
      update: (id: number) => {
        return Promise.resolve({ id, email: "asdf@asdf.com"} as User)
      },
    };

    fakeAuthService = {
      // signup: () => {},
      signin: (email: string, password: string) => {
        return Promise.resolve({ id: 1, email, password });
      },
    } as AuthService;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
        {
          provide: AuthService,
          useValue: fakeAuthService,
        }
      ]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("findAllUsers returns a list of users with the given email", async () => {
    const users = await controller.findAllUsers("asdf@asdf.com");
    expect(users.length).toEqual(1)
    expect(users[0].email).toEqual("asdf@asdf.com");
  })

  it("findUser return a single user iwth the given id", async () => {
    const user = await controller.findUser("1");
    expect(user).toBeDefined();
  })

  it("findUser throws an error if user with given id is not found", async () => {
    fakeUsersService.findOne = () => null;

    expect.assertions(2);

    try {
      await controller.findUser("1");
    } catch (err) {
      expect(err).toBeInstanceOf(NotFoundException);
      expect(err.message).toBe("User not found");
    }
  })

  it("signin updates session object and returns user", async () => {
    const session = { userId: -1 };
    const user = await controller.signin({ email: "asdf@asdf.com", password: "pass" }, session);
    expect(user.id).toEqual(1);
    expect(session.userId).toEqual(1);
  })

  it("update user data", async () => {
    const user = await controller.updateUser("1", { email: "asdf@asdf.com"} as User);
    expect(user.id).toEqual(1);
    expect(user.email).toEqual("asdf@asdf.com");
  })
});
