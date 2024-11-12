const Menu = ({ page, setPage }) => {
    return (
        <div className="list-group">
            <button onClick={() => setPage('counter')} type="button" className={`${page == 'counter'? 'active' : ''} list-group-item list-group-item-action list-group-item-light`}>
                Counter
            </button>
            <button onClick={() => setPage('countries')} type="button" className={`${page == 'countries'? 'active' : ''} list-group-item list-group-item-action list-group-item-light`}>
                Countries
            </button>
        </div>
    )
}

export default Menu;