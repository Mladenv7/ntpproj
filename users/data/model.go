package data

import (
	"github.com/jinzhu/gorm"
)

type Role string

const (
	Administrator = "Administrator"
	Standard      = "Standard"
)

type User struct {
	gorm.Model

	Username string
	Name     string
	Surname  string
	Password string
	Email    string
	Banned   bool
	Active   bool
	Role     Role
}

type Login struct {
	Email    string
	Password string
}
