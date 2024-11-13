import { Dispatch } from "react";

interface Props {
    search: string
    setSearch: Dispatch<React.SetStateAction<string>>
    allLanguages: string[]
    setLanguage: Dispatch<React.SetStateAction<string>>
    reload: () => Promise<void>
}

const CountriesForm = (props: Props) => {
    const {search, setSearch, reload, allLanguages, setLanguage} = props;

    const handleInputSearch = (str: string) => {
        setSearch(str)
    }

    const handleSetLanguage = (val: string) => {
        setLanguage(val)        
    }

    return (
        <div className="mt-3 row justify-content-between align-items-center">
            <div className="col">
                <div className="input-group">                    
                    <input onChange={ (e) => handleInputSearch(e.target.value) } type="text" className="form-control" placeholder="Search..." value={search}/>

                    <select onChange={ (e) => { handleSetLanguage(e.target.value) } } className="form-select" defaultValue="0">
                        <option value="0">All Languages</option>
                        {allLanguages?.map((option, index) => (
                                <option value={option} key={index}>{option}</option>
                            ))
                        }
                    </select> 
                </div>
            </div>
            <div className="col text-end">
                <div className="btn-group">
                    <button onClick={reload} type="button" className="btn btn-sm btn-outline-secondary">
                        <i className="bi bi-arrow-clockwise"></i>
                    </button>
                </div>
            </div>
        </div>        
    )
}

export default CountriesForm