let number = 1;

function createOrderId(){

    const id = number
        .toString()
        .padStart(6,"0");

    number++;

    return `ZS-${id}`;

}

module.exports = createOrderId;