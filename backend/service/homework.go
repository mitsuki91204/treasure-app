package service

import (
	"github.com/jmoiron/sqlx"
	"github.com/pkg/errors"
	"github.com/voyagegroup/treasure-app/dbutil"

	"github.com/voyagegroup/treasure-app/model"
	"github.com/voyagegroup/treasure-app/repository"
)

type Homework struct {
	db *sqlx.DB
}

func NewHomework(db *sqlx.DB) *Homework {
	return &Homework{db}
}

func (h *Homework) Create(newHomework *model.Homework) (int64, error) {
	var createdId int64
	if err := dbutil.TXHandler(h.db, func(tx *sqlx.Tx) error {
		result, err := repository.CreateHomework(tx, newHomework)
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
		return 0, errors.Wrap(err, "failed homework insert transaction")
	}
	return createdId, nil
}
