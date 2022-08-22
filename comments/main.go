package main

import (
	"fmt"

	data "github.com/Mladenv7/ntpproj/comments/data"
	routes "github.com/Mladenv7/ntpproj/comments/routes"
)

func main() {
	data.InitializeData()
	fmt.Println("Awaiting http requests...")
	routes.HandleRequests()
}
