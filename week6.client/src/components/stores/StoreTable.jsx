import { Component } from 'react';
import { AddStoreBar } from './AddStoreBar'


export class StoreTable extends Component {

    static displayName = StoreTable.name;

    constructor(props) {
        super(props);
        this.state = {
            stores: [],
            loading: true,
            storeName: 'a',
            shouldUpdate: false
        };
        this.timer = null;
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.shouldUpdate && !prevState.shouldUpdate) {
            //Simulate a delay for SQL server response
            this.timer = setTimeout(() => {
                this.populateStoresData().then(response => {
                    this.setState({ shouldUpdate: false });
                });
            }, 2000); //2000 milliseconds = 2 seconds
        }
    }
    updateStoreName = (newStoreName) => {
        this.setState({ storeName: newStoreName, shouldUpdate: true })
        this.populateStoresData();
    };

    componentDidMount() {
        this.populateStoresData();
    }

    componentWillUnmount() {
        // clean-up the timeout if component unmounts
        if (this.timer) {
            clearTimeout(this.timer);
        }
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
                <AddStoreBar onNewStore={this.updateStoreName} />
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