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
                            <RoomsFilter rooms={rooms}/>
                            <RoomsList rooms={sortedRooms}/>
                        </>
                    )
                }
            }
        </RoomConsumer>
    )
};

export default RoomsContainer
