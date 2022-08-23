package data

import (
	"fmt"
	"log"

	"github.com/jinzhu/gorm"
)

var err error

var (
	users = []User{
		{
			Username: "UserJoe",
			Name:     "Joe",
			Surname:  "Doe",
			Password: "$2a$12$AHRw1nm7olpgqcY/zgD1CezUSpfWrLmDvs5bGQ1JtQltnDC7CyKTy",
			Email:    "email1@maildrop.cc",
			Banned:   false,
			Active:   true,
			Role:     Administrator,
		},
		{
			Username: "UserJohn",
			Name:     "John",
			Surname:  "Doe",
			Password: "$2a$12$AHRw1nm7olpgqcY/zgD1CezUSpfWrLmDvs5bGQ1JtQltnDC7CyKTy",
			Email:    "email2@maildrop.cc",
			Banned:   false,
			Active:   true,
			Role:     Standard,
		},
		{
			Username: "UserJane",
			Name:     "Jane",
			Surname:  "Doe",
			Password: "$2a$12$AHRw1nm7olpgqcY/zgD1CezUSpfWrLmDvs5bGQ1JtQltnDC7CyKTy",
			Email:    "email3@maildrop.cc",
			Banned:   false,
			Active:   true,
			Role:     Standard,
		},
		{
			Username: "UserJill",
			Name:     "Jill",
			Surname:  "Doe",
			Password: "$2a$12$AHRw1nm7olpgqcY/zgD1CezUSpfWrLmDvs5bGQ1JtQltnDC7CyKTy",
			Email:    "email4@maildrop.cc",
			Banned:   false,
			Active:   true,
			Role:     Standard,
		},
	}
)

func InitializeData() {
	connectionString := "host=localhost user=postgres dbname=atob_users sslmode=disable password=root port=5432"
	dialect := "postgres"

	Db, err = gorm.Open(dialect, connectionString)
	if err != nil {
		log.Fatal(err)
	} else {
		fmt.Println("Connection to DB successfull.")
	}

	Db.DropTable("users")
	Db.AutoMigrate(&User{})

	for _, user := range users {
		Db.Create(&user)
	}

}
