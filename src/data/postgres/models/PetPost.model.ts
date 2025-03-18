import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum PostStatus {
	PENDING = 'PENDING',
	APPROVED = 'APPROVED',
	REJECTED = 'REJECTED',
}

@Entity()
export class PetPost extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('varchar', {
		length: 60,
		nullable: false,
	})
	pet_name: string;

	@Column('text', {
		nullable: false,
	})
	description: string;

	@Column('varchar', {
		length: 255,
		nullable: true,
	})
	image_url: string;

	@Column('enum', {
		enum: PostStatus,
		default: PostStatus.PENDING,
	})
	status: PostStatus;

	@Column('boolean', {
		default: false,
		nullable: false,
	})
	hasFounded: boolean;

	@Column('timestamp', {
		default: () => 'CURRENT_TIMESTAMP',
		nullable: false,
	})
	created_at: Date;
}
