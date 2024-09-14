import { Component } from 'react';


export class StoreTable extends Component {

    static displayName = StoreTable.name;

    constructor(props) {
        super(props);
        this.state = { stores: [], loading: true };
        //this.addStores = this.addCustomer.bind(this);
    }

    componentDidMount() {
        this.populateStoresData();
    }


    static renderStoresTable(stores) {
        return (
            <table className="table table-striped" aria-labelledby="tableLabel">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {stores.map(store =>
                        <tr key={store.id}>
                            <td>{store.id}</td>
                            <td>{store.name}</td>
                            <td><button>Update Store</button></td>
                            <td><button>Delete Store</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : StoreTable.renderStoresTable(this.state.stores);

        return (
            <div>
                <button onClick={this.addStores}>Add Stores</button>
                <h1 id="tableLabel">Stores</h1>
                {contents}
            </div>
        );
    }

    async addStores() {

        

        const data = await fetch(
            'stores', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: 0,
                name: 'UK, London'
            })
        }).then((data) => data.json());

        

        this.populateStoresData();
    }



    async populateStoresData() {
        const response = await fetch('stores');
        const data = await response.json();
        this.setState({ stores: data, loading: false });
    }
}