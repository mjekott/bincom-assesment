import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'announced_pu_results' })
export class AnnouncedPuResults {
  @PrimaryGeneratedColumn()
  result_id: number;

  @Column()
  polling_unit_uniqueid: number;

  @Column()
  party_abbrevaition: string;

  @Column()
  party_score: number;

  @Column()
  entered_by_user: string;

  @Column()
  date_entered: string;

  @Column()
  user_ip_address: string;
}
