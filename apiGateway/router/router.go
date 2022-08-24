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
	router.HandleFunc("/api/ads/new", handlers.CreateAd).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/ads/update", handlers.UpdateAd).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/ads", handlers.GetAdsPage).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/ads/totalPages", handlers.GetTotalPages).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/ads/{id}", handlers.GetSingleAd).Methods("GET")
	router.HandleFunc("/api/ads/delete/{id}", handlers.DeleteAd).Methods("DELETE", "OPTIONS")

	// Comment routes
	router.HandleFunc("/api/comments/new", handlers.CreateComment).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/comments/update", handlers.UpdateComment).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/comments/ofAd/{id}", handlers.GetCommentsForAd).Methods("GET")
	router.HandleFunc("/api/comments/delete/{id}", handlers.DeleteComment).Methods("DELETE", "OPTIONS")

	// User routes
	router.HandleFunc("/api/users/register", handlers.Register).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/users/login", handlers.Login).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/users/loggedIn", handlers.GetLoggedIn).Methods("GET", "OPTIONS")

	log.Fatal(http.ListenAndServe(":8081", router))
}
