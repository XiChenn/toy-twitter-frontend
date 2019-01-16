import React from "react";
import * as axios from "axios";

const API_URL = 'http://localhost:8090';
const USER_ID = 1;

class Tweets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: [{id: 1, content: "hello world"}, {id: 2, content: "it's a nice day"}],
      currentTweet: ''
    };
  }

  async componentDidMount() {
    const {data} = await axios({url: `${API_URL}/tweet/user/${USER_ID}`, method: 'GET'});
    this.setState({tweets: data});
  }

  render() {
    return (
      <div>
        <form onSubmit={this.addTweet}>
          <input placeholder={"What's happening?"} onChange={this.handleChange} value={this.state.currentTweet} />
          <button type={"submit"}>Tweet</button>
        </form>
        {this.state.tweets.map(tweet => {
          return(<div key={tweet.id}>{tweet.content}</div>)
        })}
      </div>
    )
  }

  addTweet = (e) => {
    e.preventDefault();
    let newTweet = {id: Date.now(), content: this.state.currentTweet};
    let tweets = [newTweet, ...this.state.tweets];
    this.addTweetToDb(this.state.currentTweet);
    this.setState({tweets, currentTweet: ''});
  };

  addTweetToDb(tweet) {
    let param = new URLSearchParams();
    param.append("content", tweet);
    axios.post(`${API_URL}/tweet/user/${USER_ID}`, param);
  }

  handleChange = (e) => {
    this.setState({currentTweet: e.target.value});
  }
}

export default Tweets;
