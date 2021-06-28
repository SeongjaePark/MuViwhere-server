import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entity/artist.entity';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistsRepository: Repository<Artist>,
  ) {}

  public async findAll(): Promise<Artist[]> {
    return await this.artistsRepository.find();
  }

  public async findOneById(id: number): Promise<Artist> {
    return await this.artistsRepository.findOneOrFail(id);
  }

  public async findOneByName(name: string): Promise<Artist> {
    return await this.artistsRepository.findOneOrFail({
      where: {
        name,
      },
    });
  }

  public async create(createArtistDto: CreateArtistDto) {
    const existingArtist = await this.artistsRepository.findOne({
      where: {
        name: createArtistDto.name,
        debutDate: createArtistDto.debutDate,
      },
    });

    if (existingArtist) {
      throw new BadRequestException(['The artist is already registered']);
    }

    const artist = new Artist();
    artist.name = createArtistDto.name;
    artist.debutDate = createArtistDto.debutDate;

    return await this.artistsRepository.save(artist);
  }

  public async udpate(id: number, input: UpdateArtistDto) {
    const result = await this.artistsRepository.update(id, input);
    return result.affected;
  }
}
