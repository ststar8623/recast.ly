class App extends React.Component {
  constructor(props) {
    super(props);
    searchYouTube({ query: 'flowers', max: 5, key: YOUTUBE_API_KEY }, data => {
      console.log('data: ', data);
      this.currentVideo = data[0];
      this.videos = data;
    });
    this.state = {
      currentVideo: this.currentVideo,
      videos: this.videos
    };
    this.onTitleClick = this.onTitleClick.bind(this);
    this.searchClick = this.searchClick.bind(this);
    this.keyUp = this.keyUp.bind(this);
  }

  searchClick(e) {
    let search = document.getElementsByClassName('searchBar')[0].value;
    searchYouTube({ query: search, max: 5, key: YOUTUBE_API_KEY }, data => {
      this.setState({
        videos: data,
        currentVideo: data[0]
      });
    });
  }

  keyUp(e) {
    let search = _.debounce(this.searchClick, 500);
    search(e);
  }

  onTitleClick(e) {
    for (let i = 0; i < this.state.videos.length; i++) {
      if (e.target.innerText === this.state.videos[i].snippet.title) {
        this.setState({
          currentVideo: this.state.videos[i]
        });
      }
    }
  }

  render() {
    return ( 
      <div>
        <Nav search={this.searchClick} keyUp={this.keyUp}/>
        <div className="col-md-7">
          <VideoPlayer video={this.state.currentVideo}/>
        </div>
        <div className="col-md-5">
          <VideoList videos={this.state.videos} click={this.onTitleClick}/>
        </div>
      </div>
    );
  }
}

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
window.App = App;