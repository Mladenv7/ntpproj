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

	response, err := http.Post(util.EmailServiceBasePath.Next().Host+"/sendEmail", "application/json", r.Body)

	if err != nil {
		w.WriteHeader(http.StatusGatewayTimeout)
		return
	}

	util.DelegateResponse(response, w)
}
