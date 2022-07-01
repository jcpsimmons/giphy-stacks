package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
	"os"
)

var giphyAPIKey = os.Getenv("GIPHY_API_KEY")

func main() {
	if giphyAPIKey == "" {
		log.Fatal("GIPHY_API_KEY not defined in env")
	}
	requestGifs("sweating")
}

func requestGifs(searchTerm string) {
	giphyUrl, err := url.Parse("https://api.giphy.com/v1/gifs/search")
	if err != nil {
		log.Fatal(err)
	}

	//build queries
	queries := giphyUrl.Query()
	queries.Add("api_key", giphyAPIKey)
	queries.Add("q", searchTerm)
	queries.Add("limit", "25")
	queries.Add("rating", "pg-13")
	queries.Add("lang", "eng")
	giphyUrl.RawQuery = queries.Encode()

	resp, err := http.Get(giphyUrl.String())
	if err != nil {
		log.Fatalln(err)
	}

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatalln(err)
	}
	//Convert the body to type string
	responseBody := string(body)

	var data map[string]interface{}
	err = json.Unmarshal([]byte(responseBody), &data)
	if err != nil {
		panic(err)
	}
	fmt.Println(data["data"])

	for k := range data {
		fmt.Println(k)
		//fmt.Println(v)
	}
}
