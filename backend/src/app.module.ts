import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarsModule } from './cars/cars.module';
import { ProvidersModule } from './providers/providers.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [CarsModule, ProvidersModule, CategoriesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
