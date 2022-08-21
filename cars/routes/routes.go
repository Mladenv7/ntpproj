package routes

import (
	"log"
	"net/http"

	handler "github.com/Mladenv7/ntpproj/cars/handlers"
	"github.com/gorilla/mux"
)

func HandleRequests() {
	router := mux.NewRouter()

	router.HandleFunc("/api/cars", handler.GetAllCars).Methods("GET")
	router.HandleFunc("/api/cars/certain", handler.GetCertainCars).Methods("POST")

	log.Fatal(http.ListenAndServe(":8082", router))
}
