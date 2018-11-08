module.exports = {
       "dev": {

           // the server root directory
           root: "../../public",

           // the server port
           // can also be written as a function, e.g.
           // port: function() { return 8282; }
           port: 8080,

           // the host ip address
           // If specified to, for example, "127.0.0.1" the server will
           // only be available on that ip.
           // Specify "0.0.0.0" to be available everywhere
           host: "0.0.0.0",

           showDir : false,
           autoIndex: true,

           // server default file extension
           ext: "html",

           // run in parallel with other tasks
           runInBackground: true,

           // Change to true for grunt task to open the
           // browser automatically
           openBrowser : false
       }
   }
