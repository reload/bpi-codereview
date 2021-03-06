/**
 * @file
 * Trigger drupals ajax on page load.
 */

(function($){
  Drupal.ajax.prototype.bpi_syndicate_images = function() {
    var ajax = this;

    // Do not perform another ajax command if one is already in progress.
    if (ajax.ajaxing) {
      return false;
    }

    try {
      $.ajax(ajax.options);
    }
    catch (err) {
      // TODO Consider checking for availability first. Not all browsers have console available.
      console.log('An error occurred while attempting to process ' + ajax.options.url);
      return false;
    }

    return false;
  };

  var custom_settings = {};
  custom_settings.url = '/admin/bpi/images/nojs';
  custom_settings.event = 'onload';
  custom_settings.keypress = false;
  custom_settings.prevent = false;
  Drupal.ajax['bpi_syndicate_images'] = new Drupal.ajax(null, $(document.body), custom_settings);

  /**
   * Define a point to trigger our custom actions. e.g. on page load.
   */
  $(document).ready(function() {
    Drupal.ajax['bpi_syndicate_images'].bpi_syndicate_images();
  });

})(jQuery);
