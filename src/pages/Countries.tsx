import { useEffect, useState } from "react";

import CountriesTabs from "../components/CountriesTabs"
import CountriesForm from "../components/CountriesForm";
import Alert from "../components/Alert";
import CountriesTable from "../components/CountriesTable";
import CountriesPaginate from "../components/CountriesPaginate";
import Loading from "../components/Loading";

import type { Country } from "../interfaces/all";

const Countries = () => {
    const endpoints: Endpoints = {
        america : 'https://restcountries.com/v3.1/region/Americas',
        europe : 'https://restcountries.com/v3.1/region/Europe'
    }

    // useState
    const [tab, setTab] = useState('america')
    const [load, setLoad] = useState(false)
    const [endpoint, setEndpoint] = useState(endpoints.america)
    const [endpointError, setEndpointError] = useState(false)
    const [data, setData] = useState([])
    const [filterData, setFilterData] = useState([])
    const [search, setSearch] = useState('')
    const [allLanguages, setAllLanguages] = useState([]);
    const [language, setLanguage] = useState(0);

    // tabs
    useEffect(() => {
        console.log('tab: ', tab)
        setSearch('')
        setFilterData([])
        setLanguage(0)

        if(tab in endpoints){
            setEndpoint(endpoints[tab])
        }
    }, [tab])

    // endpoints
    useEffect(() => {
        console.log('endpoint: ', endpoint)
        handleRequest()
    }, [endpoint])

    // data
    useEffect(() => {
        if(data.length > 0){
            setFilterData(data)
            setAllLanguages(getAllLanguages(data))
        }
    }, [data])

    // filterData
    useEffect(() => {
        console.log('filterData', filterData)
    }, [filterData])

    // input search
    useEffect(() => {
        if(search.length > 0){
            const filter = data.filter(filterBySearch);
            
            setFilterData(filter)
        }
    }, [search, data])

    // all languages
    useEffect(() => {
        console.log('allLanguage: ', allLanguages)
    }, [allLanguages])

    useEffect(() => {
        console.log('language: ', language)

        if(language != 0){
            let filter: Country[] = [];

            if(search.length > 0){
                filter = data.filter(filterBySearch)
            }

            const filterByLanguages: Country[] = []

            for(const item of filter){
                for(const [k, v] of Object.entries(item.languages)){
                    if(v == language){
                        filterByLanguages.push(item)
                    }
                }
            }

            setFilterData(filterByLanguages)
        }

    }, [language, data])

    // props tabs
    const propsTabs = {tab, setTab}

    // requests
    const handleRequest = async () => {
        setEndpointError(false)
        setLoad(true)

        try {
            const response = await fetch(endpoint);
    
            if (!response.ok) {
                console.warn('handleRequest', response.statusText)
                setEndpointError(true)
            }
            
            const json = await response.json()
            setData(json)
        } catch (e){
            console.error(e);
            setEndpointError(true)
        }
        
        setLoad(false)
    }

    // filter input search
    const filterBySearch = (item: Country) => {
        return item?.name?.official.toLowerCase().indexOf(search) != -1
    }

    // get all languages
    const getAllLanguages = (countries: Country[]) => {
        const languages: string[] = [];
        for(const country of countries){
            const l = getLanguages(country.languages, ',')
            if(l.indexOf(',') > 0){
                for(const item of l.split(',')){
                    languages.push(item);
                }
            }
            else{
                languages.push(l);
            }
        }
        
        return languages.filter((val, index) => languages.indexOf(val) === index)
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

    return (
        <>
            <h4 className="text-secondary">Countries</h4>
            
            {load ?
                <Loading />                
            :
                <>
                    <CountriesTabs {...propsTabs}/>

                    <CountriesForm 
                        search={search} 
                        setSearch={setSearch}
                        reload={handleRequest}
                        setLanguage={setLanguage}
                        allLanguages={allLanguages}
                    />
        
                    <div className="mt-3">
                        {(!endpointError && filterData.length == 0 && search.length > 0) &&
                            <Alert type="warning" message="No hay coincidencias."/>
                        }                        

                        { endpointError && 
                            <Alert type="danger" message="Hubo un problema al solicitar datos." />
                        }                        

                        {(!endpointError || filterData.length > 0) &&
                            <CountriesTable data={filterData}/>
                        }
                        
                        {(!endpointError || filterData.length >= 10 ) &&
                            <CountriesPaginate />
                        }
                    </div>    
                </>
            }
        </>
    )
}

export default Countries;