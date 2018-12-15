export const mixin = (source, target) => {
    for (var i in target) {
        if (target.hasOwnProperty(i)) {
            source[i] = target[i];
        }
    }
    return source;
};

export const d = (id) => {
  return document.getElementById(id)
};

export const isEmptyObject = (e) => {
    for (let t in e) {
        return !1;
    }
    return !0;
};

export const base64Encode = (str) => {
    return btoa(unescape(encodeURIComponent(str)));
};

export const base64Decode = (str) => {
    return decodeURIComponent(escape(atob(str)));
};

export const isHttp = (url) => {
    return /^http|https:\/\//.test(url);
};

/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */
export const find = (list, f) => {
    return list.filter(f)[0];
};
export function deepCopy(obj, cache = []) {
    // just return if obj is immutable value
    if (obj === null || typeof obj !== 'object') {
        return obj;
    };

    // if obj is hit, it is in circular structure
    const hit = find(cache, c => c.original === obj);
    if (hit) {
        return hit.copy;
    };

    const copy = Array.isArray(obj) ? [] : {};
    // put the copy into cache at first
    // because we want to refer it in recursive deepCopy
    cache.push({
        original: obj,
        copy
    });

    Object.keys(obj).forEach(key => {
        copy[key] = deepCopy(obj[key], cache);
    });

    return copy;
};
// js递归实现一维数组转树结构
export const arrToTree = (originaArr,root,rootExpandFlag=true) => {
    // 没有pid，或者pid不存在的，先放入treeData----作为树的根节点

    let treeData = root ? root : (function(originaArr) {
        let tempArr = [];
        let idList = [];
        originaArr.forEach(function(item) { idList.push(item.id) });
        function deb(id, idList) {
            // 此id存在于idList中，返回false; 不存在，返回true
            let flag = true;
            for (let i of idList) {
                if(id === i) {
                    flag = false;
                }
            }
            return flag;
        }

        for (let val of originaArr) {
            // pid不存在或pid不是idList中的值
            if (val.pid === undefined || (val.pid !== undefined && deb(val.pid, idList))) {
                // 原数据中变体名称为name
                let {name: title} = val;
                delete val.name;
                val.title = title;
                val.expand = rootExpandFlag;
                let obj = JSON.parse(JSON.stringify(val));
                tempArr.push(obj);
            }
        }
        return tempArr;
    }(originaArr));
    // 当节点有子结构，temp++;
    let temp = 0;
    // treeData中是根节点
    if(treeData.constructor === Array) {
        for(let i of treeData) {
            for(let j of originaArr) {
                if(j.pid == i.id) {
                    // 原数据中变体名称为name，改为title
                    let {name: title} = j;
                    delete j.name;
                    j.title = title;
                    j.expand = true;
                    let obj = JSON.parse(JSON.stringify(j));
                    i.children = i.children || [];
                    i.children.push(obj);
                    temp++;
                }
            }
        }
    }
    // 递归
    if(temp > 0) {
        if(treeData.constructor == Array) {
            for(let n of treeData) {
                n.children = arrToTree(originaArr, n.children ? n.children : []);
                if(n.children.length === 0) {
                    delete n.children;
                }
            }
        }
    }
    return treeData;
};

export const tranFirstLetterUpperPresent = (str) => {
  if(str=='') return '';
  let firstLetter = str.slice(0,1);
  let otherLetter = str.slice(1);
  return firstLetter.toUpperCase()+otherLetter;
};

/* 获得当前的日期和时间 */
export const getCurrentDateAndTime = () => {
  var date = new Date();
  var seperator1 = "-";
  var seperator2 = ":";
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  var hour = date.getHours();
  var minu = date.getMinutes();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  if (hour >= 0 && hour <= 9) {
    hour = "0" + hour;
  }
  if (minu >= 0 && minu <= 9) {
    minu = "0" + minu;
  }
  var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
    + " " + hour + seperator2 + minu;
  return currentdate;
};

let utils = {};
utils.mixin = mixin;
utils.base64Encode = base64Encode;
utils.d = d;
utils.tranFirstLetterUpperPresent = tranFirstLetterUpperPresent;
utils.getCurrentDateAndTime = getCurrentDateAndTime;

export default utils;
