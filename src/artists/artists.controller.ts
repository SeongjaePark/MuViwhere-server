import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { Artist } from './entity/artist.entity';

@Controller('artists')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Get()
  async find(@Query('name') name: string): Promise<Artist[] | Artist> {
    try {
      return name ? await this.artistsService.findOneByName(name) : await this.artistsService.findAll();
    } catch (error) {
      throw new NotFoundException(`Artist ${name} not found`);

    }
  }

  @Get(':id')
  async findOneById(@Param('id') id: number): Promise<Artist> {
    try {
      return await this.artistsService.findOneById(id);
    } catch {
      throw new NotFoundException(`Artist id(${id}) not found`);
    }
  }

  @Post()
  async create(@Body() createArtistDto: CreateArtistDto) {
    return await this.artistsService.create(createArtistDto);
  }
}
