const path = require('path')

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  webpackFinal: async (config, { configType }) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        {
          loader: "style-loader",
        },
        {
          loader: "css-loader",
          options: {
            importLoaders: 2,
            modules: {
              auto: /\.module\.\w+$/i,
              localIdentName: "[local]--[hash:base64:5]",
              exportLocalsConvention: "camelCase",
            },
          },
        },
        {
          loader: "postcss-loader",
          options: {
            postcssOptions: {
              plugins: [require("autoprefixer"), require("cssnano")],
            },
          },
        },
        {
          loader: "sass-loader", // compiles Sass to CSS
        },
      ],
      include: path.resolve(__dirname, '../'),
    });
    return config;
  }
}