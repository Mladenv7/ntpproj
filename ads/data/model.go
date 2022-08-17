package data

import (
	"github.com/jinzhu/gorm"
)

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

type Ad struct {
	gorm.Model

	Description  string
	AskingPrice  float32 `gorm:"min:0.0"` //in euros
	Mileage      uint32
	Manufacturer string
	ModelName    string
	ModelYear    uint16
	EngineVolume uint16 //cubic centimetres
	Drivetrain   Drivetrain
	FuelType     FuelType
	Body         BodyType
}

type AdDTO struct {
	Id           uint    `json:"id"`
	Description  string  `json:"description"`
	AskingPrice  float32 `json:"price"`
	Mileage      uint32  `json:"mileage"`
	Manufacturer string  `json:"manufacturer"`
	ModelName    string  `json:"modelName"`
	ModelYear    uint16  `json:"year"`
	EngineVolume uint16  `json:"volume"`
	Drivetrain   string  `json:"drivetrain"`
	FuelType     string  `json:"fuel"`
	Body         string  `json:"body"`
}

func DTOtoAd(dto AdDTO) Ad {
	drivetrain := dto.Drivetrain
	fuel := dto.FuelType
	body := dto.Body

	return Ad{ModelName: dto.ModelName, Description: dto.Description, AskingPrice: dto.AskingPrice,
		Mileage: dto.Mileage, Manufacturer: dto.Manufacturer, EngineVolume: dto.EngineVolume,
		ModelYear: dto.ModelYear, Drivetrain: Drivetrain(drivetrain), FuelType: FuelType(fuel), Body: BodyType(body),
		Model: gorm.Model{ID: dto.Id}}
}

func AdToDTO(ad Ad) AdDTO {
	return AdDTO{Id: ad.Model.ID,
		ModelName: ad.ModelName, Description: ad.Description, AskingPrice: ad.AskingPrice,
		Mileage: ad.Mileage, Manufacturer: ad.Manufacturer, EngineVolume: ad.EngineVolume,
		ModelYear: ad.ModelYear, Drivetrain: string(ad.Drivetrain), FuelType: string(ad.FuelType), Body: string(ad.Body)}
}
