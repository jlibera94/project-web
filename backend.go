package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/mux"
	"github.com/gorilla/sessions"
	"github.com/rs/cors"
)

var store = sessions.NewCookieStore([]byte("super-secret-key"))

// User struct for demonstration
type User struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

// In-memory user store (for now)
var users = map[string]string{}

func registerHandler(w http.ResponseWriter, r *http.Request) {
	var user User
	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		http.Error(w, "Invalid input", http.StatusBadRequest)
		return
	}
	if _, exists := users[user.Username]; exists {
		http.Error(w, "User already exists", http.StatusConflict)
		return
	}
	users[user.Username] = user.Password
	w.WriteHeader(http.StatusCreated)
	fmt.Fprintln(w, "User registered successfully")
}

func loginHandler(w http.ResponseWriter, r *http.Request) {
	var creds User
	if err := json.NewDecoder(r.Body).Decode(&creds); err != nil {
		http.Error(w, "Invalid input", http.StatusBadRequest)
		return
	}
	storedPassword, exists := users[creds.Username]
	if !exists || storedPassword != creds.Password {
		http.Error(w, "Invalid credentials", http.StatusUnauthorized)
		return
	}
	session, _ := store.Get(r, "session")
	session.Values["authenticated"] = true
	session.Values["username"] = creds.Username
	session.Save(r, w)
	fmt.Fprintln(w, "Login successful")
}

func postHandler(w http.ResponseWriter, r *http.Request) {
	session, _ := store.Get(r, "session")
	if auth, ok := session.Values["authenticated"].(bool); !ok || !auth {
		http.Error(w, "Forbidden", http.StatusForbidden)
		return
	}
	var post map[string]string
	if err := json.NewDecoder(r.Body).Decode(&post); err != nil {
		http.Error(w, "Invalid post data", http.StatusBadRequest)
		return
	}
	username := session.Values["username"].(string)
	fmt.Fprintf(w, "Post submitted by %s: %s", username, post["content"])
}

func main() {
	r := mux.NewRouter()

	r.HandleFunc("/register", registerHandler).Methods("POST")
	r.HandleFunc("/login", loginHandler).Methods("POST")
	r.HandleFunc("/post", postHandler).Methods("POST")

	// CORS for frontend (React)
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"},
		AllowedMethods:   []string{"GET", "POST", "OPTIONS"},
		AllowedHeaders:   []string{"Content-Type"},
		AllowCredentials: true,
	})

	srv := &http.Server{
		Handler:      c.Handler(r),
		Addr:         ":8080",
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}

	log.Println("Server running at http://localhost:8080")
	log.Fatal(srv.ListenAndServe())
}
