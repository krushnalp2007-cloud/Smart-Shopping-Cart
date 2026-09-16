-- SMART SHOPPING CART PROJECT
-- FINAL DATABASE QUERY FILE

CREATE DATABASE IF NOT EXISTS smart_shopping_cart;

USE smart_shopping_cart;

-- 1. DATABASE / TABLE CHECK

SHOW TABLES;

SELECT * FROM users;
SELECT * FROM products;
SELECT * FROM carts;


-- 2. USER / LOGIN QUERIES

-- 2.1 Find user by mobile number
SELECT user_id, name, email, mobile, password_hash, role FROM users WHERE mobile = ?;

-- 2.2 Find user by email
SELECT
    user_id,
    name,
    email,
    mobile,
    password_hash,
    role
FROM users
WHERE email = ?;


-- 2.3 Create customer account
INSERT INTO users
(
    name,
    email,
    mobile,
    password_hash,
    role
)
VALUES
(
    ?,
    ?,
    ?,
    ?,
    'CUSTOMER'
);


-- 2.4 Get customer by ID
SELECT
    user_id,
    name,
    email,
    mobile,
    role
FROM users
WHERE user_id = ?
  AND role = 'CUSTOMER';


-- 2.5 Get retailer by ID
SELECT
    user_id,
    name,
    email,
    mobile,
    role
FROM users
WHERE user_id = ?
  AND role = 'RETAILER';


-- 3. PRODUCT QUERIES


-- 3.1 Get all active products
SELECT
    product_id,
    product_code,
    product_name,
    category,
    price,
    expected_weight,
    qr_code,
    stock_quantity
FROM products
WHERE status = 'ACTIVE'
ORDER BY product_name;


-- 3.2 Get product using QR code
-- Used after customer scans QR code
SELECT
    product_id,
    product_code,
    product_name,
    category,
    price,
    expected_weight,
    qr_code,
    stock_quantity
FROM products
WHERE qr_code = ?
  AND status = 'ACTIVE';


-- 3.3 Get product using product code
SELECT
    *
FROM products
WHERE product_code = ?;


-- 3.4 Search product by name
SELECT
    *
FROM products
WHERE product_name LIKE CONCAT('%', ?, '%')
  AND status = 'ACTIVE';


-- 3.5 Get products by category
SELECT
    *
FROM products
WHERE category = ?
  AND status = 'ACTIVE';


-- 3.6 Add new product
INSERT INTO products
(
    product_code,
    product_name,
    category,
    price,
    expected_weight,
    qr_code,
    stock_quantity,
    status
)
VALUES
(
    ?,
    ?,
    ?,
    ?,
    ?,
    ?,
    ?,
    'ACTIVE'
);


-- 3.7 Update product
UPDATE products
SET
    product_name = ?,
    category = ?,
    price = ?,
    expected_weight = ?,
    stock_quantity = ?,
    status = ?
WHERE product_id = ?;


-- 3.8 Deactivate product
UPDATE products
SET status = 'INACTIVE'
WHERE product_id = ?;


-- 3.9 Check product stock
SELECT
    product_id,
    product_name,
    stock_quantity,
    status
FROM products
WHERE product_id = ?;


-- 4. CART QUERIES

-- 4.1 Get all available carts
SELECT
    cart_id,
    cart_code,
    status
FROM carts
WHERE status = 'AVAILABLE';


-- 4.2 Get cart using cart code
SELECT
    *
FROM carts
WHERE cart_code = ?;


-- 4.3 Set cart as IN_USE
UPDATE carts
SET status = 'IN_USE'
WHERE cart_id = ?;


-- 4.4 Set cart as AVAILABLE
UPDATE carts
SET status = 'AVAILABLE'
WHERE cart_id = ?;


-- 4.5 Set cart as MAINTENANCE
UPDATE carts
SET status = 'MAINTENANCE'
WHERE cart_id = ?;


-- 5. SHOPPING SESSION QUERIES

-- 5.1 Create new shopping session
INSERT INTO shopping_sessions
(
    customer_id,
    cart_id,
    status
)
VALUES
(
    ?,
    ?,
    'ACTIVE'
);


-- 5.2 Get active session for customer
SELECT
    session_id,
    customer_id,
    cart_id,
    started_at,
    status
FROM shopping_sessions
WHERE customer_id = ?
  AND status = 'ACTIVE';


-- 5.3 Get session by session ID
SELECT
    *
FROM shopping_sessions
WHERE session_id = ?;


-- 5.4 Get complete session information
SELECT
    ss.session_id,
    ss.customer_id,
    u.name AS customer_name,
    ss.cart_id,
    c.cart_code,
    ss.started_at,
    ss.ended_at,
    ss.status
FROM shopping_sessions ss
JOIN users u
    ON ss.customer_id = u.user_id
JOIN carts c
    ON ss.cart_id = c.cart_id
WHERE ss.session_id = ?;


-- 5.5 Complete shopping session
UPDATE shopping_sessions
SET
    status = 'COMPLETED',
    ended_at = NOW()
WHERE session_id = ?;


-- 5.6 Cancel shopping session
UPDATE shopping_sessions
SET
    status = 'CANCELLED',
    ended_at = NOW()
WHERE session_id = ?;


-- 6. CART ITEM QUERIES


-- 6.1 Add product to cart
INSERT INTO cart_items
(
    session_id,
    product_id,
    quantity,
    unit_price
)
VALUES
(
    ?,
    ?,
    ?,
    ?
);


-- 6.2 Check whether product already exists in cart
SELECT
    cart_item_id,
    session_id,
    product_id,
    quantity,
    unit_price
FROM cart_items
WHERE session_id = ?
  AND product_id = ?;


-- 6.3 Increase product quantity
UPDATE cart_items
SET quantity = quantity + ?
WHERE session_id = ?
  AND product_id = ?;


-- 6.4 Set product quantity
UPDATE cart_items
SET quantity = ?
WHERE session_id = ?
  AND product_id = ?;


-- 6.5 Remove product from cart
DELETE FROM cart_items
WHERE session_id = ?
  AND product_id = ?;


-- 6.6 Remove complete cart
DELETE FROM cart_items
WHERE session_id = ?;


-- 7. DISPLAY CURRENT CART

SELECT
    ci.cart_item_id,
    p.product_id,
    p.product_code,
    p.product_name,
    p.category,
    ci.quantity,
    ci.unit_price,
    (ci.quantity * ci.unit_price) AS subtotal
FROM cart_items ci
JOIN products p
    ON ci.product_id = p.product_id
WHERE ci.session_id = ?
ORDER BY ci.added_at;


-- 8. CART TOTAL / BILL CALCULATION

-- 8.1 Calculate subtotal
SELECT
    COALESCE(
        SUM(ci.quantity * ci.unit_price),
        0.00
    ) AS subtotal
FROM cart_items ci
WHERE ci.session_id = ?;


-- 8.2 Calculate total quantity
SELECT
    COALESCE(
        SUM(quantity),
        0
    ) AS total_items
FROM cart_items
WHERE session_id = ?;


-- 8.3 Calculate complete cart summary
SELECT
    COUNT(*) AS different_products,
    COALESCE(SUM(quantity), 0) AS total_items,
    COALESCE(SUM(quantity * unit_price), 0.00) AS subtotal
FROM cart_items
WHERE session_id = ?;


-- 9. EXPECTED WEIGHT QUERIES

-- 9.1 Calculate total expected weight
SELECT
    COALESCE(
        SUM(p.expected_weight * ci.quantity),
        0.00
    ) AS expected_weight
FROM cart_items ci
JOIN products p
    ON ci.product_id = p.product_id
WHERE ci.session_id = ?;


-- 9.2 Show weight contribution of each product
SELECT
    p.product_code,
    p.product_name,
    ci.quantity,
    p.expected_weight AS unit_expected_weight,
    (p.expected_weight * ci.quantity)
        AS total_expected_weight
FROM cart_items ci
JOIN products p
    ON ci.product_id = p.product_id
WHERE ci.session_id = ?;


-- 10. VERIFICATION QUERIES

-- 10.1 Store verification result
-- Data comes from backend / ESP32 / sensors
INSERT INTO verification_logs
(
    session_id,
    transaction_id,
    expected_weight,
    actual_weight,
    weight_difference,
    tof_distance,
    tof_status,
    result
)
VALUES
(
    ?,
    ?,
    ?,
    ?,
    ?,
    ?,
    ?,
    ?
);


-- 10.2 Get latest verification
SELECT
    verification_id,
    session_id,
    transaction_id,
    expected_weight,
    actual_weight,
    weight_difference,
    tof_distance,
    tof_status,
    result,
    created_at
FROM verification_logs
WHERE session_id = ?
ORDER BY created_at DESC
LIMIT 1;


-- 10.3 Get all verification attempts
SELECT
    *
FROM verification_logs
WHERE session_id = ?
ORDER BY created_at DESC;


-- 10.4 Get verification mismatches
SELECT
    verification_id,
    session_id,
    transaction_id,
    expected_weight,
    actual_weight,
    weight_difference,
    tof_distance,
    tof_status,
    created_at
FROM verification_logs
WHERE result = 'MISMATCH'
ORDER BY created_at DESC;


-- 11. TRANSACTION QUERIES


-- 11.1 Create transaction
INSERT INTO transactions
(
    session_id,
    customer_id,
    subtotal,
    discount,
    total_amount,
    status
)
VALUES
(
    ?,
    ?,
    ?,
    ?,
    ?,
    'PENDING'
);


-- 11.2 Get transaction by ID
SELECT
    *
FROM transactions
WHERE transaction_id = ?;


-- 11.3 Get transaction for a customer
SELECT
    *
FROM transactions
WHERE customer_id = ?
ORDER BY created_at DESC;


-- 11.4 Add transaction item
INSERT INTO transaction_items
(
    transaction_id,
    product_id,
    quantity,
    unit_price,
    subtotal
)
VALUES
(
    ?,
    ?,
    ?,
    ?,
    ?
);


-- 11.5 Get transaction items
SELECT
    ti.transaction_item_id,
    p.product_code,
    p.product_name,
    ti.quantity,
    ti.unit_price,
    ti.subtotal
FROM transaction_items ti
JOIN products p
    ON ti.product_id = p.product_id
WHERE ti.transaction_id = ?;


-- 11.6 Mark transaction as PAID
UPDATE transactions
SET status = 'PAID'
WHERE transaction_id = ?;


-- 11.7 Cancel transaction
UPDATE transactions
SET status = 'CANCELLED'
WHERE transaction_id = ?;


-- 12. PAYMENT QUERIES

-- 12.1 Create payment
INSERT INTO payments
(
    transaction_id,
    amount,
    payment_method,
    payment_status,
    payment_reference,
    paid_at
)
VALUES
(
    ?,
    ?,
    ?,
    ?,
    ?,
    ?
);


-- 12.2 Get payment for transaction
SELECT
    *
FROM payments
WHERE transaction_id = ?;


-- 12.3 Update payment status
UPDATE payments
SET
    payment_status = ?,
    payment_reference = ?,
    paid_at = NOW()
WHERE payment_id = ?;


-- 12.4 Get successful payments
SELECT
    payment_id,
    transaction_id,
    amount,
    payment_method,
    payment_reference,
    paid_at
FROM payments
WHERE payment_status = 'SUCCESS'
ORDER BY paid_at DESC;


-- 13. FINAL BILL

SELECT
    t.transaction_id,
    u.name AS customer_name,
    u.mobile,
    p.product_code,
    p.product_name,
    ti.quantity,
    ti.unit_price,
    ti.subtotal,
    t.subtotal,
    t.discount,
    t.total_amount,
    t.status,
    t.created_at
FROM transactions t
JOIN users u
    ON t.customer_id = u.user_id
JOIN transaction_items ti
    ON t.transaction_id = ti.transaction_id
JOIN products p
    ON ti.product_id = p.product_id
WHERE t.transaction_id = ?
ORDER BY ti.transaction_item_id;


-- 14. CUSTOMER PURCHASE HISTORY

SELECT
    t.transaction_id,
    t.subtotal,
    t.discount,
    t.total_amount,
    t.status,
    t.created_at
FROM transactions t
WHERE t.customer_id = ?
ORDER BY t.created_at DESC;


-- 15. RETAILER DASHBOARD - TODAY'S SALES

SELECT
    COALESCE(
        SUM(total_amount),
        0.00
    ) AS today_sales
FROM transactions
WHERE status = 'PAID'
  AND DATE(created_at) = CURDATE();


-- 16. RETAILER DASHBOARD - TODAY'S TRANSACTIONS

SELECT
    COUNT(*) AS today_transactions
FROM transactions
WHERE status = 'PAID'
  AND DATE(created_at) = CURDATE();


-- 17. RETAILER DASHBOARD - PRODUCTS SOLD TODAY


SELECT
    COALESCE(
        SUM(ti.quantity),
        0
    ) AS products_sold_today
FROM transaction_items ti
JOIN transactions t
    ON ti.transaction_id = t.transaction_id
WHERE t.status = 'PAID'
  AND DATE(t.created_at) = CURDATE();


-- 18. RETAILER DASHBOARD - TOTAL REVENUE

SELECT
    COALESCE(
        SUM(total_amount),
        0.00
    ) AS total_revenue
FROM transactions
WHERE status = 'PAID';


-- 19. RETAILER DASHBOARD - BEST SELLING PRODUCTS


SELECT
    p.product_id,
    p.product_code,
    p.product_name,
    SUM(ti.quantity) AS units_sold
FROM transaction_items ti
JOIN products p
    ON ti.product_id = p.product_id
JOIN transactions t
    ON ti.transaction_id = t.transaction_id
WHERE t.status = 'PAID'
GROUP BY
    p.product_id,
    p.product_code,
    p.product_name
ORDER BY units_sold DESC;


-- 20. RETAILER DASHBOARD - PRODUCT REVENUE


SELECT
    p.product_id,
    p.product_code,
    p.product_name,
    SUM(ti.quantity) AS units_sold,
    SUM(ti.subtotal) AS revenue
FROM transaction_items ti
JOIN products p
    ON ti.product_id = p.product_id
JOIN transactions t
    ON ti.transaction_id = t.transaction_id
WHERE t.status = 'PAID'
GROUP BY
    p.product_id,
    p.product_code,
    p.product_name
ORDER BY revenue DESC;


-- 21. RETAILER DASHBOARD - CATEGORY SALES


SELECT
    p.category,
    SUM(ti.quantity) AS units_sold,
    SUM(ti.subtotal) AS revenue
FROM transaction_items ti
JOIN products p
    ON ti.product_id = p.product_id
JOIN transactions t
    ON ti.transaction_id = t.transaction_id
WHERE t.status = 'PAID'
GROUP BY p.category
ORDER BY revenue DESC;


-- 22. RETAILER DASHBOARD - RECENT TRANSACTIONS


SELECT
    t.transaction_id,
    u.name AS customer_name,
    t.subtotal,
    t.discount,
    t.total_amount,
    t.status,
    t.created_at
FROM transactions t
JOIN users u
    ON t.customer_id = u.user_id
ORDER BY t.created_at DESC
LIMIT 10;


-- 23. RETAILER DASHBOARD - ACTIVE CARTS


SELECT
    c.cart_id,
    c.cart_code,
    c.status,
    ss.session_id,
    u.name AS customer_name,
    ss.started_at
FROM carts c
LEFT JOIN shopping_sessions ss
    ON c.cart_id = ss.cart_id
   AND ss.status = 'ACTIVE'
LEFT JOIN users u
    ON ss.customer_id = u.user_id
ORDER BY c.cart_id;


-- 24. RETAILER DASHBOARD - VERIFICATION SUMMARY


SELECT
    result,
    COUNT(*) AS total_attempts
FROM verification_logs
GROUP BY result;


-- 25. RETAILER DASHBOARD - RECENT MISMATCHES


SELECT
    v.verification_id,
    v.session_id,
    v.transaction_id,
    v.expected_weight,
    v.actual_weight,
    v.weight_difference,
    v.tof_distance,
    v.tof_status,
    v.created_at
FROM verification_logs v
WHERE v.result = 'MISMATCH'
ORDER BY v.created_at DESC
LIMIT 20;


-- 26. INVENTORY / STOCK QUERIES


-- All active products and stock
SELECT
    product_code,
    product_name,
    category,
    price,
    stock_quantity,
    status
FROM products
WHERE status = 'ACTIVE'
ORDER BY product_name;


-- Low-stock products
SELECT
    product_code,
    product_name,
    stock_quantity
FROM products
WHERE status = 'ACTIVE'
  AND stock_quantity <= 10
ORDER BY stock_quantity ASC;


-- 27. STOCK UPDATE AFTER SALE


UPDATE products p
JOIN transaction_items ti
    ON p.product_id = ti.product_id
SET p.stock_quantity =
    p.stock_quantity - ti.quantity
WHERE ti.transaction_id = ?;


-- 28. PAYMENT + TRANSACTION SUMMARY


SELECT
    t.transaction_id,
    u.name AS customer_name,
    t.total_amount,
    t.status AS transaction_status,
    p.amount AS paid_amount,
    p.payment_method,
    p.payment_status,
    p.payment_reference,
    p.paid_at
FROM transactions t
JOIN users u
    ON t.customer_id = u.user_id
LEFT JOIN payments p
    ON t.transaction_id = p.transaction_id
WHERE t.transaction_id = ?;


-- 29. COMPLETE SHOPPING SESSION


-- Complete session
UPDATE shopping_sessions
SET
    status = 'COMPLETED',
    ended_at = NOW()
WHERE session_id = ?;


-- Make cart available again
UPDATE carts
SET status = 'AVAILABLE'
WHERE cart_id = ?;


-- 30. DATABASE RECORD COUNTS


SELECT 'users' AS table_name, COUNT(*) AS record_count
FROM users

UNION ALL

SELECT 'products', COUNT(*)
FROM products

UNION ALL

SELECT 'carts', COUNT(*)
FROM carts

UNION ALL

SELECT 'shopping_sessions', COUNT(*)
FROM shopping_sessions

UNION ALL

SELECT 'cart_items', COUNT(*)
FROM cart_items

UNION ALL

SELECT 'transactions', COUNT(*)
FROM transactions

UNION ALL

SELECT 'transaction_items', COUNT(*)
FROM transaction_items

UNION ALL

SELECT 'verification_logs', COUNT(*)
FROM verification_logs

UNION ALL

SELECT 'payments', COUNT(*)
FROM payments;

-- END OF QUERIES