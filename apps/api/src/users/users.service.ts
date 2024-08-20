import { CreateUserDto, UpdateUserDto, USERS_SERVICE_NAME, UsersServiceClient } from '@app/common';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { AUTH_SERVICE } from './constants';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class UsersService implements OnModuleInit {
  private usersService: UsersServiceClient;
  constructor(
    @Inject(AUTH_SERVICE) private client: ClientGrpc
  ) { }
  onModuleInit() {
    this.usersService = this.client.getService<UsersServiceClient>(USERS_SERVICE_NAME);
  }
  create(createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  findAll() {
    return this.usersService.findAllUsers({});
  }

  findOne(id: string) {
    return this.usersService.findOneUser({ id });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser({ id, ...updateUserDto });
  }

  remove(id: string) {
    return this.usersService.removeUser({ id });
  }
}
