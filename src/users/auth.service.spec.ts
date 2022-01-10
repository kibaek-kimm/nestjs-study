/* eslint-disable prettier/prettier */
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { User } from "./user.entity";
import { UsersService } from "./users.service";

describe("AuthService", () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    const users: User[] = [];
    fakeUsersService = {
      find: (email) => {
        const filteredUsers = users.filter(user => user.email === email);
        return Promise.resolve(filteredUsers);
      },
      create: (email: string, password: string) => {
        const user = { id: Math.floor(Math.random() * 99999), email, password } as User;
        users.push(user);
        return Promise.resolve(user);
      },
    };
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();
    service = module.get(AuthService);
  });

  it("can create an instance of auth service", async () => {
    // Create a face copy of the users service
    expect(service).toBeDefined();
  });

  it("create a new user with a salted and  hashed password", async () => {
    const user = await service.signup("asdf@asdf.com", "asdf");
    expect(user.password).not.toEqual("asdf");
    const [salt, hash] = user.password.split(".");
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it("throws an error if user sign up with email that is in use", async () => {
    await service.signup("a@a.pl", "pass");
    expect.assertions(2);

    try {
      await service.signup("a@a.pl", "pass");
    } catch (err) {
      expect(err).toBeInstanceOf(BadRequestException);
      expect(err.message).toBe("email in use");
    }
  });

  it("throws if signin is called with an unused email", async () => {
    expect.assertions(2);

    try {
      await service.signin("a@a.pl", "pass");
    } catch(err) {
      expect(err).toBeInstanceOf(NotFoundException);
      expect(err.message).toBe("user not found");
    }
  });

  it("throws if an invalid password is provided", async () => {
    await service.signup("a@a.pl", "1");
    expect.assertions(2);

    try {
      await service.signin("a@a.pl", "pass");
    } catch(err) {
      expect(err).toBeInstanceOf(BadRequestException);
      expect(err.message).toBe("bad password");
    }
  });

  it("returns a user if correct password is provided", async () => {
    await service.signup("a@a.pl", "pass");
    const user = await service.signin("a@a.pl", "pass");
    expect(user).toBeDefined()
  })
});
