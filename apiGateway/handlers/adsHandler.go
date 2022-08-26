package handlers

import (
	"fmt"
	"net/http"
	"strconv"

	util "github.com/Mladenv7/ntpproj/apiGateway/util"
	"github.com/gorilla/mux"
)

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

func GetInactiveAdsPage(w http.ResponseWriter, r *http.Request) {
	util.SetupResponse(&w, r)
	if r.Method == "OPTIONS" {
		return
	}

	page := r.URL.Query().Get("page")
	//size := r.URL.Query().Get("size")

	response, err := http.Post(util.AdServiceBasePath.Next().Host+"/inactive?page="+page, "application/json", r.Body)

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

func GetInactiveTotalPages(w http.ResponseWriter, r *http.Request) {
	util.SetupResponse(&w, r)
	if r.Method == "OPTIONS" {
		return
	}

	response, err := http.Post(util.AdServiceBasePath.Next().Host+"/inactive/totalPages", "application/json", r.Body)

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

func UpdateAd(w http.ResponseWriter, r *http.Request) {
	util.SetupResponse(&w, r)
	if r.Method == "OPTIONS" {
		return
	}

	response, err := http.Post(util.AdServiceBasePath.Next().Host+"/update", "application/json", r.Body)

	if err != nil {
		w.WriteHeader(http.StatusGatewayTimeout)
		return
	}

	util.DelegateResponse(response, w)
}

func DeleteAd(w http.ResponseWriter, r *http.Request) {
	util.SetupResponse(&w, r)
	if r.Method == "OPTIONS" {
		return
	}

	params := mux.Vars(r)
	adId, _ := strconv.ParseUint(params["id"], 10, 64)

	request, _ := http.NewRequest(http.MethodDelete, util.AdServiceBasePath.Next().Host+"/delete/"+strconv.FormatUint(uint64(adId), 10), r.Body)
	request.Header.Set("Accept", "application/json")
	client := &http.Client{}
	response, err := client.Do(request)

	if err != nil {
		w.WriteHeader(http.StatusGatewayTimeout)
		return
	}

	util.DelegateResponse(response, w)
}
