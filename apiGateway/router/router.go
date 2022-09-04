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
	router.HandleFunc("/api/ads/allAds", handlers.GetAllAds).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/ads/new", handlers.CreateAd).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/ads/update", handlers.UpdateAd).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/ads/subscribe", handlers.SubscribeToAd).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/ads/subscribers/{id:[0-9]+}", handlers.GetSubscribersForAd).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/ads", handlers.GetAdsPage).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/ads/inactive", handlers.GetInactiveAdsPage).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/ads/totalPages", handlers.GetTotalPages).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/ads/inactive/totalPages", handlers.GetInactiveTotalPages).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/ads/reported", handlers.GetReportedAdsPage).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/ads/reported/totalPages", handlers.GetReportedTotalPages).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/ads/{id:[0-9]+}", handlers.GetSingleAd).Methods("GET")
	router.HandleFunc("/api/ads/delete/{id:[0-9]+}", handlers.DeleteAd).Methods("DELETE", "OPTIONS")
	router.HandleFunc("/api/ads/newBoostRequest", handlers.NewBoostRequest).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/ads/requests", handlers.GetAllBoostRequests).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/ads/deleteBoostRequest/{id:[0-9]+}", handlers.DeleteBoostRequest).Methods("DELETE", "OPTIONS")
	router.HandleFunc("/api/ads/boosted", handlers.GetBoostedAds).Methods("GET", "OPTIONS")

	// Comment routes
	router.HandleFunc("/api/comments/new", handlers.CreateComment).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/comments/update", handlers.UpdateComment).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/comments/ofAd/{id:[0-9]+}", handlers.GetCommentsForAd).Methods("GET")
	router.HandleFunc("/api/comments/delete/{id:[0-9]+}", handlers.DeleteComment).Methods("DELETE", "OPTIONS")
	router.HandleFunc("/api/comments/nrReports", handlers.GetNrReportedComments).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/comments", handlers.GetAllComments).Methods("GET", "OPTIONS")

	// User routes
	router.HandleFunc("/api/users/register", handlers.Register).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/users/login", handlers.Login).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/users/loggedIn", handlers.GetLoggedIn).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/users", handlers.GetAllUsers).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/users/ban", handlers.BanUser).Methods("POST", "OPTIONS")

	log.Fatal(http.ListenAndServe(":8081", router))
}
