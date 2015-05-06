'use strict';

var React = require('react');
var d3 = require('d3');
var shade = require('../utils').shade;
var VoronoiCircle = require('./VoronoiCircle');

module.exports = React.createClass({

  displayName: 'VornoiCircleContainer',

  getDefaultProps() {
    return { 
      circleRadius: 3,
      initialFill: '#1f77b4',
      hoverAnimation: true
    };
  },

  getInitialState() {
    return { 
      circleRadius: this.props.circleRadius,
      circleFill: this.props.initialFill
    };
  },

  render() {

    var props = this.props;

    // animation controller
    var handleMouseOver, handleMouseLeave;
    if(props.hoverAnimation) {
      handleMouseOver = this._animateCircle;
      handleMouseLeave = this._restoreCircle;
    } else {
      handleMouseOver = handleMouseLeave = null;
    }

    return (
      <g>
        <VoronoiCircle
            handleMouseOver={handleMouseOver}
            handleMouseLeave={handleMouseLeave}
            voronoiPath={this._drawPath(props.vnode)}
            cx={props.cx}
            cy={props.cy}
            circleRadius={this.state.circleRadius}
            circleFill={this.state.circleFill}
            className="rd3-scatterchart-circle"
        />
      </g>
    );
  },

  _animateCircle() {
    this.setState({ 
      circleRadius: this.props.circleRadius * ( 5 / 4 ),
      circleFill: shade(this.props.initialFill, 0.2)
    });
  },

  _restoreCircle() {
    this.setState({ 
      circleRadius: this.props.circleRadius,
      circleFill: this.props.initialFill
    });
  },

  _drawPath: function(d) {
    if(d === undefined) {
      return; 
    }  
    return 'M' + d.join(',') + 'Z';
  },
});