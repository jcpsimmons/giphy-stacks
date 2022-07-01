import { download } from "https://deno.land/x/download/mod.ts";

const API_KEY = Deno.env.get("GIPHY_API_KEY");
const CWD = Deno.cwd();
const FOLDER_NAME = "gifs";

const fetchFromGiphy = async (
  search: string,
  isSticker?: boolean
): Promise<string[][]> => {
  const url = `https://api.giphy.com/v1/${
    isSticker ? "stickers" : "gifs"
  }/search?api_key=${API_KEY}&q=${search}&limit=25`;
  const resp = await fetch(url);
  const { data } = await resp.json();
  const gifUrls = data
    .map((img: { [key: string]: any }) => [
      img?.images?.original?.url?.split("?")?.[0],
      img?.title?.split(" ")?.join("-"),
    ])
    .filter(
      (item: (string | undefined)[]) =>
        item[0] !== undefined && item[1] !== undefined
    );
  return gifUrls;
};

const getQueriesFromFile = async (filename: string) => {
  const text = await Deno.readTextFile(filename);
  return text.split("\n").filter(Boolean);
};

const main = async () => {
  console.log("fetching gifs...");

  let queries: string[] = [];
  try {
    queries = await getQueriesFromFile(`${CWD}/${Deno.args[0]}`);
  } catch (error) {
    console.error(error);
  }

  try {
    await Deno.remove(`${CWD}/${FOLDER_NAME}`, { recursive: true });
  } catch (_) {}
  await Deno.mkdir(`${CWD}/${FOLDER_NAME}`);

  for (const rawQuery of queries) {
    const isSticker = rawQuery.startsWith("$");
    const query = isSticker ? rawQuery.slice(1) : rawQuery;
    console.log("\n\n\n");
    console.log(`fetching ${query} as ${isSticker ? "sticker" : "gif"}...`);
    console.log("\n");
    let gifData;
    try {
      gifData = await fetchFromGiphy(query, isSticker);
    } catch (_error) {
      console.error("error fetching data for " + query);
      continue;
    }
    Deno.mkdir(`./gifs/${query}`);
    for (const gif of gifData) {
      try {
        const [url, title] = gif;
        console.log(`downloading ${title}...`);
        await download(url, {
          dir: `${CWD}/gifs/${query}`,
          file: `${title}.gif`,
        });
      } catch (error) {
        console.error("\x1b[41m", "error saving a gif");
        console.log("\x1b[0m", " ");
      }
    }
  }
};

main();
