import { Request, Response } from "express";
import AppDataSource from "../database/connection";
import { Product } from "../entities/product.entity";
import { Repository } from "typeorm";
import bodyParser from "body-parser";

class ProductController {
  private productRepository: Repository<Product>;
  constructor() {
    this.productRepository = AppDataSource.getRepository(Product);
  }
  async findAll(request: Request, response: Response): Promise<Response> {
    const productRepository = AppDataSource.getRepository(Product);
    const products = await productRepository.find();

    return response.status(200).send({
      data: products,
      status: 200,
    });
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { name, description, price } = request.body;
    const productRepository = AppDataSource.getRepository(Product);

    const product = new Product();
    [product.name, product.price, product.description] = [
      name,
      price,
      description,
    ];

    const productDb = await productRepository.save(product);

    return response.status(201).send({
      data: productDb,
      status: 201,
    });
  }

  async findOne(request: Request, response: Response): Promise<Response> {
    const id = request.params.id;
    const productRepository = AppDataSource.getRepository(Product);
    const product = await productRepository.findOneBy({ id });

    if (!product) {
      return response.status(404).send({
        error: "Product not found!",
        status: 404,
      });
    }

    return response.status(200).send({
      data: product,
      status: 200,
    });
  }

  async update(request: Request, response: Response): Promise<Response> {
    const id = request.params.id;

    const { name, description, price } = request.body;
    const productRepository = AppDataSource.getRepository(Product);
    let product = await productRepository.findOneByOrFail({ id });

    [product.name, product.price, product.description] = [
      name,
      price,
      description,
    ];
    const productDB = await productRepository.save(product);
    return response.status(200).send({
      data: productDB,
      status: 200,
    });
  }
}

export default new ProductController();
