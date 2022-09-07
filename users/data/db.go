package data

import (
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"

	"golang.org/x/crypto/bcrypt"
)

var Db *gorm.DB

func FindByEmail(email string) User {

	var user User

	Db.Where("users.email = ? AND deleted_at IS NULL", email).Find(&user)

	return user
}

func FindById(id uint64) User {

	var user User

	Db.First(&user, id)

	return user
}

func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}

func CheckPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

func Save(user User) (uint, error) {
	hashedPassword, _ := HashPassword(user.Password)

	user.Password = hashedPassword

	result := Db.Create(&user)

	return user.ID, result.Error
}

func Update(user User) (uint, error) {
	result := Db.Save(&user)

	return user.ID, result.Error
}

func FindAllUsers() ([]User, int32) {
	var allUsers []User
	var userCount int32

	Db.Find(&allUsers)
	Db.Table("users").Where("deleted_at IS NULL").Select("COUNT(*)").Row().Scan(&userCount)

	return allUsers, userCount
}
