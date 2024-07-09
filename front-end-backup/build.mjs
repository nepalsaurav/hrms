import * as esbuild from "esbuild";
import { sassPlugin } from "esbuild-sass-plugin";

const OUT_FOLDER = "../static/build";

const buildOptions = [
  {
    entryPoints: ["./src/alpine.js"],
    bundle: true,
    outfile: `${OUT_FOLDER}/alpine/alpine.js`,
  },
  {
    entryPoints: ["./src/bootstrap.js"],
    bundle: true,
    outdir: `${OUT_FOLDER}/bootstrap`,
    plugins: [sassPlugin()],
  },
  {
    entryPoints: ["./src/awesomecomplete.js"],
    bundle: true,
    target: "chrome58",
    format: "cjs",
    outdir: `${OUT_FOLDER}/awesomecomplete`,
  },
];

const startWatch = async () => {
  for (const options of buildOptions) {
    try {
      const context = await esbuild.context(options);
      await context.watch();
      console.log(`Watching for changes in ${options.entryPoints[0]}...`);
    } catch (error) {
      console.error(
        `Error setting up watch for ${options.entryPoints[0]}:`,
        error
      );
    }
  }
};

// Call the watch function
startWatch().catch((error) => console.error("Build process failed:", error));
