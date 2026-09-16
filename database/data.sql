CREATE DATABASE smart_shopping_cart;

USE smart_shopping_cart;

-- customer data->
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE,
    mobile VARCHAR(15) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    role ENUM('CUSTOMER', 'RETAILER') NOT NULL DEFAULT 'CUSTOMER',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- product details->
CREATE TABLE products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    product_code VARCHAR(20) NOT NULL UNIQUE,
    product_name VARCHAR(150) NOT NULL,
    category VARCHAR(100),
    price DECIMAL(10,2) NOT NULL,
    expected_weight DECIMAL(10,2) NOT NULL,
    qr_code VARCHAR(255) NOT NULL UNIQUE,
    stock_quantity INT DEFAULT 0,
    status ENUM('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- cart availability
CREATE TABLE carts (
    cart_id INT AUTO_INCREMENT PRIMARY KEY,
    cart_code VARCHAR(20) NOT NULL UNIQUE,
    status ENUM('AVAILABLE', 'IN_USE', 'MAINTENANCE')
           DEFAULT 'AVAILABLE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- shopping info
CREATE TABLE shopping_sessions (
    session_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    cart_id INT NOT NULL,
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ended_at TIMESTAMP NULL,
    status ENUM('ACTIVE', 'COMPLETED', 'CANCELLED')
           DEFAULT 'ACTIVE',

    FOREIGN KEY (customer_id)
        REFERENCES users(user_id),

    FOREIGN KEY (cart_id)
        REFERENCES carts(cart_id)
);

-- trolly item details 
CREATE TABLE cart_items (
    cart_item_id INT AUTO_INCREMENT PRIMARY KEY,
    session_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    unit_price DECIMAL(10,2) NOT NULL,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (session_id)
        REFERENCES shopping_sessions(session_id),

    FOREIGN KEY (product_id)
        REFERENCES products(product_id),

    UNIQUE (session_id, product_id)
);

-- transaction dewtails
CREATE TABLE transactions (
    transaction_id INT AUTO_INCREMENT PRIMARY KEY,
    session_id INT NOT NULL,
    customer_id INT NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    discount DECIMAL(10,2) DEFAULT 0.00,
    total_amount DECIMAL(10,2) NOT NULL,
    status ENUM('PENDING', 'PAID', 'CANCELLED')
           DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (session_id) REFERENCES shopping_sessions(session_id),

    FOREIGN KEY (customer_id) REFERENCES users(user_id)
);

-- transaction item details
CREATE TABLE transaction_items (
    transaction_item_id INT AUTO_INCREMENT PRIMARY KEY,
    transaction_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,

    FOREIGN KEY (transaction_id)
        REFERENCES transactions(transaction_id),

    FOREIGN KEY (product_id)
        REFERENCES products(product_id)
);

-- smart verification system
CREATE TABLE verification_logs (
    verification_id INT AUTO_INCREMENT PRIMARY KEY,
    session_id INT NOT NULL,
    transaction_id INT NULL,

    expected_weight DECIMAL(10,2) NOT NULL,
    actual_weight DECIMAL(10,2) NOT NULL,
    weight_difference DECIMAL(10,2) NOT NULL,

    tof_distance DECIMAL(10,2),
    tof_status ENUM('DETECTED', 'NOT_DETECTED', 'UNKNOWN')
              DEFAULT 'UNKNOWN',

    result ENUM('VERIFIED', 'MISMATCH', 'PENDING')
           DEFAULT 'PENDING',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (session_id)
        REFERENCES shopping_sessions(session_id),

    FOREIGN KEY (transaction_id)
        REFERENCES transactions(transaction_id)
);

-- payment log history
CREATE TABLE payments (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    transaction_id INT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,

    payment_method ENUM('CASH', 'UPI', 'CARD', 'SIMULATED')
                   NOT NULL,

    payment_status ENUM('PENDING', 'SUCCESS', 'FAILED')
                   DEFAULT 'PENDING',

    payment_reference VARCHAR(100),
    paid_at TIMESTAMP NULL,

    FOREIGN KEY (transaction_id)
        REFERENCES transactions(transaction_id)
);

