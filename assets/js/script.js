$(document).ready(function () {

    let qbBudget = 0;
    let rbBudget = 0;
    let wrBudget = 0;
    let teBudget = 0;
    let budgetTotal;

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

        getTotal()
    }

    getTotal()

    $('#setup').click(() => {
        $('#openSetup').toggle();
        $('#closeSetup').toggle();
        $('#setupDiv').toggle();
    })

})