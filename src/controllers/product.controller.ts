import { Request, Response } from "express";
import AppDataSource from "../database/connection";
import { Product } from "../entities/product.entity";
import { validate } from "class-validator";
import { ProductRepository } from "../repositories/product.repository";
import CreateProductDTO from "../dto/create.product.dto";

class ProductController {
  private productRepository: ProductRepository;
  constructor() {
    this.productRepository = new ProductRepository();
  }
  findAll = async (request: Request, response: Response): Promise<Response> => {
    const products = await this.productRepository.getAll();

    return response.status(200).send({
      data: products,
      status: 200,
    });
  };

  create = async (request: Request, response: Response): Promise<Response> => {
    const { name, description, price } = request.body;

    const dto = new CreateProductDTO();
    dto.name = name;
    dto.description = description;
    dto.price = price;

    const productDb = await this.productRepository.create(dto);
    // const productRepository = AppDataSource.getRepository(Product);

    // const product = new Product();
    // [product.name, product.price, product.description] = [
    //   name,
    //   price,
    //   description,
    // ];

    // const errors = await validate(product);
    // if (errors.length > 0) {
    //   return response.status(422).send({
    //     errors,
    //   });
    // }

    // const productDb = await productRepository.save(product);

    return response.status(201).send({
      data: productDb,
      status: 201,
    });
  };

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

    const errors = await validate(product);
    if (errors.length > 0) {
      return response.status(422).send({
        errors,
      });
    }

    const productDB = await productRepository.save(product);
    return response.status(200).send({
      data: productDB,
      status: 200,
    });
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const id = request.params.id;

    const productRepository = AppDataSource.getRepository(Product);

    try {
      await productRepository.delete(id);
      return response.status(204).send({});
    } catch (error) {
      return response.status(500).send({
        error: "Error deleting",
      });
    }
  }
}

export default new ProductController();
