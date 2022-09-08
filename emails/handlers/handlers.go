package handlers

import (
	"bytes"
	"encoding/json"
	"fmt"
	"html/template"
	"net/http"
	"net/smtp"

	data "github.com/Mladenv7/ntpproj/emails/data"
)

func SendEmail(rw http.ResponseWriter, r *http.Request) {

	var ei *data.EmailInfo

	json.NewDecoder(r.Body).Decode(&ei)

	to := []string{ei.To}

	smtpHost := "smtp.mailtrap.io"
	smtpPort := "2525"

	auth := smtp.PlainAuth("", "714c701805fc72", "f9e60ad6d626d4", smtpHost)

	t, _ := template.ParseFiles("data/template.html")

	var body bytes.Buffer

	mimeHeaders := "MIME-version: 1.0;\nContent-Type: text/html; charset=\"UTF-8\";\n\n"
	body.Write([]byte(fmt.Sprintf("From: "+ei.From+"\r\nTo: "+ei.To+"\r\nSubject: "+ei.Subject+"\n%s\n\n", mimeHeaders)))

	t.Execute(&body, struct {
		Message string
	}{
		Message: ei.Message,
	})

	err := smtp.SendMail(smtpHost+":"+smtpPort, auth, ei.From, to, body.Bytes())
	if err != nil {
		http.Error(rw, err.Error(), http.StatusInternalServerError)
		return
	}
	rw.Write([]byte("Email successfuly sent"))
}

func SendEmailWithLink(rw http.ResponseWriter, r *http.Request) {

	var ei *data.EmailInfo

	json.NewDecoder(r.Body).Decode(&ei)

	to := []string{ei.To}

	smtpHost := "smtp.mailtrap.io"
	smtpPort := "2525"

	auth := smtp.PlainAuth("", "714c701805fc72", "f9e60ad6d626d4", smtpHost)

	t, _ := template.ParseFiles("data/activationTemplate.html")

	var body bytes.Buffer

	mimeHeaders := "MIME-version: 1.0;\nContent-Type: text/html; charset=\"UTF-8\";\n\n"
	body.Write([]byte(fmt.Sprintf("From: "+ei.From+"\r\nTo: "+ei.To+"\r\nSubject: "+ei.Subject+"\n%s\n\n", mimeHeaders)))

	t.Execute(&body, struct {
		Message string
		Link    string
	}{
		Message: ei.Message,
		Link:    ei.Link,
	})

	err := smtp.SendMail(smtpHost+":"+smtpPort, auth, ei.From, to, body.Bytes())
	if err != nil {
		http.Error(rw, err.Error(), http.StatusInternalServerError)
		return
	}
	rw.Write([]byte("Email successfuly sent"))
}
