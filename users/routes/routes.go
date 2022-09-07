package routes

import (
	"log"
	"net/http"

	handler "github.com/Mladenv7/ntpproj/users/handlers"
	"github.com/gorilla/mux"
)

func HandleRequests() {
	router := mux.NewRouter()

	router.HandleFunc("/api/users/login", handler.Login).Methods("POST")
	router.HandleFunc("/api/users/ban", handler.BanUser).Methods("POST")
	router.HandleFunc("/api/users/activate", handler.ActivateUser).Methods("POST")
	router.HandleFunc("/api/users/register", handler.Register).Methods("POST")
	router.HandleFunc("/api/users/loggedIn", handler.GetLoggedIn).Methods("GET")
	router.HandleFunc("/api/users", handler.GetAllUsers).Methods("GET")
	router.HandleFunc("/api/users/{id:[0-9]+}", handler.GetById).Methods("GET")
	router.HandleFunc("/api/users/generateActivationToken/{email}", handler.CreateActivationToken).Methods("GET")

	log.Fatal(http.ListenAndServe(":8083", router))
}
