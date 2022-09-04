package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	util "github.com/Mladenv7/ntpproj/apiGateway/util"
	commentsData "github.com/Mladenv7/ntpproj/comments/data"

	"github.com/gorilla/mux"
)

func GetAllComments(w http.ResponseWriter, r *http.Request) {
	util.SetupResponse(&w, r)
	if r.Method == "OPTIONS" {
		return
	}

	response, err := http.Get(util.CommentServiceBasePath.Next().Host)

	if err != nil {
		w.WriteHeader(http.StatusGatewayTimeout)
		return
	}

	util.DelegateResponse(response, w)
}

func CreateComment(w http.ResponseWriter, r *http.Request) {
	util.SetupResponse(&w, r)
	if r.Method == "OPTIONS" {
		return
	}

	response, err := http.Post(util.CommentServiceBasePath.Next().Host+"/new", "application/json", r.Body)

	if err != nil {
		w.WriteHeader(http.StatusGatewayTimeout)
		return
	}

	util.DelegateResponse(response, w)
}

func UpdateComment(w http.ResponseWriter, r *http.Request) {
	util.SetupResponse(&w, r)
	if r.Method == "OPTIONS" {
		return
	}

	response, err := http.Post(util.CommentServiceBasePath.Next().Host+"/update", "application/json", r.Body)

	if err != nil {
		w.WriteHeader(http.StatusGatewayTimeout)
		return
	}

	util.DelegateResponse(response, w)
}

func DeleteComment(w http.ResponseWriter, r *http.Request) {
	util.SetupResponse(&w, r)
	if r.Method == "OPTIONS" {
		return
	}

	params := mux.Vars(r)
	commentId, _ := strconv.ParseUint(params["id"], 10, 64)

	request, _ := http.NewRequest(http.MethodDelete, util.CommentServiceBasePath.Next().Host+"/delete/"+strconv.FormatUint(uint64(commentId), 10), r.Body)
	request.Header.Set("Accept", "application/json")
	client := &http.Client{}
	response, err := client.Do(request)

	if err != nil {
		w.WriteHeader(http.StatusGatewayTimeout)
		return
	}

	util.DelegateResponse(response, w)
}

func GetCommentsForAd(w http.ResponseWriter, r *http.Request) {
	util.SetupResponse(&w, r)

	pathVars := mux.Vars(r)

	id, ok := pathVars["id"]
	if !ok {
		fmt.Println("id is missing in parameters")
	}

	response, err := http.Get(util.CommentServiceBasePath.Next().Host + "/ofAd/" + id)

	if err != nil {
		w.WriteHeader(http.StatusGatewayTimeout)
		return
	}

	util.DelegateResponse(response, w)
}

func GetNrReportedComments(w http.ResponseWriter, r *http.Request) {
	util.SetupResponse(&w, r)
	if r.Method == "OPTIONS" {
		return
	}

	var comments []commentsData.Comment
	nrOfReports := make(map[string]int)

	response, err := http.Get(util.CommentServiceBasePath.Next().Host)

	json.NewDecoder(response.Body).Decode(&comments)

	for _, comment := range comments {
		if !comment.Reported {
			continue
		}
		if _, ok := nrOfReports[comment.AuthorUsername]; ok {
			nrOfReports[comment.AuthorUsername] += 1
		} else {
			nrOfReports[comment.AuthorUsername] = 1
		}
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(nrOfReports)

	if err != nil {
		w.WriteHeader(http.StatusGatewayTimeout)
		return
	}

	util.DelegateResponse(response, w)
}
