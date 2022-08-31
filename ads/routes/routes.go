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
	router.HandleFunc("/api/ads/inactive", handler.GetInactiveAdPage).Methods("POST")
	router.HandleFunc("/api/ads/totalPages", handler.GetTotalPages).Methods("POST")
	router.HandleFunc("/api/ads/inactive/totalPages", handler.GetInactiveTotalPages).Methods("POST")
	router.HandleFunc("/api/ads/{id}", handler.GetOneAd).Methods("GET")
	router.HandleFunc("/api/ads/delete/{id}", handler.DeleteAd).Methods("DELETE")
	router.HandleFunc("/api/ads/new", handler.SaveOneAd).Methods("POST")
	router.HandleFunc("/api/ads/update", handler.UpdateAd).Methods("POST")
	router.HandleFunc("/api/ads/subscribe", handler.SubscribeToAd).Methods("POST")
	router.HandleFunc("/api/ads/subscribers/{id}", handler.GetSubscribersForAd).Methods("GET")

	log.Fatal(http.ListenAndServe(":8080", router))
}
