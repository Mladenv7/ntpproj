package handlers

import (
	"encoding/json"
	"net/http"

	data "github.com/Mladenv7/ntpproj/cars/data"
)

func GetAllCars(w http.ResponseWriter, r *http.Request) {

	cars := data.FindAllCars()

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(cars)
}

func GetCertainCars(w http.ResponseWriter, r *http.Request) {

	cars := data.FindCertainCars(r)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(cars)
}
