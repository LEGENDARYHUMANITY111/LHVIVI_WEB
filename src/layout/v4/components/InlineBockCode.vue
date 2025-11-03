<template>
    <div class="input-box">
        <div class="sixNumber">
            <el-input class="itemInSix" @paste.native="usernamePaste" ref="num1" @keyup="loseBlur('1')" v-model="num11"
                maxlength="1" />
            <el-input class="itemInSix" @paste.native="usernamePaste" @keyup="loseBlur('2')" v-model="num22" ref="num2"
                maxlength="1" />
            <el-input class="itemInSix" @paste.native="usernamePaste" @keyup="loseBlur('3')" v-model="num33" ref="num3"
                maxlength="1" />
            <el-input class="itemInSix" @paste.native="usernamePaste" @keyup="loseBlur('4')" v-model="num44" ref="num4"
                maxlength="1" />
            <el-input class="itemInSix" @paste.native="usernamePaste" @keyup="loseBlur('5')" v-model="num55" ref="num5"
                maxlength="1" />
            <!-- <el-input class="itemInSix" @keyup="loseBlur('6')" v-model="num66" ref="num6" maxlength="1" /> -->

        </div>
        <!-- 清空 -->
        <div class="reset" @click="clearAllNumber">reset</div>
    </div>
</template>
<script lang="ts">
import { reactive, toRefs, computed } from "vue";
import { showNotification } from '@/utils/utils';

export default {
    props: ['data'],
    emits: {
        // 传回父级数据
        getBackInfo: (value) => {
            return value;
        }
    },
    setup(props, content) {
        console.log(props)
        const numberState = reactive({
            // 调用父级绑定事件getBackInfo,返回长度为6的拼接值;
            getMemInfo() {
                content.emit("getBackInfo", numberState.pd);
            },
            pd: computed(() => {
                // 拼接输入的所有小格子输入为一个值;
                let pass = "" + (numberState.num11 ?? "") + (numberState.num22 ?? "") + (numberState.num33 ?? "") + (numberState.num44 ?? "") + (numberState.num55 ?? "") + (numberState.num66 ?? "");
                return pass;
            }),
            // ref绑定值
            num1: null,
            num2: null,
            num3: null,
            num4: null,
            num5: null,
            num6: null,
            // v-model值
            num11: undefined,
            num22: undefined,
            num33: undefined,
            num44: undefined,
            num55: undefined,
            num66: undefined,
            loseBlur(id) {
                // backspace删除小格子内容为空白时
                if (!numberState["num" + id + id] && numberState["num" + id + id] !== 0) {
                    numberState["num" + id + id] = undefined;
                    return;
                }

                if (typeof numberState["num" + id + id] === 'string') {
                    //替换所有非数字为空
                    numberState["num" + id + id] = numberState["num" + id + id].replace(/\W/g, "");
                    numberState["num" + id + id] = numberState["num" + id + id].split("")[0] ? numberState["num" + id + id].split("")[0] : undefined;
                    goFocus();
                } else {
                    //替换所有非数字为空
                    numberState["num" + id + id] = (numberState["num" + id + id]).toString().replace(/\W/g, "");
                    numberState["num" + id + id] = (numberState["num" + id + id]).toString().split("")[0] ? (numberState["num" + id + id]).toString().split("")[0] : undefined;
                    goFocus();
                }
                function goFocus() {
                    // 空白不聚焦下一个
                    if (!numberState["num" + id + id]) {
                        return false;
                    }
                    // 聚焦下一个
                    let number = 0;
                    if (Number(id) < 5) {
                        number = Number(id) + 1;
                        let indexAA = "num" + number;
                        numberState[indexAA].focus();
                    } else {
                        number = 5;
                        let indexAA = "num" + number;
                        numberState[indexAA].blur();
                    }
                }
            },
            clearAllNumber() {
                numberState.num11 = undefined;
                numberState.num22 = undefined;
                numberState.num33 = undefined;
                numberState.num44 = undefined;
                numberState.num55 = undefined;
                //numberState.num66 = undefined;
                numberState['num1'].focus();
            },
            setValue(val) {
                if (val) {
                    let string = "";
                    if (typeof val === 'number') {
                        string = val.toString();
                    } else {
                        string = val;
                    }
                    let arr = string.split('');
                    arr.forEach((item, index) => {
                        this['num' + (index + 1) + (index + 1)] = String(item);
                    })
                }
            }
        })
        return {
            ...toRefs(numberState)
        }
    },
    watch: {
        pd: {
            // 小格子数值变更 同步传递数值到父组件;
            handler: function () {
                this.getMemInfo();
            }
        },
        // 如果父级传来回显密码
        data: {
            handler: function (val) {
                this.setValue(val)
            }, immediate: true
        }
    },
    data() {
        return {
        };
    },
    methods: {
        async usernamePaste(event) {
            console.log("YYYYYYYYYYYYYYYY", event);
            let copyText = await navigator.clipboard.readText();
            console.log('剪切板内容', copyText)
            this.clearAllNumber()
            if (copyText.length == 5) {
                //resp.pasteCode = copyText
                this.setValue(copyText)
                for (var i = 1; i <= 5; i++) {
                    console.log("VVVVVVVVVV", i);

                    this.loseBlur(i)
                }
            } else {
                showNotification("Invalid invitation code", 'error')
            }
        },
    },
    created() {
        //this.numberState['num1'].focus();
        //console.log("MMMMMMMMMMMMMMMMMMMMMMMM", this?.num1?.focus());

    },
    mounted() {
        this.$nextTick(() => {
            this.$refs.num1?.focus()
        });

        //console.log("MMMMMMMMMMMMMMMMMMMMMMMM", this.$refs['num1'].focus());
    },
}
</script>
<style lang="scss" scoped>
.sixNumber {
    text-align: center;

    ::v-deep .el-input__wrapper {
        background-color: transparent;
        width: 42px;
        height: 52px;
        border-radius: 10px;
        margin-top: 10px;

        .el-input__inner {
            color: #000;
            font-family: Monument Extended;
            font-size: 20px;
            text-align: center;
        }
    }
}

.reset {
    text-align: center;
    margin: 30px auto;
    font-family: Poppins;
    font-weight: 400;
    font-size: 18px;
    color: #818181;
    line-height: 18px;
    cursor: pointer;
    width: 200px;
}

.sixNumber .itemInSix {
    margin: 0 5px;
    display: inline;
}
</style>