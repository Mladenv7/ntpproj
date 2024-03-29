package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
	"strings"
	"time"

	data "github.com/Mladenv7/ntpproj/users/data"
	"github.com/golang-jwt/jwt"
	"github.com/gorilla/mux"
)

var jwtKey = "vnq7934vn834nv9rugfjq3epr4w08fgie083209j"

func Register(w http.ResponseWriter, r *http.Request) {
	var user data.User

	json.NewDecoder(r.Body).Decode(&user)

	userCheck := data.FindByEmail(user.Email)

	if userCheck.ID != 0 {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode("The email is taken")
		return
	}

	id, err := data.Save(user)

	w.Header().Set("Content-Type", "application/json")
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(err.Error())
	} else {
		w.WriteHeader(http.StatusCreated)
		json.NewEncoder(w).Encode(id)
	}
}

func Login(w http.ResponseWriter, r *http.Request) {

	var loginInfo data.Login

	json.NewDecoder(r.Body).Decode(&loginInfo)

	user := data.FindByEmail(loginInfo.Email)

	if user.ID == 0 {
		w.WriteHeader(http.StatusNotFound)
	} else {

		if data.CheckPasswordHash(loginInfo.Password, user.Password) {
			token := jwt.New(jwt.SigningMethodHS256)
			claims := make(jwt.MapClaims)
			claims["email"] = user.Email
			claims["role"] = user.Role
			claims["id"] = user.ID
			claims["exp"] = time.Now().Add(time.Hour * 24).Unix()
			token.Claims = claims
			tokenString, _ := token.SignedString([]byte(jwtKey))

			json.NewEncoder(w).Encode(tokenString)
		} else {
			json.NewEncoder(w).Encode("Wrong credentials")
		}
	}
}

func GetTokenFromRequest(r *http.Request) (*jwt.Token, error) {
	cookie := r.Header.Values("Authorization")
	tokenString := strings.Split(cookie[0], "Bearer ")[1]

	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return []byte(jwtKey), nil
	})

	return token, err
}

func GetLoggedIn(w http.ResponseWriter, r *http.Request) {
	token, err := GetTokenFromRequest(r)

	if !token.Valid || err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	claims, _ := token.Claims.(jwt.MapClaims)

	user := data.FindByEmail(claims["email"].(string))
	user.Password = ""

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(user)
}

func GetAllUsers(w http.ResponseWriter, r *http.Request) {

	allUsers, _ := data.FindAllUsers()

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(allUsers)
}

func GetById(w http.ResponseWriter, r *http.Request) {
	pathVars := mux.Vars(r)

	id, ok := pathVars["id"]
	if !ok {
		fmt.Println("id is missing in parameters")
	}

	parsedId, _ := strconv.ParseUint(id, 0, 64)

	user := data.FindById(parsedId)

	w.Header().Set("Content-Type", "application/json")

	if user.ID != 0 {
		json.NewEncoder(w).Encode(user)
	} else {
		w.WriteHeader(http.StatusNotFound)
	}
}

func CreateActivationToken(w http.ResponseWriter, r *http.Request) {
	pathVars := mux.Vars(r)

	email, ok := pathVars["email"]
	if !ok {
		fmt.Println("email is missing in parameters")
	}

	token := jwt.New(jwt.SigningMethodHS256)
	claims := make(jwt.MapClaims)
	claims["email"] = email
	claims["exp"] = time.Now().Add(time.Hour * 24 * 2).Unix()
	token.Claims = claims
	tokenString, _ := token.SignedString([]byte(jwtKey))

	json.NewEncoder(w).Encode(tokenString)
}

func ActivateUser(w http.ResponseWriter, r *http.Request) {
	var email string

	json.NewDecoder(r.Body).Decode(&email)

	user := data.FindByEmail(email)

	if user.ID == 0 {
		w.WriteHeader(http.StatusNotFound)
		return
	}

	user.Active = true

	activatedId, err := data.Update(user)

	if err == nil {
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(activatedId)
	}
}

func BanUser(w http.ResponseWriter, r *http.Request) {
	var toBeBanned string

	json.NewDecoder(r.Body).Decode(&toBeBanned)

	user := data.FindByEmail(toBeBanned)
	if user.ID == 0 {
		w.WriteHeader(http.StatusNotFound)
		return
	}

	user.Banned = true

	bannedId, err := data.Update(user)

	if err == nil {
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(bannedId)
	}
}
