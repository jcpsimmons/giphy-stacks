# giphy-stacks

## Bulk searcher/downloader for Giphy API

### Written in Deno

I originally wrote this software for my wife. She's a video editor and a workflow she often uses is to search for a bunch of gifs or stickers on Giphy to superimpose over video she's editing. It seemed like this was causing a bunch of inefficiency due to context switching so I wrote this software to speed up her process.

This is what the software does:
- takes a text file of Giphy search queries
- downloads the top 25 gifs (or stickers) for that query
- puts the files into `gifs/QUERY_NAME` folder
- repeats for each new query

That way instead of the workflow being - visit Giphy, search, curate, download. The user can just note good search queries as they go into a text file, download the whole batch, then quickly audition the best gif for each query by using Spotlight's quick view feature and arrow keys.

## Installation

1. Grab the latest binary (over on the right under releases). Make sure you get the correct architechture.
2. Unzip and move the binary to PATH - I put mine in `/usr/local/bin`
3. [Create an account and a new app on Giphy's developer site](https://developers.giphy.com/). You want the API not SDK.
4. Copy the API key
5. In your `.zshrc` or `.bashrc` add `export GIPHY_API_KEY="your_api_key_here"`

## How to Use

giphy-stacks will output its files into a folder called `gifs` in whatever directory you invoke the command in - before running **it will delete any folder named `gifs` in the current directory**. This is to facilitate reruns.

Here's how you would use this in your Desktop directory.

1. Create a text file with your queries - let's call it `queries.txt`
2. Add one query per line.
3. If you want to search stickers instead of gifs (gifs with transparent backgrounds) prefix the query with `$`. A query for dog (gif), arrow (sticker), and guilty face (gif) would look like this in your text file:

```
dog
$arrow
guilty face
```
4. Open terminal and navigate to the directory with your `queries.txt` file. If you're working on desktop like in this hypothetical just run `cd Desktop`
5. Run giphy-stacks like so `giphy-stacks queries.txt`
6. The tool will do its thing and print some data to the terminal.
7. Once it's done you should have your gifs.


## Development

Definitely open to PRs. My wife keeps requesting features so I'll try to add those in the Issues tab here :)

For now - barebones setup -

Make sure you have Deno installed - you might need to do a bit of tweaking in VSCode to get Intellisense to behave with any of the `Deno` class methods.

Run and watch the app - deno run --allow-write --allow-env --allow-net --allow-read --watch main.ts
