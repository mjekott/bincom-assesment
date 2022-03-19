import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'party' })
export class Party {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  partyid: string;

  @Column()
  partyname: string;
}
