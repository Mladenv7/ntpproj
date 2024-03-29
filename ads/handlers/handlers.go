package handlers

import (
	"encoding/json"
	"fmt"
	"math"
	"net/http"
	"strconv"

	data "github.com/Mladenv7/ntpproj/ads/data"
	"github.com/gorilla/mux"
)

func Test(w http.ResponseWriter, r *http.Request) {

	ad := data.Ad{Description: "test", AskingPrice: 10000.10}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(ad)
}

func GetAllAds(w http.ResponseWriter, r *http.Request) {

	ads, _ := data.FindAllAds()

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(ads)
}

func GetAdPage(w http.ResponseWriter, r *http.Request) {
	ads, _ := data.FindAdsPage(r)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(ads)
}

func GetInactiveAdPage(w http.ResponseWriter, r *http.Request) {
	ads, _ := data.FindInactiveAdsPage(r)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(ads)
}

func GetReportedAdPage(w http.ResponseWriter, r *http.Request) {
	ads, _ := data.FindReportedAdsPage(r)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(ads)
}

func GetTotalPages(w http.ResponseWriter, r *http.Request) {

	_, nrOfAds := data.FindAdsPage(r)

	totalPages := math.Ceil(float64(nrOfAds) / float64(4))

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(totalPages)
}

func GetInactiveTotalPages(w http.ResponseWriter, r *http.Request) {

	_, nrOfAds := data.FindInactiveAdsPage(r)

	totalPages := math.Ceil(float64(nrOfAds) / float64(4))

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(totalPages)
}

func GetReportedTotalPages(w http.ResponseWriter, r *http.Request) {

	_, nrOfAds := data.FindReportedAdsPage(r)

	totalPages := math.Ceil(float64(nrOfAds) / float64(4))

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(totalPages)
}

func GetOneAd(w http.ResponseWriter, r *http.Request) {

	pathVars := mux.Vars(r)

	id, ok := pathVars["id"]
	if !ok {
		fmt.Println("id is missing in parameters")
	}

	parsedId, _ := strconv.ParseUint(id, 0, 32)

	ad := data.FindAdById(parsedId)

	w.Header().Set("Content-Type", "application/json")

	if ad.ID != 0 {
		json.NewEncoder(w).Encode(ad)
	} else {
		w.WriteHeader(http.StatusNotFound)
	}

}

func SaveOneAd(w http.ResponseWriter, r *http.Request) {

	var ad data.Ad

	json.NewDecoder(r.Body).Decode(&ad)

	id, err := data.Save(ad)

	w.Header().Set("Content-Type", "application/json")
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(err.Error())
	} else {
		w.WriteHeader(http.StatusCreated)
		json.NewEncoder(w).Encode(id)
	}
}

func UpdateAd(w http.ResponseWriter, r *http.Request) {

	var ad data.Ad

	json.NewDecoder(r.Body).Decode(&ad)

	id, err := data.Update(ad)

	w.Header().Set("Content-Type", "application/json")
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(err.Error())
	} else {
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(id)
	}
}

func DeleteAd(w http.ResponseWriter, r *http.Request) {

	params := mux.Vars(r)
	adId, _ := strconv.ParseUint(params["id"], 10, 64)

	err := data.Delete(adId)

	w.Header().Set("Content-Type", "application/json")
	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		json.NewEncoder(w).Encode(err.Error())
	} else {
		w.WriteHeader(http.StatusOK)
	}
}

func SubscribeToAd(w http.ResponseWriter, r *http.Request) {
	var subscriberData data.MailingListEntry

	json.NewDecoder(r.Body).Decode(&subscriberData)

	mailingList := data.FindSubscribersForAd(subscriberData.AdId)

	w.WriteHeader(http.StatusOK)

	for _, v := range mailingList {
		if subscriberData.Mail == v.Mail {

			data.UnsubscribeToAd(subscriberData.AdId, subscriberData.Mail)
			json.NewEncoder(w).Encode("Unsubscribed")
			return
		}
	}

	data.SubscribeToAd(subscriberData.AdId, subscriberData.Mail)
	json.NewEncoder(w).Encode("Subscribed")
}

func GetSubscribersForAd(w http.ResponseWriter, r *http.Request) {
	pathVars := mux.Vars(r)

	id, ok := pathVars["id"]
	if !ok {
		fmt.Println("id is missing in parameters")
	}

	parsedId, _ := strconv.ParseUint(id, 0, 32)

	ad := data.FindAdById(parsedId)

	if ad.ID == 0 {
		w.WriteHeader(http.StatusNotFound)
		return
	}

	subscribers := data.FindSubscribersForAd(parsedId)

	w.Header().Set("Content-Type", "application/json")

	json.NewEncoder(w).Encode(subscribers)
}

func NewBoostRequest(w http.ResponseWriter, r *http.Request) {
	var request data.BoostRequest

	json.NewDecoder(r.Body).Decode(&request)

	id, err := data.CreateBoostRequest(request)

	w.Header().Set("Content-Type", "application/json")
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(err.Error())
	} else {
		w.WriteHeader(http.StatusCreated)
		json.NewEncoder(w).Encode(id)
	}
}

func DeleteBoostRequest(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	id, _ := strconv.ParseUint(params["id"], 10, 64)

	err := data.DeleteBoostRequest(id)

	w.Header().Set("Content-Type", "application/json")
	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		json.NewEncoder(w).Encode(err.Error())
	} else {
		w.WriteHeader(http.StatusOK)
	}
}

func GetAllBoostRequests(w http.ResponseWriter, r *http.Request) {
	requests, _ := data.FindAllRequests()

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(requests)
}

func GetAllBoostedAds(w http.ResponseWriter, r *http.Request) {
	boostedAds, _ := data.FindAllBoostedAds()

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(boostedAds)
}
