import ProductRepository from "@/src/database/repositories/product.repository";
import ProductsModel from "@/src/database/models/products.model";
import {
  ProductCreateRequest,
  ProductUpdateRequest,
} from "@/src/controllers/types/product-request.type";
import { NotFoundError } from "@/src/utils/error";
import { ProductTypes } from "@/src/types/product.type";
// Mock the ProductsModel methods
jest.mock("@/src/database/models/products.model");

//create product
describe("ProductRepository - createProduct", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Reset all mocks after each test
  });

  it("should create a product successfully", async () => {
    const mockProductRequest: ProductCreateRequest = {
      name: "New Product",
      category: "Test Category",
      price: 100,
      stock: 50,
    };

    const mockCreatedProduct = { id: "1", ...mockProductRequest };

    // Mock the create method to return a mocked product
    (ProductsModel.create as jest.Mock).mockResolvedValue(mockCreatedProduct);

    const result = await ProductRepository.createProduct(mockProductRequest);

    expect(result).toEqual(mockCreatedProduct); // Check if the returned product matches the mocked one
    expect(ProductsModel.create).toHaveBeenCalledWith(mockProductRequest); // Check if create was called with the right parameters
  });

  it("should throw an error if product creation fails", async () => {
    const mockProductRequest: ProductCreateRequest = {
      name: "New Product",
      category: "Test Category",
      price: 100,
      stock: 50,
    };

    // Mock the create method to throw an error
    (ProductsModel.create as jest.Mock).mockRejectedValue(
      new Error("Creation error")
    );

    await expect(
      ProductRepository.createProduct(mockProductRequest)
    ).rejects.toThrow("Creation error"); // Check if the error is thrown
  });
});

//get product by id
describe("ProductRepository - getOneProductById", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Reset all mocks after each test
  });

  it("should return a product if found", async () => {
    const mockProduct: ProductTypes = {
      name: "Product 1",
      category: "Test Category",
      price: 100,
      stock: 50,
    };

    // Mock the findById method to return a mocked product
    (ProductsModel.findById as jest.Mock).mockResolvedValue(mockProduct);

    const result = await ProductRepository.getOneProductById("1");

    expect(result).toEqual(mockProduct); // Check if the returned product matches the mocked one
    expect(ProductsModel.findById).toHaveBeenCalledWith("1"); // Check if findById was called with the right parameter
  });

  it("should throw NotFoundError if product not found", async () => {
    // Mock the findById method to return null
    (ProductsModel.findById as jest.Mock).mockResolvedValue(null);

    await expect(ProductRepository.getOneProductById("1")).rejects.toThrow(
      NotFoundError
    ); // Check if the NotFoundError is thrown
    await expect(ProductRepository.getOneProductById("1")).rejects.toThrow(
      "Product not found11"
    ); // Check if the error message is correct
  });

  it("should throw an error if database operation fails", async () => {
    // Mock the findById method to throw an error
    (ProductsModel.findById as jest.Mock).mockRejectedValue(
      new Error("Database error")
    );

    await expect(ProductRepository.getOneProductById("1")).rejects.toThrow(
      "Database error"
    ); // Check if the correct error is thrown
  });
});

//update
describe("ProductRepository - updateProductById", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Reset all mocks after each test
  });

  it("should update a product successfully", async () => {
    const mockProductUpdateRequest: ProductUpdateRequest = {
      name: "Updated Product",
      category: "lorem",
      price: 150,
      stock: 30,
    };

    const mockUpdatedProduct: ProductTypes = {
      name: "Updated Product",
      category: "lorem",
      price: 150,
      stock: 30,
    };

    // Mock the findByIdAndUpdate method to return a mocked updated product
    (ProductsModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(
      mockUpdatedProduct
    );

    const result = await ProductRepository.updateProductById(
      "1",
      mockProductUpdateRequest
    );

    expect(result).toEqual(mockUpdatedProduct); // Check if the returned product matches the mocked updated product
    expect(ProductsModel.findByIdAndUpdate).toHaveBeenCalledWith(
      "1",
      mockProductUpdateRequest,
      { new: true }
    ); // Check if the method was called with correct parameters
  });

  it("should throw NotFoundError if product not found during update", async () => {
    const mockProductUpdateRequest: ProductUpdateRequest = {
      name: "Updated Product",
      price: 150,
      stock: 30,
    };

    // Mock the findByIdAndUpdate method to return null
    (ProductsModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

    await expect(
      ProductRepository.updateProductById("1", mockProductUpdateRequest)
    ).rejects.toThrow(NotFoundError); // Check if NotFoundError is thrown
    await expect(
      ProductRepository.updateProductById("1", mockProductUpdateRequest)
    ).rejects.toThrow("Product not found"); // Check if the error message is correct
  });

  it("should throw an error if database operation fails", async () => {
    const mockProductUpdateRequest: ProductUpdateRequest = {
      name: "Updated Product",
      price: 150,
      stock: 30,
    };

    // Mock the findByIdAndUpdate method to throw an error
    (ProductsModel.findByIdAndUpdate as jest.Mock).mockRejectedValue(
      new Error("Database error")
    );

    await expect(
      ProductRepository.updateProductById("1", mockProductUpdateRequest)
    ).rejects.toThrow("Database error"); // Check if the correct error is thrown
  });
});

//delete
describe("ProductRepository - deleteProductById", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Reset all mocks after each test
  });

  it("should delete a product successfully", async () => {
    const mockProduct: ProductTypes = {
      name: "Product to Delete",
      category: "Test Category",
      price: 100,
      stock: 50,
    };

    // Mock the findByIdAndDelete method to return a mocked product
    (ProductsModel.findByIdAndDelete as jest.Mock).mockResolvedValue(
      mockProduct
    );

    const result = await ProductRepository.deleteProductById("1");

    expect(result).toEqual(mockProduct); // Check if the returned product matches the mocked one
    expect(ProductsModel.findByIdAndDelete).toHaveBeenCalledWith("1"); // Check if the method was called with the correct parameter
  });

  it("should throw NotFoundError if product not found during deletion", async () => {
    // Mock the findByIdAndDelete method to return null
    (ProductsModel.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

    await expect(ProductRepository.deleteProductById("1")).rejects.toThrow(
      NotFoundError
    ); // Check if NotFoundError is thrown
    await expect(ProductRepository.deleteProductById("1")).rejects.toThrow(
      "Product not found"
    ); // Check if the error message is correct
  });

  it("should throw an error if database operation fails", async () => {
    // Mock the findByIdAndDelete method to throw an error
    (ProductsModel.findByIdAndDelete as jest.Mock).mockRejectedValue(
      new Error("Database error")
    );

    await expect(ProductRepository.deleteProductById("1")).rejects.toThrow(
      "Database error"
    ); // Check if the correct error is thrown
  });
});
// // import ProductRepository from "@/src/database/repositories/product.repository";
// // import ProductsModel from "@/src/database/models/products.model";
// // import { NotFoundError } from "@/src/utils/error";

// // // Mock the ProductsModel methods
// // jest.mock("@/src/database/models/products.model");

// // describe("ProductRepository", () => {
// //   afterEach(() => {
// //     jest.clearAllMocks(); // Reset all mocks after each test
// //   });

// //   describe("getAll", () => {
// //     it("should return products with pagination data", async () => {
// //       const mockProducts = [{ id: "1", name: "Product 1" }];
// //       const mockCount = 1;

// //       (ProductsModel.find as jest.Mock).mockReturnValue({
// //         sort: jest.fn().mockReturnThis(),
// //         skip: jest.fn().mockReturnThis(),
// //         limit: jest.fn().mockResolvedValue(mockProducts),
// //       });
// //       (ProductsModel.countDocuments as jest.Mock).mockResolvedValue(mockCount);

// //       const result = await ProductRepository.getAll({
// //         page: 1,
// //         limit: 5,
// //         filter: {},
// //         sort: { name: "desc" },
// //       });

// //       expect(result).toEqual({
// //         products: mockProducts,
// //         totalItems: mockCount,
// //         totalPages: 1,
// //         currentPage: 1,
// //       });
// //     });

// //     it("should throw an error if database operation fails", async () => {
// //       (ProductsModel.find as jest.Mock).mockReturnValue({
// //         sort: jest.fn().mockReturnThis(),
// //         skip: jest.fn().mockReturnThis(),
// //         limit: jest.fn().mockRejectedValue(new Error("Database error")),
// //       });

// //       await expect(
// //         ProductRepository.getAll({ page: 1, limit: 5, filter: {}, sort: {} })
// //       ).rejects.toThrow("Database error");
// //     });
// //   });

// //   describe("getOneProductById", () => {
// //     it("should return a product if found", async () => {
// //       const mockProduct = { id: "1", name: "Product 1" };
// //       (ProductsModel.findById as jest.Mock).mockResolvedValue(mockProduct);

// //       const result = await ProductRepository.getOneProductById("1");
// //       expect(result).toEqual(mockProduct);
// //     });

// //     it("should throw NotFoundError if product not found", async () => {
// //       (ProductsModel.findById as jest.Mock).mockResolvedValue(null);

// //       await expect(ProductRepository.getOneProductById("1")).rejects.toThrow(
// //         NotFoundError
// //       );
// //     });
// //   });

// //   describe("createProduct", () => {
// //     it("should create a product successfully", async () => {
// //       const mockProduct = { id: "1", name: "New Product" };
// //       (ProductsModel.create as jest.Mock).mockResolvedValue(mockProduct);

// //       const result = await ProductRepository.createProduct({
// //         name: "New Product",
// //         category: "Test",
// //         price: 100,
// //         stock: 50,
// //       });

// //       expect(result).toEqual(mockProduct);
// //     });

// //     it("should throw an error if creation fails", async () => {
// //       (ProductsModel.create as jest.Mock).mockRejectedValue(
// //         new Error("Creation error")
// //       );

// //       await expect(
// //         ProductRepository.createProduct({
// //           name: "New Product",
// //           category: "Test",
// //           price: 100,
// //           stock: 50,
// //         })
// //       ).rejects.toThrow("Creation error");
// //     });
// //   });

// //   describe("updateProductById", () => {
// //     it("should update a product successfully", async () => {
// //       const mockProduct = { id: "1", name: "Updated Product" };
// //       (ProductsModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(
// //         mockProduct
// //       );

// //       const result = await ProductRepository.updateProductById("1", {
// //         name: "Updated Product",
// //       });

// //       expect(result).toEqual(mockProduct);
// //     });

// //     it("should throw NotFoundError if product not found during update", async () => {
// //       (ProductsModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

// //       await expect(
// //         ProductRepository.updateProductById("1", { name: "Updated Product" })
// //       ).rejects.toThrow(NotFoundError);
// //     });
// //   });

// //   describe("deleteProductById", () => {
// //     it("should delete a product successfully", async () => {
// //       const mockProduct = { id: "1", name: "Deleted Product" };
// //       (ProductsModel.findByIdAndDelete as jest.Mock).mockResolvedValue(
// //         mockProduct
// //       );

// //       const result = await ProductRepository.deleteProductById("1");
// //       expect(result).toEqual(mockProduct);
// //     });

// //     it("should throw NotFoundError if product not found during deletion", async () => {
// //       (ProductsModel.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

// //       await expect(ProductRepository.deleteProductById("1")).rejects.toThrow(
// //         NotFoundError
// //       );
// //     });
// //   });
// // });
