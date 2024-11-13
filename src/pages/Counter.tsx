import { useEffect, useState } from "react";

const isMax = (n: number) => {
    return n > 10
}

const Counter = ({initialNumber}: {initialNumber: number}) => {
    //- useState
    const [number, setNumber] = useState(initialNumber);

    const handleDecrement = () => {
        if(number == 0){
            return
        }
        setNumber(number - 1);
    }

    const handleIncrement = () => {
        setNumber(number + 1);
    }

    //- useEffect
    const [css, setCss] = useState('d-none');
    const [max, setMax] = useState(isMax(initialNumber));

    useEffect(() => {
        console.log('useEffect component counter')

        //(number == 0 || isMax(number))? setCss('d-block') : setCss('d-none')
        if(number == 0 || isMax(number)){
            setCss('d-block')
        }
        else{
            setCss('d-none')
        }
    }, [number]);

    useEffect(() => {
        setMax(isMax(number))
    }, [number]);

    return (
        <>
            <h4 className="text-secondary">Contador</h4>
            <div className="input-group mb-3">
                <button onClick={() => handleDecrement()} className="btn btn-outline-secondary" type="button">-</button>
                <button onClick={() => handleIncrement()} className="btn btn-outline-secondary" type="button">+</button>
                <input type="text" className="form-control" value={number} disabled/>
            </div>
            <div className={`${css} alert alert-info`}>
                {
                    (max)? 'es mayor a 10' : 'igual a 0'
                }
            </div>
        </>
    )
}

export default Counter;