import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'lga' })
export class Lga {
  @PrimaryGeneratedColumn()
  uniqueid: number;

  @Column()
  lga_id: number;

  @Column()
  lga_name: string;

  @Column()
  state_id: number;

  @Column()
  lga_description: string;

  @Column()
  entered_by_user: string;

  @Column()
  date_entered: string;

  @Column()
  user_ip_address: string;
}
