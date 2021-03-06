import React from 'react';

import Input from '../Presentational/Input';
import ImageCard from '../Presentational/ImageCard';
import Warning from '../Presentational/Warning';
import Navbar from '../Navbar';

class NewsByTopic extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      display: false
    };
    this.handleQuery = this.handleQuery.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.extraLinks = this.extraLinks.bind(this);
    this.extraData = this.extraData.bind(this);
  }

  handleQuery(text) {
    this.setState({
      text
    });
  }

  extraData() {}
  extraLinks() {}
  async handleClick(text) {
    const data = await fetch(
      `https://newsapi.org/v2/everything?q=${text}&sortBy=popular&apiKey=7f6cfa48cc3e42f48752515e6dcac33c`
    )
      .then(r => r.json())
      .then(r => r.articles);
    let dataComponent = [];
    data
      .filter((data, index) => index < 12)
      .filter(data => data.urlToImage)
      .map((data, index) =>
        dataComponent.push({
          id: index,
          title: data.title,
          image: data.urlToImage,
          link: data.url,
          linktitle: 'Read Full Story',
          description: data.description,
          time: data.publishedAt
        })
      );
    this.setState({
      display: true,
      data: dataComponent
    });
  }

  render() {
    return (
      <React.Fragment>
        <Navbar />
        <Input
          handleClick={this.handleClick}
          category="topic"
          handleQuery={this.handleQuery}
        />
        {this.state.text ? (
          this.state.display ? (
            <ImageCard
              heading={`Popular News of ${this.state.text}`}
              data={this.state.data}
              number={4}
              extraData={this.extraData}
              extraLinks={this.extraLinks}
            />
          ) : (
            <Warning msg="Loading Data" />
          )
        ) : (
          <Warning msg="Please Enter your Search Query in Input." />
        )}
      </React.Fragment>
    );
  }
}

export default NewsByTopic;
