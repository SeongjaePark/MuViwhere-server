import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistsService } from './artists.service';
import { Artist } from './entity/artist.entity';
import { ArtistsController } from './artists.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Artist])],
  providers: [ArtistsService],
  controllers: [ArtistsController],
})
export class ArtistsModule {}
