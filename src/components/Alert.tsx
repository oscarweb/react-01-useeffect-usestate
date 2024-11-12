const Alert = (props: {type: string, message: string}) => {

    const {type, message} = props;

    return (
        <div className={`alert alert-${typeof type === 'undefined'? 'info' : type}`}>
            {message}
        </div>
    )
}

export default Alert;