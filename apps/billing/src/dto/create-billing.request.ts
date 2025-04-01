import {
  IsNotEmpty,
  IsPhoneNumber,
  IsString
} from 'class-validator';

export class CreateBillingRequest {
  @IsString()
  @IsNotEmpty()
  orderId: string;

  @IsPhoneNumber()
  phoneNumber: string;
}
