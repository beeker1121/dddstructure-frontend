package main

import (
	"log"
	"net/http"
)

func main() {
	mux := http.NewServeMux()

	// TODO: Handle API here.

	// Handle assets directory.
	fs := http.FileServer(http.Dir("./dist/assets"))
	mux.Handle("/assets/", http.StripPrefix("/assets/", fs))

	// Handle index page.
	mux.HandleFunc("/", indexHandler)

	log.Println("Listening on :5173...")
	err := http.ListenAndServe(":5173", mux)
	if err != nil {
		log.Fatal(err)
	}
}

func indexHandler(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path == "/favicon.ico" {
		http.ServeFile(w, r, "./dist/favicon.ico")
		return
	}

	http.ServeFile(w, r, "./dist/index.html")
}
