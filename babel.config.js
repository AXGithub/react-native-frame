module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
      ["@babel/plugin-proposal-decorators", { "legacy": true }],
      [
          "module-resolver",
          {
              "root": ['.'],
              "alias": {
                  "@assets": "./assets",
                  "@page": "./src/page",
                  "@configure": "./src/configure",
                  "@component": "./src/component",
                  "@store": "./src/store",
                  "@services": "./src/services",
                  "@navigation": "./src/navigation",
                  "@util": "./src/util",
                  "@api": "./src/api",
                  "@theme": "./src/theme",
              },
              "extensions": ['.js', '.jsx', '.ts', '.tsx'],
          }
      ]
  ]
};
