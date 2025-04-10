import { IsString, IsOptional, IsInt, Min } from 'class-validator';

export class CreatePetDto {
  @IsString()
  name: string;

  @IsString()
  species: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  hp?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  damage?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  luck?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  stamina?: number;
}
