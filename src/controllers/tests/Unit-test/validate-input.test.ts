import validateRequest from "@/src/middlewares/validate-input";
import { Request, Response, NextFunction } from "express";
import ProductCreateSchema from "@/src/schemas/product.schema";
import { InvalidInputError } from "@/src/utils/error";
describe("validateRequest middleware", () => {
  let nextFunction: NextFunction;
  beforeEach(() => {
    nextFunction = jest.fn();
  });

  const schema = ProductCreateSchema;

  //case 1
  it("Should call next if validate pass", () => {
    const req = {
      body: {
        name: "Test",
        category: "Lorem",
        price: 10,
        stock: 10,
      },
    } as Request;
    const res = {} as Response;
    validateRequest(schema)(req, res, nextFunction);
    expect(nextFunction).toHaveBeenCalled();
    expect(nextFunction).toHaveBeenCalledTimes(1);
  });

  //case 2
  it(`should throw invalidInputError if validate fail`, () => {
    const req = {
      body: {
        name: "Test",
        category: "Lorem",
        price: 10,
        stock: -1,
      },
    } as Request;
    const res = {} as Response;
    validateRequest(schema)(req, res, nextFunction);
    expect(nextFunction).toHaveBeenCalledWith(expect.any(InvalidInputError));
    expect(nextFunction).toHaveBeenCalledTimes(1);
  });

  //case 3
  it(`should throw invalidInputError if unkown properties are present`, () => {
    const req = {
      body: {
        name: "Test",
        category: "lorem",
        price: 10,
        stock: 10,
        unknownProp: "should not be here",
      },
    } as Request;
    const res = {} as Response;
    validateRequest(schema)(req, res, nextFunction);
    expect(nextFunction).toHaveBeenCalledWith(expect.any(InvalidInputError));
    expect(nextFunction).toHaveBeenCalledTimes(1);
  });
});

// import validateRequest from "@/src/middlewares/validate-input";
// import { Request, Response, NextFunction } from "express";
// import Joi from "joi";

// describe("validateInput Middleware", () => {
//   let req: Partial<Request>;
//   let res: Partial<Response>;
//   let next: NextFunction;

//   beforeEach(() => {
//     req = {
//       body: {},
//     };
//     res = {
//       status: jest.fn().mockReturnThis(), // Allows chaining
//       json: jest.fn(),
//     };
//     next = jest.fn();
//   });

//   const schema = Joi.object({
//     name: Joi.string().required(),
//     category: Joi.string().required(),
//   });

//   it("should return 400 if validation fails", () => {
//     req.body = { category: "lorem" }; // Missing 'name' field

//     const middleware = validateRequest(schema);
//     middleware(req as Request, res as Response, next);

//     expect(res.status).toHaveBeenCalledWith(400);
//     expect(res.json).toHaveBeenCalledWith({
//       message: "Validation failed",
//       errors: ['"name" is required'],
//     });
//   });

//   it("should call next if validation succeeds", () => {
//     req.body = { name: "Milk", category: "lorem" };

//     const middleware = validateRequest(schema);
//     middleware(req as Request, res as Response, next);

//     expect(next).toHaveBeenCalled();
//   });
// });
