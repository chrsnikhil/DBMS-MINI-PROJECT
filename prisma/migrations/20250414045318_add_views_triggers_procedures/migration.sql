-- Create view for low stock products
CREATE VIEW LowStockProducts AS
SELECT p.*, c.name as category_name
FROM Product p
JOIN Category c ON p.categoryId = c.id
WHERE p.quantity <= 10;

-- Create view for product inventory value
CREATE VIEW ProductInventoryValue AS
SELECT p.*, c.name as category_name,
       (p.price * p.quantity) as total_value
FROM Product p
JOIN Category c ON p.categoryId = c.id;

-- Create trigger to update updatedAt timestamp
CREATE TRIGGER update_product_timestamp
BEFORE UPDATE ON Product
FOR EACH ROW
SET NEW.updatedAt = CURRENT_TIMESTAMP;

-- Create trigger to prevent negative quantity
CREATE TRIGGER prevent_negative_quantity
BEFORE UPDATE ON Product
FOR EACH ROW
BEGIN
    IF NEW.quantity < 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Quantity cannot be negative';
    END IF;
END;

-- Create stored procedure to update product quantity
CREATE PROCEDURE UpdateProductQuantity(
    IN product_id INT,
    IN quantity_change INT
)
BEGIN
    DECLARE current_quantity INT;
    
    -- Get current quantity
    SELECT quantity INTO current_quantity
    FROM Product
    WHERE id = product_id;
    
    -- Update quantity
    UPDATE Product
    SET quantity = current_quantity + quantity_change
    WHERE id = product_id;
END;

-- Create stored procedure to get category statistics
CREATE PROCEDURE GetCategoryStatistics()
BEGIN
    SELECT 
        c.name as category_name,
        COUNT(p.id) as total_products,
        SUM(p.quantity) as total_quantity,
        SUM(p.price * p.quantity) as total_value,
        AVG(p.price) as average_price
    FROM Category c
    LEFT JOIN Product p ON c.id = p.categoryId
    GROUP BY c.id, c.name;
END;

-- Add additional indexes for better performance
CREATE INDEX idx_product_price ON Product(price);
CREATE INDEX idx_product_created_at ON Product(createdAt);
CREATE INDEX idx_product_updated_at ON Product(updatedAt); 