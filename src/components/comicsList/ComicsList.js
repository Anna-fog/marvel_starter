import './comicsList.scss';
import {Link} from "react-router-dom";
import { useState, useEffect } from 'react';
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import {CSSTransition, TransitionGroup} from 'react-transition-group';

const ComicsList = () => {
    const [comics, setComics] = useState([]);
    const [offset, setOffset] = useState(10);
    const [comicsEnded, setComicsEnded] = useState(false);
    const [newItemsLoading, setNewItemsLoading] = useState(false);

    const {getAllComics} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true)
    }, []);

    const onRequest = (offset, initial) => {
        initial ? setNewItemsLoading(false) : setNewItemsLoading(true);
        setOffset(offset => offset + 9);
        getAllComics(offset).then(onComicsListLoaded)
    }

    const onComicsListLoaded = (newComics) => {
        let ended = false;
        if (newComics.length < 9) {
            ended = true;
        }
        setComics(comics => [...comics, ...newComics.data.results]);
        setComicsEnded(ended);
        setNewItemsLoading(false);
    }

    const comicsListItem = !comics.length ? null : comics.map((item, i) => renderComics(item, i));

    function renderComics(item, i) {
        const {id, title, thumbnail, prices} = item;
        const price = <div className="comics__item-price">{prices[0].price}$</div>

        return (
            <CSSTransition classNames="item" timeout={500} key={id}>
                <li className="comics__item" key={i}>
                    <Link to={`/comics/${item.id}`}>
                        <img src={`${thumbnail.path}.${thumbnail.extension}`} alt={title} className="comics__item-img"/>
                        <div className="comics__item-name">{title}</div>
                        {prices[0].price > 0 ? price : null }
                    </Link>
                </li>
            </CSSTransition>
        )
    }

    return (
        <div className="comics__list">
            {!comicsListItem || newItemsLoading? <Spinner/> : null}
            <TransitionGroup component='ul' className="comics__grid">
                {comicsListItem}
            </TransitionGroup>
            <button
                className="button button__main button__long"
                disabled={newItemsLoading}
                style={{'display': comicsEnded ? 'none' : 'block'}}
            >
                <div
                    className="inner"
                    onClick={onRequest}
                >
                    load more
                </div>
            </button>
        </div>
    )
}

export default ComicsList;