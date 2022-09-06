package main

import (
	"fmt"

	routes "github.com/Mladenv7/ntpproj/emails/routes"
)

func main() {

	fmt.Println("Awaiting http requests...")
	routes.HandleRequests()

}
