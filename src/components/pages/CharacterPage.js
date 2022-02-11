import {useParams} from "react-router-dom";
import AppBanner from "../appBanner/AppBanner";
import './characterPage.scss';
import MarvelService from "../../services/MarvelService";
import { useState, useEffect } from 'react';
import ErrorMessage from "../errorMessage/errorMessage";
import Spinner from "../spinner/Spinner";

const CharacterPage = () => {
    const {charId} = useParams();
    const {getCharacter, loading, error, clearError} = MarvelService();

    const [char, setChar] = useState(null);

    useEffect(() => {
        updateChar();
    }, [charId]);

    const updateChar = () => {
        clearError();
        getCharacter(charId).then(onCharLoaded)
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ? <View char={char} /> : null;

    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

const View = ({char}) => {
    const {title, description, thumbnail} = char;
    const descrPlaceholder = 'There is no description for this character'

    return (
        <>
            <AppBanner/>
            <div className="single-char">
                <img src={thumbnail} alt={title} className="single-char__img"/>
                <div className="single-char__info">
                    <h2 className="single-char__name">{title}</h2>
                    <p className="single-char__descr">
                        {description ? description : descrPlaceholder}
                    </p>
                </div>
            </div>
        </>

    )
}

export default CharacterPage;