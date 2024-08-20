import { CreateUserDto, PaginationDto, UpdateUserDto, User, Users } from '@app/common';
import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class UsersService implements OnModuleInit {
  private readonly users: User[] = [];
  create(createUserDto: CreateUserDto): User {
    const user: User = {
      ...createUserDto,
      subscribed: false,
      socialMedia: {},
      id: randomUUID(),
    }
    this.users.push(user);
    return user;
  }

  findAll(): Users {
    return { users: this.users };
  }

  findOne(id: string) {
    return this.users.find(user => user.id === id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const user = this.users.find(user => user.id === id);
    if (user) {
      return Object.assign(user, updateUserDto);
    }
    throw new NotFoundException(`User with id: ${id} not found`);
  }

  remove(id: string) {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex !== -1) {
      const [removed] = this.users.splice(userIndex, 1);
      return removed;
    }
    throw new NotFoundException(`User with id: ${id} not found`);
  }

  queryUsers(paginationDtoStream: Observable<PaginationDto>): Observable<Users> {
    const subject = new Subject<Users>();
    const onNext = (paginationDto: PaginationDto) => {
      const start = paginationDto.page * paginationDto.skip;
      subject.next({
        users: this.users.slice(start, start + paginationDto.skip),
      })
    }
    const onComplete = () => subject.complete();
    paginationDtoStream.subscribe({
      next: onNext,
      complete: onComplete
    })

    return subject.asObservable();
  }

  onModuleInit() {
    let i = 0;
    while (i <= 100) {
      this.create({
        username: randomUUID(),
        password: randomUUID(),
        age: 0,
      })
    }
  }
}
