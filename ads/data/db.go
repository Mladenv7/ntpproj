package data

import (
	"net/http"
	"strconv"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

var Db *gorm.DB

func Paginate(r *http.Request) func(db *gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {
		q := r.URL.Query()
		page, _ := strconv.Atoi(q.Get("page"))
		if page == 0 {
			page = 1
		}

		pageSize, _ := 4, 4 //strconv.Atoi(q.Get("page_size"))
		switch {
		case pageSize > 100:
			pageSize = 100
		case pageSize <= 0:
			pageSize = 10
		}

		offset := (page - 1) * pageSize
		return db.Offset(offset).Limit(pageSize)
	}
}

func FindAllAds() ([]Ad, int32) {
	var allAds []Ad
	var adCount int32

	Db.Find(&allAds)
	Db.Table("ads").Where("deleted_at IS NULL").Select("COUNT(*)").Row().Scan(&adCount)

	return allAds, adCount
}

func FindAdsPage(r *http.Request) []Ad {

	var adsPage []Ad

	Db.Scopes(Paginate(r)).Find(&adsPage)

	return adsPage
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
