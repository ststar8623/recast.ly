var searchYouTube = (options, callback) => {
  // TODO
  let urlAPI = 'https://www.googleapis.com/youtube/v3/search';

  $.ajax({
    cache: false,
    data: $.extend({
      key: options.key,
      q: options.query,
      part: 'snippet'
    }, {maxResults: options.max }),
    dataType: 'json',
    type: 'GET',
    url: urlAPI,
    success: function (data) {
      return callback(data.items);
    },
    error: function (data) {
      console.log('failed');
    }
  });

};

window.searchYouTube = searchYouTube;
