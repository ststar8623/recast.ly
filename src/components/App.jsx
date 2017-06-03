class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: exampleVideoData,
      currentVideo: exampleVideoData[0],
      defaultSearch: {
        query: 'hack reactor',
        max: 5,
        key: YOUTUBE_API_KEY
      },
      autoPlay: false
    };
    searchYouTube(this.state.defaultSearch, data => {
      this.setState({
        videos: data,
        currentVideo: data[0]
      });
    });
    this.onTitleClick = this.onTitleClick.bind(this);
    this.searchClick = this.searchClick.bind(this);
    this.keyUp = this.keyUp.bind(this);
    this.autoPlay = this.autoPlay.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.currentVideo !== nextState.currentVideo) {
      return true;
    }
    if (this.state.videos !== nextState.videos) {
      return true;
    }
    return false;
  }

  autoPlay(e) {
    if (this.state.autoPlay) {
      this.setState({
        autoPlay: false
      });
    } else {
      this.setState({
        autoPlay: true
      });
    }
  }

  searchClick(e) {
    let search = document.getElementsByClassName('searchBar')[0].value;
    let defaultSearch = { query: search, max: 5, key: YOUTUBE_API_KEY };
    searchYouTube(defaultSearch, data => {
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
          <label>
            <div>Auto Play
              <input onClick={this.autoPlay} type="checkbox"></input>
            </div>
          </label>
          <VideoPlayer video={this.state.currentVideo} auto={this.state.autoPlay} />
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