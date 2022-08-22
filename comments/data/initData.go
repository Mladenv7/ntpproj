package data

import (
	"fmt"
	"log"

	"github.com/jinzhu/gorm"
)

var err error

var (
	comments = []Comment{
		{
			Message:        "Very reliable",
			Rating:         5,
			AdId:           1,
			AuthorId:       1,
			AuthorUsername: "UserJoe",
			Reported:       false,
		},
		{
			Message:        "Quick vehicle",
			Rating:         5,
			AdId:           2,
			AuthorId:       1,
			AuthorUsername: "UserJoe",
			Reported:       false,
		},
		{
			Message:        "You can get the same car for less money",
			Rating:         3,
			AdId:           4,
			AuthorId:       2,
			AuthorUsername: "UserJill",
			Reported:       true,
		},
	}
)

func InitializeData() {
	connectionString := "host=localhost user=postgres dbname=atob_comments sslmode=disable password=root port=5432"
	dialect := "postgres"

	Db, err = gorm.Open(dialect, connectionString)
	if err != nil {
		log.Fatal(err)
	} else {
		fmt.Println("Connection to DB successfull.")
	}

	Db.DropTable("comments")
	Db.AutoMigrate(&Comment{})

	for _, comment := range comments {
		Db.Create(&comment)
	}

}
