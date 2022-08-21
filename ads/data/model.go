package data

import (
	"github.com/jinzhu/gorm"
)

type Ad struct {
	gorm.Model

	CarId       uint
	Description string
	AskingPrice float32 `gorm:"min:0.0"` //in euros
	Mileage     uint32
}
