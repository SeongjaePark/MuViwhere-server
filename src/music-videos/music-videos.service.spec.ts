import { Test, TestingModule } from '@nestjs/testing';
import { MusicVideosService } from './music-videos.service';

describe('MusicVideosService', () => {
  let service: MusicVideosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MusicVideosService],
    }).compile();

    service = module.get<MusicVideosService>(MusicVideosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
