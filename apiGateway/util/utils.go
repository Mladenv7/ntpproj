package util

import (
	"io"
	"net/http"
	"net/url"
	"strings"

	"github.com/golang-jwt/jwt"
	roundRobinScheduler "github.com/hlts2/round-robin"
)

var jwtKey = "vnq7934vn834nv9rugfjq3epr4w08fgie083209j"

var AdServiceBasePath, _ = roundRobinScheduler.New(
	&url.URL{Host: "http://localhost:8080/api/ads"},
)

var CommentServiceBasePath, _ = roundRobinScheduler.New(
	&url.URL{Host: "http://localhost:8082/api/comments"},
)

var UserServiceBasePath, _ = roundRobinScheduler.New(
	&url.URL{Host: "http://localhost:8083/api/users"},
)

var ReportServiceBasePath, _ = roundRobinScheduler.New(
	&url.URL{Host: "http://localhost:9080/api/reports"},
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

func GetTokenFromRequest(r *http.Request) (*jwt.Token, error) {
	cookie := r.Header.Values("Authorization")
	tokenString := strings.Split(cookie[0], "Bearer ")[1]

	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return []byte(jwtKey), nil
	})

	return token, err
}
