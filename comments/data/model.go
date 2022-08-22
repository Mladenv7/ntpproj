package data

import (
	"github.com/jinzhu/gorm"
)

type Comment struct {
	gorm.Model

	Message        string
	Rating         uint8
	AdId           uint64
	AuthorId       uint64
	AuthorUsername string
	Reported       bool
}
