import React from 'react'
import RoomsList from "./RoomsList";
import RoomsFilter from "./RoomsFilter";
import {RoomConsumer} from "../context";
import Loading from "./Loading";

const RoomsContainer = () => {
    return (
        <RoomConsumer>
            {
                (value) => {
                    const {loading, sortedRooms, rooms} = value;
                    if (loading) {
                        return (
                            <Loading/>
                        )
                    }
                    return (
                        <>
                            <RoomsFilter rooms={sortedRooms}/>
                            <RoomsList rooms={rooms}/>
                        </>
                    )
                }
            }
        </RoomConsumer>
    )
};

export default RoomsContainer
