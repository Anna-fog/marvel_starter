import { useState, useEffect } from 'react';
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ComicsList from "../comicsList/ComicsList";
import AppBanner from "../appBanner/AppBanner";
import useMarvelService from "../../services/MarvelService";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from '../../resources/img/vision.png';


const App = () => {
    const [characters, setCharacters] = useState([]);
    const [selectedChar, setChar] = useState(null);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);
    const [newItemsLoading, setNewItemsLoading] = useState(false);

    const {getAllCharacters, loading} = useMarvelService();

    useEffect(() => {
        onRequest(true);
    }, []);

    const onCharSelected = (id) => {
       setChar(id);
    }

    const onCharListLoaded = (newCharacters) => {
        let ended = false;
        if (newCharacters.length < 9) {
            ended = true;
        }
        setCharacters(characters => [...characters, ...newCharacters]);
        setCharEnded(ended);
        setNewItemsLoading(false);
    }

    const onRequest = (initial) => {
        initial ? setNewItemsLoading(false) : setNewItemsLoading(true);
        setOffset(offset => offset + 9);

        getAllCharacters(offset).then(onCharListLoaded)
    }

    const chars = characters.length ? characters : null;

    return (
        <div className="app">
            <AppHeader/>
            <main>
                {/*<ErrorBoundary>*/}
                {/*    <RandomChar/>*/}
                {/*</ErrorBoundary>*/}
                {/*<div className="char__content">*/}
                {/*    <ErrorBoundary>*/}
                {/*        <CharList*/}
                {/*            charId={selectedChar}*/}
                {/*            charEnded={charEnded}*/}
                {/*            characters={chars}*/}
                {/*            onCharSelected={onCharSelected}*/}
                {/*            newItemsLoading={newItemsLoading}*/}
                {/*            onRequest={onRequest}*/}
                {/*        />*/}
                {/*    </ErrorBoundary>*/}
                {/*    <ErrorBoundary>*/}
                {/*        <CharInfo charId={selectedChar}/>*/}
                {/*    </ErrorBoundary>*/}
                {/*</div>*/}
                {/*<img className="bg-decoration" src={decoration} alt="vision"/>*/}
                <AppBanner/>
                <ComicsList/>
            </main>
        </div>
    )
}

export default App;