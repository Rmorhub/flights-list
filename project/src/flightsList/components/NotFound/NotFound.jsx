import React from 'react';

import './notFound.scss';

const NotFound = () => (
  <tbody className="flight-list">
    <tr>
      <td className="flight-list_not-found">
        <span>Немає рейсів</span>
      </td>
    </tr>
  </tbody>
);

export default NotFound;
