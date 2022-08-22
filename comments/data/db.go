package data

import (
	"errors"
	"fmt"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

var Db *gorm.DB

func FindAllComments() ([]Comment, int32) {
	var allComments []Comment
	var commentCount int32

	Db.Find(&allComments)
	Db.Table("comments").Where("deleted_at IS NULL").Select("COUNT(*)").Row().Scan(&commentCount)

	return allComments, commentCount
}

func FindCommentsForAd(adId uint64) []Comment {

	var comments []Comment

	Db.Table("comments").Where("comments.ad_id = ? AND deleted_at IS NULL", adId).Find(&comments)

	return comments
}

func Save(comment Comment) (uint, error) {
	result := Db.Create(&comment)

	return comment.ID, result.Error
}

func Update(comment Comment) (uint, error) {
	result := Db.Save(&comment)

	return comment.ID, result.Error
}

func Delete(id uint64) error {
	var comment Comment

	Db.First(&comment, id)

	if comment.ID == 0 {
		return errors.New(fmt.Sprintf("Comment with ID %d does not exist", id))
	}

	Db.Delete(&comment)

	return nil
}
