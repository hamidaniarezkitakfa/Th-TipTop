import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class CreateBlogDto {
  @IsString()
  @Expose()
  titre: string;

  @IsString()
  @Expose()
  img: string;

  @IsString()
  @Expose()
  description: string;
}
