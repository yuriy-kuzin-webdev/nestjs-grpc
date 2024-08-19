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
export class UsersController implements UsersServiceController{
  constructor(private readonly usersService: UsersService) {}
  createUser(createUserDto: CreateUserDto): Promise<User> | Observable<User> | User {
    throw new Error('Method not implemented.');
  }
  findAllUsers(): Promise<Users> | Observable<Users> | Users {
    throw new Error('Method not implemented.');
  }
  findOneUser(findOneUserDto: FindOneUserDto): Promise<User> | Observable<User> | User {
    throw new Error('Method not implemented.');
  }
  updateUser(updateUserDto: UpdateUserDto): Promise<User> | Observable<User> | User {
    throw new Error('Method not implemented.');
  }
  removeUser(findOneUserDto: FindOneUserDto): Promise<User> | Observable<User> | User {
    throw new Error('Method not implemented.');
  }
  queryUsers(paginationDtoStream: Observable<PaginationDto>): Observable<Users> {
    throw new Error('Method not implemented.');
  }
}
