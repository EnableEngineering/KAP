-- MySQL Schema for KAP Just-in-Time Supply Chain Management Portal

-- 1. User Table
CREATE TABLE `user` (
    user_id CHAR(36) PRIMARY KEY, -- UUID
    username VARCHAR(150) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20),
    password VARCHAR(128) NOT NULL,
    role ENUM('SUPPLIER', 'COMPANY', 'WAREHOUSE') NOT NULL,
    company_name VARCHAR(255),
    address TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 2. Part Table
CREATE TABLE part (
    part_id CHAR(36) PRIMARY KEY, -- UUID
    name VARCHAR(255) NOT NULL,
    description TEXT,
    sku VARCHAR(50) NOT NULL UNIQUE,
    supplier_id CHAR(36) NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    min_order_quantity INT DEFAULT 1,
    lead_time_days INT,
    safety_stock INT DEFAULT 0,
    unit VARCHAR(32),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (supplier_id) REFERENCES `user`(user_id)
);

-- 3. Warehouse Table
CREATE TABLE warehouse (
    warehouse_id CHAR(36) PRIMARY KEY, -- UUID
    name VARCHAR(255) NOT NULL,
    manager_id CHAR(36) NOT NULL,
    address TEXT,
    capacity INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (manager_id) REFERENCES `user`(user_id)
);

-- 4. Inventory Table
CREATE TABLE inventory (
    inventory_id CHAR(36) PRIMARY KEY, -- UUID
    part_id CHAR(36) NOT NULL,
    warehouse_id CHAR(36) NOT NULL,
    quantity INT DEFAULT 0,
    reorder_point INT,
    reorder_quantity INT,
    last_restock_date DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY unique_part_warehouse (part_id, warehouse_id),
    FOREIGN KEY (part_id) REFERENCES part(part_id),
    FOREIGN KEY (warehouse_id) REFERENCES warehouse(warehouse_id)
);

-- 5. Shipment Table
CREATE TABLE shipment (
    shipment_id CHAR(36) PRIMARY KEY, -- UUID
    supplier_id CHAR(36) NOT NULL,
    warehouse_id CHAR(36) NOT NULL,
    warehouse_manager_id CHAR(36),
    shipment_date DATE,
    status ENUM('PENDING', 'IN_TRANSIT', 'RECEIVED', 'DAMAGED') NOT NULL,
    remarks TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (supplier_id) REFERENCES `user`(user_id),
    FOREIGN KEY (warehouse_id) REFERENCES warehouse(warehouse_id),
    FOREIGN KEY (warehouse_manager_id) REFERENCES `user`(user_id)
);

-- 6. ShipmentItem Table
CREATE TABLE shipment_item (
    shipment_item_id CHAR(36) PRIMARY KEY, -- UUID
    shipment_id CHAR(36) NOT NULL,
    part_id CHAR(36) NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (shipment_id) REFERENCES shipment(shipment_id),
    FOREIGN KEY (part_id) REFERENCES part(part_id)
);

-- 7. DispatchPlan Table
CREATE TABLE dispatch_plan (
    dispatch_id CHAR(36) PRIMARY KEY, -- UUID
    hgap_id CHAR(36) NOT NULL,
    part_id CHAR(36) NOT NULL,
    planned_date DATE NOT NULL,
    quantity INT NOT NULL,
    status ENUM('PLANNED', 'COMPLETED') NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (hgap_id) REFERENCES `user`(user_id),
    FOREIGN KEY (part_id) REFERENCES part(part_id)
); 