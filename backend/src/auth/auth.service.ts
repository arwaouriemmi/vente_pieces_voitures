import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { LoginCredentialsDto } from "./dtos/login-credentials.dto";
import { User } from "./entities/user.entity";
import * as bcrypt from 'bcrypt'
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm/repository/Repository";
@Injectable()
export class AuthService{
    constructor(@InjectRepository(User)
    private userRepository :Repository<User>,
    private jwtService:JwtService){}
    async register(credentials:Partial<User>){
 const user=await this.userRepository.create({
    ...credentials
 })
 user.salt=await bcrypt.genSalt();
 user.password= await bcrypt.hash(user.password,user.salt)
 try{
 return await this.userRepository.save(user)
 }catch(e){
    throw new ConflictException('Le login et le mot de passe doivent être uniques')
 }
    }
  
    async login(credentials: LoginCredentialsDto) {
      const { login, password } = credentials;
      console.log(login)
      const user = await this.userRepository.createQueryBuilder("user").
        where("user.username= :login or user.email= :login", { login }).getOne();
    
      if (!user) {
        throw new NotFoundException("Le login ou le mot de passe est incorrect.");
      }
    
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
    
      if (isPasswordCorrect) {
        const payload = {
          username: user.username,
          email: user.email,
          role: user.role
        }
        const token = await this.jwtService.sign(payload);
    
        return {
          "token": token
        }
      } else {
        throw new NotFoundException("Le login ou le mot de passe est incorrect.");
      }
    }
    
}