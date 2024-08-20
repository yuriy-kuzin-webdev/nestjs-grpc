import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import {
  UsersServiceController,
  CreateUserDto,
  UpdateUserDto,
  UsersServiceControllerMethods,
  FindOneUserDto,
  PaginationDto,
  User,
  Users,
} from '@app/common';
import { Observable } from 'rxjs';

@Controller()
@UsersServiceControllerMethods()
export class UsersController implements UsersServiceController {
  constructor(private readonly usersService: UsersService) { }
  createUser(createUserDto: CreateUserDto): Promise<User> | Observable<User> | User {
    return this.usersService.create(createUserDto);
  }
  findAllUsers(): Promise<Users> | Observable<Users> | Users {
    return this.usersService.findAll();
  }
  findOneUser(findOneUserDto: FindOneUserDto): Promise<User> | Observable<User> | User {
    return this.usersService.findOne(findOneUserDto.id);
  }
  updateUser(updateUserDto: UpdateUserDto): Promise<User> | Observable<User> | User {
    return this.usersService.update(updateUserDto.id, updateUserDto);
  }
  removeUser(findOneUserDto: FindOneUserDto): Promise<User> | Observable<User> | User {
    return this.usersService.remove(findOneUserDto.id);
  }
  queryUsers(paginationDtoStream: Observable<PaginationDto>): Observable<Users> {
    return this.usersService.queryUsers(paginationDtoStream);
  }
}
