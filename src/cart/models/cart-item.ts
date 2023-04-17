import { Column, PrimaryColumn, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { Cart } from './cart';
import { Product } from './product';

@Entity('cart_items')
export class CartItem {
  @PrimaryColumn({ type: 'uuid', nullable: false })
  productId: string;

  @PrimaryColumn({ type: 'uuid', nullable: false })
  cartId: string;

  @Column({ type: 'integer', nullable: false })
  count: number;

  @ManyToOne(
    () => Cart,
    cart => cart.items,
    {
      orphanedRowAction: 'delete',
    },
  )
  @JoinColumn({ name: 'cartId', referencedColumnName: 'id' })
  cart: Cart;

  @Column({ type: 'simple-json' })
  product: Product;
}