import { Body, Controller, Delete, Get, Param, Patch, Post, Query ,ParseIntPipe ,ValidationPipe} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-products.dto';
import { UpdateProductDto } from './dto/update-products-dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
    @Get()  //GET /products
    findAll(@Query('state') state?: 'outOfStock' | 'inStock'|'Shortage') {
        return  this.productsService.findAll(state);
    }

    @Get(':id') //GET /products/:id
    findOne(@Param('id',ParseIntPipe) id: number) {
        return this.productsService.findOne(id);
    }

    @Post() //POST /products
    create(@Body(ValidationPipe) createProductDto: CreateProductDto) {
        return this.productsService.create(createProductDto);
    }

    @Patch(':id') //PATCH /products/:id
    update(@Param('id',ParseIntPipe) id: number, @Body(ValidationPipe) updateProductDto: UpdateProductDto) {
        return this.productsService.update(id, updateProductDto);
    }

    @Delete(':id') //DELETE /products/:id
    delete(@Param('id',ParseIntPipe) id: number) {
        return this.productsService.delete(id);
    }
}
