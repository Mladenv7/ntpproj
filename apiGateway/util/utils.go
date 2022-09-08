package util

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"

	roundRobinScheduler "github.com/hlts2/round-robin"

	userData "github.com/Mladenv7/ntpproj/users/data"
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
	&url.URL{Host: "http://localhost:8084/api/reports"},
)

var EmailServiceBasePath, _ = roundRobinScheduler.New(
	&url.URL{Host: "http://localhost:8085/api/emails"},
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

func AuthorizeUser(roles []string, r *http.Request) bool {

	client := http.Client{}
	request, err := http.NewRequest("GET", UserServiceBasePath.Next().Host+"/loggedIn", nil)
	request.Header.Set("Authorization", r.Header.Values("Authorization")[0])

	if err != nil {
		fmt.Println("error happened")
		return false
	}

	response, err := client.Do(request)

	var user userData.User

	json.NewDecoder(response.Body).Decode(&user)

	for _, role := range roles {
		if string(user.Role) == role {
			return true
		}
	}

	return false
}
