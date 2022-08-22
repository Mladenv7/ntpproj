package data

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"strconv"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"

	apiGatewayData "github.com/Mladenv7/ntpproj/apiGateway/data"
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

func FindAdsPage(r *http.Request) ([]Ad, int32) {

	var searchParams apiGatewayData.SearchDTO

	json.NewDecoder(r.Body).Decode(&searchParams)

	var adsPage []Ad
	var adCount int32

	sort := searchParams.Sort

	if sort == "" {
		sort = "id"
	}

	Db.Scopes(Paginate(r)).Table("ads").Where("(ads.asking_price BETWEEN ? AND ?) AND (ads.mileage BETWEEN ? AND ?) AND ads.description LIKE ? AND deleted_at IS NULL", searchParams.PriceFrom, searchParams.PriceTo, searchParams.MileageFrom, searchParams.MileageTo, "%"+searchParams.Description+"%").Order(sort).Find(&adsPage)

	Db.Table("ads").Where("(ads.asking_price BETWEEN ? AND ?) AND (ads.mileage BETWEEN ? AND ?) AND ads.description LIKE ? AND deleted_at IS NULL", searchParams.PriceFrom, searchParams.PriceTo, searchParams.MileageFrom, searchParams.MileageTo, "%"+searchParams.Description+"%").Select("COUNT(*)").Row().Scan(&adCount)

	return adsPage, adCount
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

func Update(ad Ad) (uint, error) {
	result := Db.Save(&ad)

	return ad.ID, result.Error
}

func Delete(id uint64) error {
	var ad Ad

	Db.First(&ad, id)

	if ad.ID == 0 {
		return errors.New(fmt.Sprint("Ad with ID %d does not exist", ad.ID))
	}

	Db.Delete(&ad)

	return nil
}
