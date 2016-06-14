module.exports = function(config){
  config.set({

    basePath : './app/',

    files : [
      'bower_components/angular/angular.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'components/**/*.js'
    ],

    autoWatch : true,

    colors: true,

    singleRun: false,

    logLevel: config.LOG_INFO,

    frameworks: ['mocha', 'chai'],

    browsers : ['Chrome'],

    plugins : [
            'karma-mocha',
            'karma-chai',
            'karma-chrome-launcher'
    ]
      
  });
};
