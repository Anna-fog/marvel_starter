import './charList.scss';
import Spinner from "../spinner/Spinner";
import PropTypes from 'prop-types';
import CharInfo from "../charInfo/CharInfo";
import useMarvelService from "../../services/MarvelService";
import {useEffect, useState} from 'react';

const CharList = ({onCharSelected, charId}) => {
    const {getAllCharacters, loading} = useMarvelService();
    const [characters, setCharacters] = useState([]);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);
    const [newItemsLoading, setNewItemsLoading] = useState(false);

    useEffect(() => {
        onRequest(true);
    }, []);

    useEffect(() => {
        return chars;
    }, [])

    const onRequest = (initial) => {
        initial ? setNewItemsLoading(false) : setNewItemsLoading(true);
        setOffset(offset => offset + 9);

        getAllCharacters(offset).then(onCharListLoaded)
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

    const chars = !characters ? null :
        characters.map(({thumbnail, name, id}) => {
            return renderItem(thumbnail, name, id);
    });

    function renderItem(thumbnail, name, id) {
        const isImgPlaceholder = thumbnail.indexOf('image_not_available') > 0 ? 'img_placeholder_fill' : '';
        const activeChar = charId === id ? 'char__item_selected' : '';
        const onCharEnter = (e, id) => {
            if (e.key === ' ' || e.key === "Enter") {
                onCharSelected(id);
            }
        }
        return (
            <li
                className= {`char__item ${activeChar}`}
                key={id}
                tabIndex={0}
                onClick={() => onCharSelected(id)}
                onKeyPress={(e) => onCharEnter(e, id)}
            >
                <img src={thumbnail} alt={name} className={isImgPlaceholder}/>
                <div className="char__name">{name}</div>
            </li>
        )
    }

    return (
        <div className="char__list">
            {!characters || newItemsLoading ? <Spinner/> : null}
            <ul className="char__grid">
                {chars}
            </ul>
            <button
                className="button button__main button__long"
                disabled={newItemsLoading}
                style={{'display': charEnded ? 'none' : 'block'}}
                onClick={onRequest}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number,
    onCharSelected: PropTypes.func,
    // characters: PropTypes.array,
    // onRequest: PropTypes.func,
    // newItemsLoading: PropTypes.bool,
    // charEnded: PropTypes.bool
}

export default CharList;