import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private repo: Repository<UserEntity>,
  ) {}
  create(email: string, password: string) {
    const user = this.repo.create({ email, password });
    return this.repo.save(user);
  }
  findOne1(id: number) {
    console.log('id', id);
    return this.repo.findOne({ where: { id } });
  }
  find(email: string) {
    return this.repo.find({ where: { email } });
  }
  async update(id: number, attrs: Partial<UserEntity>) {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) {
      throw new Error('user not found');
    }
    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.repo.findOne({ where: { id } });
    console.log('user.......', user);

    if (!user) {
      return {
        message: 'User Not Found',
      };
    }
    return this.repo.remove(user);
  }
}
