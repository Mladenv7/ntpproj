package router

import (
	"log"
	"net/http"

	handlers "github.com/Mladenv7/ntpproj/apiGateway/handlers"
	"github.com/gorilla/mux"
)

func HandleRequests() {
	router := mux.NewRouter()

	// Ad routes
	router.HandleFunc("/api/ads", handlers.GetAllAds).Methods("GET")
	router.HandleFunc("/api/ads/new", handlers.CreateAd).Methods("POST")

	log.Fatal(http.ListenAndServe(":8081", router))
}
