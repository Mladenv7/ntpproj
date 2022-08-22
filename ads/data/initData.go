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
			Description:  "Mint condition",
			AskingPrice:  4500.0,
			Mileage:      240000,
			Manufacturer: "Toyota",
			ModelName:    "Yaris 1.3 D4D",
			ModelYear:    2008,
			EngineVolume: 1298,
			Drivetrain:   FWD,
			FuelType:     Diesel,
			Body:         Hatchback,
		},
		{
			Description:  "Mint condition",
			AskingPrice:  55000.0,
			Mileage:      50000,
			Manufacturer: "Porsche",
			ModelName:    "718 Cayman",
			ModelYear:    2018,
			EngineVolume: 1988,
			Drivetrain:   RWD,
			FuelType:     Petrol,
			Body:         Coupe,
		},
		{
			Description:  "Mint condition",
			AskingPrice:  4500.0,
			Mileage:      160000,
			Manufacturer: "BMW",
			ModelName:    "320d",
			ModelYear:    2009,
			EngineVolume: 1995,
			Drivetrain:   RWD,
			FuelType:     Diesel,
			Body:         Coupe,
		},
		{
			Description:  "Mint condition",
			AskingPrice:  16000.0,
			Mileage:      150000,
			Manufacturer: "Renault",
			ModelName:    "Megane 1.5 DCi",
			ModelYear:    2017,
			EngineVolume: 1461,
			Drivetrain:   FWD,
			FuelType:     Diesel,
			Body:         Hatchback,
		},
		{
			Description:  "Mint condition",
			AskingPrice:  18000.0,
			Mileage:      140000,
			Manufacturer: "Volkswagen",
			ModelName:    "Passat 2.0TDI",
			ModelYear:    2017,
			EngineVolume: 1968,
			Drivetrain:   FWD,
			FuelType:     Diesel,
			Body:         Sedan,
		},
		{
			Description:  "Mint condition",
			AskingPrice:  9000.0,
			Mileage:      180000,
			Manufacturer: "Opel",
			ModelName:    "Astra",
			ModelYear:    2016,
			EngineVolume: 998,
			Drivetrain:   FWD,
			FuelType:     Petrol,
			Body:         Hatchback,
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
