import './charList.scss';
import Spinner from "../spinner/Spinner";
import PropTypes from 'prop-types';
import CharInfo from "../charInfo/CharInfo";
import {useEffect} from 'react';

const CharList = ({characters, onCharSelected, charId, newItemsLoading, onRequest, charEnded}) => {

    const chars = !characters ? null :
        characters.map(({thumbnail, name, id}) => {
            return renderItem(thumbnail, name, id);
    });

    useEffect(() => {
        return chars;
    }, [])

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
    characters: PropTypes.array,
    onRequest: PropTypes.func,
    onCharSelected: PropTypes.func,
    newItemsLoading: PropTypes.bool,
    charEnded: PropTypes.bool
}

export default CharList;