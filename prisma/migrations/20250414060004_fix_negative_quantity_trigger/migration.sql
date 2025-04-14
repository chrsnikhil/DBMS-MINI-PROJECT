-- Drop existing trigger
DROP TRIGGER IF EXISTS prevent_negative_quantity;

-- Create trigger for both INSERT and UPDATE operations
CREATE TRIGGER prevent_negative_quantity
BEFORE INSERT ON Product
FOR EACH ROW
BEGIN
    IF NEW.quantity < 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Quantity cannot be negative';
    END IF;
END;

CREATE TRIGGER prevent_negative_quantity_update
BEFORE UPDATE ON Product
FOR EACH ROW
BEGIN
    IF NEW.quantity < 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Quantity cannot be negative';
    END IF;
END;

-- Create trigger for negative price
CREATE TRIGGER prevent_negative_price
BEFORE INSERT ON Product
FOR EACH ROW
BEGIN
    IF NEW.price < 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Price cannot be negative';
    END IF;
END;

CREATE TRIGGER prevent_negative_price_update
BEFORE UPDATE ON Product
FOR EACH ROW
BEGIN
    IF NEW.price < 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Price cannot be negative';
    END IF;
END; 