import { useState } from "react";

export function AddStoreBar({onNewStore }) {
    const [storeNameText, setStoreNameText] = useState("");

    const handleInputChange = (event) => {
        setStoreNameText(event.target.value);
        console.log()
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Adding Store: " + storeNameText);
        addStore(storeNameText);
        onNewStore(storeNameText)
    };


    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={storeNameText}
                onChange={handleInputChange} 
                placeholder="New store name..."
            />
            <button type="submit">Add Store</button>
        </form>
    );
    async function addStore(storeName){
        const response = await fetch(
            'stores', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: 0,
                name: storeName
            })
        });
        const data = await response.json();
    }
}

export default AddStoreBar;
