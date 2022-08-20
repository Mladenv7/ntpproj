package handlers

import (
	"fmt"
	"net/http"

	util "github.com/Mladenv7/ntpproj/apiGateway/util"
	"github.com/gorilla/mux"
)

// func GetAdsPage(w http.ResponseWriter, r *http.Request) {
// 	util.SetupResponse(&w, r)

// 	page := r.URL.Query().Get("page")
// 	//size := r.URL.Query().Get("size")

// 	response, err := http.Get(util.AdServiceBasePath.Next().Host + "?page=" + page)

// 	if err != nil {
// 		w.WriteHeader(http.StatusGatewayTimeout)
// 		return
// 	}

// 	util.DelegateResponse(response, w)
// }

func GetAdsPage(w http.ResponseWriter, r *http.Request) {
	util.SetupResponse(&w, r)
	if r.Method == "OPTIONS" {
		return
	}

	page := r.URL.Query().Get("page")
	//size := r.URL.Query().Get("size")

	response, err := http.Post(util.AdServiceBasePath.Next().Host+"?page="+page, "application/json", r.Body)

	if err != nil {
		w.WriteHeader(http.StatusGatewayTimeout)
		return
	}

	util.DelegateResponse(response, w)
}

func GetTotalPages(w http.ResponseWriter, r *http.Request) {
	util.SetupResponse(&w, r)
	if r.Method == "OPTIONS" {
		return
	}

	response, err := http.Post(util.AdServiceBasePath.Next().Host+"/totalPages", "application/json", r.Body)

	if err != nil {
		w.WriteHeader(http.StatusGatewayTimeout)
		return
	}

	util.DelegateResponse(response, w)
}

func GetSingleAd(w http.ResponseWriter, r *http.Request) {
	util.SetupResponse(&w, r)

	pathVars := mux.Vars(r)

	id, ok := pathVars["id"]
	if !ok {
		fmt.Println("id is missing in parameters")
	}

	response, err := http.Get(util.AdServiceBasePath.Next().Host + "/" + id)

	if err != nil {
		w.WriteHeader(http.StatusGatewayTimeout)
		return
	}

	util.DelegateResponse(response, w)
}

func CreateAd(w http.ResponseWriter, r *http.Request) {
	util.SetupResponse(&w, r)
	if r.Method == "OPTIONS" {
		return
	}

	response, err := http.Post(util.AdServiceBasePath.Next().Host+"/new", "application/json", r.Body)

	if err != nil {
		w.WriteHeader(http.StatusGatewayTimeout)
		return
	}

	util.DelegateResponse(response, w)
}
