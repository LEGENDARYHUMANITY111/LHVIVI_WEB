import { ElMessage } from 'element-plus'

// 自定义指令文件
const myDirective = (app: any) => {
    // 复制指令
    app.directive("copy", {
        mounted: (el: any, { value }: { value: string }) => {
            el.value = value
            el.handler = () => {
                if (!el.value) return ElMessage({ message: "Nothing to copy!", type: "warning" })
                if (navigator.clipboard && window.isSecureContext) {
                    navigator.clipboard.writeText(el.value)
                        .then(() => { return ElMessage({ message: "Copy successfully!", type: "success" }) })
                        .catch(() => { return ElMessage({ message: "Replication failed!", type: "error" }) })
                } else {
                    // 动态创建 textarea 标签
                    let textarea = document.createElement('textarea')
                    // 将该 textarea 设为 readonly 防止 iOS 下自动唤起键盘，同时将 textarea 移出可视区域
                    textarea.readOnly = true
                    textarea.style.position = 'absolute'
                    textarea.style.left = '-9999px'
                    // 将要 copy 的值赋给 textarea 标签的 value 属性
                    textarea.value = el.value
                    // 将 textarea 插入到 body 中
                    document.body.appendChild(textarea)
                    // 选中值并复制
                    textarea.select()
                    const result = document.execCommand('Copy')
                    if (result) ElMessage({ message: "Copy successfully!", type: "success" })
                    else ElMessage({ message: "Replication failed!", type: "error" })
                    document.body.removeChild(textarea)
                }
            }
            // 绑定点击事件
            el.addEventListener('click', el.handler)
        },
        // 当传进来的值更新的时候触发
        updated: (el: any, { value }: { value: string }) => el.value = value,
        // 指令与元素解绑的时候，移除事件绑定
        unmounted: (el: any) => el.removeEventListener('click', el.handler)
    })
    // 长按指令(可自定义长按时间)
    app.directive("longpress", {
        created: (el: any, { value }: { value: Function | { fn: Function, delay: number } }) => {
            let fn: Function, delay: number = 2000
            if (typeof value === 'function') fn = value
            else {
                fn = value.fn
                delay = value.delay >= 0 ? value.delay : 2000
            }
            let pressTimer: any;
            // 创建计时器
            let start = (e: any) => {
                if (e.type === 'click' && e.button !== 0) return
                if (pressTimer === null) pressTimer = setTimeout(() => handler(e), delay)
            }
            // 取消计时器
            let cancel = () => {
                if (pressTimer !== null) {
                    clearTimeout(pressTimer)
                    pressTimer = null
                }
            }
            // 执行函数
            const handler = (e: any) => fn(e)
            // 添加事件监听器
            el.addEventListener('mousedown', start)
            el.addEventListener('touchstart', start, { passive: true })
            // 取消计时器
            el.addEventListener('click', cancel)
            el.addEventListener('mouseout', cancel)
            el.addEventListener('touchend', cancel)
            el.addEventListener('touchcancel', cancel)
        },
        // 移除事件绑定
        unmounted: (el: any) => el.removeEventListener('click', el.handler)
    })
    // 防抖节流(只支持点击事件),可设置是否立即执行与防抖时间
    const deThArr = ["debounce", "throttle"]
    for (let i = 0, length = deThArr.length; i < length; i++) {
        app.directive(deThArr[i], {
            created: (el: any, { value }: { value: Function | { fn: Function, delay: number, isImmeDiate: 1 | 0 } }) => {
                let fn: Function, delay: number = i ? 300 : 500, isImmeDiate: 1 | 0 = 1
                if (typeof value === "function") fn = value
                else {
                    fn = value.fn
                    delay = value.delay >= 0 ? value.delay : i ? 300 : 500
                    isImmeDiate = value.isImmeDiate >= 0 ? value.isImmeDiate : 1
                }
                let timeout: any;
                el.addEventListener('click', () => {
                    if (isImmeDiate > 0) return isImmeDiate-- && fn()
                    if (timeout) {
                        if (i) return
                        else clearTimeout(timeout)
                    }
                    timeout = setTimeout(() => {
                        fn()
                        timeout = null
                    }, delay)
                })
            }
        })
    }
}

export default myDirective