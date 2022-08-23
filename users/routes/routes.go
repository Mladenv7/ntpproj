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
	router.HandleFunc("/api/users/register", handler.Register).Methods("POST")
	router.HandleFunc("/api/users/loggedIn", handler.GetLoggedIn).Methods("GET")

	log.Fatal(http.ListenAndServe(":8083", router))
}
