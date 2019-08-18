package model

type homework_log struct {
	ID          int64 `db:"id", json:"id"`
	Student_id  int64 `db:"student_id", json:"student_id"`
	Homework_id int64 `db:"homework_id", json:"homework_id"`
	Status_id   int64 `db:"status_id", json:"status_id"`
}
