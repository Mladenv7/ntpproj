package data

import (
	"encoding/json"
	"net/http"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

var Db *gorm.DB

func FindAllCars() []Car {
	var allCars []Car

	Db.Find(&allCars)

	return allCars
}

func FindCertainCars(r *http.Request) []Car {
	var ids []uint
	var cars []Car

	json.NewDecoder(r.Body).Decode(&ids)

	for _, id := range ids {
		var car Car
		Db.First(&car, id)
		if car.ID != 0 {
			cars = append(cars, car)
		}
	}

	return cars
}
