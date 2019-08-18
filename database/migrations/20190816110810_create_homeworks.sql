-- +goose Up
CREATE TABLE homeworks
(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    details VARCHAR(255) NOT NULL,
    school_id INT NOT NULL,
    class INT,
    PRIMARY KEY(id),
    FOREIGN KEY(school_id) REFERENCES schools(id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- +goose Down
DROP TABLE homeworks;

