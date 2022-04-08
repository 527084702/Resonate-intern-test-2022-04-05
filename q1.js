// TODO: Modify this function
function generateShortCode(storeId, transactionId) {
    // Logic goes here
    // The code must be no more than 9 characters long  code<=9
    // 200-store branch network which mean the ID will be 3 characters. Example, store 199 will have id-199, and store 99 will have id-099
    // No store has no more than 10,000 customers/day. So There only have 9999 customers/day. So there will have 4 characters.
    // 3 + 5 = 7 total character included. The rest can use current day Date()
    // based on function decodeShortCode, so the order will be storeId + transactionId + day
    storeId = storeId.toString().padStart(3, 0) // Use padStart for set into 3 characters.
    transactionId = transactionId.toString().padStart(4, 0) //Use padStart for set into 4 characters.
    const day = new Date().getDate() // getDate for get current date
    
    return `${storeId}${transactionId}${day}`
}

// TODO: Modify this function
function decodeShortCode(shortCode) {
    // Logic goes here
    // Based on the order, so there can use slice() for split code and save into object
    // storeId(3) + day(1) + transactionId(4)
    const storeId = shortCode.slice(0, 3)
  const transactionId = shortCode.slice(3, 7)
  const day = shortCode.slice(7)
  
    return {
        storeId: parseInt(storeId), // store id goes here,
    shopDate: new Date(new Date().setDate(day)), // the date the customer shopped,
    transactionId: parseInt(transactionId) // transaction id goes here
    };
}

// ------------------------------------------------------------------------------//
// --------------- Don't touch this area, all tests have to pass --------------- //
// ------------------------------------------------------------------------------//
function RunTests() {

    var storeIds = [175, 42, 0, 9]
    var transactionIds = [9675, 23, 123, 7]

    storeIds.forEach(function (storeId) {
        transactionIds.forEach(function (transactionId) {
            var shortCode = generateShortCode(storeId, transactionId);
            var decodeResult = decodeShortCode(shortCode);
            $("#test-results").append("<div>" + storeId + " - " + transactionId + ": " + shortCode + "</div>");
            AddTestResult("Length <= 9", shortCode.length <= 9);
            AddTestResult("Is String", (typeof shortCode === 'string'));
            AddTestResult("Is Today", IsToday(decodeResult.shopDate));
            AddTestResult("StoreId", storeId === decodeResult.storeId);
            AddTestResult("TransId", transactionId === decodeResult.transactionId);
        })
    })
}

function IsToday(inputDate) {
    // Get today's date
    var todaysDate = new Date();
    // call setHours to take the time out of the comparison
    return (inputDate.setHours(0, 0, 0, 0) == todaysDate.setHours(0, 0, 0, 0));
}

function AddTestResult(testName, testResult) {
    var div = $("#test-results").append("<div class='" + (testResult ? "pass" : "fail") + "'><span class='tname'>- " + testName + "</span><span class='tresult'>" + testResult + "</span></div>");
}
function clearDIV() {
    document.getElementById("test-results").innerHTML = "";
  }