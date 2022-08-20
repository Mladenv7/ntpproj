package routes

import (
	"log"
	"net/http"

	handler "github.com/Mladenv7/ntpproj/ads/handlers"
	"github.com/gorilla/mux"
)

func HandleRequests() {
	router := mux.NewRouter()

	router.HandleFunc("/api/test", handler.Test).Methods("GET")
	router.HandleFunc("/api/allAds", handler.GetAllAds).Methods("GET")
	router.HandleFunc("/api/ads", handler.GetAdPage).Methods("POST")
	router.HandleFunc("/api/ads/totalPages", handler.GetTotalPages).Methods("POST")
	router.HandleFunc("/api/ads/{id}", handler.GetOneAd).Methods("GET")
	router.HandleFunc("/api/ads/new", handler.SaveOneAd).Methods("POST")

	log.Fatal(http.ListenAndServe(":8080", router))
}
