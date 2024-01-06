import { IsArray, IsDate, IsNumber } from 'class-validator';

export class CreateGainDto {
  @IsDate()
  dateDeRecuperation: Date;

  @IsDate()
  dateLimiteDeRecuperation: Date;

  @IsArray()
  @IsNumber({}, { each: true })
  ticketIds: number[];
}
