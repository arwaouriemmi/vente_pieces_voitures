import { Module } from '@nestjs/common';
import { ProvidersController } from './providers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Providers } from './entities/providers.entity';
import { ProvidersService } from './providers.service';

@Module({
  imports:[TypeOrmModule.forFeature(
    [Providers]
    )],
  controllers: [ProvidersController],
  providers: [ProvidersService]
})
export class ProvidersModule {}
