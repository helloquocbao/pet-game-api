import { IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddCoinDto {
  @ApiProperty({
    description: 'ID của user cần cộng xu',
    example: 1,
  })
  @IsInt()
  userId: number;

  @ApiProperty({
    description: 'Số xu cần cộng (ít nhất là 1)',
    example: 10,
  })
  @IsInt()
  @Min(1)
  coin: number;
}
