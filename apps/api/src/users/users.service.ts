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
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
