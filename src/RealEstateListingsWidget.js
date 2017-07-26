/**
  Author: Michael Chamoures
  Date: 6/23/17
 **/

import React from 'react';
import { Row, Col, Panel, Image, Media } from 'react-bootstrap';
import './RealEstateListingsWidget.css';


/* Parent widget class. */
class RealEstateListingsWidget extends React.Component {


  constructor(props) {

    super(props);

    // props will contain 2 JSON objects with different structures...need to aggregate them into a matching dataset
    var commonListingsDataSet = this.buildCommonListingsDataSet();
    
    this.state = {
      listings : commonListingsDataSet,
      activeSortBy : 'price',
      activeSortDirection : 'ASC'
    };

    this.handleSortButtonClick = this.handleSortButtonClick.bind(this);

  }

  handleSortButtonClick(sortBy) {

    // this.setState with no sortBy...will trigger re-render of buttons and listings
    var newSortDir = 'ASC';

    if(sortBy === this.state.activeSortBy) {
      newSortDir = this.state.activeSortDirection === 'ASC' ? 'DESC' : 'ASC';
    }
    
    var sortedListings = this.state.listings.slice();
    this.sortListings(sortedListings, sortBy, newSortDir);

    this.setState({
      activeSortBy : sortBy,
      activeSortDirection : newSortDir,
      listings : sortedListings
    });

  }

  sortListings(listings, sortBy, sortDirection) {

    function listingSorter(sortBy, sortDirection) {

      return function(a,b) {
          var result = 0;
          let aVal = (parseFloat(a[sortBy]) ? parseFloat(a[sortBy]) : 0);
          let bVal = (parseFloat(b[sortBy]) ? parseFloat(b[sortBy]) : 0);

          if(aVal < bVal) {
            result = -1;
          } else if(aVal > bVal) {
            result = 1;
          } else {
            result = 0;
          }

          return (sortDirection === 'ASC' ? result : (result * -1));
      }      

    };

    listings.sort(listingSorter(sortBy, sortDirection));
  }


  render() {

    var sortButtonCollection = this.buildSortButtonCollection();

    return (
      <Col xs={12} className={'pad0'}>
      <Panel>
          <Col sm={12} md={7} className={'pad5'}>
          <div>
          <div>
              <Row>
                <Col xs={12}>
                  <h3> 
                    Awesome Listings Widget!
                  </h3>
                </Col>
              </Row>

              <SortButtonGroup 
                sortButtonCollection={sortButtonCollection}
                activeSortBy={this.state.activeSortBy}
                onClick={(sortBy) => this.handleSortButtonClick(sortBy)}
              />


              <Listings   
                listingData={this.state.listings}
                sortBy={this.state.sortBy}
                sortDirection={this.state.sortDirection}
              />
              </div>
          </div>
          </Col>
          </Panel>
      </Col>

    );

  }


  /* Since address feed coming different sources/structures, build common data set */
  buildCommonListingsDataSet() {

    var batmanListings = this.props.batmanListings ? Object.entries(this.props.batmanListings) : [];
    var convertedBatmanListings = batmanListings.map(function(listing) {

      let price = (listing[1].cost) ? listing[1].cost.replace(/[^0-9.]/g, '') : "";
      let sqft = (listing[1].sq_ft) ? listing[1].sq_ft.replace(/[^0-9.]/g, '') : "";

      let addressData = listing[0].split(",");
      let address = {};

      address.addressLine1 = addressData.shift();
      if(address.addressLine1.length > 18) {
        address.addressLine1 = address.addressLine1.substring(0, 19) + "...";
      }
      address.addressLine2 = addressData.join(", ");
      if(address.addressLine2.length > 25) {
        address.addressLine2 = address.addressLine2.substring(0, 25) + "...";
      }

      return ({
          address : address,
          price: price,
          beds: listing[1].beds,
          baths: listing[1].baths,
          sqft: sqft,
          built: listing[1].built,
          thumb: listing[1].img,
          url: listing[1].url
      });

    });

    var convertedSupermanListings = this.props.supermanListings ? this.props.supermanListings.items.map(function(listing) {

      let price = (listing.price) ? listing.price.replace(/[^0-9.]/g, '') : "";
      let sqft = (listing.sqft) ? listing.sqft.replace(/[^0-9.]/g, '') : "";

      let addressData = listing.address.split(",");
      let address = {};

      address.addressLine1 = addressData.shift();
      if(address.addressLine1.length > 18) {
        address.addressLine1 = address.addressLine1.substring(0, 19) + "...";
      }
      address.addressLine2 = addressData.join(", ");
      if(address.addressLine2.length > 25) {
        address.addressLine2 = address.addressLine2.substring(0, 25) + "...";
      }

      return ({
          address: address,
          price: price,
          beds: listing.beds,
          baths: listing.baths,
          sqft: sqft,
          built: listing.built,
          thumb: listing.thumb,
          url: listing.url
      });

    }) : [];

    var commonListingsDataSet = [].concat(convertedBatmanListings).concat(convertedSupermanListings);

    return commonListingsDataSet;
  }


  /* Builds the collection of buttons to be used for sorting...will create default ones if none are passes as prop */
  buildSortButtonCollection() {
    var sortButtonCollection = [];

    if(this.props.sortButtons) {
      for(let i = 0; i < this.props.sortButtons.length; i++) {

        sortButtonCollection.push({
          text: this.props.sortButtons[i].text,
          sortBy: this.props.sortButtons[i].sortBy
        });

      }
    } else {
        sortButtonCollection.push({
          text: "Price",
          sortBy: "price"
        });

        sortButtonCollection.push({
          text: "Beds",
          sortBy: "beds"
        });

        sortButtonCollection.push({
          text: "Sq. ft.",
          sortBy: "sqft"
        });
    }
    
    return sortButtonCollection;
  }
}


/* Component for collection of Buttons */
class SortButtonGroup extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    var sortButtons = [];

    for(let i = 0; i < this.props.sortButtonCollection.length; i++) {

      var isActive = (this.props.sortButtonCollection[i].sortBy === this.props.activeSortBy);

      sortButtons.push(<Col xs={12} sm={2}>
                          <SortButton 
                            onClick={(i) => this.props.onClick(i)} 
                            isActive={isActive}
                            text={this.props.sortButtonCollection[i].text}
                            sortBy={this.props.sortButtonCollection[i].sortBy}
                          />
                        </Col>
                      );

    }


    return (
      <Row className='sort-button-container'>
        {sortButtons}
      </Row>
    );
    
  }
}

/* Single button component */
class SortButton extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    let btnClass = 'btn btn-block btn-md ';
    btnClass = btnClass + (this.props.isActive ? 'sort-btn-active' : 'sort-btn-default');

    // var caret = (this.props.isActive ? (<span className={"caret"}></span>) : "");

    return (
      <button className={btnClass} onClick={() => this.props.onClick(this.props.sortBy)}>
        {this.props.text}
      </button>
    );
    
  }
}


/* Component for a group of Listings */
class Listings extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    var listingComponents = [];

    for(let i = 0; i < this.props.listingData.length; i++) {
      listingComponents.push(<Listing key={i} listing={this.props.listingData[i]}/>)
    }

    var leftListings = listingComponents.slice(0, Math.floor(listingComponents.length / 2));
    var rightListings = listingComponents.slice(Math.floor(listingComponents.length / 2), listingComponents.length);

    return (
      <Row>
        <Col xs={12} sm={6}>
          {leftListings}
        </Col>
        <Col xs={12} sm={6}>
          {rightListings}
        </Col>
      </Row>
    );
    
  }
}



/* Component that gives details about a Listing */
class Listing extends React.Component {

  constructor() {
    super();
  }

  render() {

    
    let listing = null;
    let listingImage = null;

    if(this.props.listing.thumb) {
      listingImage = (
        <Col xs={12} sm={12} md={12} lg={5} className={'responsive-image-container'}>
          <Image
            responsive
            src={this.props.listing.thumb} 
            className={"media-object"}
          />
        </Col>
      );

    }

    var builtInComponent = null;
    if(this.props.listing.built) {
      builtInComponent = (
                          <p className={'built-in-caption'} key={this.props.listing.address}>
                            {"Built in " + this.props.listing.built}
                          </p>
                         );
    } else {
      builtInComponent = ( <p className={'built-in-no-caption'}></p> );

    }
    

    var attributes = [];
    if(this.props.listing.beds) {
      attributes.push(this.props.listing.beds + " beds");
    }
    if(this.props.listing.baths) {
      attributes.push(this.props.listing.baths + " baths");
    }
    if(this.props.listing.sqft) {
      attributes.push(this.props.listing.sqft + " sq ft");
    }

    var description = attributes.join(' \u2022\ ');
    var price = parseFloat(this.props.listing.price).toLocaleString();
  
    return (
      <Panel className="listing-panel">
        <Media>

          <div className={"media-middle"}>
            {listingImage}
          </div>

          <Media.Body>
            {builtInComponent}
            <Media.Heading>
              
              <a className={'listing-title'} target={"_blank"} href={this.props.listing.url}>

                <p>{this.props.listing.address.addressLine1}</p>  
                <p>{this.props.listing.address.addressLine2}</p>

              </a>
            </Media.Heading>

            <h2>{'$'+price}</h2>
            <p>{description}</p>

          </Media.Body>

        </Media>
      </Panel>
    );
  }
}


export default RealEstateListingsWidget;