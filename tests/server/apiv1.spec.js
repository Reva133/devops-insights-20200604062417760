
const requireHelper = require('./requireHelper');
const apiv1 = requireHelper.require('routes/apiv1');
const assert = require('chai').assert;
const sinon = require('sinon');

// create mock request and response
let reqMock = {};

let resMock = {};
resMock.status = function() {
  return this;
};
resMock.send = function() {
  return this;
};
resMock.end = function() {
  return this;
};
sinon.spy(resMock, "status");
sinon.spy(resMock, "send");


describe('Get Weather', function() {

  it('without City name', function() {
    reqMock = {
      query: {

      }
    };

    apiv1.getWeather(reqMock, resMock);

    assert(resMock.status.lastCall.calledWith(400), 'Unexpected status code:' + resMock.status.lastCall.args);
  });

  it('with valid City name format and error from request call because doesnt exist within set of nz cities', function() {
    reqMock = {
      query: {
        zip: 'Hamilto'
      }
    };

    const request = function( obj, callback ){
      callback("error", null, null);
    };

    apiv1.__set__("request", request);

    apiv1.getWeather(reqMock, resMock);

    assert(resMock.status.lastCall.calledWith(400), 'Unexpected response:' + resMock.status.lastCall.args);
    assert(resMock.send.lastCall.calledWith('Failed to get the data'), 'Unexpected response:' + resMock.send.lastCall.args);
  });


it('with invalid City name format and error from request call', function() {
    reqMock = {
      query: {
        zip: '1234556'
      }
    };

    const request = function( obj, callback ){
      callback("error", null, null);
    };

    apiv1.__set__("request", request);

    apiv1.getWeather(reqMock, resMock);

    assert(resMock.status.lastCall.calledWith(400), 'Unexpected response:' + resMock.status.lastCall.args);
    assert(resMock.send.lastCall.calledWith('Failed to get the data'), 'Unexpected response:' + resMock.send.lastCall.args);
  });

  it('with valid City Name Hamilton', function() {
    reqMock = {
      query: {
        zip: 'Hamilton'
      }
    };

    const body = {
      cod: 200,
      name: 'Hamilton',
      weather: [
        {
          main: 'Clouds'
        }
      ],
      main: {
        temp: 10.26
      }
    };

    const request = function( obj, callback ){
      callback(null, null, body);
    };

    apiv1.__set__("request", request);

    apiv1.getWeather(reqMock, resMock);

    assert(resMock.status.lastCall.calledWith(200), 'Unexpected response:' + resMock.status.lastCall.args);
    assert(resMock.send.lastCall.args[0].city === 'Hamilton', 'Unexpected response:' + resMock.send.lastCall.args[0].city);
  });
  
  it('with valid City Name Auckland', function() {
    reqMock = {
      query: {
        zip: 'Hamilton'
      }
    };

    const body = {
      cod: 200,
      name: 'Auckland',
      weather: [
        {
          main: 'Clouds'
        }
      ],
      main: {
        temp: 11.71
      }
    };

    const request = function( obj, callback ){
      callback(null, null, body);
    };

    apiv1.__set__("request", request);

    apiv1.getWeather(reqMock, resMock);

    assert(resMock.status.lastCall.calledWith(200), 'Unexpected response:' + resMock.status.lastCall.args);
    assert(resMock.send.lastCall.args[0].city === 'Hamilton', 'Unexpected response:' + resMock.send.lastCall.args[0].city);
  });
});
