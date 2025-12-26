
import { IsEnum, IsNotEmpty, IsString, IsNumber } from "class-validator";
export class CreateProductDto { 
    @IsString()
    @IsNotEmpty()
    name: string;  
    @IsString()
    @IsNotEmpty()
    brand: string;  
    @IsNotEmpty()
    @IsNumber()
    price: number;
    @IsEnum(['outOfStock', 'inStock', 'Shortage'], { message: 'state must be outOfStock, inStock, or Shortage' })
    state: 'outOfStock' | 'inStock' | 'Shortage'; 
}