import React from 'react';
import RealEstateListingsWidget from './RealEstateListingsWidget.js';

class RealEstateListingsWidgetDemo extends React.Component {

  constructor(props) {

    super(props);

  }


  render() {

    return (

      <div>

        <RealEstateListingsWidget
          batmanListings={window.__BATMAN_DATA__}
          supermanListings={window.__SUPERMAN_DATA__}
        />

      </div>

    );

  }

}


window.__SUPERMAN_DATA__ = {
    "items": [
        {
            "address": "7791 Luther Way, Knoxville, TN 37918",
            "price": "549999",
            "beds": "3",
            "baths": "2.5",
            "sqft": "3000",
            "built": "1976",
            "thumb": "http://fillmurray.com/150/150",
            "url": "http://zillow.com"
        },
        {
            "address": "1774 Kapow Drive, Hyattsville, MD 20782",
            "price": "419950",
            "beds": "3",
            "baths": "2",
            "sqft": "1700",
            "built": "2001",
            "thumb": "http://stevensegallery.com/200/200",
            "url": "http://zillow.com"
        },
        {
            "address": "3121 5th Street, Gotham, NY 27520",
            "price": "280000",
            "beds": "2",
            "baths": "1",
            "sqft": "",
            "built": "1948",
            "thumb": "http://fillmurray.com/150/150",
            "url": "http://zillow.com"
        },
        {
            "address": "178 Pennyworth Avenue, Depew, NY 14043",
            "price": "619999",
            "beds": "4",
            "baths": "1.5",
            "sqft": "2100",
            "built": "2014",
            "thumb": "http://stevensegallery.com/200/200",
            "url": "http://zillow.com"
        }
    ]
};

window.__BATMAN_DATA__ = {
    "1806 E. Wayne Lane, Fort Dodge, IA 50501": {
        "cost": "849,950",
        "beds": "5",
        "baths": "3",
        "sq_ft": "4050",
        "img": "http://stevensegallery.com/200/200",
        "url": "http://trulia.com"
    },
    "1774 Kapow Drive, Hyattsville, MD 20782": {
        "cost": "419,950",
        "beds": "3",
        "baths": "2",
        "sq_ft": "1700",
        "img": "http://stevensegallery.com/200/200",
        "url": "http://trulia.com"
    },
    "773 Duhnuhnuhna Street, Essex, MD 21221": {
        "cost": "524,999",
        "beds": "3",
        "baths": "2",
        "sq_ft": "1980",
        "img": "http://stevensegallery.com/200/200",
        "url": "http://trulia.com"
    },
    "178 Pennyworth Avenue, Depew, NY 14043": {
        "cost": "619,999",
        "beds": "4",
        "baths": "1.5",
        "sq_ft": "2100",
        "img": "http://stevensegallery.com/200/200",
        "url": "http://trulia.com"
    }
};






export default RealEstateListingsWidgetDemo;