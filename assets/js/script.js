function btnChrome_onclick() {
    document.documentElement.webkitRequestFullScreen();
};

let qbBudget = 0;
let rbBudget = 0;
let wrBudget = 0;
let teBudget = 0;
let budgetTotal;
let budgetRemaining;
let qbRemaining;
let rbRemaining;
let wrRemaining;
let teRemaining;
let qbArr = [];
let rbArr = [];
let wrArr = [];
let teArr = [];

// Gets budget input from user, 
getValues = () => {
    qbBudget = Number($('#qbBudget').val());
    rbBudget = Number($('#rbBudget').val());
    wrBudget = Number($('#wrBudget').val());
    teBudget = Number($('#teBudget').val());

    getTotal();
    updateBudgets();
}

// Totals budget input from user and conditionally formats based on value
getTotal = () => {
    budgetTotal = qbBudget + rbBudget + wrBudget + teBudget;

    if (budgetTotal < 224) {
        $('#budgetTotal').addClass('redText');
    } else {
        $('#budgetTotal').removeClass('redText');
    };

    if (budgetTotal > 224) {
        $('#setupDiv').addClass('setup-div-over').removeClass('setup-div');
    } else {
        $('#setupDiv').addClass('setup-div').removeClass('setup-div-over');
    }

    $('#budgetTotal').text('$' + budgetTotal);
}

// Calculates number of players by position and updates DOM
getRoster = () => {
    $('#qbOwned').text(qbArr.length);
    $('#rbOwned').text(rbArr.length);
    $('#wrOwned').text(wrArr.length);
    $('#teOwned').text(teArr.length);
}

//Updates DOM with remaining budget by position
updateBudgets = () => {
    let qbTotal = 0;
    let rbTotal = 0;
    let wrTotal = 0;
    let teTotal = 0;

    qbArr.forEach((value) => {
        qbTotal = qbTotal + value;
    });
    qbRemaining = qbBudget - qbTotal
    $('#qbRemaining').text('$' + qbRemaining);

    rbArr.forEach((value) => {
        rbTotal = rbTotal + value;
    });
    rbRemaining = rbBudget - rbTotal
    $('#rbRemaining').text('$' + rbRemaining);

    wrArr.forEach((value) => {
        wrTotal = wrTotal + value;
    });
    wrRemaining = wrBudget - wrTotal
    $('#wrRemaining').text('$' + wrRemaining);

    teArr.forEach((value) => {
        teTotal = teTotal + value;
    });
    teRemaining = teBudget - teTotal
    $('#teRemaining').text('$' + teRemaining);

    budgetRemaining = qbRemaining + rbRemaining + wrRemaining + teRemaining
    $('#budgetRemaining').text('$' + budgetRemaining);

    checkTotals();
};

// Updates formatting if remaining budget values are negative
checkTotals = () => {
    if (qbRemaining < 0) {
        $('#qbRemaining').addClass('redText');
    } else {
        $('#qbRemaining').removeClass('redText');
    }

    if (rbRemaining < 0) {
        $('#rbRemaining').addClass('redText');
    } else {
        $('#rbRemaining').removeClass('redText');
    }

    if (wrRemaining < 0) {
        $('#wrRemaining').addClass('redText');
    } else {
        $('#wrRemaining').removeClass('redText');
    }

    if (teRemaining < 0) {
        $('#teRemaining').addClass('redText');
    } else {
        $('#teRemaining').removeClass('redText');
    }
}

// Adds drafted players/costs to arr to update rosters and budgets 
addQB = () => {
    if ($('#qbPrice').val().length === 0) {
        return
    } else {
        qbArr.push(Number($('#qbPrice').val()));
        $('#qbPrice').val('');
        getRoster();
        updateBudgets();
        renderPurchases();
        maxBid();
    }
};

addRB = () => {
    if ($('#rbPrice').val().length === 0) {
        return
    } else {
        rbArr.push(Number($('#rbPrice').val()));
        $('#rbPrice').val('');
        getRoster();
        updateBudgets();
        renderPurchases();
        maxBid();
    }
};

addWR = () => {
    if ($('#wrPrice').val().length === 0) {
        return
    } else {
        wrArr.push(Number($('#wrPrice').val()));
        $('#wrPrice').val('');
        getRoster();
        updateBudgets();
        renderPurchases();
        maxBid();
    }
};

addTE = () => {
    if ($('#tePrice').val().length === 0) {
        return
    } else {
        teArr.push(Number($('#tePrice').val()));
        $('#tePrice').val('');
        getRoster();
        updateBudgets();
        renderPurchases();
        maxBid();
    }
};

// Renders player prices
renderPurchases = () => {
    $('#qbCost').text('');
    $('#rbCost').text('');
    $('#wrCost').text('');
    $('#teCost').text('');

    qbArr.map((value) => {
        let index = qbArr.indexOf(value);
        let li = $('<li>');
        li.append('$' + value).attr('data-index', index).addClass('qbArr mb-2');
        $('#qbCost').append(li);
    });

    rbArr.map((value) => {
        let index = rbArr.indexOf(value);
        let li = $('<li>');
        li.append('$' + value).attr('data-index', index).addClass('rbArr mb-2');
        $('#rbCost').append(li);
    });

    wrArr.map((value) => {
        let index = wrArr.indexOf(value);
        let li = $('<li>');
        li.append('$' + value).attr('data-index', index).addClass('wrArr mb-2');
        $('#wrCost').append(li);
    });

    teArr.map((value) => {
        let index = teArr.indexOf(value);
        let li = $('<li>');
        li.append('$' + value).attr('data-index', index).addClass('teArr mb-2');
        $('#teCost').append(li);
    });
};

// Max bid function
maxBid = () => {
    let maximumBid;
    let totalPlayers = qbArr.length + rbArr.length + wrArr.length + teArr.length;
    let dollarPlayers = 14 - totalPlayers;
    if (totalPlayers === 15) {
        maximumBid = 0;
        $('#maxBid').text('$' + maximumBid).addClass('redText');
        $('#deedIt').toggle();
    } else {
        if (budgetRemaining > dollarPlayers) {
            maximumBid = budgetRemaining - dollarPlayers;
            $('#maxBid').text('$' + maximumBid).removeClass('redText');
        } else if (budgetRemaining === dollarPlayers) {
            maximumBid = 1;
            $('#maxBid').text('$' + maximumBid).removeClass('redText');
        } else {
            return
        };
    }
    console.log('total players: ' + totalPlayers);
    console.log('dollar players: ' + dollarPlayers);
    console.log('budget remaining: ' + budgetRemaining);
    console.log('maxbid: ' + maximumBid);
    console.log('-------------------------');
};

// DOM toggle
$('#setup').click(() => {
    $('#openSetup').toggle();
    $('#closeSetup').toggle();
    $('#setupDiv').toggle();
});

$('#draftTool').click(() => {
    $('#openDraftTool').toggle();
    $('#closeDraftTool').toggle();
    $('#draftToolDiv').toggle();
});

$('#owned').click(() => {
    $('#openPositionCost').toggle();
    $('#closePositionCost').toggle();
    $('#positionCostDiv').toggle();
});

$(document).on('click', '.qbArr', function () {
    let index = $(this).attr('data-index');
    qbArr.splice(index, 1);
    renderPurchases();
    getRoster();
    updateBudgets();
    maxBid();
});

$(document).on('click', '.rbArr', function () {
    let index = $(this).attr('data-index');
    rbArr.splice(index, 1);
    renderPurchases();
    getRoster();
    updateBudgets();
    maxBid();
});

$(document).on('click', '.wrArr', function () {
    let index = $(this).attr('data-index');
    wrArr.splice(index, 1);
    renderPurchases();
    getRoster();
    updateBudgets();
    maxBid();
});

$(document).on('click', '.teArr', function () {
    let index = $(this).attr('data-index');
    teArr.splice(index, 1);
    renderPurchases();
    getRoster();
    updateBudgets();
    maxBid();
});
