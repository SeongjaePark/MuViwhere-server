import { Artist } from 'src/artists/entity/artist.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MusicVideo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Artist, (artist) => artist.musicVideos, { nullable: false })
  artist: Artist;
}
