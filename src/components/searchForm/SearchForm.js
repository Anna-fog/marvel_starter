import './searchForm.scss';
import {useState} from 'react';
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage} from 'formik';
import ErrorMessage from "../errorMessage/errorMessage";
import * as Yup from 'yup';
import MarvelService from "../../services/MarvelService";
import {Link} from 'react-router-dom';

const SearchForm = () => {

    const [char, setChar] = useState(null);
    const {loading, error, clearError, getCharacterByName} = MarvelService();

    const onCharLoaded = ({data}) => {
        setChar(data.results);
    }

    const onCharSubmit = (charName) => {
        clearError();
        getCharacterByName(charName).then(res => onCharLoaded(res))
    }

    const errorMessage = error ? <div className="char__search-critical-error"><ErrorMessage /></div> : null;
    const results = !char ? null : char.length > 0 ? (
        <div className="search-form__results">
            <div className="search-form__char">There is! Visit {char[0].name} page?</div>

            <Link to={`/characters/${char[0].id}`}>
                <button className="button button__secondary" type="submit">
                    <div className="inner">To page</div>
                </button>
            </Link>
        </div>
    ) :
        (
        <div className="search-form__char search-form__char_error">
            The character was not found. Check the name and try again
        </div>
    )

    return (
        <Formik
            initialValues = {{
                charName: ''
            }}
            validationSchema = {Yup.object({
                charName: Yup.string().required('This field is required'),
            })}
            onSubmit = {({charName}) => onCharSubmit(charName)}
        >
            <Form className='search-form'>
                <h3>Or find a character by name:</h3>
                <div className='search-form__wrapper'>
                    <Field
                        id="charName"
                        name="charName"
                        type="text"
                        placeholder="Enter name"
                        className='search-form__input'
                    />
                    <button className="button button__main" type="submit" disabled={loading}>
                        <div className="inner">Find</div>
                    </button>
                </div>
                <FormikErrorMessage className="search-form__char search-form__char_error" name="charName" component="div"/>
                {results}
                {errorMessage}
            </Form>
        </Formik>

    )
}

export default SearchForm;


