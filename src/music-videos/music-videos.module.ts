import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistsModule } from 'src/artists/artists.module';
import { MusicVideo } from './entity/music-video.entity';
import { MusicVideosController } from './music-videos.controller';
import { MusicVideosService } from './music-videos.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([MusicVideo]),
    forwardRef(() => ArtistsModule),
  ],
  controllers: [MusicVideosController],
  providers: [MusicVideosService],
})
export class MusicVideosModule {}
