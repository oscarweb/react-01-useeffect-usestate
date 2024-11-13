import { Dispatch } from "react";

const CountriesPaginate = ({setPage, page}: {setPage: Dispatch<React.SetStateAction<number>>, page: number}) => {
    return (
        <button onClick={ () => setPage(page + 1) } className="btn w-100 btn-outline-secondary" type="button">
            Más resultados
        </button>
    )
}

export default CountriesPaginate;