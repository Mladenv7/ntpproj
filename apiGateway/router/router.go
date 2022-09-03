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
	router.HandleFunc("/api/ads/subscribers/{id}", handlers.GetSubscribersForAd).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/ads", handlers.GetAdsPage).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/ads/inactive", handlers.GetInactiveAdsPage).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/ads/totalPages", handlers.GetTotalPages).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/ads/inactive/totalPages", handlers.GetInactiveTotalPages).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/ads/reported", handlers.GetReportedAdsPage).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/ads/reported/totalPages", handlers.GetReportedTotalPages).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/ads/{id}", handlers.GetSingleAd).Methods("GET")
	router.HandleFunc("/api/ads/delete/{id}", handlers.DeleteAd).Methods("DELETE", "OPTIONS")

	// Comment routes
	router.HandleFunc("/api/comments/new", handlers.CreateComment).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/comments/update", handlers.UpdateComment).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/comments/ofAd/{id}", handlers.GetCommentsForAd).Methods("GET")
	router.HandleFunc("/api/comments/delete/{id}", handlers.DeleteComment).Methods("DELETE", "OPTIONS")
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
