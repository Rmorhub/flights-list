import React from 'react';

const Departures = () => (
  <div className="tabs-container">
    <table className="flights">
      <thead className="flights-nav">
        <tr>
          <th className="flights-nav_item">Термінал</th>
          <th className="flights-nav_item">Розклад</th>
          <th className="flights-nav_item">Напрямок</th>
          <th className="flights-nav_item">Статус</th>
          <th className="flights-nav_item">Авіакомпанія</th>
          <th className="flights-nav_item">Рейс</th>
        </tr>
      </thead>
      <tbody className="flight-list">
        <tr>
          <td className="flight-list_item">
            <span>A</span>
          </td>
          <td className="flight-list_item">3:40</td>
          <td className="flight-list_item">Хургада</td>
          <td className="flight-list_item">Вилетів о 3:49</td>
          <td className="flight-list_item">
            <div className="flight-list_item-box">
              <img
                src="https://api.iev.aero/media/airline/files/604bbdf45b1ad855035563.png"
                alt="Bees Airline"
                className="flight-img"
              />
              <span>Bees Airline</span>
            </div>
          </td>
          <td className="flight-list_item">7B2101</td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default Departures;
