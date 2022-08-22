package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	data "github.com/Mladenv7/ntpproj/comments/data"
	"github.com/gorilla/mux"
)

func GetAllComments(w http.ResponseWriter, r *http.Request) {

	comments, _ := data.FindAllComments()

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(comments)
}

func GetCommentsForAd(w http.ResponseWriter, r *http.Request) {

	pathVars := mux.Vars(r)

	id, ok := pathVars["id"]
	if !ok {
		fmt.Println("id is missing in parameters")
	}

	parsedId, _ := strconv.ParseUint(id, 0, 32)

	comments := data.FindCommentsForAd(parsedId)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(comments)
}

func SaveOneComment(w http.ResponseWriter, r *http.Request) {

	var comment data.Comment

	json.NewDecoder(r.Body).Decode(&comment)

	id, err := data.Save(comment)

	w.Header().Set("Content-Type", "application/json")
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(err.Error())
	} else {
		w.WriteHeader(http.StatusCreated)
		json.NewEncoder(w).Encode(id)
	}
}

func UpdateComment(w http.ResponseWriter, r *http.Request) {

	var comment data.Comment

	json.NewDecoder(r.Body).Decode(&comment)

	id, err := data.Update(comment)

	w.Header().Set("Content-Type", "application/json")
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(err.Error())
	} else {
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(id)
	}
}

func DeleteComment(w http.ResponseWriter, r *http.Request) {

	params := mux.Vars(r)
	commentId, _ := strconv.ParseUint(params["id"], 10, 64)

	err := data.Delete(commentId)

	w.Header().Set("Content-Type", "application/json")
	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		json.NewEncoder(w).Encode(err.Error())
	} else {
		w.WriteHeader(http.StatusOK)
	}
}
