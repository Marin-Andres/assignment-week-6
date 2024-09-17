import { useState } from "react";

export function AddStoreBar() {
    const [inputText, setInputText] = useState("");

    const handleInputChange = (event) => {
        setInputText(event.target.value);
        console.log()
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Adding Store: " + inputText);

        const data = fetch(
            'stores', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: 0,
                name: inputText
            })
        }).then((data) => data.json());
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={inputText}
                onChange={handleInputChange} 
                placeholder="New store name..."
            />
            <button type="submit">Add Store</button>
        </form>
    );
}

export default AddStoreBar;
