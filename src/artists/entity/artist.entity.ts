import { MusicVideo } from 'src/music-videos/entity/music-video.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique('unique_artist', ['name', 'debutDate'])
export class Artist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  debutDate: string;

  @OneToMany(() => MusicVideo, (musicVideo) => musicVideo.artist)
  musicVideos: MusicVideo[];
}
