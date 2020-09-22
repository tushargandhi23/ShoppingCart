import { CartController } from './../controllers/cart.controller';
import { ProductController } from './../controllers/product.controller';
import { Request, Response } from 'express';
import { NodesController } from '../controllers/nodes.controller';

export class Routes {
  public nodesController: NodesController = new NodesController();
  public productController: ProductController = new ProductController();
  public cartController: CartController = new CartController();

  public routes(app): void {
    app.route('/').get(this.nodesController.index);
    app.route('/nodes/:id').get(this.nodesController.show);
    app.route('/nodes').get(this.nodesController.index).post(this.nodesController.create);
    app.route('/products').get(this.productController.index).post(this.productController.create);
    app.route('/cart').get(this.cartController.index).post(this.cartController.create);
  }
}
