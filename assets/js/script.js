$(document).ready(function () {

    let qbBudget = 0;
    let rbBudget = 0;
    let wrBudget = 0;
    let teBudget = 0;
    let budgetTotal;
    let qbRemaining;
    let rbRemaining;
    let wrRemaining;
    let teRemaining;
    let qbArr = [];
    let rbArr = [];
    let wrArr = [];
    let teArr = [];
    let qbOwned;
    let rbOwned;
    let wrOwned;
    let teOwned;

    // Totals budget input from user

    getTotal = () => {
        budgetTotal = qbBudget + rbBudget + wrBudget + teBudget;

        $('#budgetTotal').text('$' + budgetTotal);

        if (budgetTotal > 199) {
            $('#setupDiv').addClass('setup-div-over').removeClass('setup-div');
        } else {
            $('#setupDiv').addClass('setup-div').removeClass('setup-div-over');
        }
    }

    // Gets budget input from user, 

    getValues = () => {
        qbBudget = Number($('#qbBudget').val());
        rbBudget = Number($('#rbBudget').val());
        wrBudget = Number($('#wrBudget').val());
        teBudget = Number($('#teBudget').val());

        getTotal();
        setBudgets();
    }

    // Calculates number of players by position and updates DOM

    getRoster = () => {
        qbOwned = qbArr.length;
        rbOwned = rbArr.length;
        wrOwned = wrArr.length;
        teOwned = teArr.length;
        $('#qbOwned').text(qbOwned);
        $('#rbOwned').text(rbOwned);
        $('#wrOwned').text(wrOwned);
        $('#teOwned').text(teOwned);
    }

    //Updates DOM with remaining budget by position
    setBudgets = () => {
        $('#qbRemaining').text('$' + qbBudget);
        $('#rbRemaining').text('$' + rbBudget);
        $('#wrRemaining').text('$' + wrBudget);
        $('#teRemaining').text('$' + teBudget);
        $('#budgetRemaining').text('$' + budgetTotal);
    };

    updateRemainingBudget = () => {
        let qbTotal = 0;
        let rbTotal = 0;
        let wrTotal = 0;
        let teTotal = 0;
        let wrOverspend = 0;
        let rbOverspend = 0;
        let teSubtract = 0;
        let qbSubtract = 0;

        rbArr.forEach((value) => {
            rbTotal = rbTotal + value;
        });
        rbRemaining = rbBudget - rbTotal
        if (rbRemaining < 0) {
            rbOverspend = Math.abs(rbRemaining);
            rbRemaining = 0;
            qbSubtract = Math.ceil(rbOverspend/2);
            teSubtract = rbOverspend - qbSubtract;
            console.log("rbOverspend: " + rbOverspend);
            console.log("qbSubtract: " + qbSubtract);
            console.log("teSubtract: " + teSubtract);
        };



        wrArr.forEach((value) => {
            wrTotal = wrTotal + value;
        });
        wrRemaining = wrBudget - wrTotal
        if (wrRemaining < 0) {
            wrOverspend = Math.abs(wrRemaining);
            wrRemaining = 0;
        };


        teArr.forEach((value) => {
            teTotal = teTotal + value;
        });
        teRemaining = teBudget - teTotal - teSubtract

        qbArr.forEach((value) => {
            qbTotal = qbTotal + value;
        });
        qbRemaining = qbBudget - qbTotal - qbSubtract





        $('#qbRemaining').text('$' + qbRemaining);
        $('#rbRemaining').text('$' + rbRemaining)
        $('#wrRemaining').text('$' + wrRemaining);
        $('#teRemaining').text('$' + teRemaining);

        let remainingTotal = budgetTotal - qbTotal - rbTotal - wrTotal - teTotal;

        $('#budgetRemaining').text('$' + remainingTotal);

        if (qbRemaining === 0) {
            $('#qbRemaining').addClass('redText');
        }
        if (rbRemaining === 0) {
            $('#rbRemaining').addClass('redText');
        }
        if (wrRemaining === 0) {
            $('#wrRemaining').addClass('redText');
        }
        if (teRemaining === 0) {
            $('#teRemaining').addClass('redText');
        }
    }

    // adds drafted players/costs to arr to update rosters and budgets 

    addQB = () => {
        if ($('#qbPrice').val().length === 0) {
            return
        } else {
            qbArr.push(Number($('#qbPrice').val()));
            $('#qbPrice').val('');
            getRoster();
            updateRemainingBudget();
        }
    };

    addRB = () => {
        if ($('#rbPrice').val().length === 0) {
            return
        } else {
            rbArr.push(Number($('#rbPrice').val()));
            $('#rbPrice').val('');
            getRoster();
            updateRemainingBudget();
        }
    };

    addWR = () => {
        if ($('#wrPrice').val().length === 0) {
            return
        } else {
            wrArr.push(Number($('#wrPrice').val()));
            $('#wrPrice').val('');
            getRoster();
            updateRemainingBudget();
        }
    };

    addTE = () => {
        if ($('#tePrice').val().length === 0) {
            return
        } else {
            teArr.push(Number($('#tePrice').val()));
            $('#tePrice').val('');
            getRoster();
            updateRemainingBudget();
        }
    };

    getRoster();

    // DOM toggle

    $('#setup').click(() => {
        $('#openSetup').toggle();
        $('#closeSetup').toggle();
        $('#setupDiv').toggle();
    })

    $('#draftTool').click(() => {
        $('#openDraftTool').toggle();
        $('#closeDraftTool').toggle();
        $('#draftToolDiv').toggle();
    })
})