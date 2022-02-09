import './comicsList.scss';
import { useState, useEffect } from 'react';
import useMarvelService from "../../services/MarvelService";

const ComicsList = () => {
    const [comics, setComics] = useState([]);
    const {getAllComics} = useMarvelService();

    useEffect(() => {
        getAllComics().then(res => setComics(res.data.results));
    }, []);

    const comicsListItem = !comics.length ? null : comics.map(item =>  renderComics(item));

    function renderComics(item) {
        const {id, title, thumbnail, prices} = item;
        const price = <div className="comics__item-price">{prices[0].price}$</div>

        return (
            <li className="comics__item" key={id}>
                <a href="#">
                    <img src={`${thumbnail.path}.${thumbnail.extension}`} alt={title} className="comics__item-img"/>
                    <div className="comics__item-name">{title}</div>
                    {prices[0].price > 0 ? price : null }
                </a>
            </li>
        )
    }

    return (
        <div className="comics__list">
            <ul className="comics__grid">
                {comicsListItem}
            </ul>
            <button className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;