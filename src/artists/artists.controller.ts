import {
  Body,
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entity/artist.entity';

@Controller('artists')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Get()
  async find(@Query('name') name: string): Promise<Artist[] | Artist> {
    try {
      return name
        ? await this.artistsService.findOneByName(name)
        : await this.artistsService.findAll();
    } catch (error) {
      throw new NotFoundException(`Artist ${name} not found`);
    }
  }

  @Post()
  async create(@Body() createArtistDto: CreateArtistDto) {
    return await this.artistsService.create(createArtistDto);
  }

  @Get(':id')
  async findOneById(@Param('id') id: number): Promise<Artist> {
    try {
      return await this.artistsService.findOneById(id);
    } catch {
      throw new NotFoundException(`Artist id(${id}) not found`);
    }
  }

  @Patch(':id')
  @HttpCode(204)
  async update(@Param('id') id: number, @Body() input: UpdateArtistDto) {
    const affected = await this.artistsService.udpate(id, input);
    if (affected === 0) {
      throw new NotFoundException();
    }
    return;
  }
}
