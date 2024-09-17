import { Repository } from "typeorm";
import { Product } from "../entities/product.entity";
import AppDataSource from "../database/connection";
import { CreateProductDTO, UpdateProductDTO } from "../dto/create.product.dto";
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

  async find(id: string): Promise<Product | null> {
    return await this.repository.findOneByOrFail({ id });
  }

  async delete(id: string) {
    await this.repository.delete(id);
  }

  async update(input: UpdateProductDTO): Promise<Product | null> {
    const product = await this.find(input.id);
    if (!product) {
      return null;
    }

    product.name = input.name;
    product.description = input.description;
    product.price = input.price;

    return await this.repository.save(product);
  }
}
