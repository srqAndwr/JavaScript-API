/**
 * 手写call
 * @param {*} context 
 * @param  {...any} args 
 * @returns FunctionResult
 */
Function.prototype.myCall = function (context, ...args) {
    context = (context !== undefined && context !== null) ? Object(context) : window;
    context.fn = this;
    args = args ? args : [];
    let result = context.fn(...args);
    delete context.fn;
    return result;
}


/**
 * 手写apply
 * @param {*} context 
 * @param {*} args 
 * @returns FunctionResult
 */
Function.prototype.myApply = function (context, args) {
    context = (context !== undefined && context !== null) ? Object(context) : window;
    context.fn = this;
    args = args ? args : [];
    let result = context.fn(...args);
    delete context.fn;
    return result;
}

/**
 * 手写bind
 * @param {*} context 
 * @param  {...any} args 
 * @returns function
 */
Function.prototype.myBind = function (context, ...args) {
    context = (context !== undefined && context !== null) ? Object(context) : window;
    context.fn = this;
    function proxyFn(...argArray) {
        let result = context.fn(...[...args, ...argArray]);
        delete context.fn;
        return result;
    }
    return proxyFn;
}


/**
 * 手写map迭代
 * @param {*} fn 
 * @returns Array
 */
Array.prototype.myMap = function (fn) {
    let arr = this;
    let res = [];
    for (let i = 0; i < arr.length; i++) {
        res.push(fn(arr[i], i));
    }
    return res;
}
/**
 * 手写foreach迭代
 * @param {*} fn 
 */
Array.prototype.myForeach = function (fn) {
    let arr = this;
    for (let i = 0; i < arr.length; i++) {
        fn(arr[i], i);
    }
}

/**
 * 手写filter
 * @param {*} fn 
 * @returns Array
 */
Array.prototype.myFilter = function (fn) {
    let arr = this;
    let res = [];
    for (let i = 0; i < arr.length; i++) {
        if (fn(arr[i])) {
            res.push(arr[i]);
        }
    }
    return res;
}

/**
 * 手写find
 * @param {*} fn 
 * @returns ArrayType
 */
Array.prototype.myFind = function (fn) {
    let arr = this;
    for (let i = 0; i < arr.length; i++) {
        if (fn(arr[i])) return arr[i];
    }
    return null;
}

/**
 * 手写findIndex
 * @param {*} fn 
 * @returns ArrayType
 */
Array.prototype.myFindIndex = function (fn) {
    let arr = this;
    for (let i = 0; i < arr.length; i++) {
        if (fn(arr[i])) return i;
    }
    return -1;
}

/**
 * 手写redecue
 * @param {*} fn 
 * @param {*} pre 
 * @returns pre
 */
Array.prototype.myReduce = function (fn, pre) {
    let arr = this;
    for (let i = 0; i < arr.length; i++) {
        if (!pre) {
            pre = arr[i];
        } else {
            pre = fn(pre, arr[i]);
        }
    }
    return pre;
}

//数组扁平化
function flattening(arr) {
    return arr.myReduce((pre, item) => {
        if (item instanceof Array) {
            pre = pre.concat(flattening(item));
        } else {
            pre.push(item);
        }
        return pre;
    }, []);
}

/**
 * 手写some
 * @param {*} fn 
 * @returns Boolean
 */
Array.prototype.mySome = function (fn) {
    let arr = this;
    for (let i = 0; i < arr.length; i++) {
        if (fn(arr[i])) {
            return true;
        }
    }
    return false;
}

/**
 * 手写every
 * @param {*} fn 
 * @returns Boolean
 */
Array.prototype.myEvery = function (fn) {
    let arr = this;
    for (let i = 0; i < arr.length; i++) {
        if (!fn(arr[i])) {
            return false;
        }
    }
    return true;
}

/**
 * 手写new
 * @param {*} pre 
 * @param  {...any} arg 
 * @returns 
 */
function myNew(pre, ...arg) {
    let obj = {};
    obj.__proto__ = pre.prototype;
    let k = pre.call(obj, ...arg);
    return typeof k === 'object' ? k : obj;
}
/*
function Animal(name, age) {
    let that = this;
    that.name = name;
    that.age = age;
    that.eat = function () {
        console.log(`${name}今年${age}岁啦!`);
    }
}

Animal.prototype.dance = function () {
    console.log(`${this.name}正在给你跳一段舞看!`);
}


let cat = myNew(Animal, '小猫咪', 3);
console.log(cat);
cat.eat();
cat.dance();
*/

/**
 * 手写instanceOf方法
 * @param {*} obj 
 * @param {*} pre 
 * @returns Boolean
 */
function myInstanceOf(obj, pre) {
    obj = obj.__proto__;
    pre = pre.prototype;
    while (1) {
        if (obj === null) return false;
        if (obj === pre) return true;
        obj = obj.__proto__;
    }
}
/*
function A() { }
let a = new A();

console.log(myInstanceOf(a, A));
*/

/**
 * 手写Object.creat()
 * @param {*} pre 
 * @param  {...any} args 
 * @returns Object
 */
Object.prototype.myCreat = function (pre, ...args) {
    function fn() { };
    fn.prototype = pre;
    fn.prototype.constructor = fn;
    if (args) {
        for (let item of [...args]) {
            let keys = Object.keys(item);
            for (let key of keys) {
                fn[key] = item[key];
            }
        }
    }
    return new fn();
}

/*
let Animal = {
    name: '小猫咪',
    age: 3
}

let cat1 = Object.myCreat(Animal, { p: 1 }, { type: 'animal' });
let cat2 = new Object(Animal);
console.log(cat1.__proto__);

console.log(cat2);
*/

/**
 * 手写柯里化
 * @param {*} fn 
 * @returns function
 */
function myCurring(fn) {
    let curring = function (...args) {
        if (args.length >= fn.length) {
            return fn.call(this, ...args);
        } else {
            return curring.bind(this, ...args);
        }
    }
    return curring;
}

// function add(num1, num2, num3) {
//     return num1 + num2 + num3;
// }


// const sum = myCurring(add);

// console.log(sum(1)(2, 3));

/**
 * 实现组合函数
 * @param  {...any} fns 
 * @returns 
 */
function myCompose(...fns) {
    let length = fns.length;
    for (let i = 0; i < length; i++) {
        if (typeof fns[i] !== 'function') {
            throw new TypeError('fns[' + i + '] is not a function');
        }
    }
    return function (...args) {
        let index = 0;
        let result = length ? fns[index++].call(this, ...args) : args;
        while (index < length) {
            result = fns[index++].call(this, result);
        }
        return result;
    }
}


// function double(num) {
//     return num * 2;
// }
// function square(num) {
//     return num ** 2;
// }

// let composeFn = myCompose(double, square);

// console.log(composeFn(10, 20, 40));