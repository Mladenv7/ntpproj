package handlers

import (
	"net/http"

	util "github.com/Mladenv7/ntpproj/apiGateway/util"
)

func Register(w http.ResponseWriter, r *http.Request) {
	util.SetupResponse(&w, r)
	if r.Method == "OPTIONS" {
		return
	}

	response, err := http.Post(util.UserServiceBasePath.Next().Host+"/register", "application/json", r.Body)

	if err != nil {
		w.WriteHeader(http.StatusGatewayTimeout)
		return
	}

	util.DelegateResponse(response, w)
}

func Login(w http.ResponseWriter, r *http.Request) {
	util.SetupResponse(&w, r)
	if r.Method == "OPTIONS" {
		return
	}

	response, err := http.Post(util.UserServiceBasePath.Next().Host+"/login", "application/json", r.Body)

	if err != nil {
		w.WriteHeader(http.StatusGatewayTimeout)
		return
	}

	util.DelegateResponse(response, w)
}

func GetLoggedIn(w http.ResponseWriter, r *http.Request) {
	util.SetupResponse(&w, r)

	response, err := http.Get(util.UserServiceBasePath.Next().Host + "/loggedIn")

	if err != nil {
		w.WriteHeader(http.StatusGatewayTimeout)
		return
	}

	util.DelegateResponse(response, w)
}
