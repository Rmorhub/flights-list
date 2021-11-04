import React from 'react';
import { connect } from 'react-redux';
import { checkStatus, timeFormatter } from '../flightsGateway';
import { flightsListSelector } from '../flightsList.selectors';

const Arrivals = ({ searchDataArrival, flightsList }) => {
  const flights = searchDataArrival.length === 0 ? flightsList : searchDataArrival;

  return flights.map(el => {
    const { term, timeToStand, timeLandFact, status } = el;
    const city = el['airportFromID.city'];
    const airlineCompany = el.airline.en.name;
    const flightNum = el.codeShareData[0].codeShare;
    const logo = el.codeShareData[0].airline.en.logoSmallName;

    return (
      <tbody key={flightNum} className="flight-list">
        <tr>
          <td className="flight-list_item">
            <span>{term}</span>
          </td>
          <td className="flight-list_item">{timeFormatter(timeToStand)}</td>
          <td className="flight-list_item">{city}</td>
          <td className="flight-list_item">{checkStatus(status, timeLandFact)}</td>
          <td className="flight-list_item">
            <div className="flight-list_item-box">
              <img src={logo} alt={airlineCompany} className="flight-img" />
              <span>{airlineCompany}</span>
            </div>
          </td>
          <td className="flight-list_item">{flightNum}</td>
        </tr>
      </tbody>
    );
  });
};

const mapState = state => ({
  flightsList: flightsListSelector(state),
});

export default connect(mapState)(Arrivals);
