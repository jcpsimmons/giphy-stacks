# giphy-stacks
## A giphy search/bulk downloader tool

Set `GIPHY_API_KEY` in your env!

runs as `giphy-stacks input.txt`. Input should be a text file with one query per line. Start a line with `$` to search giphy stickers. Folders will be created with 25 pg-13 gifs in a folder structure mimicing your query.


Bulk downloader for Giphy API

deno run --allow-write --allow-env --allow-net --allow-read --watch main.ts
