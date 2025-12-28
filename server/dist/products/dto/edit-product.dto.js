"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditProductDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_product_dto_1 = require("./create-product.dto");
class EditProductDto extends (0, mapped_types_1.PartialType)(create_product_dto_1.CreateProductDto) {
}
exports.EditProductDto = EditProductDto;
//# sourceMappingURL=edit-product.dto.js.map