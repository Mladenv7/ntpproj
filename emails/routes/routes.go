package routes

import (
	"log"
	"net/http"

	handler "github.com/Mladenv7/ntpproj/emails/handlers"
	"github.com/gorilla/mux"
)

func HandleRequests() {
	router := mux.NewRouter()

	router.HandleFunc("/api/emails/sendEmail", handler.SendEmail).Methods("POST")

	log.Fatal(http.ListenAndServe(":8085", router))
}
