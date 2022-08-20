package data

type SearchDTO struct {
	PriceFrom   float32
	PriceTo     float32
	MileageFrom uint32
	MileageTo   uint32
	Description string
	Sort        string
}
