/* eslint-disable prettier/prettier */
import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto } from './Authdto/auth.dto';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import {jwtSecret} from '../utils/constants';
import { User } from 'src/user/entities/user.entity';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/user/dto/create-user.dto';



@Injectable()
export class AuthService {

    constructor(private userService: UserService,private jwt:JwtService){}

    async signup(dto: CreateUserDto) {
        const { email, password, firstName, lastName } = dto;

        try {
            const user = await this.userService.findByEmail(email);
            if (user) {
                throw new BadRequestException('Email already exists');
            }

            const hashedPassword = await this.hashPassword(password);

            // Créer un nouvel utilisateur avec le mot de passe haché
            const newUser = await this.userService.create({
                firstName,
                lastName,
                email,
                password: hashedPassword,
            });

            // Générer un token pour le nouvel utilisateur
            const token = await this.signToken({
                userId: newUser.id,
                email: newUser.email,
            });

            // Retourner le message de succès et le token
            return { message: 'Signup success', token };
        } catch (error) {
            throw error;
        }
    }
    
    async signin(dto: AuthDto) {
        const { email, password } = dto;
    
        try {
            const user = await this.userService.findByEmail(email);
            if (!user) {
                throw new BadRequestException('Invalid email or password');
            }
    
            const isMatch = await this.comparePasswords({ password, hash: user.password });
    
            if (!isMatch) {
                throw new BadRequestException('Invalid email or password');
            }
    
            const token = await this.signToken({
                userId: user.id,
                email: user.email,
            });
    
            if (!token) {
                throw new ForbiddenException('Could not signin');
              }
          
              return{message:' logged in successfully ! ',token}
          
          
        } catch (error) {
            throw error;
        }
    }
    

    async signout(){
        return{message:'signup succes'}
    }


    async hashPassword(password: string) {
        const saltOrRounds = 10;
    
        return await bcrypt.hash(password, saltOrRounds);
      }


      async comparePasswords(args: { hash: string; password: string }) {
        return await bcrypt.compare(args.password, args.hash);
      }



      async signToken(args: { userId: string; email: string }) {
        const payload = {
          id: args.userId,
          email: args.email,
        };
    
        const token = await this.jwt.signAsync(payload, {
          secret: jwtSecret,
          expiresIn:'4m'
        });
    
        return token;
      }

}
