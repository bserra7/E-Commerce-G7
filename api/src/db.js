require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

// CONEXION A BASE DE DATOS PARA PRODUCCION

let sequelize =
  process.env.NODE_ENV === 'production'
    ? new Sequelize({
        database: DB_NAME,
        dialect: 'postgres',
        host: DB_HOST,
        port: 5432,
        username: DB_USER,
        password: DB_PASSWORD,
        pool: {
          max: 3,
          min: 1,
          idle: 10000,
        },
        dialectOptions: {
          ssl: {
            require: true,
            // Ref.: https://github.com/brianc/node-postgres/issues/2009
            rejectUnauthorized: false,
          },
          keepAlive: true,
        },
        ssl: true,
      })
    : new Sequelize(
        `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
        { logging: false, native: false }
      );

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter(
    (file) =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Product, User, Category, Order, Review, Role, Payment, Store  } = sequelize.models;


// Creamos relación uno a muchos entre la tabla Product_Order, Order y Product (Super Many-to-Many relationship según la documentacion de sequelize)
const Product_Order = sequelize.define(
  'product_order',
  {
    amount: DataTypes.INTEGER,
  },
  { timestamps: false }
);


// Modelos con relaciones especiales (Super). Deben crearse en el mismo archivo donde se las relaciona (más abajo)
const Discount_category = sequelize.define("discount_category", {
  categoryId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    references: {
      model: Category,
      key: 'id'
    }
  },
  discount: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  weekday: {
    type: DataTypes.ENUM("sunday","monday","tuesday","wednesday ","thursday","friday","saturday"),
    allowNull: false
  }
},
{
  timestamps: false,
}
);

const Two_fa = sequelize.define("two_fa", {
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false
  },
  },
  {
    timestamps: false,
  }
);

const Visited_product = sequelize.define("visited_product", {
  userId: {
    type: DataTypes.INTEGER,
    foreignKey: true,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  productId: {
    type: DataTypes.STRING,
    foreignKey: true,
    allowNull: false,
    references: {
      model: Product,
      key: 'id'
    }
  }
  },
  {
    timestamps: false,
  }
);

const Wishlist = sequelize.define("wishlist", {
  userId: {
    type: DataTypes.INTEGER,
    foreignKey: true,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  productId: {
    type: DataTypes.STRING,
    foreignKey: true,
    allowNull: false,
    references: {
      model: Product,
      key: 'id'
    }
  }
  },
  {
    timestamps: false,
  }
);


// Relaciones entra los Modelos.

Product.belongsToMany(Category, { through: 'product_category', timestamps: false });
Category.belongsToMany(Product, { through: 'product_category', timestamps: false });
Order.belongsTo(User);

Order.belongsToMany(Product, { through: Product_Order });
Product.belongsToMany(Order, { through: Product_Order });
Order.hasMany(Product_Order);
Product_Order.belongsTo(Order);
Product.hasMany(Product_Order);
Product_Order.belongsTo(Product);

Product.hasMany(Review);
Review.belongsTo(Product);
User.hasMany(Review);
Review.belongsTo(User);

Role.hasMany(User);
User.belongsTo(Role);

Order.hasMany(Payment);
Payment.belongsTo(Order);

User.belongsToMany(Product, { through: Wishlist });
Product.belongsToMany(User, { through: Wishlist });

User.belongsToMany(Product, { through: Visited_product });
Product.belongsToMany(User, { through: Visited_product });

User.hasOne(Two_fa);
Two_fa.belongsTo(User);

Category.hasOne(Discount_category);
Discount_category.belongsTo(Category);


module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  Product_Order, Visited_product, Wishlist, Two_fa, Discount_category,
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
