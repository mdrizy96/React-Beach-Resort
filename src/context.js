import React, {Component} from 'react'
// import items from './data'
import Client from './contentful'

/*Client.getEntries({
    'content_type': 'beachResortRoom'
}).then(function (entries) {
    console.log(JSON.stringify(entries));
});*/

const RoomContext = React.createContext();

class RoomProvider extends Component {
    state = {
        rooms: [],
        sortedRooms: [],
        featuredRooms: [],
        loading: true,
        type: 'all',
        capacity: 1,
        price: 0,
        minPrice: 0,
        maxPrice: 0,
        minSize: 0,
        maxSize: 0,
        breakfast: false,
        pets: false
    };
    // getData

    getData = async () => {
        try {
            let response = await Client.getEntries({
                'content_type': 'beachResortRoom',
                // order: 'sys.createdAt'
                order: 'fields.price'
            });
            let rooms = this.formatData(response.items);
            let featuredRooms = rooms.filter(room => room.featured === true);
            let maxPrice = Math.max(...rooms.map(item => item.price));
            let maxSize = Math.max(...rooms.map(item => item.size));
            this.setState({
                rooms,
                featuredRooms,
                sortedRooms: rooms,
                loading: false,
                price: maxPrice,
                maxPrice,
                maxSize
            })
        }catch (e) {
            console.log(e)
        }
    };

    componentDidMount() {
        this.getData();
    }

    getRoom = (slug) => {
        let tempRooms = [...this.state.rooms];
        return tempRooms.find((room) => room.slug === slug);
    };

    handleChange = event => {
        const {target} = event;
        const {type, name} = event.target;
        const value = type === 'checkbox' ? target.checked : target.value;
        this.setState({
            [name]: value
        }, this.filterRooms)
    };

    filterRooms = () => {
        let {rooms, type, capacity, price, minSize, maxSize, breakfast, pets} = this.state;
        //All the rooms
        let tempRooms = [...rooms];

        // By type of room
        if (type !== 'all') {
            tempRooms = tempRooms.filter(room => room.type === type);
        }

        // By capacity
        capacity = parseInt(capacity); // Transform values
        if (capacity !== 1) {
            tempRooms = tempRooms.filter(room => room.capacity >= capacity);
        }

        // By price
        price = parseInt(price); // Transform from string
        tempRooms = tempRooms.filter(room => room.price <= price);

        // by size
        tempRooms = tempRooms.filter(room => room.size >= minSize && room.size <= maxSize);

        // filter by extras
        if (breakfast) {
            tempRooms = tempRooms.filter(room => room.breakfast === true);
        }

        if (pets) {
            tempRooms = tempRooms.filter(room => room.pets === true);
        }


        // Set filtered rooms
        this.setState({
            sortedRooms: tempRooms
        });
    };

    render() {
        return (
            <RoomContext.Provider value={{...this.state, getRoom: this.getRoom, handleChange: this.handleChange}}>
                {this.props.children}
            </RoomContext.Provider>
        )
    }

    formatData(items) {
        return items.map(item => {
            let id = item.sys.id;
            let images = item.fields.images.map(image => image.fields.file.url);
            return {...item.fields, images, id};
        });
    }
}

const RoomConsumer = RoomContext.Consumer;

export {RoomProvider, RoomConsumer, RoomContext}
