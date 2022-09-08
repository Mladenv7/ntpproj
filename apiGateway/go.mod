module github.com/Mladenv7/ntpproj/apiGateway

go 1.19

replace github.com/Mladenv7/ntpproj/comments => ../comments

replace github.com/Mladenv7/ntpproj/users => ../users

require (
	github.com/Mladenv7/ntpproj/comments v0.0.0-00010101000000-000000000000
	github.com/Mladenv7/ntpproj/users v0.0.0-00010101000000-000000000000
	github.com/gorilla/mux v1.8.0
	github.com/hlts2/round-robin v0.0.0-20211119053418-5ea74e1f7bfc
)

require (
	github.com/jinzhu/gorm v1.9.16 // indirect
	github.com/jinzhu/inflection v1.0.0 // indirect
	github.com/lib/pq v1.1.1 // indirect
	golang.org/x/crypto v0.0.0-20191205180655-e7c4368fe9dd // indirect
)
