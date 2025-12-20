import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../drizzle/index';
import { eq } from 'drizzle-orm';
import { LoginUserDto } from './dto/login-user';
import * as bcrypt from 'bcrypt';
import { PasswordUtil } from 'src/utils/password.helper';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class UserService {

  constructor(
    @Inject(DRIZZLE) private readonly db: NodePgDatabase<typeof schema>,
    private readonly jwt: JwtService
  ) { }

  async create(createUserDto: CreateUserDto) {
    const heshed = await PasswordUtil.hash(createUserDto.password);
    const [user] = await this.db.insert(schema.users).values({
      ...createUserDto,
      password: heshed
    }).returning();
    const { password, ...other } = user
    return other;
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.db.query.users.findFirst({
      where: (users, { eq }: any) => eq(users?.email, loginUserDto.email)
    })
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const match = await PasswordUtil.compare(loginUserDto.password, user.password)
    if (!match) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const { password, ...other } = user
    const token = this.jwt.sign(other)
    const decode = this.jwt.decode(token)
    return {
      decode, token
    };
  }
  async findAll() {
    const [users] = await this.db.select({
      id: schema.users.id,
      name: schema.users.name,
      role: schema.users.role,
      email: schema.users.email
    }).from(schema.users);
    return users;
  }

  async findOne(id: number) {
    const user = await this.db.select({
      id: schema.users.id,
      name: schema.users.name,
      role: schema.users.role,
      email: schema.users.email
    }).from(schema.users).where(eq(schema.users.id, id));
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const updateUser = this.db.update(schema.users).set(updateUserDto).where(eq(schema.users.id, id)).returning()
    return updateUser;
  }

  remove(id: number) {
    return this.db.delete(schema.users).where(eq(schema.users.id, id));
  }
}
