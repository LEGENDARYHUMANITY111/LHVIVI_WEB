import { log } from 'console';
import { ElNotification } from 'element-plus';

export function debounce(fn: () => any, delay = 200): () => void {
   let timer: null | number = null;
   return function (this: object, ...args: any) {
      timer && window.clearTimeout(timer);
      const self = this;
      timer = window.setTimeout(() => {
         fn.apply(self, args);
      }, delay);
   };
}

export function throttle(fn: () => any, delay = 200): () => void {
   let timer: null | number = null;
   return function (this: object, ...args: any) {
      if (!timer) {
         const self = this;
         timer = window.setTimeout(() => {
            fn.apply(self, args);
            timer && window.clearTimeout(timer);
         }, delay);
      }
   };
}

export function deepClone(target) {
   const hashMap = new WeakMap();
   function isObject(target) {
      return (
         (typeof target == 'object' && target !== null) ||
         typeof target == 'function'
      );
   }
   function clone(target) {
      if (!isObject(target)) return target;
      if (hashMap.has(target)) return hashMap.get(target);
      if ([Date, RegExp].includes(target.constructor)) {
         return new target.constructor(target);
      }
      if (target instanceof Function) {
         return new Function('return ' + target.toString())();
      }
      if (target instanceof Map) {
         const newMap = new Map();
         for (const [key, val] of target) {
            if (isObject(val)) newMap.set(key, clone(val));
            else newMap.set(key, val);
         }
         return newMap;
      }
      if (target instanceof Set) {
         const newSet = new Set();
         for (const val of target) {
            if (isObject(val)) newSet.add(clone(val));
            else newSet.add(val);
         }
         return newSet;
      }
      if (target instanceof Array) {
         const n = target.length;
         const newArray = new Array(n);
         for (let i = 0; i < n; i++) {
            const item = target[i];
            if (isObject(item)) newArray[i] = clone(item);
            else newArray[i] = item;
         }
         return newArray;
      }
      const keys = Reflect.ownKeys(target);
      const newObj = {};
      for (const key of keys) {
         const val = target[key];
         if (isObject(val)) newObj[key] = clone(val);
         else newObj[key] = val;
      }
      hashMap.set(target, newObj);
      return newObj;
   }
   return clone(target);
}

export function openUrl(url, target) {
   window.open(url, target)
}


export function copy(content) {
   let textarea = document.createElement('textarea')
   // 将该 textarea 设为 readonly 防止 iOS 下自动唤起键盘，同时将 textarea 移出可视区域
   textarea.readOnly = true
   textarea.style.position = 'absolute'
   textarea.style.left = '-9999px'
   // 将要 copy 的值赋给 textarea 标签的 value 属性
   textarea.value = content
   // 将 textarea 插入到 body 中
   document.body.appendChild(textarea)
   // 选中值并复制
   textarea.select()
   const result = document.execCommand('Copy')
   if (result) showNotification("copied", "success")
   else showNotification("Replication failed!", "error")
   document.body.removeChild(textarea)
}

export const openWin = (url, target: any) => {
   //var url2 = 'https://twitter.com/intent/retweet?tweet_id=1706956906513002869'
   var iWidth = 1000;
   var iHeight = 600;
   //获得窗口的垂直位置 
   var iTop = (window.screen.availHeight - 30 - iHeight) / 2;
   //获得窗口的水平位置 
   var iLeft = (window.screen.availWidth - 10 - iWidth) / 2;

   if (!target) {
      target = '_blank'
   }

   var screenWidth = window.innerWidth
   if (screenWidth < iWidth) {
      target = '_self'
   }

   window.open(url, target, 'height=' + iHeight + ',innerHeight=' + iHeight + ',width=' + iWidth + ',innerWidth=' + iWidth + ',top=' + iTop + ',left=' + iLeft + ',status=no,toolbar=no,menubar=no,location=no,resizable=no,scrollbars=0,titlebar=no');
}

/**
* 判断是否是url
* @param str 
* @returns 
*/
export function isUrl(str: string): boolean {
   return str.indexOf('http://') != -1 || str.indexOf('https://') != -1
}

/**
* 图片输出
* @param path 
* @returns 
*/
export function img(path: string): string {
   return isUrl(path) ? path : `${import.meta.env.VITE_IMG_DOMAIN || location.origin}/${path}`
}
/**
 * 通用提示
 * @param msg 
 * @param type 
 */
export function showNotification(msg = "", type: any): void {
   ElNotification({
      message: msg,
      type: type,
      offset: 120,
      customClass: 'common-' + type,
   });
}

export function calcPx(size: number): string {
   console.log("DDDDDDDDDDDDDDDDDDDDDDDD", document.documentElement.clientWidth);

   return (document.documentElement.clientWidth / 1920 * size).toFixed(2) + 'px';
}

export function formatWalletAddress(address: string): string {
   if (address.length > 8) {
      return address.substring(0, 4) + '***' + address.substring(address.length - 4)
   }
   return address
}

export function formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
   try {
      decimalCount = Math.abs(decimalCount);
      decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

      const negativeSign = amount < 0 ? "-" : "";

      let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
      let j = (i.length > 3) ? i.length % 3 : 0;

      return negativeSign +
         (j ? i.substr(0, j) + thousands : '') +
         i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
         (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
   } catch (e) {
      console.log(e)
   }
}

export function splitIntAndFloat(num) {
   let idx0 = ''
   let idx1 = ''
   if (num) {
      var arr = num.split('.')
      idx0 = arr[0] || num
      idx1 = arr[1] || ''
   }

   return { 0: idx0, 1: idx1 }
}