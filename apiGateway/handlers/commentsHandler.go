package handlers

import (
	"fmt"
	"net/http"
	"strconv"

	util "github.com/Mladenv7/ntpproj/apiGateway/util"
	"github.com/gorilla/mux"
)

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
