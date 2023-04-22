import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarsModule } from './cars/cars.module';
import { ProvidersModule } from './providers/providers.module';
import { CategoriesModule } from './categories/categories.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './auth/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv'
dotenv.config()
@Module({
  imports: [CarsModule, ProvidersModule, CategoriesModule,ConfigModule.forRoot({
    isGlobal:true
  }), AuthModule,TypeOrmModule.forRoot(
    {
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username:process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
     entities: [User],
    synchronize: true,
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
