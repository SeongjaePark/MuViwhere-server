import { Body, Controller, Get, Post } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { Artist } from './entity/artist.entity';

@Controller('artists')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Get()
  async findAll(): Promise<Artist[]> {
    return await this.artistsService.findAll();
  }

  @Post()
  async create(@Body() createArtistDto: CreateArtistDto) {
    return await this.artistsService.create(createArtistDto);
  }
}
