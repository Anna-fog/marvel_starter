import './charList.scss';
import Spinner from "../spinner/Spinner";

const CharList = ({characters, onCharSelected}) => {
    const chars = !characters ? null :
        characters.map(({thumbnail, name, id}) => {
            const isImgPlaceholder = thumbnail.indexOf('image_not_available') > 0 ? 'img_placeholder_fill' : '';
            return (
                <li
                    className="char__item"
                    key={id}
                    onClick={() => onCharSelected(id)}>
                    <img src={thumbnail} alt={name} className={isImgPlaceholder}/>
                    <div className="char__name">{name}</div>
                </li>
            )
        })

    return (
        <div className="char__list">
            {!characters ? <Spinner/> : null}
            <ul className="char__grid">
                {chars}
                {/*<li className="char__item char__item_selected">*/}
                {/*    <img src={abyss} alt="abyss"/>*/}
                {/*    <div className="char__name">Abyss</div>*/}
                {/*</li>*/}

            </ul>
            <button className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default CharList;