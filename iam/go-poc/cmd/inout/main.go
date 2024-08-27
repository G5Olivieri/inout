package main

import (
	"crypto/rand"
	"log"
	"net/http"
	"text/template"

	"github.com/G5Olivieri/inout-auth/internal/clients"
	"github.com/G5Olivieri/inout-auth/internal/csrf"
	"github.com/G5Olivieri/inout-auth/internal/oidc"
	"github.com/G5Olivieri/inout-auth/internal/users"
	"github.com/google/uuid"
	"github.com/julienschmidt/httprouter"
)

func NoCacheHandler(h httprouter.Handle) httprouter.Handle {
	return func(w http.ResponseWriter, r *http.Request, p httprouter.Params) {
		w.Header().Add("cache-control", "no-cache, no-store, must-revalidate")
		w.Header().Add("pragma", "no-cache")
		w.Header().Add("expires", "0")
		h(w, r, p)
	}
}

func main() {
	tmpl := template.Must(template.ParseFiles("authorize.html"))

	codeSecretKey := make([]byte, 32)
	_, err := rand.Read(codeSecretKey)
	if err != nil {
		log.Println("Erro generate codeSecretKey")
		log.Fatalln(err.Error())
		return
	}

	csrfSecret := make([]byte, 32)
	_, err = rand.Read(csrfSecret)
	if err != nil {
		log.Println("Erro generate csrfSecret")
		log.Fatalln(err.Error())
		return
	}
	clientRepository := clients.NewInMemoryClientRepository([]clients.Client{
		{ID: "glayssinho", RawRedirectURI: "http://localhost:3000/callback"},
	})
	password, err := users.NewPassword([]byte("glayson"), users.NewArgon2PasswordHasher(2, 15*1024, 1, 32))
	if err != nil {
		log.Println("new password error")
		log.Fatalln(err.Error())
		return
	}
	userRepository := users.NewInMemoryUserRepository([]users.User{
		{
			ID:       uuid.NewString(),
			Username: "glayson",
			// https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html#signed-double-submit-cookie-recommended
			Password: password,
		},
	})

	csrfTokenGenerator := csrf.NewHMACGenerator(csrfSecret)

	csrfCookieName := "csrf_token"

	authHandler := oidc.NewAuthHandler(clientRepository, csrfTokenGenerator, csrfCookieName, *tmpl)

	codeEncoding := oidc.NewAESCodeEncoding(codeSecretKey)

	loginHandler := oidc.NewLoginHandler(clientRepository, userRepository, csrfTokenGenerator, codeEncoding, csrfCookieName)

	tokenHandler := oidc.NewTokenHandler(clientRepository, codeEncoding, userRepository)

	r := httprouter.New()
	r.GET("/oidc/auth", authHandler.Handle)
	r.POST("/oidc/token", NoCacheHandler(tokenHandler.Handle))
	r.POST("/oidc/login", NoCacheHandler(loginHandler.Handle))
	log.Println("Listining :8080")
	http.ListenAndServe(":8080", r)
}
