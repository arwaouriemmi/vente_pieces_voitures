import { Module } from '@nestjs/common';
import { ProvidersController } from './providers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Providers } from './entities/providers.entity';
import { ProvidersService } from './providers.service';
import { MailingModule } from 'src/mailing/mailing.module';

@Module({
  imports:[TypeOrmModule.forFeature(
    [Providers]
    ),
  MailingModule],
  controllers: [ProvidersController],
  providers: [ProvidersService]
})
export class ProvidersModule {}
