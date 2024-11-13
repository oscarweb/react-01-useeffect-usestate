import { Dispatch } from "react";
import type { Country } from "../interfaces/all";

const CountriesTable = (props: {data: Country[], asc: boolean, setAsc: Dispatch<React.SetStateAction<boolean>>}) => {
    const {data, asc, setAsc} = props;

    const getLanguages = (country: Country) => {
        if(country){
            return Object.values(country.languages).join(', ')
        }
        return null
    }

    return (
        <div className="table-responsive">
            <table className="table table-hover text-start">
                <thead className="table-light">
                    <tr>
                        <th scope="col">Flag</th>
                        <th scope="col">
                            <span role="button" onClick={() => setAsc(!asc)}>
                                Name 
                            </span>                         
                        </th>
                        <th scope="col">Languages</th>
                        <th scope="col">Capital</th>
                        <th scope="col">Map</th>
                        <th scope="col">Population</th>
                    </tr>
                </thead>
                <tbody>
                    {
                       data.map((country, index) => {
                            return (
                                <tr key={index}>
                                    <th><img width="16" src={country?.flags?.png}/></th>
                                    <td>{country?.name?.official}</td>
                                    <td>{getLanguages(country)}</td>
                                    <td>{country?.capital.join(', ')}</td>
                                    <td>
                                        <a href={country?.maps?.googleMaps} target="_blank">
                                            GoogleMap
                                        </a>
                                    </td>
                                    <td>{country?.population}</td>
                                </tr>
                            )
                       })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default CountriesTable;