# Finnish Foreign Trade Visualized: Full Stack Web Development Project Work

![CI](https://github.com/joonaspartanen/finnish-foreign-trade/workflows/CI/badge.svg)

## General info

This is a project work for the Helsinki University [Full Stack Web Development course](https://fullstackopen.com/en/).

Finnish Foreign Trade Visualized is a web application that uses the [Finnish Customs Uljas API](https://tulli.fi/en/statistics/uljas-api) (CC BY 4.0) to fetch statistical data on Finnish foreign trade (imports and exports) and visualizes it using interactive maps and charts. The user can filter the data by year, country of origin, country of destination, commodity code, etc.

![Finnish Foreign Trade Visualized screencast](https://github.com/joonaspartanen/finnish-foreign-trade/blob/master/screencast.gif)

## Technologies

The application backend uses Node.js and the frontend is built with React, though additional technologies may be introduced during the development.

The JavaScript library used for data visualization is [amCharts](https://www.amcharts.com/).

## Prerequisites

Make sure you have node and npm installed.

## How to run

First, clone the repository with `git clone https://github.com/joonaspartanen/press-the-button.git`.

To run the application in development mode, use the following commands to navigate to the backend folder and run the server:

```
cd finnish-foreign-trade
cd fft_backend
npm install
npm start
```

The backend is now running on port 3003.

Now, open another terminal window, head to the frontend folder, install the dependencies and start the client:

```
cd finnish-foreign-trade
cd fft_frontend
npm install
npm start
```

The frontend is now running on port 3000 and you can head to http://localhost:3000/ to access it.

## Demo

There is a demo version available on Heroku: https://finnish-foreign-trade.herokuapp.com/

## Information for Course Evaluators

[Projektin tuntikirjanpito](https://github.com/joonaspartanen/finnish-foreign-trade/blob/master/tuntikirjanpito.md)
