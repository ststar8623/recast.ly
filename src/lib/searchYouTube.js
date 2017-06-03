var searchYouTube = (options, callback) => {
  // TODO
  let urlAPI = 'https://www.googleapis.com/youtube/v3/search';
  console.log('called');
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
      console.log('success');
      console.log(callback);
      return callback(data.items);
    },
    error: function (data) {
      console.log('failed');
    }
  });

};

window.searchYouTube = searchYouTube;
