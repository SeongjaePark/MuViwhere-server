import { Test, TestingModule } from '@nestjs/testing';
import { MusicVideosController } from './music-videos.controller';

describe('MusicVideosController', () => {
  let controller: MusicVideosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MusicVideosController],
    }).compile();

    controller = module.get<MusicVideosController>(MusicVideosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
