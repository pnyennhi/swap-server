const _ = require("lodash");
const models = require("../models");
const auth = require("../utils/auth");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

async function getCategory(path) {
  const categoryPath = path.includes("/")
    ? path.slice(0, path.indexOf("/"))
    : path;
  // const subCatePath = path.includes("/")
  //   ? path.slice(path.indexOf("/"), path.length)
  //   : null;

  if (!path.includes("/")) {
    const category = await models.Category.findOne({
      where: { path: categoryPath },
    });

    const categoryId = category.dataValues.id;

    const subCates = await models.SubCategory.findAll({
      where: { parentId: categoryId },
    });

    return subCates.map((item) => item.dataValues.id);
  }

  const subCate = await models.SubCategory.findOne({ where: { path: path } });

  return [subCate.dataValues.id];
}

class ProductController {
  async getAllProducts(req, res) {
    try {
      const {
        page,
        pageSize,
        sort,
        criteria,
        keyword,
        category,
        categoryId,
        subCategoryId,
        condition,
        minPrice,
        maxPrice,
        statusId,
        userId,
        name,
        id,
        size,
        fromDate,
        toDate,
        isSold = true,
      } = req.query;

      const query = { where: {} };

      query.offset = pageSize && page ? pageSize * (page - 1) : 0;
      query.limit = pageSize ? parseInt(pageSize) : null;
      query.order =
        criteria && sort && criteria !== "owner"
          ? [[criteria, sort]]
          : [["createdAt", "desc"]];

      if (categoryId) {
        const subCates = await models.SubCategory.findAll({
          where: { parentId: categoryId },
        });

        query.where.subCategoryId = subCates.map((item) => item.dataValues.id);
      }
      // if (subCategoryId) {
      //   query.where.subCategoryId = subCategoryId;
      // }
      if (category) {
        query.where.subCategoryId = await getCategory(category);
      }

      if (condition) {
        query.where.conditionId = condition;
      }

      if (subCategoryId) {
        query.where.subCategoryId = [
          ...(query.where.subCategoryId ?? []),
          subCategoryId,
        ];
      }

      if (minPrice && maxPrice) {
        query.where.price = {
          [Op.and]: { [Op.gte]: Number(minPrice), [Op.lte]: Number(maxPrice) },
        };
      } else if (maxPrice) {
        query.where.price = { [Op.lte]: Number(maxPrice) };
      } else if (minPrice) {
        query.where.price = { [Op.gte]: Number(minPrice) };
      }

      if (keyword) {
        console.log(keyword);
        query.where.name = { [Op.like]: `%${keyword}%` };
      }

      if (name) {
        query.where.name = { [Op.like]: `%${name}%` };
      }

      if (id) {
        query.where.id = id;
      }

      if (statusId) {
        query.where.statusId = Number(statusId);
      }

      if (userId) {
        query.where.ownerId = userId;
      }

      if (size) {
        query.where.size = size;
      }

      if (fromDate && toDate) {
        query.where.createdAt = {
          [Op.between]: [new Date(fromDate), new Date(toDate)],
        };
      }

      let negativeStatus;
      if (isSold === "false" || Number[statusId] === 3) negativeStatus = [6];
      else negativeStatus = [3, 6];

      // const negativeStatus =
      //   isSold === "true" || Number(statusId) === 3 ? [3, 6] : [6];
      let products;

      if (criteria === "owner") {
        const allProducts = await models.Product.findAll({
          where: { ...query.where, [Op.not]: [{ statusId: negativeStatus }] },
          include: [
            { model: models.User, as: "owner" },
            {
              model: models.SubCategory,
              as: "category",
              include: [{ model: models.Category, as: "parent" }],
            },
            { model: models.Condition, as: "condition" },
            { model: models.ProductImage, as: "images" },
            { model: models.ProductStatus, as: "status" },
          ],
        });

        allProducts.sort((a, b) => {
          var nameA = a.owner.username.toUpperCase(); // bỏ qua hoa thường
          var nameB = b.owner.username.toUpperCase(); // bỏ qua hoa thường
          if (nameA < nameB) {
            return sort === "asc" ? -1 : 1;
          }
          if (nameA > nameB) {
            return sort === "asc" ? 1 : -1;
          }

          return 0;
        });

        products = allProducts.slice(
          pageSize * (page - 1),
          pageSize * (page - 1) + pageSize
        );
      } else {
        products = await models.Product.findAll({
          include: [
            { model: models.User, as: "owner" },
            {
              model: models.SubCategory,
              as: "category",
              include: [{ model: models.Category, as: "parent" }],
            },
            { model: models.Condition, as: "condition" },
            { model: models.ProductImage, as: "images" },
            { model: models.ProductStatus, as: "status" },
          ],
          ...query,
          where: { ...query.where, [Op.not]: { statusId: negativeStatus } },
        });
      }
      if (!products) {
        return res.status(200).json("Not found");
      }

      const count = await models.Product.count({
        where: { ...query.where, [Op.not]: { statusId: negativeStatus } },
      });

      return res.status(200).json({ data: products, total: count });
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async getOneProduct(req, res) {
    try {
      const { id } = req.params;

      const product = await models.Product.findOne({
        where: { id: Number(id) },
        include: [
          { model: models.User, as: "owner" },
          {
            model: models.SubCategory,
            as: "category",
            include: [{ model: models.Category, as: "parent" }],
          },
          { model: models.Condition, as: "condition" },
          { model: models.ProductImage, as: "images" },
          { model: models.ProductStatus, as: "status" },
        ],
      });
      if (!product) {
        return res.status(200).json("Not found");
      }

      return res.status(200).json(product);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async getAllProductsOfUser(req, res) {
    try {
      const { userId } = req.params;

      const products = await models.Product.findAll({
        where: { ownerId: Number(userId), [Op.not]: [{ statusId: 6 }] },
        include: [
          { model: models.User, as: "owner" },
          { model: models.SubCategory, as: "category" },
          { model: models.Condition, as: "condition" },
          { model: models.ProductImage, as: "images" },
          { model: models.ProductStatus, as: "status" },
        ],
      });
      if (!products) {
        return res.status(200).json("Not found");
      }

      return res.status(200).json(products);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async getStatisticOfSeller(req, res) {
    try {
      const tokenFromHeader = auth.getJwtToken(req);
      const user = jwt.decode(tokenFromHeader);
      const userId = user.payload.id;

      const pending = await models.Product.count({
        where: { ownerId: userId, statusId: 1 },
      });
      const active = await models.Product.count({
        where: { ownerId: userId, statusId: 2 },
      });
      const sold = await models.Product.count({
        where: { ownerId: userId, statusId: 3 },
      });
      const rejected = await models.Product.count({
        where: { ownerId: userId, statusId: 4 },
      });
      const blocked = await models.Product.count({
        where: { ownerId: userId, statusId: 5 },
      });

      return res.status(200).json([pending, active, sold, rejected, blocked]);
    } catch (error) {}
  }

  async createProduct(req, res) {
    try {
      const tokenFromHeader = auth.getJwtToken(req);
      const user = jwt.decode(tokenFromHeader);
      const userId = user.payload.id;

      const data = req.body;
      data.soldQuantity = 0;
      data.ownerId = userId;
      data.statusId = 1;

      const product = await models.Product.create(data);

      if (data.images) {
        const dataImages = data.images.map((item) => ({
          imageLink: item,
          productId: product.dataValues.id,
          status: 1,
        }));

        const images = await saveImages(dataImages, product.dataValues.id);

        product.dataValues.images = images;
      }

      return res.status(200).json(product);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async updateProduct(req, res) {
    try {
      const { id } = req.params;

      const product = await models.Product.findOne({
        where: { id: Number(id) },
      });

      product.name = req.body.name;
      product.description = req.body.description;
      product.subCategoryId = req.body.subCategoryId;
      product.conditionId = req.body.conditionId;
      product.size = req.body.size;
      product.brand = req.body.brand;
      product.material = req.body.material;
      product.price = req.body.price;
      product.statusId = 1;

      if (req.body.quantity <= product.soldQuantity) {
        product.statusId = 3;
      }

      product.quantity = req.body.quantity;

      await product.save();

      if (req.body.images) {
        const dataImages = req.body.images.map((item) => ({
          imageLink: item,
          productId: id,
          // status: 1,
        }));

        const images = await saveImages(dataImages, id);

        product.dataValues.images = images;
      }

      return res.status(200).json(product);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async blockProduct(req, res) {
    try {
      const { id } = req.params;

      const product = await models.Product.findOne({
        where: { id: Number(id) },
      });

      const orderItems = await models.OrderItem.findAll({
        where: { productId: id },
      });

      await (async function () {
        orderItems.forEach(async (item) => {
          const order = await models.Order.findOne({
            where: { id: item.orderId },
          });

          if (order.statusId !== 5 || order.statusId !== 6) {
            return res
              .status(500)
              .json("Sản phẩm này đã được đặt. Không thể khóa lúc này");
          }
        });
      })();

      product.statusId = 5;
      if (product.save()) {
        return res.status(200).json(product);
      }

      return res.status(400).json("Đã có lỗi xảy ra");
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async deleteProduct(req, res) {
    try {
      const { id } = req.params;

      const product = await models.Product.findOne({
        where: { id: Number(id) },
      });

      const orderItems = await models.OrderItem.findAll({
        where: { productId: id },
      });

      await (async function () {
        orderItems.forEach(async (item) => {
          const order = await models.Order.findOne({
            where: { id: item.orderId },
          });

          if (order.statusId !== 5 || order.statusId !== 6) {
            return res
              .status(500)
              .json("Sản phẩm này đã được đặt. Không thể xóa lúc này");
          }
        });
      })();

      product.statusId = 6;
      if (product.save()) {
        return res.status(200).json(product);
      }

      return res.status(400).json("Đã có lỗi xảy ra");
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async verifyProduct(req, res) {
    try {
      const { id } = req.params;

      const product = await models.Product.findOne({
        where: { id: Number(id) },
      });

      product.statusId = 2;

      if (product.save()) {
        // await verifyImages(Number(id));

        return res.status(200).json(product);
      }

      return res.status(400).json("Error");
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async rejectProduct(req, res) {
    try {
      const { id } = req.params;

      const product = await models.Product.findOne({
        where: { id: Number(id) },
      });

      product.statusId = 4;

      if (product.save()) {
        // await rejectImages(Number(id));
        return res.status(200).json(product);
      }

      return res.status(400).json("Error");
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async adminGetStatisticOfSeller(req, res) {
    try {
      const userId = req.params.id;

      const all = await models.Product.count({ where: { ownerId: userId } });
      const paymentWaiting = await models.Product.count({
        where: { ownerId: userId, statusId: 1 },
      });
      const acceptWaiting = await models.Product.count({
        where: { ownerId: userId, statusId: 2 },
      });
      const pickupWaiting = await models.Product.count({
        where: { ownerId: userId, statusId: 3 },
      });
      const delivering = await models.Product.count({
        where: { ownerId: userId, statusId: 4 },
      });
      const done = await models.Product.count({
        where: { ownerId: userId, statusId: 5 },
      });

      return res
        .status(200)
        .json([paymentWaiting, acceptWaiting, pickupWaiting, delivering, done]);
    } catch (error) {
      return res.status(400).json(err);
    }
  }
}

async function saveImages(images, productId) {
  const oldImages = await models.ProductImage.findAll({
    where: { productId: productId },
  });

  const oldImageIds = oldImages.map((item) => item.dataValues.id);

  oldImageIds.forEach(async (id) => {
    const image = await models.ProductImage.destroy({ where: { id: id } });
  });

  const res = [];
  images.forEach(async (item) => {
    const image = await models.ProductImage.create(item);
    res.push(image);
  });

  return res;
}

// async function verifyImages(productId) {
//   const images = await models.ProductImage.findAll({
//     where: { productId: productId },
//   });

//   images.forEach(async (image) => {
//     image.status = 2;
//     await image.save();
//   });
// }

// async function rejectImages(productId) {
//   const images = await models.ProductImage.findAll({
//     where: { productId: productId },
//   });

//   images.forEach(async (image) => {
//     image.status = 3;
//     await image.save();
//   });
// }

module.exports = new ProductController();
