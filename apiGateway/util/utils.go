package util

import (
	"io"
	"net/http"
	"net/url"

	roundRobinScheduler "github.com/hlts2/round-robin"
)

var AdServiceBasePath, _ = roundRobinScheduler.New(
	&url.URL{Host: "http://localhost:8080/api/ads"},
)

var CarServiceBasePath, _ = roundRobinScheduler.New(
	&url.URL{Host: "http://localhost:8082/api/cars"},
)

func DelegateResponse(response *http.Response, w http.ResponseWriter) {
	w.Header().Set("Content-Type", response.Header.Get("Content-Type"))
	w.Header().Set("Content-Length", response.Header.Get("Content-Length"))
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	w.WriteHeader(response.StatusCode)
	io.Copy(w, response.Body)
	response.Body.Close()
}

func SetupResponse(w *http.ResponseWriter, r *http.Request) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS")
	(*w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
}
