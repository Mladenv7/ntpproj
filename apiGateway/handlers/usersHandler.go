package handlers

import (
	"fmt"
	"net/http"
	"strconv"

	util "github.com/Mladenv7/ntpproj/apiGateway/util"
	"github.com/gorilla/mux"
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
	if r.Method == "OPTIONS" {
		return
	}

	client := http.Client{}
	request, err := http.NewRequest("GET", util.UserServiceBasePath.Next().Host+"/loggedIn", nil)
	request.Header.Set("Authorization", r.Header.Values("Authorization")[0])

	response, err := client.Do(request)

	if err != nil {
		w.WriteHeader(http.StatusGatewayTimeout)
		return
	}

	util.DelegateResponse(response, w)
}

func GetAllUsers(w http.ResponseWriter, r *http.Request) {
	util.SetupResponse(&w, r)
	if r.Method == "OPTIONS" {
		return
	}

	response, err := http.Get(util.UserServiceBasePath.Next().Host)

	if err != nil {
		w.WriteHeader(http.StatusGatewayTimeout)
		return
	}

	util.DelegateResponse(response, w)
}

func GetUserById(w http.ResponseWriter, r *http.Request) {
	util.SetupResponse(&w, r)
	if r.Method == "OPTIONS" {
		return
	}

	params := mux.Vars(r)
	id, _ := strconv.ParseUint(params["id"], 10, 64)

	response, err := http.Get(util.UserServiceBasePath.Next().Host + "/" + strconv.FormatUint(uint64(id), 10))

	if err != nil {
		w.WriteHeader(http.StatusGatewayTimeout)
		return
	}

	util.DelegateResponse(response, w)
}

func BanUser(w http.ResponseWriter, r *http.Request) {
	util.SetupResponse(&w, r)
	if r.Method == "OPTIONS" {
		return
	}

	response, err := http.Post(util.UserServiceBasePath.Next().Host+"/ban", "application/json", r.Body)

	if err != nil {
		w.WriteHeader(http.StatusGatewayTimeout)
		return
	}

	util.DelegateResponse(response, w)
}

func ActivateUser(w http.ResponseWriter, r *http.Request) {
	util.SetupResponse(&w, r)
	if r.Method == "OPTIONS" {
		return
	}

	response, err := http.Post(util.UserServiceBasePath.Next().Host+"/activate", "application/json", r.Body)

	if err != nil {
		w.WriteHeader(http.StatusGatewayTimeout)
		return
	}

	util.DelegateResponse(response, w)
}

func GenerateActivationToken(w http.ResponseWriter, r *http.Request) {
	util.SetupResponse(&w, r)
	if r.Method == "OPTIONS" {
		return
	}

	pathVars := mux.Vars(r)

	email, ok := pathVars["email"]
	if !ok {
		fmt.Println("email is missing in parameters")
	}

	response, err := http.Get(util.UserServiceBasePath.Next().Host + "/generateActivationToken/" + email)

	if err != nil {
		w.WriteHeader(http.StatusGatewayTimeout)
		return
	}

	util.DelegateResponse(response, w)
}
