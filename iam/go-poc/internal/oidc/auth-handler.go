package oidc

import (
	"log"
	"net/http"
	"net/url"
	"strconv"
	"strings"
	"text/template"
	"time"

	"github.com/G5Olivieri/inout-auth/internal/clients"
	"github.com/G5Olivieri/inout-auth/internal/csrf"
	"github.com/julienschmidt/httprouter"
)

type AuthorizePage struct {
	ClientID     string
	RedirectURI  string
	ResponseType string
	State        string
	Scope        string
}

type AuthHandler struct {
	clientRepository   clients.ClientRepository
	csrfTokenGenerator csrf.Generator
	csrfCookieName     string
	tmpl               template.Template
}

func NewAuthHandler(clientRepository clients.ClientRepository, csrfTokenGenerator csrf.Generator, csrfCookieName string, tmpl template.Template) AuthHandler {
	return AuthHandler{
		clientRepository:   clientRepository,
		csrfTokenGenerator: csrfTokenGenerator,
		csrfCookieName:     csrfCookieName,
		tmpl:               tmpl,
	}
}

func (h AuthHandler) Handle(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	rawRedirectURI := r.URL.Query().Get("redirect_uri")
	if rawRedirectURI == "" {
		w.WriteHeader(http.StatusBadRequest)
		body := []byte("redirect_uri is REQUIRED")
		w.Header().Set("content-type", "text/plain")
		w.Header().Set("content-length", strconv.Itoa(len(body)))
		w.Write(body)
		return
	}

	redirectURI, err := url.Parse(r.URL.Query().Get("redirect_uri"))
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		body := []byte("malformed redirect_uri")
		w.Header().Set("content-type", "text/plain")
		w.Header().Set("content-length", strconv.Itoa(len(body)))
		w.Write(body)
		return
	}

	state := r.URL.Query().Get("state")
	if r.URL.Query().Has("state") {
		redirectURI.Query().Set("state", state)
	}

	scope := r.URL.Query().Get("scope")
	if !strings.Contains(scope, "openid") {
		q := redirectURI.Query()
		q.Set("error", "invalid_scope")
		q.Set("error_description", "scope must be contain openid")
		redirectURI.RawQuery = q.Encode()
		log.Println(redirectURI.String())
		http.Redirect(w, r, redirectURI.String(), http.StatusFound)
		return
	}

	if !r.URL.Query().Has("response_type") {
		q := redirectURI.Query()
		q.Set("error", "invalid_request")
		q.Set("error_description", "response_type is REQUIRED")
		redirectURI.RawQuery = q.Encode()
		http.Redirect(w, r, redirectURI.String(), http.StatusFound)
		return
	}

	responseType := r.URL.Query().Get("response_type")
	if responseType != "code" {
		q := redirectURI.Query()
		q.Set("error", "unsupported_response_type")
		q.Set("error_description", "supported response_type is code")
		redirectURI.RawQuery = q.Encode()
		http.Redirect(w, r, redirectURI.String(), http.StatusFound)
		return
	}

	if !r.URL.Query().Has("client_id") {
		q := redirectURI.Query()
		q.Set("error", "invalid_request")
		q.Set("error_description", "client_id is REQUIRED")
		redirectURI.RawQuery = q.Encode()
		http.Redirect(w, r, redirectURI.String(), http.StatusFound)
		return
	}

	clientID := r.URL.Query().Get("client_id")

	client, err := h.clientRepository.GetByID(r.Context(), clientID)
	if err != nil {
		q := redirectURI.Query()
		q.Set("error", "unouthorized_client")
		q.Set("error_description", err.Error())
		redirectURI.RawQuery = q.Encode()
		http.Redirect(w, r, redirectURI.String(), http.StatusFound)
		return
	}

	if client.RawRedirectURI != rawRedirectURI {
		q := redirectURI.Query()
		q.Set("error", "unouthorized_client")
		q.Set("error_description", "invalid redirect_uri to client")
		redirectURI.RawQuery = q.Encode()
		http.Redirect(w, r, redirectURI.String(), http.StatusFound)
		return
	}

	csrf, err := h.csrfTokenGenerator.Generate()
	if err != nil {
		log.Println(err.Error())
		q := redirectURI.Query()
		q.Set("error", "server_error")
		q.Set("error_description", "internal server error")
		redirectURI.RawQuery = q.Encode()
		http.Redirect(w, r, redirectURI.String(), http.StatusFound)
		return
	}

	csrfCookie := http.Cookie{
		Name:     h.csrfCookieName,
		Value:    csrf,
		Expires:  time.Now().Add(time.Duration(5) * time.Minute),
		HttpOnly: true,
		Secure:   true,
	}
	http.SetCookie(w, &csrfCookie)
	w.Header().Add("content-type", "text/html")
	h.tmpl.Execute(w, AuthorizePage{
		ClientID:     clientID,
		RedirectURI:  redirectURI.String(),
		ResponseType: responseType,
		State:        state,
		Scope:        scope,
	})
}
