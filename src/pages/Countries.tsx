import { Dispatch, SetStateAction, useEffect, useState } from "react";

import CountriesTabs from "../components/CountriesTabs"
import CountriesForm from "../components/CountriesForm";
import Alert from "../components/Alert";
import CountriesTable from "../components/CountriesTable";
import CountriesPaginate from "../components/CountriesPaginate";
import Loading from "../components/Loading";

import type { Endpoints, Country } from "../interfaces/all";

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
    const [data, setData] = useState<Country[]>([])
        // cantidad de páginas
        const [totalPages, setTotalPages] = useState(1);
        // página actual
        const [page, setPage] = useState(1);
    const [filterData, setFilterData] = useState<Country[]>([])
    const [search, setSearch] = useState('')
    const [allLanguages, setAllLanguages] = useState<string[]>([]);
    const [language, setLanguage] = useState('0');

    const [asc, setAsc] = useState(true)

    // tabs
    useEffect(() => {
        console.log('tab: ', tab)
        setSearch('')
        //setFilterData([])
        setLanguage('0')

        if(tab in endpoints){
            setEndpoint(endpoints[tab as keyof Endpoints])
        }
    }, [tab])

    // endpoints
    useEffect(() => {
        console.log('endpoint: ', endpoint)
        handleRequest()
    }, [endpoint])

    // data
    useEffect(() => {
        //setFilterData(data)
        setAllLanguages(getAllLanguages())
        setTotalPages(Math.ceil(data.length / 10));
        setPage(1);
    }, [data])

    // filterData
    // useEffect(() => {
    //     console.log('filterData', filterData)
    // }, [filterData])

    // input search
    // useEffect(() => {
    //     if(search.length > 0){
    //         const filter = data.filter(filterBySearch);
            
    //         setFilterData(filter)
    //     }
    // }, [search, data])

    // all languages
    useEffect(() => {
        console.log('allLanguage: ', allLanguages)
    }, [allLanguages])


    // props tabs
    const propsTabs: {tab: string, setTab: Dispatch<SetStateAction<string>>} = {tab, setTab}

    // requests
    const handleRequest = async () => {
        setEndpointError(false)
        setLoad(true)
        setLanguage("0")
        setSearch("")
        
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
    // const filterBySearch = (item: Country) => {
    //     return item?.name?.official.toLowerCase().indexOf(search) != -1
    // }

    // get all languages
    const getAllLanguages = () => {

        return [
            ...new Set(
                data.map((country: Country) => {
                    return Object.values(country.languages)
                }).flat()
            )
        ]

        // const languages: string[] = [];
        // for(const country of countries){
        //     const l = getLanguages(country.languages, ',')
        //     if(l.indexOf(',') > 0){
        //         for(const item of l.split(',')){
        //             languages.push(item);
        //         }
        //     }
        //     else{
        //         languages.push(l);
        //     }
        // }
        
        // return languages.filter((val, index) => languages.indexOf(val) === index)
    }

    // extract languages
    // const getLanguages = (languages: object, prefix: string) => {
    //     if(typeof prefix === 'undefined'){
    //         prefix = ', '
    //     }
    //     const r = [];
    //     for(const val of  Object.values(languages)){
    //         r.push(val);
    //     }
    //     return r.join(prefix)
    // }

    // getData + filters
    const getDataFilter = () => {
        return data
            // by name
            .filter((country: Country) => {
                return country.name.official.toLowerCase().indexOf(search.toLowerCase()) !== -1
            })
            // by language
            .filter((country: Country) => {
                return language == "0" || Object.values(country.languages).includes(language)
            })
            // by asc/desc
            .sort((a, b) => {
                if(asc){
                    return a.name.official.localeCompare(b.name.official);
                }
                else{
                    return b.name.official.localeCompare(a.name.official);
                }
            })
    }

    const paginate = (data: Country[]) => {
        return data.slice(
            0,
            page * 10
        )
    }

    // useEffect(() => {
    //     console.log('totalPages: ', totalPages)
    // }, [data])
    
    // useEffect(() => {
    //     console.log('page: ', page)
    //     console.log('[page] totalPages: ', totalPages)
    // }, [page])

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
                        {(!endpointError && getDataFilter().length == 0 && search.length > 0) &&
                            <Alert type="warning" message="No hay coincidencias."/>
                        }                        

                        { endpointError && 
                            <Alert type="danger" message="Hubo un problema al solicitar datos." />
                        }                        

                        {(!endpointError && paginate(getDataFilter()).length > 0) &&
                            <CountriesTable data={paginate(getDataFilter())} asc={asc} setAsc={setAsc}/>
                        }
                        
                        {(!endpointError && (paginate(getDataFilter()).length >= 10 && page < totalPages )) &&
                            <CountriesPaginate setPage={setPage} page={page}/>
                        }
                    </div>    
                </>
            }
        </>
    )
}

export default Countries;