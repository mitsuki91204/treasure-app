package repository

import (
	"database/sql"

	"github.com/jmoiron/sqlx"
	"github.com/voyagegroup/treasure-app/model"
)

func AllStudent(db *sqlx.DB) ([]model.Student, error) {
	s := make([]model.Student, 0)
	if err := db.Select(&s, `SELECT id, name, grade, school_id FROM students`); err != nil {
		return nil, err
	}
	return s, nil
}

func CreateStudent(db *sqlx.Tx, s *model.Student) (sql.Result, error) {
	stmt, err := db.Prepare(`
	INSERT INTO students (name, grade, school_id) VALUES (?, ?, ?)
	`)
	if err != nil {
		return nil, err
	}
	defer stmt.Close()
	return stmt.Exec(s.Name, s.Grade, s.School_id)
}
