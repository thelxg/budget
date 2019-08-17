$(document).ready(function () {

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
    let qbOwned;
    let rbOwned;
    let wrOwned;
    let teOwned;

    getTotal = () => {
        budgetTotal = qbBudget + rbBudget + wrBudget + teBudget;


        $('#budgetTotal').text('$' + budgetTotal);

        if (budgetTotal > 199) {
            $('#setupDiv').addClass('setup-div-over').removeClass('setup-div');
        } else {
            $('#setupDiv').addClass('setup-div').removeClass('setup-div-over');
        }
    }

    getValues = () => {
        qbBudget = Number($('#qbBudget').val());
        rbBudget = Number($('#rbBudget').val());
        wrBudget = Number($('#wrBudget').val());
        teBudget = Number($('#teBudget').val());

        getTotal();
        setBudgets();
    }

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

    setBudgets = () => {
        qbRemaining = qbBudget;
        rbRemaining = rbBudget;
        wrRemaining = wrBudget;
        teRemaining = teBudget;
        $('#qbRemaining').text('$' + qbRemaining);
        $('#rbRemaining').text('$' + rbRemaining);
        $('#wrRemaining').text('$' + wrRemaining);
        $('#teRemaining').text('$' + teRemaining);
        $('#budgetRemaining').text('$' + budgetTotal);

    };

    updateRemainingBudget = () => {
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

        let remainingTotal = budgetTotal - qbTotal - rbTotal - wrTotal - teTotal;

        $('#budgetRemaining').text('$' + remainingTotal);
    }

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