package controller

import (
	"encoding/json"
	"net/http"

	"github.com/jmoiron/sqlx"

	"github.com/voyagegroup/treasure-app/model"
	"github.com/voyagegroup/treasure-app/repository"
	"github.com/voyagegroup/treasure-app/service"
)

type Homework struct {
	db *sqlx.DB
}

func NewHomework(db *sqlx.DB) *Homework {
	return &Homework{db: db}
}

func (h *Homework) Index(w http.ResponseWriter, r *http.Request) (int, interface{}, error) {

	homeworks, err := repository.AllHomework(h.db)
	if err != nil {
		return http.StatusInternalServerError, nil, err
	}
	return http.StatusOK, homeworks, nil
}

func (h *Homework) Create(w http.ResponseWriter, r *http.Request) (int, interface{}, error) {
	newHomework := &model.Homework{}
	if err := json.NewDecoder(r.Body).Decode(&newHomework); err != nil {
		return http.StatusBadRequest, nil, err
	}

	homeworkService := service.NewHomework(h.db)
	id, err := homeworkService.Create(newHomework)
	if err != nil {
		return http.StatusInternalServerError, nil, err
	}
	newHomework.ID = id

	return http.StatusCreated, newHomework, nil
}
