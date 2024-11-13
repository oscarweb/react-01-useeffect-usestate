import { Dispatch, MouseEvent } from "react";

const CountriesTabs = ({tab, setTab}: {tab: string, setTab: Dispatch<React.SetStateAction<string>>}) => {

    const handleChangeTab = (e: MouseEvent, name: string) => {
        e.preventDefault();
        setTab(name);
    }

    return (
        <ul className="nav nav-tabs">
            <li className="nav-item">
                <a onClick={(e) => handleChangeTab(e, 'america')} className={`${(tab == 'america')? 'active' : ''} nav-link`} href="#">
                    America
                </a>
            </li>
            <li>
                <a onClick={(e) => handleChangeTab(e, 'europe')} className={`${(tab == 'europe')? 'active' : ''} nav-link`} href="#">
                    Europe
                </a>
            </li>
        </ul>        
    )
}

export default CountriesTabs;