package handlers

import (
	"net/http"

	util "github.com/Mladenv7/ntpproj/apiGateway/util"
)

func GetAllAds(w http.ResponseWriter, r *http.Request) {
	util.SetupResponse(&w, r)

	page := r.URL.Query().Get("page")
	//size := r.URL.Query().Get("size")

	response, err := http.Get(util.AdServiceBasePath.Next().Host + "?page=" + page)

	if err != nil {
		w.WriteHeader(http.StatusGatewayTimeout)
		return
	}

	util.DelegateResponse(response, w)
}

func CreateAd(w http.ResponseWriter, r *http.Request) {
	util.SetupResponse(&w, r)
	response, err := http.Post(util.AdServiceBasePath.Next().Host+"/new", "application/json", r.Body)

	if err != nil {
		w.WriteHeader(http.StatusGatewayTimeout)
		return
	}

	util.DelegateResponse(response, w)
}
