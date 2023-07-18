const Input = ({ label, type = 'text', state, setState }) => {
    return (
        <div>
            <div className="form-floating">
                <input
                    type={type}
                    value={state}
                    onChange={e => setState(e.target.value)}
                    className="form-control"
                    placeholder={label}
                />
                <label htmlFor="floatingInput">{label}</label>
            </div>
        </div>
    )
}

export default Input