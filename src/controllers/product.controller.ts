import { Request, Response } from "express";
import AppDataSource from "../database/connection";
import { Product } from "../entities/product.entity";
import { validate } from "class-validator";
import { ProductRepository } from "../repositories/product.repository";
import { CreateProductDTO, UpdateProductDTO } from "../dto/create.product.dto";

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

    return response.status(201).send({
      data: productDb,
      status: 201,
    });
  };

  findOne = async (request: Request, response: Response): Promise<Response> => {
    const id = request.params.id;
    const product = await this.productRepository.find(id);

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
  };

  update = async (request: Request, response: Response): Promise<Response> => {
    const id: string = request.params.id;
    const { name, description, price } = request.body;

    const updateDto = new UpdateProductDTO();
    updateDto.id = id;
    updateDto.name = name;
    updateDto.description = description;
    updateDto.price = price;

    const errors = await validate(updateDto);
    if (errors.length > 0) {
      return response.status(422).send({
        errors,
      });
    }

    try {
      const productDb = await this.productRepository.update(updateDto);
      if (!productDb) {
        return response.status(404).send({
          error: "Product Not Found",
        });
      }
      return response.status(200).send({
        data: productDb,
      });
    } catch (error) {
      return response.status(500).send({
        error: "Internal error",
      });
    }
  };

  delete = async (request: Request, response: Response): Promise<Response> => {
    const id = request.params.id;

    try {
      await this.productRepository.delete(id);

      return response.status(204).send({});
    } catch (error) {
      return response.status(500).send({
        error: "Error deleting",
      });
    }
  };
}

export default new ProductController();
