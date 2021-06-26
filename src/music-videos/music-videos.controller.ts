import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CreateMusicVideoDto } from './dto/create-music-video.dto';
import { MusicVideo } from './entity/music-video.entity';
import { MusicVideosService } from './music-videos.service';

@Controller('music-videos')
export class MusicVideosController {
  constructor(private readonly musicVideosService: MusicVideosService) {}

  @Get()
  async findAllByArtistId(@Query('artistId') artistId: number) {
    const videos = await this.musicVideosService.findAllByArtistId(artistId);
    if (videos.length > 0) {
      return videos;
    } else {
      throw new NotFoundException();
    }
  }

  @Post()
  async create(
    @Body() createMusicVideoDto: CreateMusicVideoDto,
  ): Promise<MusicVideo> {
    return await this.musicVideosService.create(createMusicVideoDto);
  }

  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    const affected = await this.musicVideosService.remove(id);
    if (affected === 1) {
      return;
    } else {
      throw new NotFoundException();
    }
  }
}
