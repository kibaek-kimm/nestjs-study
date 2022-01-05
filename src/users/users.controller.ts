import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDto } from "./dtos/create-user-dto";
import { UsersService } from "./users.service";

@Controller("auth")
export class UsersController {
  constructor(private userServices: UsersService) {}
  @Post("/signup")
  createUser(@Body() body: CreateUserDto) {
    this.userServices.create(body.email, body.password);
  }
}