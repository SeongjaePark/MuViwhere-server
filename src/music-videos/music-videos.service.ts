import { Body, forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtistsService } from 'src/artists/artists.service';
import { Artist } from 'src/artists/entity/artist.entity';
import { Repository } from 'typeorm';
import { CreateMusicVideoDto } from './dto/create-music-video.dto';
import { MusicVideo } from './entity/music-video.entity';

@Injectable()
export class MusicVideosService {
  constructor(
    @InjectRepository(MusicVideo)
    private readonly musicVideosRepository: Repository<MusicVideo>,
    @Inject(forwardRef(() => ArtistsService))
    private readonly artistsService: ArtistsService,
  ) {}

  async findAllByArtistId(artistId: number) {
    return await this.musicVideosRepository.find({
      where: {
        artist: artistId,
      },
    });
  }

  async create(createMusicVideoDto: CreateMusicVideoDto) {
    const artist = await this.artistsService.findOneById(
      createMusicVideoDto.artistId,
    );
    const musicVideo = new MusicVideo();
    musicVideo.artist = artist;
    musicVideo.name = createMusicVideoDto.name;
    return await this.musicVideosRepository.save(musicVideo);
  }

  async remove(id: number) {
    const result = await this.musicVideosRepository.delete(id);
    return result.affected;
  }
}
