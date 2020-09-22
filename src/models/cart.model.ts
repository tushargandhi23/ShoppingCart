import { Sequelize, Model, DataTypes, BuildOptions } from 'sequelize';
import { Product } from './product.model';
import { database } from '../config/database';

export class Cart extends Model {
  public id!: number;
  public productId!: number;
  public totalPrice!: number;
  public totalQuantity!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Cart.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    productId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: Product,
        key: "id"
      }
    },
    totalPrice: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    totalQuantity: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    }
  },
  {
    tableName: 'cart',
    sequelize: database, // this bit is important
  }
);
Cart.sync({ force: true }).then(() => console.log('cart table created'));

Product.hasMany(Cart, {
  sourceKey: "id",
  foreignKey: "productId"
});



export interface CartInterface {
  productId: number;
  totalPrice: number;
  totalQuantity: number;
}
