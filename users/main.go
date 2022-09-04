package main

import (
	"fmt"

	data "github.com/Mladenv7/ntpproj/users/data"
	routes "github.com/Mladenv7/ntpproj/users/routes"
)

func main() {
	data.InitializeData()
	fmt.Println("Awaiting http requests...")
	routes.HandleRequests()
}
