import React, {useContext} from 'react'
import {RoomContext} from "../context";
import Title from "./Title";

// get all unique values
const getUnique = (items, value) => {
    return [...new Set(items.map(item => item[value]))]
};

const RoomsFilter = ({rooms}) => {
    const context = useContext(RoomContext);
    const {handleChange, type, capacity, price, minPrice, maxPrice, minSize, maxSize, breakfast, pets} = context;
    // get unique types
    let types = getUnique(rooms, "type");
    // Add all to types
    types = ['all', ...types];
    // map types to jsx
    types = types.map((item, index) => {
        return (
            <option value={item} key={index}>{item}</option>
        )
    });


    // guests
    let people = getUnique(rooms, 'capacity');
    people = people.map((person, index) => {
        return (
            <option value={person} key={index}>{person}</option>
        )
    });
    return (
        <section className="filter-container">
            <Title title="search rooms" />
            <form className="filter-form">
            {/* Select Type*/}
            <div className="form-group">
                <label htmlFor="type">room type</label>
                <select name="type" id="type" value={type} className="form-control" onChange={handleChange}>
                    {types}
                </select>
            </div>
            {/* End of select type*/}

                {/* Select guests*/}
                <div className="form-group">
                    <label htmlFor="capacity">Guests</label>
                    <select name="capacity" id="capacity" value={capacity} className="form-control" onChange={handleChange}>
                        {people}
                    </select>
                </div>
                {/* End of guests*/}

                {/* room price */}
                <div className="form-group">
                    <label htmlFor="price">room price ${price}</label>
                    <input
                        type="range"
                        name="price"
                        min={minPrice}
                        max={maxPrice}
                        id="price"
                        value={price}
                        onChange={handleChange}
                        className="form-control"/>
                </div>
                {/* end of room price */}
                
                {/* size */}
                <div className="form-group">
                    <label htmlFor="size">room size</label>
                    <div className="size-inputs">
                        <input type="number" name="minSize" value={minSize} onChange={handleChange} className="size-input" id="size"/>
                        <input type="number" name="maxSize" value={maxSize} onChange={handleChange} className="size-input" id="size"/>
                    </div>
                </div>
                {/* end of size */}

                {/* extras */}
                <div className="form-group">
                    <div className="single-extra">
                        <input type="checkbox" name="breakfast" id="breakfast" checked={breakfast} onChange={handleChange}/>
                        <label htmlFor="breakfast">breakfast</label>
                    </div>
                    <div className="single-extra">
                        <input type="checkbox" name="pets" id="pets" checked={pets} onChange={handleChange}/>
                        <label htmlFor="pets">pets</label>
                    </div>
                </div>
                {/* end of extras */}
            </form>
        </section>
    )
};

export default RoomsFilter
