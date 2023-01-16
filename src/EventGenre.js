import React, { useEffect, useState } from "react";
import { PieChart, Pie, ResponsiveContainer } from "recharts";

const EventGenre = ({events}) => {

    // Hook for setting state of event genre data
    const [eventGenreData, setEventGenreData] = useState([]);

    useEffect(() => {
        const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'AngularJS'];
        const getData = () => {
            const data = genres.map((genre)=>{
                const value = events.filter(event => event.summary.split(' ').includes(genre)).length;
                return { name: genre, value };
            })
            return data;
        }
        setEventGenreData(() => getData());
    }, [events]); 

    return (
        <ResponsiveContainer height={400}>
            <PieChart>
                <Pie
                    data={eventGenreData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                ></Pie>
            </PieChart>
        </ResponsiveContainer>
    )
}

export default EventGenre;