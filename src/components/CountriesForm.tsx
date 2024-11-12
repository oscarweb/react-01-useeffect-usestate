const CountriesForm = (props) => {
    const {search, setSearch, reload, allLanguages, setLanguage} = props;

    const handleInputSearch = (e) => {
        setSearch(e.target.value)
    }

    const handleSetLanguage = (val: string | null) => {
        setLanguage(val)        
    }

    return (
        <div className="mt-3 row justify-content-between align-items-center">
            <div className="col">
                <div className="input-group">                    
                    <input onChange={ handleInputSearch } type="text" className="form-control" placeholder="Search..." value={search}/>

                    <select onChange={ (e) => { handleSetLanguage(e.target.value) } } className="form-select" defaultValue="0">
                        <option value="0">All Languages</option>
                        {(allLanguages.length > 0) &&
                            allLanguages.map((option, index) => (
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