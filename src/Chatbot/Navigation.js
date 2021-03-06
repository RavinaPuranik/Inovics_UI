import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router';
import { ThemeProvider } from 'styled-components';
import ChatBot from 'react-simple-chatbot';

class NavigationChat extends React.Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
      value: ''
    };
    this.handleTrigger = this.handleTrigger.bind(this);
  }

  handleTrigger(event) {
    this.setState({
      redirect: true,
      value: event.value
    });
  }

  render() {
    const theme = {
      background:
        'linear-gradient(to bottom, rgba(168,218,220,0.99), rgba(238,249,237,1))',
      headerBgColor: '#20a4f3',
      headerFontColor: '#fff',
      headerFontSize: '15px',
      botBubbleColor: 'rgba(252,252,252,.8)',
      botFontColor: 'rgba(41,51,92,.8)',
      userBubbleColor: 'rgba(252,252,252,.9)',
      userFontColor: 'rgba(41,51,92,.9)'
    };

    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: `/${this.state.value}`
          }}
        />
      );
    }
    return JSON.parse(localStorage.getItem('userData')).isVerified ? (
      <ThemeProvider theme={theme}>
        <ChatBot
          steps={[
            {
              id: '1',
              message: 'Hi! Do you need some help?',
              trigger: 'help-options'
            },
            {
              id: 'help-options',
              options: [
                { value: 'yes', label: 'Yes', trigger: 'Yes' },
                { value: 'no', label: 'No', trigger: 'No' }
              ]
            },
            {
              id: 'No',
              message: 'Ok! Thank you.You can ask for help anytime.',
              trigger: 'ask-for-help'
            },
            {
              id: 'ask-for-help',
              options: [
                { value: 'help', label: 'Ask For Help', trigger: 'Yes' }
              ]
            },
            {
              id: 'Yes',
              message: 'Great!!',
              trigger: 'screen'
            },
            {
              id: 'screen',
              message: 'What screen would you like to see?',
              trigger: 'options'
            },
            {
              id: 'options',
              options: [
                {
                  value: 'movies',
                  label: 'Movies',
                  trigger: this.handleTrigger
                },
                { value: 'news', label: 'News', trigger: 'news' },
                { value: 'books', label: 'Books', trigger: 'books' },
                {
                  value: 'weather',
                  label: 'Weather',
                  trigger: this.handleTrigger
                },
                {
                  value: 'education',
                  label: 'Education',
                  trigger: 'education'
                },
                { value: 'jobs', label: 'Jobs', trigger: this.handleTrigger },
                {
                  value: 'developer',
                  label: 'Developer',
                  trigger: this.handleTrigger
                },
                { value: 'food', label: 'Food', trigger: this.handleTrigger },
                {
                  value: 'entertainment',
                  label: 'Play Games',
                  trigger: this.handleTrigger
                },
                { value: 'cricket', label: 'Cricket', trigger: 'cricket' },
                {
                  value: 'quotes',
                  label: 'Quotes',
                  trigger: this.handleTrigger
                },
                {
                  value: 'chat',
                  label: 'Web Search',
                  trigger: this.handleTrigger
                }
              ]
            },
            {
              id: 'news',
              message: 'What would you like to do in news?',
              trigger: 'news-options'
            },
            {
              id: 'books',
              message: 'What would you like to do in books?',
              trigger: 'books-options'
            },
            {
              id: 'cricket',
              message: 'What would you like to see in cricket?',
              trigger: 'cricket-options'
            },
            {
              id: 'education',
              message: 'What would you like to do in education?',
              trigger: 'education-options'
            },
            {
              id: 'news-options',
              options: [
                {
                  value: 'news/search by channel',
                  label: 'Search By Channel',
                  trigger: this.handleTrigger
                },
                {
                  value: 'news/search by topic',
                  label: 'Search By Topic',
                  trigger: this.handleTrigger
                }
              ]
            },
            {
              id: 'books-options',
              options: [
                {
                  value: 'books/search by title',
                  label: 'Search By Title',
                  trigger: this.handleTrigger
                },
                {
                  value: 'books/search by author',
                  label: 'Search By Author',
                  trigger: this.handleTrigger
                }
              ]
            },
            {
              id: 'cricket-options',
              options: [
                {
                  value: 'cricket/live scores',
                  label: 'Live Scores',
                  trigger: this.handleTrigger
                },
                {
                  value: 'cricket/upcoming matches',
                  label: 'Upcoming Matches',
                  trigger: this.handleTrigger
                }
              ]
            },
            {
              id: 'education-options',
              options: [
                {
                  value: 'education/Resume',
                  label: 'Make Resume',
                  trigger: this.handleTrigger
                },
                {
                  value: 'education/Dictionary',
                  label: 'Search Dictionary',
                  trigger: this.handleTrigger
                }
              ]
            }
          ]}
          headerTitle="Navigation Chat"
          userAvatar={JSON.parse(localStorage.getItem('userData')).image}
          inputStyle={{ visibility: 'hidden', display: 'none' }}
          bubbleStyle={{
            borderRadius: '3px 5px 3px 5px',
            padding: '4px 8px',
            background: 'rgba(252,252,252,.85)',
            color: 'rgba(41,51,92,.85)'
          }}
          style={{
            boxShadow:
              '2px 2px 5px rgba(41,51,92,.1),3px 3px 10px rgba(41,41,92,0.08)',
            borderRadius: '5px',
            border: '1px solid rgba(41,51,92,.1)'
          }}
          floating={true}
          width="350px"
        />
      </ThemeProvider>
    ) : null;
  }
}

const Navigation = () =>
  ReactDOM.createPortal(<NavigationChat />, document.getElementById('chat'));

export default Navigation;
