function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    expr = expr.replace(/\s/g, '');
    let plus = function(a,b) {
        return Number(a)+Number(b);
    };
    let minus = function(a,b) {
        return Number(a)-Number(b);
    };
    let composition = function(a,b) {
        return Number(a)*Number(b);
    };
    let quotient = function(a,b) {
        return Number(a)/Number(b);
    };

    let array = expr.split('');
    // Проверка на скобки
    if (expr.includes('(') | expr.includes(')')) {
    let checkBrackets = array;
    checkBrackets = checkBrackets.filter(element => element === '(' | element === ')').join('');
    for (let i=0; i<checkBrackets.length; i++){
        checkBrackets = checkBrackets.replace(/\(\)/, '');
        i=i-1;
    }
    if (checkBrackets!=='' & checkBrackets!=='()') {    
        throw ("ExpressionError: Brackets must be paired");
    };
    };
    //Объединяю цифры массива в числа
    for (index=0; index<array.length; index++) {
        if (/[0-9]/.test(array[index]) & /[0-9]/.test(array[index+1])) {
            array.splice(index, 2, (array[index]+array[index+1]));
            index=index-1;
        }        
    };

    //Банальный расчет без скобок
    let calc = function (array) {
    for (index=0; index<array.length; index++) {
        //Проверка деления на ноль
        if (array[index]==='/' & array[index+1]==='0') {
            throw ("TypeError: Division by zero.")
        }
        if (array[index]==='*') {
            array.splice((index-1), 3, composition(array[index-1], array[index+1]));   
            index = 0;
        }   
        else if (array[index]==='/') {
            array.splice((index-1), 3, quotient(array[index-1], array[index+1]));
            index = 0;
        }
    } 
    for (index=0; index<array.length; index++) {
        if (array[index]==='+') {
                array.splice((index-1), 3, plus(array[index-1], array[index+1]));
                index = 0;
        }
        if (array[index]==='-') {
            array.splice((index-1), 3, minus(array[index-1], array[index+1]));
            index = 0;
        }     
    }; 
    };

    //Пытаюсь написать функцию, которая ищет самые внутренние скобки и решает их и так, пока скобки не закончаться
    let sBracket = 0;
    let eBracket = 0;
    for (let k = 0; k<array.length; k++) {
        eBracket = 0;
        sBracket = 0;
        for (let i=0; i<array.length; i++) {
            if (array[i]==="(") {
                sBracket = i;
            }
            if (array[i]===")") {
                eBracket = i;
                break;
            }
        };
        if (eBracket!==0) {
            let brackets = array.slice(sBracket+1, eBracket);
            calc(brackets);
            array.splice(sBracket, eBracket-sBracket+1, brackets[0]);                                            
        } 
    }
calc(array);     
return (array[0]);
}

module.exports = {
    expressionCalculator
}