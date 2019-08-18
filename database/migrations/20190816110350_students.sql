-- +goose Up
CREATE TABLE students
(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    grade INT NOT NULL,
    school_id INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(school_id) REFERENCES schools(id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
-- +goose Down
    DROP TABLE student;

