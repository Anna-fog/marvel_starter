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
        selectedChar: null,
        newItemsLoading: false,
        offset: 210,
        charEnded: false

    }

    marvelService = new MarvelService();

    onCharSelected = (id) => {
        this.setState({
            selectedChar: id
        });
    }

    onCharListLoading = () => {
        this.setState({
            newItemsLoading: true
        })
    }

    onCharListLoaded = (newCharacters) => {
        let ended = false;
        if (newCharacters.length < 9) {
            ended = true;
        }
        this.setState(({characters}) => ({
            characters: [...characters, ...newCharacters],
            newItemsLoading: false,
            charEnded: ended
        }))
    }

    onError = (e) => {
        console.log(e)
    }

    async componentDidMount() {
        this.onRequest();
    }

    onRequest = () => {
        this.onCharListLoading();
        this.setState({offset: this.state.offset + 9});

        this.marvelService
            .getAllCharacters(this.state.offset)
            .then(this.onCharListLoaded)
            .catch(this.onError);
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
                            <CharList
                                charId={this.state.selectedChar}
                                charEnded={this.state.charEnded}
                                characters={characters}
                                onCharSelected={this.onCharSelected}
                                newItemsLoading={this.state.newItemsLoading}
                                onRequest={this.onRequest}
                            />
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