CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE status_type AS ENUM ('OPEN', 'ORDERED')

CREATE TABLE carts (
                       id uuid not null default uuid_generate_v4() primary key,
                       user_id uuid not null default uuid_generate_v4(),
                       created_at timestamp not null default now(),
                       updated_at timestamp not null default now(),
	                   status status_type not null
)

CREATE TABLE cart_items (
                        cart_id uuid not null,
                        product_id uuid not null,
                        count int4 not null default 0,
                        foreign key ("cart_id") references "carts" ("id")
)