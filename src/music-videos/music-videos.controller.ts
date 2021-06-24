import { Body, Controller, Post } from '@nestjs/common';
import { CreateMusicVideoDto } from './dto/create-music-video.dto';
import { MusicVideo } from './entity/music-video.entity';
import { MusicVideosService } from './music-videos.service';

@Controller('music-videos')
export class MusicVideosController {
  constructor(private readonly musicVideosService: MusicVideosService) {}
  @Post()
  async create(
    @Body() createMusicVideoDto: CreateMusicVideoDto,
  ): Promise<MusicVideo> {
    return await this.musicVideosService.create(createMusicVideoDto);
  }
}
