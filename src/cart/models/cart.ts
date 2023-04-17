import {
    PrimaryGeneratedColumn,
    Column,
    Entity,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import { CartItem } from './cart-item';
  
  @Entity('carts')
  export class Cart {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ type: 'uuid', nullable: false })
    userId: string;
  
    @CreateDateColumn({
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP(6)',
      nullable: false,
    })
    createdAt: Date;
  
    @UpdateDateColumn({
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP(6)',
      onUpdate: 'CURRENT_TIMESTAMP(6)',
      nullable: false,
    })
    updatedAt: Date;
  
    @Column({
      type: 'enum',
      enumName: 'CART_STATUS',
      enum: ['OPEN', 'ORDERED'],
    })
    status: 'OPEN' | 'ORDERED';
  
    @OneToMany(
      () => CartItem,
      cartItem => cartItem.cart,
      {
        cascade: ['insert', 'update', 'remove'],
        eager: true,
        orphanedRowAction: 'delete',
      },
    )
    items: CartItem[];
  }