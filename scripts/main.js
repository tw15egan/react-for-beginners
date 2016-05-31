var React = require('react');
var ReactDOM = require('react-dom');

/* 
  StorePicker
*/

var StorePicker = React.createClass({
  render: function() {
    
    var name = "TJ";
    
    return (
      <form className="store-selector">
        {/* Comment */}
        <h2>Please Enter A Store, {name}</h2>
        <input type="text" ref="storeId" />
        <input type="submit" />
      </form>
    )
  }
});

ReactDOM.render(<StorePicker/>, document.getElementById('main'));