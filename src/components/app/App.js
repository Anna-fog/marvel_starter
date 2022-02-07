import { Component } from 'react';
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import MarvelService from "../../services/MarvelService";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from '../../resources/img/vision.png';

class App extends Component {
    state = {
        characters: [],
        selectedChar: null
    }

    onCharSelected = (id) => {
        this.setState({
            selectedChar: id
        });
    }

    async componentDidMount() {
        await this.getCharacters();
    }

    getCharacters = async () => {
        const marvelService = new MarvelService();
        const characters = await marvelService.getAllCharacters();
        this.setState({characters});
    }

    render () {
        const characters = this.state.characters.length ? this.state.characters : null;
        return (
            <div className="app">
                <AppHeader/>
                <main>
                    <ErrorBoundary>
                        <RandomChar/>
                    </ErrorBoundary>
                    <div className="char__content">
                        <ErrorBoundary>
                            <CharList characters={characters} onCharSelected={this.onCharSelected}/>
                        </ErrorBoundary>
                        <ErrorBoundary>
                            <CharInfo charId={this.state.selectedChar}/>
                        </ErrorBoundary>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
    }
}

export default App;