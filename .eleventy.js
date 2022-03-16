const now = String(Date.now());

module.exports = function (eleventyConfig) {
  eleventyConfig.addWatchTarget("./tailwind.config.js");
  eleventyConfig.addWatchTarget("./src/css/tailwind.css");

  eleventyConfig.addPassthroughCopy({
    "./node_modules/alpinejs/dist/cdn.js": "./js/alpine.js",
  });

  eleventyConfig.addPassthroughCopy({
    "./node_modules/moment/min/moment.min.js": "./js/moment.js",
  });

  eleventyConfig.addShortcode("version", function () {
    return now;
  });

  eleventyConfig.addPassthroughCopy("./src/event.ics");
  eleventyConfig.addPassthroughCopy("./src/js");

  return {
    dir: { input: "src", output: "public" },
  };
};
