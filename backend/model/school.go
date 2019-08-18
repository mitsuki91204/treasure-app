package model

type school struct {
	ID   int64  `db:"id", json:"id"`
	NAME string `db:"name", json:"name"`
	TYPE string `db:"type", json:"type"`
}
