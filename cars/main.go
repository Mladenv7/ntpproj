package main

import (
	"fmt"

	data "github.com/Mladenv7/ntpproj/cars/data"
	routes "github.com/Mladenv7/ntpproj/cars/routes"
)

func main() {
	data.InitializeData()

	fmt.Println("Awaiting http requests...")
	routes.HandleRequests()
}
