﻿import React from 'react';
import IndiviualData from '../Presentational/IndiviualData';
import BackButton from '../Presentational/BackButton';

class WeatherIndividual extends React.Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
    this.handleLoad = this.handleLoad.bind(this);
    this.renderButtons = this.renderButtons.bind(this);
  }

  async handleLoad(city) {
    let img = 0;
    if (city !== '') {
      const data = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=50a34e070dd5c09a99554b57ab7ea7e2`
      ).then(response => response.json());
      if (data.cod !== '404') {
        img = data.weather[0].description;
        if (img.includes('rain')) {
          img = 1;
        } else if (img.includes('thunderstorm')) {
          img = 2;
        } else if (
          img.includes('smoke') ||
          img.includes('haze') ||
          img.includes('mist') ||
          img.includes('fog')
        ) {
          img = 3;
        } else if (img.includes('clouds')) {
          img = 4;
        } else if (img.includes('clear')) {
          img = 5;
        } else if (img.includes('snow')) {
          img = 6;
        } else {
          img = 0;
        }
      }

      let dataCities;

      if (data.cod !== '404') {
        dataCities = {
          title: `${data.name} (${data.sys.country})`,
          description: `Current Temperature is ${data.main.temp} °C`,
          text: `${data.weather[0].description}`,
          image: `${process.env.PUBLIC_URL}/images/weather${img}.jpeg`,
          id: data.weather[0].id,
          date: Date.now()
        };
      } else {
        dataCities = {
          title: city,
          description: 'Sorry the data you requested is Unavailable',
          text: null,
          image: `${process.env.PUBLIC_URL}/images/weather${img}.jpeg`,
          id: null,
          date: Date.now()
        };
      }

      this.setState({
        data: dataCities
      });
    }
  }

  renderButtons() {}

  componentDidMount() {
    this.handleLoad(this.props.match.params.id);
  }

  render() {
    return (
      <IndiviualData
        data={this.state.data}
        imageWidth="0%"
        contentWidth="100%"
        extraRender={this.renderButtons}
        renderBack={() => <BackButton url="/weather" name="back to weather" />}
      />
    );
  }
}

export default WeatherIndividual;
