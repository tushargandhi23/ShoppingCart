import { Cart, CartInterface } from './../models/cart.model';
import { Request, Response } from 'express';
import { Product, ProductInterface } from '../models/product.model';
import { UpdateOptions } from 'sequelize';

export class CartController {
  public index(req: Request, res: Response) {
    Cart.findAll<Cart>({})
      .then((cart: Array<Cart>) => res.json(cart))
      .catch((err: Error) => res.status(500).json(err));
  }

  public create(req: Request, res: Response) {
    const params: CartInterface = req.body;
    const productId = req.body.productId;

    this.getCart(req).then(([cart]) => {
      console.log(cart,'new or existing cart');
        if(cart){
          let quantity = cart.totalQuantity + 1;
          let price = cart.totalPrice;
          Product.findByPk<Product>(productId)
          .then((product: Product | null) => {
            price = price + product.price;
          });

          const cartId: number = parseInt(req.params.id);
        
          const update: UpdateOptions = {
            where: { id: cartId },
            limit: 1,
          };
          Cart.update<Cart>(params, update)
          .then(()=>res.status(202).json({ data: "success" }))
          .catch((err: Error) => res.status(500).json(err));          
        }
    });
   

    Cart.create<Cart>(params)
      .then((cart: Cart) => {
        
        res.status(201).json(cart);
      })
      .catch((err: Error) => res.status(500).json(err));
  }

  public getCart = (request: Request) => {
    return Cart.findOrCreate({where: {id:request.body.id}});
  };
}
