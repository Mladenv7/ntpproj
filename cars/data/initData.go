package data

import (
	"fmt"
	"log"

	"github.com/jinzhu/gorm"
)

var err error

var (
	cars = []Car{
		{
			Manufacturer: "Toyota",
			ModelName:    "Yaris 1.3 D4D",
			ModelYear:    2008,
			EngineVolume: 1298,
			Drivetrain:   FWD,
			FuelType:     Diesel,
			Body:         Hatchback,
		},
		{
			Manufacturer: "Porsche",
			ModelName:    "718 Cayman",
			ModelYear:    2018,
			EngineVolume: 1988,
			Drivetrain:   RWD,
			FuelType:     Petrol,
			Body:         Coupe,
		},
		{
			Manufacturer: "BMW",
			ModelName:    "320d",
			ModelYear:    2009,
			EngineVolume: 1995,
			Drivetrain:   RWD,
			FuelType:     Diesel,
			Body:         Coupe,
		},
		{
			Manufacturer: "Renault",
			ModelName:    "Megane 1.5 DCi",
			ModelYear:    2017,
			EngineVolume: 1461,
			Drivetrain:   FWD,
			FuelType:     Diesel,
			Body:         Hatchback,
		},
		{
			Manufacturer: "Volkswagen",
			ModelName:    "Passat 2.0TDI",
			ModelYear:    2017,
			EngineVolume: 1968,
			Drivetrain:   FWD,
			FuelType:     Diesel,
			Body:         Sedan,
		},
		{
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
	connectionString := "host=localhost user=postgres dbname=atob_cars sslmode=disable password=root port=5432"
	dialect := "postgres"

	Db, err = gorm.Open(dialect, connectionString)
	if err != nil {
		log.Fatal(err)
	} else {
		fmt.Println("Connection to DB successfull.")
	}

	Db.DropTable("cars")
	Db.AutoMigrate(&Car{})

	for _, car := range cars {
		Db.Create(&car)
	}

}
