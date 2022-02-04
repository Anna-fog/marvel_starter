import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
// import MarvelService from "./services/MarvelService";
import './style/style.scss';

// const marvelService = new MarvelService();

// marvelService.getAllCharacters().then(({data}) => data.results.forEach(item => console.log(item.name)));
// marvelService.getCharacter(1011196).then(({data}) => console.log(data.results));

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

