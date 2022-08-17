package handlers

import (
	"fmt"
	"net/http"

	util "github.com/Mladenv7/ntpproj/apiGateway/util"
)

func GetAllAds(w http.ResponseWriter, r *http.Request) {
	util.SetupResponse(&w, r)

	page := r.URL.Query().Get("page")
	size := r.URL.Query().Get("size")

	fmt.Println(page, size)

	response, err := http.Get(util.AdServiceBasePath.Next().Host)

	if err != nil {
		w.WriteHeader(http.StatusGatewayTimeout)
		return
	}

	util.DelegateResponse(response, w)
}

func CreateAd(w http.ResponseWriter, r *http.Request) {
	util.SetupResponse(&w, r)

	page := r.URL.Query().Get("page")
	size := r.URL.Query().Get("size")

	fmt.Println(page, size)

	response, err := http.Post(util.AdServiceBasePath.Next().Host+"/new", "application/json", r.Body)

	if err != nil {
		w.WriteHeader(http.StatusGatewayTimeout)
		return
	}

	util.DelegateResponse(response, w)
}
