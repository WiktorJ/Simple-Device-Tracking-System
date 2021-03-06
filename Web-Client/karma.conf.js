module.exports = function(config){
  config.set({

    basePath : './app/',

    files : [
      // AngularJS files.
      'bower_components/angular/angular.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-mocks/angular-mocks.js',

      // External libraries files.
      'bower_components/jquery/dist/jquery.js',
        
      // Custom mocks.
      'utils/tests/googleMapsMock.js',

      // Script files.
      'app.js',
      'services/*.js',
      'controllers/*.js',
      'components/**/*.js',

      // Test files.
      'services/tests/*.js',
      'controllers/tests/*.js'
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
