import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Query,
  Delete,
  NotFoundException,
  Session,
} from "@nestjs/common";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { CreateUserDto } from "./dtos/create-user-dto";
import { UsersService } from "./users.service";
import { Serialize } from "../interceptors/serialize.interceptor";
import { UserDto } from "./dtos/user.dto";
import { AuthService } from "./auth.service";

@Controller("auth")
@Serialize(UserDto)
export class UsersController {
  constructor(
    private userServices: UsersService,
    private authService: AuthService,
  ) {}

  @Get("/whoami")
  whoAmI(@Session() session: any) {
    return this.userServices.findOne(session.userId);
  }

  @Post("/signout")
  signOut(@Session() session: any) {
    session.userId = null;
  }

  @Post("/signup")
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post("/signin")
  async signin(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Get("/:id")
  async findUser(@Param("id") id: string) {
    const user = await this.userServices.findOne(+id);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return user;
  }

  @Get("/")
  async findAllUsers(@Query("email") email: string) {
    const user = await this.userServices.find(email);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return user;
  }

  @Delete("/:id")
  removeUser(@Param("id") id: string) {
    return this.userServices.remove(+id);
  }

  @Patch("/:id")
  updateUser(@Param("id") id: string, @Body() body: UpdateUserDto) {
    return this.userServices.update(+id, body);
  }
}
