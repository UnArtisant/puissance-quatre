import React, {FormEvent, useState} from 'react';

type SelectNameProps = {
    onSelect : (name : string) => void,
    disabled : boolean
}

function Index({onSelect, disabled} : SelectNameProps) {

    const [errors, setErrors] = useState('')

    const handleSubmit = (e : FormEvent) => {
        e.preventDefault()
        const form = new FormData(e.currentTarget as HTMLFormElement)
        const name = form.get("name")

        if(!name || name.toString().trim() === "") {
            setErrors("Nom obligatoire")
        }

        onSelect(name!.toString())
    }

    return (
        <>
            <h2>Selectionne un nom</h2>
            {errors && <div className="alert-danger">
                {errors}
                <button onClick={() => setErrors('')} className="close-btn">&times;</button>
            </div>}
            <form onSubmit={handleSubmit}>
                <div className="field-group">
                    <label className="field-label" htmlFor="name">Nom</label>
                    <input disabled={disabled} id="name" name="name" className="field-input" type="text"/>
                </div>
                <button disabled={disabled} type="submit">Envoyer</button>
            </form>
        </>
    );
}

export default Index;