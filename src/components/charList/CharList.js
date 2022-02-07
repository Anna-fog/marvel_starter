import './charList.scss';
import Spinner from "../spinner/Spinner";

const CharList = ({characters}) => {
    const spinner =
        <div className="spinner">
            <Spinner/>
        </div>

    const chars = !characters ? null :
        characters.map(({thumbnail, name, id}) => {
            return (
                <li className="char__item" key={id}>
                    <img src={thumbnail} alt={name}/>
                    <div className="char__name">{name}</div>
                </li>
            )
        })

    return (
        <div className="char__list">
            {!characters ? spinner : null}
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