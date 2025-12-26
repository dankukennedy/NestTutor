import { Body, Controller, Delete, Get, Param, Patch, Post, Query ,ParseIntPipe} from '@nestjs/common';
import { ProductsService } from './products.service';

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
    create(@Body() products: {name:string, brand:string, price:number, state: 'outOfStock' | 'inStock'|'Shortage'}) {
        return this.productsService.create(products);
    }

    @Patch(':id') //PATCH /products/:id
    update(@Param('id',ParseIntPipe) id: number, @Body() productsUpdate:{name?:string, brand?:string, price?:number, state?: 'outOfStock' | 'inStock'|'Shortage'}) {
        return this.productsService.update(id, productsUpdate);
    }

    @Delete(':id') //DELETE /products/:id
    delete(@Param('id',ParseIntPipe) id: number) {
        return this.productsService.delete(id);
    }
}
