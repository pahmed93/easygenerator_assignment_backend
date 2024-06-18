import { Injectable, ConflictException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {User} from '../models/user.schema';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService{
    constructor(@InjectModel('User') private readonly userModel: Model<User>){}

    async createUser(email: string, name: string, password: string): Promise<User> {

        const existingUser = await this.userModel.findOne({email});
        if(existingUser)
        {
            throw new ConflictException('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new this.userModel({email, name, password: hashedPassword});

        return await newUser.save();
    }

    async validateUser(email: string, password: string): Promise <{message: string, token: string, username: string}>{
        const user = await this.userModel.findOne({email});
        if(!user)
        {
            throw new NotFoundException('User not found');
        }

        const isPaswordValid = await bcrypt.compare(password, user.password);
        if(!isPaswordValid)
        {
            throw new UnauthorizedException('Invalid credentails')
        }

        const token = jwt.sign({id: user._id, email: user.email}, 'easygenerator-secret-key', {expiresIn: '24h'})
        return {message: 'Sign in successful', token, username: user.name.split(" ")[0]};
    }
}

