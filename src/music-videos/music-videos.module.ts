import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistsModule } from 'src/artists/artists.module';
import { Artist } from 'src/artists/entity/artist.entity';
import { MusicVideo } from './entity/music-video.entity';
import { MusicVideosController } from './music-videos.controller';
import { MusicVideosService } from './music-videos.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([MusicVideo, Artist]),
    forwardRef(() => ArtistsModule),
  ],
  controllers: [MusicVideosController],
  providers: [MusicVideosService],
})
export class MusicVideosModule {}
