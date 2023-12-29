import React, { Component } from 'react';
import CardComponent from './CardComponent';

export class Home extends Component {
    static displayName = Home.name;

    // Helper function to format the date and time
    formatDateAndTime() {
        const currentDate = new Date();
        const options = {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            timeZoneName: 'short',
        };
        return currentDate.toLocaleDateString('en-US', options);
    }

    render() {
        const imageUrl = 'https://localhost:44421/Carte.jpg';
        const currentDateTime = this.formatDateAndTime();

        return (
            <div>
                <h1>Weather Maroc - <span style={{ color: 'red' }}>{currentDateTime}</span></h1>

                <CardComponent imageUrl={imageUrl} />
            </div>
        );
    }
}
