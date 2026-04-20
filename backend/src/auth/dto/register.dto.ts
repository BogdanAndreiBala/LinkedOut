import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty() firstName: string;
  @ApiProperty() lastName: string;
  @ApiProperty() email: string;
  @ApiProperty() password: string;
  @ApiProperty({ required: false }) profileImage?: string;
  @ApiProperty({ required: false }) headline?: string;
  @ApiProperty({ required: false }) dateOfBirth?: string;
  @ApiProperty({ required: false }) phone?: string;
  @ApiProperty({ required: false }) location?: string;
  @ApiProperty({ required: false }) about?: string;
  @ApiProperty({ required: false }) website?: string;
}
