'use strict';

angular.module('DeviceTrackingSystem.version', [
  'DeviceTrackingSystem.version.interpolate-filter',
  'DeviceTrackingSystem.version.version-directive'
])

.value('version', '0.1');
