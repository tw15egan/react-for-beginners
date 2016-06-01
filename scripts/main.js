var React = require('react');
var ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route
var Navigation = ReactRouter.Navigation;
var History = ReactRouter.History;
var createBrowserHistory = require('history/lib/createBrowserHistory');

var h = require('./helpers');

/* 
 App
*/
var App = React.createClass({
  getInitialState: function() {
    return {
      fishes: {},
      order: {}
    }
  },
  addFish: function(fish) {
    var timestamp = new Date().getTime();
    
    // update the state object
    this.state.fishes['fish-' + timestamp] = fish;
    // set the state
    this.setState({fishes: this.state.fishes});
  },
  loadSamples: function() {
    this.setState({
      fishes : require('./sample-fishes.js')
    });
  },
  renderFish: function(key) {
    return <Fish key={key} index={key} details={this.state.fishes[key]} />
  },
  render: function() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market"/>
          <ul className="list-of-fishes">
            {Object.keys(this.state.fishes).map(this.renderFish)}
          </ul>
        </div>
        <Order />
        <Inventory addFish={this.addFish} loadSamples={this.loadSamples} />
      </div>
    )
  }
})

/*
  Fish
*/
var Fish = React.createClass({
  render: function() {
    var details = this.props.details;
    return (
      <li className="menu-fish">
        <img src={details.image} alt={details.name} />
        <h3 className="fish-name">{details.name}
          <span className="price">{h.formatPrice(details.price)}</span>
        </h3>
        <p>{details.desc}</p>
        </li>
    )
  }
})

/*
  Add Fish Form
*/
var AddFishForm = React.createClass({
  createFish: function(e) {
    e.preventDefault();
    
    // Take the data from the form and create an object
    var fish = {
      name : this.refs.name.value,
      price : this.refs.price.value,
      status : this.refs.status.value,
      desc : this.refs.desc.value,
      image : this.refs.image.value
    }
    
    // Add the fish to the App State
    this.props.addFish(fish);
    this.refs.fishForm.reset();
  },
  render: function() {
    return (
      <form className="fish-edit" ref="fishForm" onSubmit={this.createFish}>
        <input type="text" ref="name" placeholder="Fish Name" />
        <input type="text" ref="price" placeholder="Fish Price" />
        <select ref="status">
          <option value="availible">Fresh!</option>
          <option value="unavailible">Sold Out!</option>
        </select>
        <textarea type="text" ref="desc" placeholder="Desc"></textarea>
        <input type="text" ref="image" placeholder="URL to Image" />
        <button type="submit">+ Add Item</button>
      </form>
        )
  }
})

/* 
 Header
*/
var Header = React.createClass({
  render: function() {
    return (
      <header className="top">
        <h1>Catch 
          <span className="ofThe">
            <span className="of">of</span>
            <span className="the">the</span>
          </span> 
        Day</h1>
        <h3 className="tagline"><span>{this.props.tagline}</span></h3>
      </header>
    )
  }
})

/* 
 Order
*/
var Order = React.createClass({
  render: function() {
    return (
      <h2>Order</h2>
    )
  }
})

/* 
 Inventory
*/
var Inventory = React.createClass({
  render: function() {
    return (
      <div>
        <h2>Inventory</h2>
        <AddFishForm {...this.props} />
        <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
      </div>
    )
  }
})

/* 
  StorePicker
*/
var StorePicker = React.createClass({
  mixins: [History], 
  goToStore: function(e) {
    e.preventDefault();
    // Get the data from the input
    var storeId = this.refs.storeId.value
    this.history.pushState(null, '/store/' + storeId)
    // transition from <StorePicker /> to <App />
  },
  render: function() {
    var name = "TJ";
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        {/* Comment */}
        <h2>Please Enter A Store, {name}</h2>
        <input type="text" ref="storeId" defaultValue={h.getFunName()} />
        <input type="submit" />
      </form>
    )
  }
});

/*
  Not Found
*/
var NotFound = React.createClass({
  render: function() {
    return (
      <h1>Not Found!</h1>
    )
  }
})

/*
  Routes
*/
var routes = (
  <Router history={createBrowserHistory()}>
    <Route path="/" component={StorePicker} />
    <Route path="/store/:storeId" component={App} />
    <Route path="*" component={NotFound} />
  </Router>
)

// ReactDOM.render(<StorePicker/>, document.getElementById('main'));
ReactDOM.render(routes, document.getElementById('main'));
