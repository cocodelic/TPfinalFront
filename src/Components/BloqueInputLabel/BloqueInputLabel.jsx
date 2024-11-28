const BloqueInputLabel = ({label, forIdName, onChange, className, type}) => {
    return (
        <div className={className}>
            <label htmlFor={forIdName}>{label}</label>
            <input id={forIdName} name={forIdName} onChange={onChange} type={type}/>
        </div>
    )
}

export default BloqueInputLabel