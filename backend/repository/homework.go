package repository

import (
	"database/sql"

	"github.com/jmoiron/sqlx"
	"github.com/voyagegroup/treasure-app/model"
)

func AllHomework(db *sqlx.DB) ([]model.Homework, error) {
	h := make([]model.Homework, 0)
	if err := db.Select(&h, `SELECT id, name, subject, details, school_id, class FROM homeworks`); err != nil {
		return nil, err
	}
	return h, nil
}

func CreateHomework(db *sqlx.Tx, h *model.Homework) (sql.Result, error) {
	stmt, err := db.Prepare(`INSERT INTO homeworks (name, subject, details, school_id, class) VALUES (?, ?, ?, ? , ?)`)
	if err != nil {
		return nil, err
	}
	defer stmt.Close()
	return stmt.Exec(h.NAME, h.Subject, h.Details, h.School_id, h.Class)
}
