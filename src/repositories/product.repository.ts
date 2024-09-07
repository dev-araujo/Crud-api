import { Repository } from "typeorm";
import { Product } from "../entities/product.entity";
import AppDataSource from "../database/connection";
import CreateProductDTO from "../dto/create.product.dto";

export class ProductRepository {
  private repository: Repository<Product>;
  constructor() {
    this.repository = AppDataSource.getRepository(Product);
  }

  async getAll(): Promise<Product[]> {
    return await this.repository.find();
  }

  async create(input: CreateProductDTO): Promise<Product> {
    const product = new Product();
    product.name = input.name;
    product.price = input.price;
    product.description = input.description;
    return await this.repository.save(product);
  }
}
