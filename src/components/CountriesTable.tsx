import type { Country } from "../interfaces/all";

const CountriesTable = (props: {data: []}) => {
    const {data}: {data: Country[]} = props;

    return (
        <div className="table-responsive">
            <table className="table table-hover text-start">
                <thead className="table-light">
                    <tr>
                        <th scope="col">Flag</th>
                        <th scope="col">
                            <span role="button">
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
                                    <td>country?.languages</td>
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