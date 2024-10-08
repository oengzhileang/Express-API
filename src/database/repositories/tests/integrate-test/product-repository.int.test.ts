import ProductsModel from "@/src/database/models/products.model";
import ProductRepository from "@/src/database/repositories/product.repository";
import { ProductCreateRequest } from "@/src/controllers/types/product-request.type";
// import { ProductTypes } from "@/src/types/product.type";
import mongoose from "mongoose";
//get All
// describe("getAllProducts", () => {
//   it("should return paginated products with filters and sorting", async () => {
// const mockProducts: ProductTypes[] = [
//   {
//     //   _id: new mongoose.Types.ObjectId(),
//     name: "Product 1",
//     category: "new",
//     price: 100,
//     stock: 10,
//   },
//   {
//     //   _id: new mongoose.Types.ObjectId(),
//     name: "Product 2",
//     category: "new",
//     price: 150,
//     stock: 10,
//   },
// ];

// Insert mock products into the database
// await ProductsModel.insertMany(mockProducts);

// Fetch products using the repository method
// const result = await ProductRepository.getAll({
//   page: 1,
//   limit: 2,
//   filter: { category: "new" },
//   sort: { name: "desc" },
// });

// console.log(result); // Ensure this is showing the expected structure

// // Assertions
// expect(result.products).toHaveLength(2); // Expect 2 products
// expect(result.products).toEqual(
//   expect.arrayContaining([
//     expect.objectContaining({
//       name: "Product 1",
//       category: "new",
//       price: 100,
//       stock: 10,
//     }),
//     expect.objectContaining({
//       name: "Product 2",
//       category: "new",
//       price: 150,
//       stock: 10,
//     }),
//   ])
// );

// Check pagination-related fields
// expect(result.totalItems).toBe(2);
// expect(result.totalPages).toBe(1);
// expect(result.currentPage).toBe(1);
//   });
// });

//create product
describe(`ProductRepository - createProduct Integration test`, () => {
  const mongoURL =
    "mongodb+srv://oengzhileang:1234567890@mernapp.bw43k.mongodb.net/test";

  beforeAll(async () => {
    await mongoose.connect(mongoURL, {
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, // Increase the timeout to 30 seconds
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  afterEach(async () => {
    await ProductsModel.deleteMany({});
  });
  it("should successfully create a product and return the created product", async () => {
    const newProductRequest: ProductCreateRequest = {
      name: "Cambodia",
      category: "Test Category",
      price: 100,
      stock: 1000,
    };

    //create a product
    const result = await ProductRepository.createProduct(newProductRequest);

    // const fetchedProduct = await ProductsModel.findById(result._id)

    //Assertion
    expect(result).toMatchObject(newProductRequest);
  });
});
