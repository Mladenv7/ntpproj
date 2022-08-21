package data

import (
	"fmt"
	"log"

	"github.com/jinzhu/gorm"
)

var err error

var (
	ads = []Ad{
		{
			Description: "Mint condition",
			AskingPrice: 4500.0,
			Mileage:     240000,
			CarId:       1,
		},
		{
			Description: "Mint condition",
			AskingPrice: 55000.0,
			Mileage:     50000,
			CarId:       2,
		},
		{
			Description: "Mint condition",
			AskingPrice: 4500.0,
			Mileage:     160000,
			CarId:       3,
		},
		{
			Description: "Mint condition",
			AskingPrice: 16000.0,
			Mileage:     150000,
			CarId:       4,
		},
		{
			Description: "Mint condition",
			AskingPrice: 18000.0,
			Mileage:     140000,
			CarId:       5,
		},
		{
			Description: "Mint condition",
			AskingPrice: 9000.0,
			Mileage:     180000,
			CarId:       6,
		},
	}
)

func InitializeData() {
	connectionString := "host=localhost user=postgres dbname=atob_ads sslmode=disable password=root port=5432"
	dialect := "postgres"

	Db, err = gorm.Open(dialect, connectionString)
	if err != nil {
		log.Fatal(err)
	} else {
		fmt.Println("Connection to DB successfull.")
	}

	Db.DropTable("ads")
	Db.AutoMigrate(&Ad{})

	for _, ad := range ads {
		Db.Create(&ad)
	}

}
