process.env.NODE_ENV = "development";

module.exports = function (config) {
  config.set({
    frameworks: ["jasmine"],

    // Archivos de test que Karma debe ejecutar
    files: [
      "src/**/*.test.jsx",
    ],

    preprocessors: {
      "src/**/*.test.jsx": ["webpack"],
    },

    webpack: {
      mode: "development",
      module: {
        rules: [
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-env", "@babel/preset-react"],
              },
            },
          },
          {
            // 👇 Regla para procesar CSS (Bootstrap, estilos locales, etc.)
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
          },
          {
            // 👇 Regla opcional para imágenes importadas en componentes
            test: /\.(png|jpe?g|gif|svg)$/i,
            type: "asset/resource",
          },
        ],
      },
      resolve: {
        extensions: [".js", ".jsx"],
      },
    },

    browsers: ["ChromeHeadless"],  // Usa Chrome sin interfaz
    reporters: ["progress"],       // Muestra el progreso en consola
    singleRun: true,               // Ejecuta una vez y termina
  });
};
