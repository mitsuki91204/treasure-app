-- +goose Up
CREATE TABLE homework_logs
(
    id INT NOT NULL AUTO_INCREMENT,
    student_id INT NOT NULL,
    homework_id INT NOT NULL,
    status_id INT NOT NULL default 1,
    PRIMARY KEY(id),
    FOREIGN KEY(homework_id) REFERENCES homeworks(id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- +goose Down
DROP TABLE homework_logs;
