package main

import (
	"fmt"

	data "github.com/Mladenv7/ntpproj/ads/data"
	routes "github.com/Mladenv7/ntpproj/ads/routes"
)

func main() {

	data.InitializeData()

	fmt.Println("Awaiting http requests...")
	routes.HandleRequests()

}
