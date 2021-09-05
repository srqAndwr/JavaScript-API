/**
 * 手写call
 * @param {*} context 
 * @param  {...any} args 
 * @returns FunctionResult
 */
Function.prototype.myCall = function (context, ...args) {
    context = context || window;
    context.fn = this;
    return context.fn(...args);
}

/**
 * 手写apply
 * @param {*} context 
 * @param {*} args 
 * @returns FunctionResult
 */
Function.prototype.myApply = function (context, args) {
    context = context || window;
    context.fn = this;
    return context.fn(...args);
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
 * 手写froeach迭代
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