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
  UseInterceptors,
  ClassSerializerInterceptor,
} from "@nestjs/common";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { CreateUserDto } from "./dtos/create-user-dto";
import { UsersService } from "./users.service";

@Controller("auth")
export class UsersController {
  constructor(private userServices: UsersService) {}
  @Post("/signup")
  createUser(@Body() body: CreateUserDto) {
    this.userServices.create(body.email, body.password);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get("/:id")
  async findUser(@Param("id") id: string) {
    const user = await this.userServices.findOne(+id);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return user;
  }

  @UseInterceptors(ClassSerializerInterceptor)
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