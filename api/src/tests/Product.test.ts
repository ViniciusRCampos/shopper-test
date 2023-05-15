import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Model } from 'sequelize';
import Product from '../database/models/Product.Model';
import ProductService from '../services/ProductService';
import IProducts from '../Interfaces/IProducts';
import IData from '../Interfaces/IData';

chai.use(chaiHttp);

const { expect } = chai;

describe('Tests for Products Services and validations', () => {
    afterEach(()=> {
        sinon.restore();
    })
    it('testing readAll function', async () => {
        const outputMock: Product[] = [new Product({
            "code": 1,
            "name": 'Coca-cola 2L',
            "costPrice": 5.25,
            "salesPrice": 9.00,
        })];
        sinon.stub(Model, 'findAll').resolves(outputMock);
        const service = new ProductService();
        const result = await service.readAll()

        expect(result).to.be.equal(outputMock);
        expect(result.length).to.be.equal(1)
    })
    it('testing findProduct function', async () => {
        const inputMock: number = 1
        const outputMock: Product = new Product({
            "code": 1,
            "name": 'Coca-cola 2L',
            "costPrice": 5.25,
            "salesPrice": 9.00,
        });
        sinon.stub(Model, 'findOne').resolves(outputMock);
        const service = new ProductService();
        const result = await service.findProduct(inputMock)

        expect(result).to.be.equal(outputMock.dataValues);

    })
    it('testing updateById function', async () => {
        const data = [new Product(
          {  "code": 1,
            "name": 'Coca-cola 2L',
            "costPrice": 5.25,
            "salesPrice": 9.00,
        })]
        const inputMock: IProducts[] = data
        sinon.stub(Model, 'update').resolves([1]);
        const service = new ProductService();
        const result = await service.updateById(inputMock)

        expect(result).to.be.equal(null);

    })
    it('testing validateCSV function with a invalid Id', async () => {
        const inputMock: IData[] = [
            { 
            product_code: 1,
            new_price: 10 
            }]
        const productService = new ProductService();
        const result = await productService.validateCSV(inputMock);
        expect(result).to.be.an('array');
        expect(result).to.have.lengthOf(inputMock.length);

        const expectedResult: IProducts[] = [
            {
              code: 1,
              name: '',
              costPrice: 0,
              salesPrice: 0,
              newPrice: 10.0,
              error: 'Produto não encontrado',
            },]

            expect(result).to.deep.equal(expectedResult);

    })
    it('testing validateCSV function with a valid Id and valid rules', async () => {
        const inputMock: IData[] = [
            { 
            product_code: 16,
            new_price: 22.15
            }]
            const outputMock: IProducts[] = [
                {
                    code: 16,
                    name: 'AZEITE  PORTUGUÊS  EXTRA VIRGEM GALLO 500ML',
                    costPrice: 18.44,
                    salesPrice: 20.49,
                    newPrice: 22.15
                },
              ];
            const productService = new ProductService();
            const result = await productService.validateCSV(inputMock);
            expect(result[0].code).to.be.equal(outputMock[0].code);
            expect(result[0].name).to.be.equal(outputMock[0].name);
            expect(Number(result[0].costPrice)).to.be.equal(outputMock[0].costPrice);
            expect(Number(result[0].salesPrice)).to.be.equal(outputMock[0].salesPrice);
            expect(result[0].newPrice).to.be.equal(outputMock[0].newPrice);
    })
    it('testing validateCSV function with a valid Id but new_price over 10% of  value adjusment', async () => {
        const inputMock: IData[] = [
            { 
            product_code: 16,
            new_price: 27.15
            }]
            const outputMock: IProducts[] = [
                {
                    code: 16,
                    name: 'AZEITE  PORTUGUÊS  EXTRA VIRGEM GALLO 500ML',
                    costPrice: 18.44,
                    salesPrice: 20.49,
                    newPrice: 27.15,
                    error: 'O novo valor possui um aumento maior que 10% do valor atual'
                },
              ];
            const productService = new ProductService();
            const result = await productService.validateCSV(inputMock);
            expect(result[0].code).to.be.equal(outputMock[0].code);
            expect(result[0].name).to.be.equal(outputMock[0].name);
            expect(Number(result[0].costPrice)).to.be.equal(outputMock[0].costPrice);
            expect(Number(result[0].salesPrice)).to.be.equal(outputMock[0].salesPrice);
            expect(result[0].newPrice).to.be.equal(outputMock[0].newPrice);
            expect(result[0].error).to.be.equal(outputMock[0].error);
    })
    it('testing validateCSV function with a valid Id but with a pack item', async () => {
        const inputMock: IData[] = [
            { 
            product_code: 1020,
            new_price: 27.15
            }]
            const outputMock: IProducts[] = [
                {
                    code: 1020,
                    name: 'SUPER PACK RED BULL VARIADOS - 6 UNIDADES',
                    costPrice: 51.81,
                    salesPrice: 57.00,
                    newPrice: 27.15,
                    error: 'O conjunto do produto não está na lista'
                },
              ];
            const productService = new ProductService();
            const result = await productService.validateCSV(inputMock);
            expect(result[0].code).to.be.equal(outputMock[0].code);
            expect(result[0].name).to.be.equal(outputMock[0].name);
            expect(Number(result[0].costPrice)).to.be.equal(outputMock[0].costPrice);
            expect(Number(result[0].salesPrice)).to.be.equal(outputMock[0].salesPrice);
            expect(result[0].newPrice).to.be.equal(outputMock[0].newPrice);
            expect(result[0].error).to.be.equal(outputMock[0].error);
    })
    it('testing validateCSV function with a valid Id but with a product from a pack item', async () => {
        const inputMock: IData[] = [
            { 
            product_code: 18,
            new_price: 9.50
            }]
            const outputMock: IProducts[] = [
                {
                    code: 18,
                    name: 'BEBIDA ENERGÉTICA VIBE 2L',
                    costPrice: 8.09,
                    salesPrice: 8.99,
                    newPrice: 9.5,
                    error: 'O conjunto do produto não está na lista'
                },
              ];
            const productService = new ProductService();
            const result = await productService.validateCSV(inputMock);
            expect(result[0].code).to.be.equal(outputMock[0].code);
            expect(result[0].name).to.be.equal(outputMock[0].name);
            expect(Number(result[0].costPrice)).to.be.equal(outputMock[0].costPrice);
            expect(Number(result[0].salesPrice)).to.be.equal(outputMock[0].salesPrice);
            expect(result[0].newPrice).to.be.equal(outputMock[0].newPrice);
            expect(result[0].error).to.be.equal(outputMock[0].error);
    })
    it('testing validateCSV function with a valid Id but with a adjusment price below 10%', async () => {
        const inputMock: IData[] = [
            { 
            product_code: 16,
            new_price: 10.00
            }]
            const outputMock: IProducts[] = [
                {
                    code: 16,
                    name: 'AZEITE  PORTUGUÊS  EXTRA VIRGEM GALLO 500ML',
                    costPrice: 18.44,
                    salesPrice: 20.49,
                    newPrice: 10,
                    error: 'O novo valor possui um desconto maior que 10% do valor atual'
                },
              ];
            const productService = new ProductService();
            const result = await productService.validateCSV(inputMock);
            expect(result[0].code).to.be.equal(outputMock[0].code);
            expect(result[0].name).to.be.equal(outputMock[0].name);
            expect(Number(result[0].costPrice)).to.be.equal(outputMock[0].costPrice);
            expect(Number(result[0].salesPrice)).to.be.equal(outputMock[0].salesPrice);
            expect(result[0].newPrice).to.be.equal(outputMock[0].newPrice);
            expect(result[0].error).to.be.equal(outputMock[0].error);
    })
    it('9- testing validateCSV function with a valid Id but with a product from a pack and new price below cost', async () => {
        const inputMock: IData[] = [
            { 
            product_code: 1020,
            new_price: 51.51
            },
            { 
            product_code: 19,
            new_price: 6.57
            },
            { 
            product_code: 21,
            new_price: 10.60
            }]
            const outputMock: IProducts[] = [
                {
                  code: 1020,
                  name: 'SUPER PACK RED BULL VARIADOS - 6 UNIDADES',
                  costPrice: 51.81,
                  salesPrice: 57.00,
                  newPrice: 51.51,
                  error: 'O preço é menor do que o custo'
                },
                {
                  code: 19,
                  name: 'ENERGÉTICO  RED BULL ENERGY DRINK 250ML',
                  costPrice: 6.56,
                  salesPrice: 7.29,
                  newPrice: 6.57
                },
                {
                  code: 21,
                  name: 'BEBIDA ENERGÉTICA RED BULL RED EDITION 250ML',
                  costPrice: 10.71,
                  salesPrice: 11.71,
                  newPrice: 10.6,
                  error: 'O preço é menor do que o custo'
                }
              ];
            const productService = new ProductService();
            const result = await productService.validateCSV(inputMock);
            expect(result[0].code).to.be.equal(outputMock[0].code);
            expect(result[0].name).to.be.equal(outputMock[0].name);
            expect(Number(result[0].costPrice)).to.be.equal(outputMock[0].costPrice);
            expect(Number(result[0].salesPrice)).to.be.equal(outputMock[0].salesPrice);
            expect(result[0].newPrice).to.be.equal(outputMock[0].newPrice);
            expect(result[0].error).to.be.equal(outputMock[0].error);
    })
})