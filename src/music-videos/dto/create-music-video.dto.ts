import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMusicVideoDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  artistId: number;
}
