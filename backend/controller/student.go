package controller

import (
	"encoding/json"
	"net/http"

	"github.com/jmoiron/sqlx"

	"github.com/voyagegroup/treasure-app/model"
	"github.com/voyagegroup/treasure-app/repository"
	"github.com/voyagegroup/treasure-app/service"
)

type Student struct {
	db *sqlx.DB
}

func NewStudent(db *sqlx.DB) *Student {
	return &Student{db: db}
}

func (s *Student) Index(w http.ResponseWriter, r *http.Request) (int, interface{}, error) {
	students, err := repository.AllStudent(s.db)
	if err != nil {
		return http.StatusInternalServerError, nil, err
	}
	return http.StatusOK, students, nil
}

func (s *Student) Create(w http.ResponseWriter, r *http.Request) (int, interface{}, error) {
	newStudent := &model.Student{}
	if err := json.NewDecoder(r.Body).Decode(&newStudent); err != nil {
		return http.StatusBadRequest, nil, err
	}

	studentService := service.NewStudent(s.db)
	id, err := studentService.Create(newStudent)
	if err != nil {
		return http.StatusInternalServerError, nil, err
	}
	newStudent.ID = id

	return http.StatusCreated, newStudent, nil
}
