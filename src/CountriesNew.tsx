import { useEffect, useState } from "react";

// interfaces
interface Flags {
    png: string,
    svg: string,
    alt: string
}

interface Name {
    official: string
    common: string
}

interface Map {
    googleMaps: string
    openStreetMaps: string
}

interface Country {
    flags: Flags
    name: Name
    languages: []
    capital: []
    maps: Map
    population: number
}

// requests
const requestAsync = async(url: string) => {
    try {
        const response = await fetch(url);

        if (!response.ok) {
          throw response.statusText;
        }

        return await response.json();
    } catch (e){
        console.error(e);
        throw e;
    }
}

const request = (url: string) => {
    return fetch(url).then((response) => {
        if(!response.ok){
            throw response.statusText;
        }

        return response.json();
    })
    .catch((e) => {
        console.error(e);
        throw e;
    })
}

// extract languages
const getLanguages = (languages: object, prefix: string) => {
    if(typeof prefix === 'undefined'){
        prefix = ', '
    }
    const r = [];
    for(const val of  Object.values(languages)){
        r.push(val);
    }
    return r.join(prefix)
}

// paginate
const paginate = (data: object[], page: number) => {
    const rows = [];
    for(let i=0;i<(page * 10);i++){
        rows.push(data[i]);       
    }
    return rows;
}


// endpoints
const endpointAmerica = 'https://restcountries.com/v3.1/region/Americas'
const endpointEurope = 'https://restcountries.com/v3.1/region/Europe'

const Countries = () => {
    // endpoint
    const [endpoint, setEndpoint] = useState(endpointAmerica);

    // countries
    const initialCountries = {
        endpoint: endpointAmerica,
        endpointError: false,
        endpointLoad: true,
        data: [],
        page: 1,
        totalPage: 1,
        sortAsc: true,
        languages: [],
    }

    const [countries, setCountries] = useState(initialCountries);

    // set load = false
    useEffect(() => {
        if(countries.data.length > 0){
            setCountries((old) => {
                return {
                    ...old,
                    page: 2
                }
            })
        }
    }, [countries])

    // load data
    useEffect(() => {
        handleReloadAsync();
        setTotalPages(1);
        setPage(1);
    }, [endpoint])

    return (
        <>
            <h1>Countries</h1>

            {/** tabs */}
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <a onClick={ (e) => { handleChangeTab(e, "america")} } className={`${(tabActive === "america") ? "active" : ""} nav-link`} href="#">Countries America</a>
                </li>
                <li className="nav-item">
                    <a onClick={ (e) => { handleChangeTab(e, "europe")} } className={`${(tabActive === "europe")? "active" : ""} nav-link`} href="#">Countries Europe</a>
                </li>
            </ul>

            {/** form + buttons */}
            <div className="mt-3 row justify-content-between aling-items-center">
                <div className="col-5">
                    <div className="input-group">                    
                        <input onChange={ handleInputSearch } type="text" className="form-control" value={inputSearch}/>
                        {/*}
                        <button className="btn btn-outline-secondary" type="button">Buscar</button>
                        {*/}

                        <select className="form-select" defaultValue="0" onChange={ (e) => { handleSortByLanguage(e.target.value) } }>
                            <option value="0">All Languages</option>
                            { allLanguages.length > 0 ?
                                allLanguages.map((option, index) => (
                                    <option value={option} key={index}>{option}</option>
                                ))
                                :
                                ""
                            }
                        </select> 
                    </div>
                </div>
                <div className="col-4 text-end">
                    <div className="btn-group">
                        <button onClick={ handleReloadAsync } type="button" className="btn btn-outline-secondary">
                            Reload (async/await)
                        </button>
                        <button onClick={ handleReload } type="button" className="btn btn-outline-secondary">
                            Reload (then/catch)
                        </button>
                    </div>
                </div>
            </div>

            {/** error conex */}
            {requestError ??
                <div className="mt-2 alert alert-warning">
                    Hubo un error en la conexión     
                </div>
            }

            {/** load/table */}
            {load && !requestError ? 
                <div className="d-block my-3">
                    <div className={`spinner-border text-primary`}>
                        <span className="visually-hidden">Loading...</span>
                    </div> 
                </div>               
            : 
                <div>
                    <table className="mt-3 table text-start">
                        <thead className="table-light">
                            <tr>
                                <th scope="col">Flag</th>
                                <th scope="col">
                                    <span onClick={handleSort} role="button">
                                        Name 
                                        { sortAsc ?
                                            <i className="ms-2 bi bi-sort-alpha-down"></i>
                                        :
                                            <i className="ms-2 bi bi-sort-alpha-up"></i>
                                        }                                           
                                    </span>                         
                                </th>
                                <th scope="col">Languages</th>
                                <th scope="col">Capital</th>
                                <th scope="col">Map</th>
                                <th scope="col">Population</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filterCountries.length > 0 || inputSearch.length > 0 ?
                                filterCountries.length === 0 ?
                                    <tr>
                                        <td colSpan="6">
                                            <div className="alert alert-warning mb-0">
                                                No hay resultados.
                                            </div>
                                        </td>
                                    </tr>
                                :
                                    filterCountries.map((country: Country, index) => (
                                        <tr key={index}>
                                            <td><img width="16" src={country.flags?.png}/></td>
                                            <td>{country.name?.official}</td>
                                            <td>{getLanguages(country?.languages, ', ')}</td>
                                            <td>{country?.capital.join(', ')}</td>
                                            <td>
                                                <a href={country?.maps?.googleMaps} target="_blank">
                                                    GoogleMap
                                                </a>
                                            </td>
                                            <td>{country?.population}</td>
                                        </tr>
                                ))
                            :
                                paginate(countriesList, page).map((country: Country, index) => {
                                    if(country){
                                        return (
                                            <tr key={index}>
                                                <th><img width="16" src={country?.flags?.png}/></th>
                                                <td>{country?.name?.official}</td>
                                                <td>{getLanguages(country?.languages)}</td>
                                                <td>{country?.capital.join(', ')}</td>
                                                <td>
                                                    <a href={country?.maps?.googleMaps} target="_blank">
                                                        GoogleMap
                                                    </a>
                                                </td>
                                                <td>{country?.population}</td>
                                            </tr>
                                        )
                                    }
                                })
                            }
                        </tbody>
                    </table>

                    { page < totalPages ?
                        <button className="btn w-100 btn-secondary" onClick={ handleNextPage } type="button">
                            Más resultados
                        </button>
                        :
                        ""
                    }                 
                </div>
            }
        </>
    )
}

export default Countries;