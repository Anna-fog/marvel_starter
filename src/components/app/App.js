import { useState, useEffect } from 'react';
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import MarvelService from "../../services/MarvelService";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from '../../resources/img/vision.png';


const App = () => {
    const [characters, setCharacters] = useState([]);
    const [selectedChar, setChar] = useState(null);
    const [newItemsLoading, setNewItemsLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    const marvelService = new MarvelService();

    useEffect(() => {
        onRequest();
    }, []);

    const onCharSelected = (id) => {
       setChar(id);
    }

    const onCharListLoading = () => {
        setNewItemsLoading(true);
    }

    const onCharListLoaded = (newCharacters) => {
        let ended = false;
        if (newCharacters.length < 9) {
            ended = true;
        }
        setCharacters(characters => [...characters, ...newCharacters]);
        setNewItemsLoading(false);
        setCharEnded(ended);
    }

    const onError = (e) => {
        console.log(e);
        setNewItemsLoading(false);
    }

    const onRequest = () => {
        onCharListLoading();
        setOffset(offset => offset + 9);

        marvelService
            .getAllCharacters(offset)
            .then(onCharListLoaded)
            .catch(onError);
    }

    const chars = characters.length ? characters : null;

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
                            charId={selectedChar}
                            charEnded={charEnded}
                            characters={chars}
                            onCharSelected={onCharSelected}
                            newItemsLoading={newItemsLoading}
                            onRequest={onRequest}
                        />
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharInfo charId={selectedChar}/>
                    </ErrorBoundary>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/>
            </main>
        </div>
    )
}

export default App;