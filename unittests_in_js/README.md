# JavaScript Unittests
# Mocha Test Framework, Node Assertion Library, Chai Assertion Library, and Sinon Sandbox for spies, stubs, and mocks

## Standalone Tasks

Test with:
```
npm test taskname.test.js
```

### 0-calcul.test.js
- Test that function rounds properly using Node assert library
	- 0-calcul.js
		- Returns sum of two rounded numbers

### 1-calcul.test.js
- Test that function calculates correctly for each "type" using Node assert library
	- 1-calcul.js
		- Returns result of rounded numbers for SUM, SUBTRACT, and DIVIDE

### 2-calcul_chai.test.js
- Test that function calculates correctly for each "type" using Chai expect
	- 2-calcul_chai.js
		- As above, returns result of rounded numbers for SUM, SUBTRACT, and DIVIDE

### 3-payment.test.js
- Spy on Utils.calculateNumber to make sure it is called when sendPaymentRequestToApi is called
- Manually restore spy
	- utils.js
		- Module named Utils that holds calculateNumber function (that returns result of rounded numbers for SUM, SUBTRACT, and DIVIDE)
	- 3-payment.js
		- Calls Utils.calculateNumber with SUM to add numbers and log message in console

### 4-payment.test.js
- Stub Utils.calculateNumber to have standardized return using sinon
- Make sure Utils.calculateNumber (as stub) is called when sendPaymentRequestToApi is called
- Spy on console.log to make sure logging expected output based on stub
- Manually restore both stub and spy
	- utils.js
		- As above, module named Utils that holds calculateNumber function (that returns result of rounded numbers for SUM, SUBTRACT, and DIVIDE)
	- 4-payment.js
		- As above, calls Utils.calculateNumber with SUM to add numbers and log message in console

### 5-payment.test.js
- Add beforeEach hook to spy on console.log to make sure called with specified output
- Add afterEach hook to restore spy
- Meaning: Create "one" spy to do tasks and restore "once"
- Test 2 different logging outputs for sendPaymentRequestToAPI
	- utils.js
		- As above, module named Utils that holds calculateNumber function (that returns result of rounded numbers for SUM, SUBTRACT, and DIVIDE)
	- 5-payment.js
		- As above, calls Utils.calculateNumber with SUM to add numbers and log message in console

### 6-payment_token.test.js
- Test that function returns expected response/promise
- Use Chai expect and .then to compare value at key
- Async functions require done() callback to wait until resolved
	- 6-payment_token.js
		- Returns resolved promise with specified object

### 7-skip.test.js
- Skip test that doesn't return true

## API Tasks

Run server in one terminal with:
```
node api.js
```

Test in another terminal with:
```
npm test api.test.js
```

### 8-api/api.test.js
- Test server request response status code, response request method, and body
- **Note**: Request module function takes parameters: error holds error info, response holds response info, body holds response sent (background info vs actual content stream)
	- api.js
		- Create instance of express called app
		- Listen on port 7865 and log when started
		- Create GET route for / endpoint with specified message
		- Test with:
			```
			curl http://localhost:7865 ; echo ""
			```

### 9-api/api.test.js
- Test server request response when id is number and not number (response body vs 404)
	- api.js
		- Add onto 8-api
		- Create GET route for /cart/id endpoint with specified message for success
		- Validate that id is a number in route definition
		- Test with:
			```
			curl http://localhost:7865/cart/12 ; echo ""
			curl http://localhost:7865/cart/hello -v
			```

### 10-api/api.test.js
- Test "deep equality" of object sent for /available_payments (meaning test content rather than memory location because JS passes objects by reference)
- Test that POST method body is equal to expected output
	- api.js
		- Add onto 9-api
		- Create GET route for /available_payments endpoint that returns specified object
		- Create POST request for /login endpoint that returns message including userName from request body header
		- Test with:
			```
			curl http://localhost:7865/available_payments ; echo ""
			curl -XPOST http://localhost:7865/login -d '{ "userName": "Betty" }' -H 'Content-Type: application/json' ; echo ""
			```

## Project Setup

1. Create a package (aka create a package.json) with:
```
npm init
```

2. Install required packages as dev dependencies with:
```
npm i -D mocha
npm i -D chai sinon
```

3. But for testing this completed project, just install via the package.json:
```
npm i
```

## Learning Objectives
- How to use Mocha to write a test suite
- How to use different assertion libraries (Node or Chai)
- How to present long test suites
- When and how to use spies
- When and how to use stubs
- What are hooks and when to use them
- Unit testing with Async functions
- How to write integration tests with a small node server
