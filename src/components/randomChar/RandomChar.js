import { Component } from 'react';
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/errorMessage";

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

class RandomChar extends Component {
    state = {
        char: {},
        loading: true,
        error: false,
        imgPlaceholder: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar();
    }

    onCharLoaded = (char) => {
        this.setState({char, loading: false, imgPlaceholder: char.thumbnail.indexOf('image_not_available') > 0});
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        });
    }

    updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);

        this.marvelService
            .getCharacter(id)
            .then(this.onCharLoaded)
            .catch()
    }

    render() {
        const {char, loading, error, imgPlaceholder} = this.state;
        const spinner =
            <div className="randomchar__spinner">
                <Spinner/>
            </div>
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinnerBlock = loading ? spinner : null;
        const content = !(loading || error) ? <View char={char} imgPlaceholder={imgPlaceholder}/> : null;

        return (
            <div className="randomchar">
                {errorMessage}
                {spinnerBlock}
                {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button onClick={this.updateChar} className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}

const View = ({char}, imgPlaceholder) => {
    const {name, description, thumbnail, homepage, wiki} = char;
    const descriptionPlaceholder = 'There is no information about this character';
    const fixedDescription = description && description.length > 200 ? description.slice(0, 200) + '...' : descriptionPlaceholder;
    const isImgPlaceholder = imgPlaceholder ? 'randomchar__img_placeholder' : '';

    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className={`randomchar__img ${isImgPlaceholder}`}/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {fixedDescription}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;