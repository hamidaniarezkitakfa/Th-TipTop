import { Expose, Type } from 'class-transformer';
import {
  IsNumber,
  IsString,
  IsDate,
  ValidateNested,
  ArrayMinSize,
} from 'class-validator';
import { CreateJeuxDetailsDto } from '../../jeux-details/dto/create-jeux-details.dto';

export class CreateJeuxDto {
  @IsDate()
  @Expose()
  dateDebut: Date;

  @IsDate()
  @Expose()
  dateFin: Date;

  @IsNumber()
  @Expose()
  nombreDeTicketTotal: number;

  @IsString()
  @Expose()
  description: string;

  @IsString()
  @Expose()
  grandLots: string;

  @ValidateNested({ each: true })
  @Type(() => CreateJeuxDetailsDto)
  @ArrayMinSize(1)
  @Expose()
  jeuxDetails: CreateJeuxDetailsDto[];
}
