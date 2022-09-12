package handlers

import (
	"net/http"

	util "github.com/Mladenv7/ntpproj/apiGateway/util"
)

func SendEmail(w http.ResponseWriter, r *http.Request) {
	util.SetupResponse(&w, r)
	if r.Method == "OPTIONS" {
		return
	}

	// if !util.AuthorizeUser([]string{"Administrator", "Standard"}, r) {
	// 	w.WriteHeader(http.StatusUnauthorized)
	// 	return
	// }

	response, err := http.Post(util.EmailServiceBasePath.Next().Host+"/sendEmail", "application/json", r.Body)

	if err != nil {
		w.WriteHeader(http.StatusGatewayTimeout)
		return
	}

	util.DelegateResponse(response, w)
}

func SendEmailLink(w http.ResponseWriter, r *http.Request) {
	util.SetupResponse(&w, r)
	if r.Method == "OPTIONS" {
		return
	}

	// if !util.AuthorizeUser([]string{"Administrator", "Standard"}, r) {
	// 	w.WriteHeader(http.StatusUnauthorized)
	// 	return
	// }

	response, err := http.Post(util.EmailServiceBasePath.Next().Host+"/sendEmailLink", "application/json", r.Body)

	if err != nil {
		w.WriteHeader(http.StatusGatewayTimeout)
		return
	}

	util.DelegateResponse(response, w)
}
