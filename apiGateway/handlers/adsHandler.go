package handlers

import (
	"fmt"
	"net/http"
	"strconv"

	util "github.com/Mladenv7/ntpproj/apiGateway/util"
	"github.com/gorilla/mux"
)

func GetAllAds(w http.ResponseWriter, r *http.Request) {
	util.SetupResponse(&w, r)
	if r.Method == "OPTIONS" {
		return
	}

	response, err := http.Get(util.AdServiceBasePath.Next().Host + "/allAds")

	if err != nil {
		w.WriteHeader(http.StatusGatewayTimeout)
		return
	}

	util.DelegateResponse(response, w)
}

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

	if !util.AuthorizeUser([]string{"Administrator"}, r) {
		w.WriteHeader(http.StatusUnauthorized)
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

func GetReportedAdsPage(w http.ResponseWriter, r *http.Request) {
	util.SetupResponse(&w, r)
	if r.Method == "OPTIONS" {
		return
	}

	page := r.URL.Query().Get("page")
	//size := r.URL.Query().Get("size")

	if !util.AuthorizeUser([]string{"Administrator"}, r) {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	response, err := http.Post(util.AdServiceBasePath.Next().Host+"/reported?page="+page, "application/json", r.Body)

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

	if !util.AuthorizeUser([]string{"Administrator"}, r) {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	response, err := http.Post(util.AdServiceBasePath.Next().Host+"/inactive/totalPages", "application/json", r.Body)

	if err != nil {
		w.WriteHeader(http.StatusGatewayTimeout)
		return
	}

	util.DelegateResponse(response, w)
}

func GetReportedTotalPages(w http.ResponseWriter, r *http.Request) {
	util.SetupResponse(&w, r)
	if r.Method == "OPTIONS" {
		return
	}

	if !util.AuthorizeUser([]string{"Administrator"}, r) {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	response, err := http.Post(util.AdServiceBasePath.Next().Host+"/reported/totalPages", "application/json", r.Body)

	if err != nil {
		w.WriteHeader(http.StatusGatewayTimeout)
		return
	}

	util.DelegateResponse(response, w)
}

func GetSingleAd(w http.ResponseWriter, r *http.Request) {
	util.SetupResponse(&w, r)
	if r.Method == "OPTIONS" {
		return
	}

	if !util.AuthorizeUser([]string{"Administrator", "Standard"}, r) {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

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

	if !util.AuthorizeUser([]string{"Standard"}, r) {
		w.WriteHeader(http.StatusUnauthorized)
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

	if !util.AuthorizeUser([]string{"Administrator", "Standard"}, r) {
		w.WriteHeader(http.StatusUnauthorized)
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

	if !util.AuthorizeUser([]string{"Administrator", "Standard"}, r) {
		w.WriteHeader(http.StatusUnauthorized)
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

func SubscribeToAd(w http.ResponseWriter, r *http.Request) {
	util.SetupResponse(&w, r)
	if r.Method == "OPTIONS" {
		return
	}

	if !util.AuthorizeUser([]string{"Standard"}, r) {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	response, err := http.Post(util.AdServiceBasePath.Next().Host+"/subscribe", "application/json", r.Body)

	if err != nil {
		w.WriteHeader(http.StatusGatewayTimeout)
		return
	}

	util.DelegateResponse(response, w)
}

func GetSubscribersForAd(w http.ResponseWriter, r *http.Request) {
	util.SetupResponse(&w, r)
	if r.Method == "OPTIONS" {
		return
	}

	if !util.AuthorizeUser([]string{"Administrator", "Standard"}, r) {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	params := mux.Vars(r)
	adId, _ := strconv.ParseUint(params["id"], 10, 64)

	response, err := http.Get(util.AdServiceBasePath.Next().Host + "/subscribers/" + strconv.FormatUint(uint64(adId), 10))

	if err != nil {
		w.WriteHeader(http.StatusGatewayTimeout)
		return
	}

	util.DelegateResponse(response, w)
}

func NewBoostRequest(w http.ResponseWriter, r *http.Request) {
	util.SetupResponse(&w, r)
	if r.Method == "OPTIONS" {
		return
	}

	if !util.AuthorizeUser([]string{"Standard"}, r) {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	response, err := http.Post(util.AdServiceBasePath.Next().Host+"/newBoostRequest", "application/json", r.Body)

	if err != nil {
		w.WriteHeader(http.StatusGatewayTimeout)
		return
	}

	util.DelegateResponse(response, w)
}

func GetAllBoostRequests(w http.ResponseWriter, r *http.Request) {
	util.SetupResponse(&w, r)
	if r.Method == "OPTIONS" {
		return
	}

	if !util.AuthorizeUser([]string{"Administrator"}, r) {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	response, err := http.Get(util.AdServiceBasePath.Next().Host + "/requests")

	if err != nil {
		w.WriteHeader(http.StatusGatewayTimeout)
		return
	}

	util.DelegateResponse(response, w)
}

func DeleteBoostRequest(w http.ResponseWriter, r *http.Request) {
	util.SetupResponse(&w, r)
	if r.Method == "OPTIONS" {
		return
	}

	if !util.AuthorizeUser([]string{"Administrator"}, r) {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	params := mux.Vars(r)
	reqId, _ := strconv.ParseUint(params["id"], 10, 64)

	request, _ := http.NewRequest(http.MethodDelete, util.AdServiceBasePath.Next().Host+"/deleteBoostRequest/"+strconv.FormatUint(uint64(reqId), 10), r.Body)
	request.Header.Set("Accept", "application/json")
	client := &http.Client{}
	response, err := client.Do(request)

	if err != nil {
		w.WriteHeader(http.StatusGatewayTimeout)
		return
	}

	util.DelegateResponse(response, w)
}

func GetBoostedAds(w http.ResponseWriter, r *http.Request) {
	util.SetupResponse(&w, r)
	if r.Method == "OPTIONS" {
		return
	}

	response, err := http.Get(util.AdServiceBasePath.Next().Host + "/boosted")

	if err != nil {
		w.WriteHeader(http.StatusGatewayTimeout)
		return
	}

	util.DelegateResponse(response, w)
}
