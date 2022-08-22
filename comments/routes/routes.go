package routes

import (
	"log"
	"net/http"

	handler "github.com/Mladenv7/ntpproj/comments/handlers"
	"github.com/gorilla/mux"
)

func HandleRequests() {
	router := mux.NewRouter()

	router.HandleFunc("/api/comments", handler.GetAllComments).Methods("GET")
	router.HandleFunc("/api/comments/ofAd/{id}", handler.GetCommentsForAd).Methods("GET")
	router.HandleFunc("/api/comments/delete/{id}", handler.DeleteComment).Methods("DELETE")
	router.HandleFunc("/api/comments/new", handler.SaveOneComment).Methods("POST")
	router.HandleFunc("/api/comments/update", handler.UpdateComment).Methods("POST")

	log.Fatal(http.ListenAndServe(":8082", router))
}
