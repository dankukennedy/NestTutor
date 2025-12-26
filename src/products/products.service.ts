import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-products.dto';
import { UpdateProductDto } from './dto/update-products-dto';

@Injectable()
export class ProductsService {
    private products = [
        { id: 1, name: 'Product A', brand: 'Brand A', price: 100, state: 'inStock' },
        { id: 2, name: 'Product B', brand: 'Brand B', price: 150, state: 'inStock' },
        { id: 3, name: 'Product C', brand: 'Brand C', price: 200, state: 'outOfStock' },
        { id: 4, name: 'Product D', brand: 'Brand D', price: 250, state: 'Shortage' },
        { id: 5, name: 'Product E', brand: 'Brand E', price: 300, state: 'inStock' }
    ];

    findAll(state?: 'outOfStock' | 'inStock' | 'Shortage') {
        if(state) {
            return this.products.filter(product => product.state === state);
        }
        return this.products;
    }

    findOne(id: number) {
        const  product = this.products.find(product => product.id === id);
        return product;
    }

    create(createProductDto: CreateProductDto) {
        const productByHighestId = [...this.products].sort((a, b) => b.id - a.id);
        const newProduct = {
            id: productByHighestId[0].id + 1,
            ...createProductDto         
        };
        this.products.push(newProduct);
        return newProduct;
    }


    update(id: number, updateProductDto: UpdateProductDto) {
        this.products = this.products.map(product => {
            if (product.id === id) {
                return { ...product, ...updateProductDto  };
            }
            return product;
        }); 
        return this.findOne(id);
    }
    
    delete(id: number) {
        const productToDelete = this.findOne(id);
        this.products = this.products.filter(product => product.id !== id);
        return productToDelete;
    }

}