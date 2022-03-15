module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/event.ics");

  return {
    dir: { input: "src", output: "public" },
  };
};
