module.exports = {
           scripts: {
               files: [
                   "../scripts/**/*.js",
                   "!node_modules/**/*.js"
               ],
               tasks: ["eslint", "browserify"],
               options: {
                   spawn: false,
                   debounceDelay: 1000
               }
           }
       }
