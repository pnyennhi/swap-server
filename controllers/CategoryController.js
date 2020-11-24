const _ = require("lodash");
const models = require("../models");

async function getCategory(path) {
  const categoryPath = path.includes("/")
    ? path.slice(0, path.indexOf("/"))
    : path;
  // const subCatePath = path.includes("/")
  //   ? path.slice(path.indexOf("/"), path.length)
  //   : null;

  const category = await models.Category.findOne({
    where: { path: categoryPath },
  });
}

class CategoryController {
  async getCategoryList(req, res) {
    try {
      const categories = await models.Category.findAll({
        include: [
          {
            model: models.SubCategory,
            as: "children",
          },
        ],
        order: [["id", "ASC"]],
      });

      return res.status(200).json(categories);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async getAllCategories(req, res) {
    try {
      const { page, pageSize, sort, criteria, keyword } = req.query;

      const allCategories = await models.Category.findAll({
        include: [
          {
            model: models.SubCategory,
            as: "children",
          },
        ],
        order: [["id", "ASC"]],
      });
      if (!allCategories) {
        return res.status(200).json("Not found");
      }

      await countTotal(allCategories);

      switch (criteria) {
        case "id":
          allCategories.sort((a, b) => {
            return sort === "asc" ? a.id - b.id : b.id - a.id;
          });
          break;
        case "category":
          allCategories.sort((a, b) => {
            var categoryA = a.category.toUpperCase(); // bỏ qua hoa thường
            var categoryB = b.category.toUpperCase(); // bỏ qua hoa thường
            if (categoryA < categoryB) {
              return sort === "asc" ? -1 : 1;
            }
            if (categoryA > categoryB) {
              return sort === "asc" ? 1 : -1;
            }

            return 0;
          });
          break;
        case "totalProducts":
          allCategories.sort((a, b) => {
            return sort === "asc"
              ? a.totalProducts - b.totalProducts
              : b.totalProducts - a.totalProducts;
          });
          break;

        default:
          break;
      }

      const categories =
        pageSize && page
          ? allCategories.slice(
              pageSize * (page - 1),
              pageSize * (page - 1) + pageSize
            )
          : allCategories;

      const count = await models.Category.count();

      return res.status(200).json({ data: categories, total: count });
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async getOneCategory(req, res) {
    try {
      const { id } = req.params;

      const category = await models.Category.findOne({
        where: { id: id },
        include: [
          {
            model: models.SubCategory,
            as: "children",
          },
        ],
      });

      if (!category) {
        return res.status(500).json("Not found");
      }

      await countTotalSub(category.dataValues.children, category);
      // category.dataValues.totalProducts = totalProducts;

      return res.status(200).json(category);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async createCategory(req, res) {
    try {
      const category = await models.Category.create(req.body);

      return res.status(200).json(category);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async updateCategory(req, res) {
    try {
      const { id } = req.params;

      const category = await models.Category.findOne({ where: { id: id } });

      category.category = req.body.category;
      category.path = req.body.path;

      if (category.save()) {
        return res.status(200).json(category);
      }

      return res.status(400).json("Error");
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async getCategory(req, res) {
    try {
      const { path } = req.params;

      if (path === "all") {
        const categories = await models.Category.findAll();

        return res.status(200).json(categories);
      }
      const categoryPath = path.includes("/")
        ? path.slice(0, path.indexOf("/"))
        : path;

      const category = await models.Category.findOne({
        where: { path: categoryPath },
      });

      const categoryId = category.dataValues.id;

      const subCates = await models.SubCategory.findAll({
        where: { parentId: categoryId },
        attributes: ["id", ["subCategory", "category"], "path"],
      });

      return res.status(200).json(subCates);
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }
}

async function countTotalSub(subCategories, category) {
  let totalProducts = 0;
  for (const [index, subCategory] of subCategories.entries()) {
    const subTotalProducts = await models.Product.count({
      where: { subCategoryId: subCategory.id },
    });

    subCategory.dataValues.totalProducts = subTotalProducts;

    totalProducts += subTotalProducts;
  }
  category.dataValues.totalProducts = totalProducts;
}

async function countTotal(categories) {
  for (const category of categories) {
    await countTotalSub(category.dataValues.children, category);
    // console.log(category);
  }
}

module.exports = new CategoryController();
