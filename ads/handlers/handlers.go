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

func GetTotalPages(w http.ResponseWriter, r *http.Request) {

	_, nrOfAds := data.FindAdsPage(r)

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
