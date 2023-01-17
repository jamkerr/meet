# Meet Again

Meet Again is a proof-of-concept progressive web app that lets you search for tech events in your city. At a glance you can see how many events are happening in a particular city and timeframe, the details of those events, and even what types of events are most common in an area.

It's currently connected to a demo Google Calendar for demonstration purposes, so the events aren't up-to-date. But because it uses the Google Calendar API, in principle it could connect to a live events calendar.

## Access

The live app - which you can find at https://jamkerr.github.io/meet/ - is currently in "testing" and hasn't been verified by Google, so just get in touch if you'd like access and I can add you as a tester. It uses Google OAuth2 for authentication, so you do need a Google account.

As a progressive web app, it can be installed natively on any device.

## Run locally

This app was created with Create React App.

To run this app, install all dependencies - e.g. with `npm install` - then run the app with `npm run start`.

## Stack

Meet Again uses the following technologies:

### Frontend:

- React
- Tailwindcss
- Recharts
- Moment

### Data and authentication:

- Axios
- AWS Lambda
- Google OAuth2
- Google Calendar API

### Testing:

- Jest
- Jest-Cucumber
- Enzyme
- Puppeteer
- Atatus
