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
	//router.HandleFunc("/api/allAds", handlers.GetAllAds).Methods("GET")
	router.HandleFunc("/api/ads/new", handlers.CreateAd).Methods("POST")
	router.HandleFunc("/api/ads", handlers.GetAdsPage).Methods("GET")
	router.HandleFunc("/api/ads/totalPages", handlers.GetTotalPages).Methods("GET")

	log.Fatal(http.ListenAndServe(":8081", router))
}
