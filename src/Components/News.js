import React, { Component } from "react";
import Article from "./Article.js";
import TradingViewWidget, { Themes } from "react-tradingview-widget";

export default class News extends Component {
  constructor() {
    super();

    this.state = {
      Articles: []
    };
  }

  fetchNews = () => {
    fetch(
      `https://newsapi.org/v2/everything?sources=the-wall-street-journal&apiKey=1240d6f804a4436f8b5c5cc8cfecdd6e`
    )
      .then(res => res.json())
      .then(newsArray => this.setState({ Articles: newsArray }));
  };

  renderNews = () => {
    return this.state.Articles.length === 0 ? (
      <h5 align="center">Loading...</h5>
    ) : (
      this.state.Articles.articles.map(article => <Article article={article} />)
    );
  };

  componentDidMount() {
    this.fetchNews();
  }

  render() {
    return (
      <div
        style={{
          width: "1000px",
          margin: "auto"
        }}
      >
        <h1 className="header center">Stock Ticker</h1>
        <hr />
        <TradingViewWidget
          symbol="NASDAQ:AAPL"
          theme={Themes.DARK}
          locale="us"
          autosize
        />
        <h1 className="header center">Market News</h1>
        <hr />
        <div className="row">{this.renderNews()}</div>
      </div>
    );
  }
}
