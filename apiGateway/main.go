package main

import (
	"fmt"

	router "github.com/Mladenv7/ntpproj/apiGateway/router"
)

func main() {

	fmt.Println("Api gateway is running...")

	router.HandleRequests()
}
