package data

import (
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

var Db *gorm.DB

func FindAllAds() ([]Ad, int32) {
	var allAds []Ad
	var adCount int32

	Db.Find(&allAds)
	Db.Table("ads").Where("deleted_at IS NULL").Select("COUNT(*)").Row().Scan(&adCount)

	return allAds, adCount
}

func FindAdById(id uint64) Ad {
	var ad Ad
	Db.First(&ad, id)
	return ad
}

func Save(ad Ad) (uint, error) {
	result := Db.Create(&ad)

	return ad.ID, result.Error
}
