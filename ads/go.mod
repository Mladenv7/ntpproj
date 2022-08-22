module github.com/Mladenv7/ntpproj/ads

go 1.19

replace github.com/Mladenv7/ntpproj/apiGateway => ../apiGateway

require (
	github.com/Mladenv7/ntpproj/apiGateway v0.0.0-00010101000000-000000000000
	github.com/gorilla/mux v1.8.0
	github.com/jinzhu/gorm v1.9.16
)

require (
	github.com/jinzhu/inflection v1.0.0 // indirect
	github.com/lib/pq v1.1.1 // indirect
)
