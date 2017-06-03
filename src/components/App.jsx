class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: exampleVideoData,
      currentVideo: exampleVideoData[0]
    };
    this.onTitleClick = this.onTitleClick.bind(this);
    this.searchClick = this.searchClick.bind(this);
  }

  searchClick(e) {
    e.preventDefault();
    let search = document.getElementsByClassName('searchBar')[0].value;
    // this.setState({
    //   videos: searchYouTube({ query: search, max: 5, key: YOUTUBE_API_KEY })
    // });
    searchYouTube({ query: search, max: 5, key: YOUTUBE_API_KEY }, data => {
      console.log(data);
      this.setState({
        videos: data
      });
    });
  }

  onTitleClick(e) {
    e.preventDefault();
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
        <Nav search={this.searchClick}/>
        <div className="col-md-7">
          <VideoPlayer video={this.state.currentVideo}/>
        </div>
        <div className="col-md-5">
          <VideoList video={this.state.videos} click={this.onTitleClick}/>
        </div>
      </div>
    );
  }
}



// var App = () => (
//   <div>
//     <Nav />
//     <div className="col-md-7">
//       <VideoPlayer video={exampleVideoData[0]}/>
//     </div>
//     <div className="col-md-5" id="videoList">
//       <VideoList video={exampleVideoData}/>
//     </div>
//   </div>
// );
// hello //

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
window.App = App;