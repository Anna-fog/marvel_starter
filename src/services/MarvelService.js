import {useHttp} from '../hooks/http.hook'

const useMarvelService = () => {
    const {loading, request, error, clearError} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=a7f5e931d4d39e9a0a8d9bf83d6799f8';
    const _baseCharOffset = 210;
    const _baseComicsOffset = 10;

    const getAllCharacters = async (offset = _baseCharOffset) => {
         const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
         return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const getCharacterByName = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
        return res;
    }

    const getAllComics = async (offset = _baseComicsOffset) => {
        const res = await request(`${_apiBase}comics?offset=${offset}&${_apiKey}`);
        return res;
    }

    const getComic = async(id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComics(res.data.results[0]);
    }

    const _transformCharacter = (char) => {
         return {
             name: char.name,
             description: char.description,
             thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
             homepage: char.urls[0].url,
             wiki: char.urls[1].url,
             id: char.id,
             comics: char.comics.items
         }
    }

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            description: comics.description || 'There is no description',
            pageCount: comics.pageCount ? `${comics.pageCount} p.` : 'No information about the number of pages',
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            language: comics.textObjects.language || 'en-us',
            price: comics.prices[0].price ? `${comics.prices[0].price}$` : 'not available'
        }
    }

    return {loading, error, getAllCharacters, getCharacter, getCharacterByName, getAllComics, getComic, clearError}
}

export default useMarvelService;