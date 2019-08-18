package model

type Student struct {
	ID        int64  `db:"id", json:"id"`
	Name      string `db:"name", json:"name"`
	Grade     int64  `db:"grade", json:"grade"`
	School_id int64  `db:"school_id", json:"school_id"`
}
