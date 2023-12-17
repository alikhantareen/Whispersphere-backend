import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}
  async signup(signupDto: SignupDto): Promise<{ token: string }> {
    const { name, email, password } = signupDto;
    const isAlreadyRegistered = await this.userModel.findOne({ email });
    if (isAlreadyRegistered) {
      throw new UnauthorizedException(
        'Email already registered. Try loggin in.',
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userModel.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = this.jwtService.sign({
      id: user._id,
    });

    return { token };
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid password');
    }

    const token = this.jwtService.sign({
      id: user._id,
      user_name: user.name,
    });

    return { token };
  }

  async getUser(id: string): Promise<User> {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new UnauthorizedException('No user found.');
    }

    return user;
  }
}
