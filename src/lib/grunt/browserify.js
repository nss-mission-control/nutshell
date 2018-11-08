module.exports = {
   options: {
       transform: [
           [
               "babelify",
               {
                   "presets": [
                       [
                           "@babel/preset-env", {
                               "targets": {
                                   "node": "current"
                               }
                           }
                       ]
                   ]
               }
           ]
       ],
       browserifyOptions: {
           debug: true
       }
   },
   projectBundle: {
       src: ["../scripts/main.js"],
       dest: "../../public/bundle.js"
   }
}
