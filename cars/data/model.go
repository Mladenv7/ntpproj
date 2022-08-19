package data

type Drivetrain string

const (
	FWD = "front wheel drive"
	RWD = "rear wheel drive"
	AWD = "all wheel drive"
)

type BodyType string

const (
	Hatchback    = "Hatchback"
	Sedan        = "Sedan"
	StationWagon = "Station wagon"
	Coupe        = "Coupe"
	Minivan      = "Minivan"
)

type FuelType string

const (
	Petrol   = "Petrol"
	Diesel   = "Diesel"
	Electric = "Electric"
	LPG      = "Petrol + LPG"
	Hybrid   = "Hybrid"
	Hydrogen = "Hydrogen"
)

type Car struct {
	Manufacturer string
	ModelName    string
	ModelYear    uint16
	EngineVolume uint16 //cubic centimetres
	Drivetrain   Drivetrain
	FuelType     FuelType
	Body         BodyType
}
