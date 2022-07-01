const BUILD_FOLDER = "build";
const CWD = Deno.cwd();

try {
  await Deno.remove(`${CWD}/${BUILD_FOLDER}`, { recursive: true });
} catch (_) {}
await Deno.mkdir(`${CWD}/${BUILD_FOLDER}`);

const arches = [
  "x86_64-unknown-linux-gnu",
  "x86_64-pc-windows-msvc",
  "x86_64-apple-darwin",
  "aarch64-apple-darwin",
];

for (const arch of arches) {
  console.log(`building for ${arch}...`);
  const buildFolder = `${CWD}/${BUILD_FOLDER}/${arch}`;
  await Deno.mkdir(buildFolder);

  const cmd = [
    "deno",
    "compile",
    "--target",
    arch,
    "--allow-write",
    "--allow-env",
    "--allow-net",
    "--allow-read",
    "-o",
    `${buildFolder}/giphy-stacks`,
    "./main.ts",
  ];

  console.log("command", cmd);
  const buildJob = Deno.run({
    cmd,
  });

  await buildJob.status();
}
