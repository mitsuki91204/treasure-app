package model

type Homework struct {
	ID        int64  `db:"id", json:"id"`
	NAME      string `db:"name", json:"name"`
	Subject   string `db:"subject", json:"subject"`
	Details   string `db:"details", json:"details"`
	School_id int64  `db:"school_id", json:"school_id"`
	Class     int64  `db:"class", json:"class"`
}
