import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const config: TypeOrmModuleOptions = {
  type: 'postgres',
  username: 'postgres',
  host: 'db-restore.cavgzh4b8fdu.eu-north-1.rds.amazonaws.com',
  database: 'tiptop_db',
  password: 'postgres',
  port: 5432,
  synchronize: true,
  logging: true,
  //cache: true,
  entities: ['dist/**/*.entity{.ts,.js}'],
};

