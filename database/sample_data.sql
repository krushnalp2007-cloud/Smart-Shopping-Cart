USE smart_shopping_cart;
-- sample data
INSERT INTO users
(name, email, mobile, password_hash, role)
VALUES
('Demo Customer', 'customer@example.com', '9000000001', 'demo@1', 'CUSTOMER'),
('Test Customer', 'test@example.com', '9000000002', 'demo@2', 'CUSTOMER'),
('Store Retailer', 'retailer@example.com', '9000000003', 'demo@3', 'RETAILER');

-- sample product details
INSERT INTO products
(product_code, product_name, category, price, expected_weight, qr_code, stock_quantity)
VALUES
('P001', 'Milk', 'Dairy', 30.00, 500.00, 'P001', 50),

('P002', 'Biscuits', 'Food', 20.00, 100.00, 'P002', 100),

('P003', 'Soap', 'Personal Care', 40.00, 125.00, 'P003', 75),

('P004', 'Bread', 'Bakery', 35.00, 400.00, 'P004', 40),

('P005', 'Shampoo', 'Personal Care', 120.00, 180.00, 'P005', 30),

('P006', 'Notebook', 'Stationary', 55.00, 450.00, 'P006', 30),

('P007', 'Pen', 'Stationary', 10.00, 4.00, 'P007', 100),

('P008', 'Geometry Box', 'Stationary', 120.00, 180.00, 'P008', 30),

('P009', 'Chips', 'Food', 100.00, 250.00, 'P009', 40),

('P010', 'Sugar', 'Food', 70.00, 1000.00, 'P010', 30);

-- sample cart
INSERT INTO carts
(cart_code, status)
VALUES
('CART001', 'AVAILABLE'),
('CART002', 'AVAILABLE'),
('CART003', 'MAINTENANCE');

