import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'polling_unit' })
export class PollingUnit {
  @PrimaryGeneratedColumn()
  uniqueid: number;

  @Column({ type: 'int' })
  polling_unit_id: number;

  @Column({ type: 'int' })
  ward_id: number;

  @Column({ type: 'int' })
  lga_id: number;

  @Column({ type: 'int' })
  uniquewardid: number;

  @Column({ type: 'varchar' })
  polling_unit_number: string;

  @Column({ type: 'varchar' })
  polling_unit_name: string;

  @Column({ type: 'text', nullable: true })
  polling_unit_description: string;

  @Column({ type: 'varchar' })
  lat: number;

  @Column({ type: 'varchar' })
  long: number;

  @Column({ type: 'varchar', nullable: true })
  entered_by_user: number;

  @Column({ type: 'varchar', nullable: true })
  date_entered: string;

  @Column({ type: 'varchar', nullable: true })
  user_ip_address: string;
}
