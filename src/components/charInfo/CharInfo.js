import { useState, useEffect, useRef } from 'react';
import './charInfo.scss';
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/errorMessage";
import Skeleton from "../skeleton/Skeleton";
import PropTypes from 'prop-types';

const CharInfo = ({charId}) => {
    const [char, setChar] = useState(null);

    const {getCharacter, loading, error, clearError} = useMarvelService();

    useEffect(() => {
        updateChar();
    }, []);


    const myRef = useRef(charId);

    useEffect(() => {
        if (myRef.current !== charId) {
            updateChar();
        }
    }, [charId]);

    const updateChar = () => {
        if (!charId) return;

        clearError();
        getCharacter(charId).then(onCharLoaded)
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }


    const skeleton = char || loading || error ? null : <Skeleton/>;
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ? <View char={char} /> : null;

    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;
    const items = comics.map((item, i) => {
        return (
            <li key={i} className="char__comics-item">
                {item.name}
            </li>
        )
    });

    const isImgPlaceholder = thumbnail.indexOf('image_not_available') > 0 ? 'img_placeholder' : '';

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} className={isImgPlaceholder}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : 'There are no comics for this character'}
                {items}
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;