package service

import (
	"github.com/jmoiron/sqlx"
	"github.com/pkg/errors"
	"github.com/voyagegroup/treasure-app/dbutil"

	"github.com/voyagegroup/treasure-app/model"
	"github.com/voyagegroup/treasure-app/repository"
)

type Student struct {
	db *sqlx.DB
}

func NewStudent(db *sqlx.DB) *Student {
	return &Student{db}
}

func (s *Student) Create(newStudent *model.Student) (int64, error) {
	var createdId int64
	if err := dbutil.TXHandler(s.db, func(tx *sqlx.Tx) error {
		result, err := repository.CreateStudent(tx, newStudent)
		if err != nil {
			return err
		}
		if err := tx.Commit(); err != nil {
			return err
		}
		id, err := result.LastInsertId()
		if err != nil {
			return err
		}
		createdId = id
		return err
	}); err != nil {
		return 0, errors.Wrap(err, "failed student insert transaction")
	}
	return createdId, nil
}
