<template>
    <div>
        <Dialog :show="show" :title="title" @close="closeDialogClick" :close-on-click-modal="closeOnClickModal"
            :show-close="showClose" :close-on-press-escape="false">
            <template #content>
                <div>

                    <h1>Withdraw</h1>

                    <el-form :rules="rules" ref="ruleFormRef" :model="formData" label-width="120px"
                        label-position="top">
                        <el-form-item label="Coin Info" prop="amount">
                            <el-input v-model="formData.amount" placeholder="Please enter amount">
                                <template #prepend>{{ coinType }}</template>
                            </el-input>
                        </el-form-item>

                        <div class="coinOp">
                            <div class="amount">
                                Amount: {{ resp.assets[coinType] || '0.00' }}
                            </div>
                            <div class="all">
                                <el-button type="primary" plain @click="useAll">Use All</el-button>
                            </div>
                        </div>

                        <el-form-item label="Recive Solana Address" prop="recive_address">
                            <el-input v-model="formData.recive_address"
                                placeholder="Please enter revice solana wallet address" />
                        </el-form-item>


                        <div style="margin-top: 30px;"></div>
                        <el-form-item>
                            <el-button type="btn1" @click="submitForm(ruleFormRef)" :loading="submitLoading">
                                Withdraw
                            </el-button>
                        </el-form-item>
                    </el-form>

                </div>
            </template>
        </Dialog>
    </div>
</template>
<script lang="ts" setup>


// 组件相关代码
import Dialog from '@/layout/v6/components/Dialog.vue'
import { computed, reactive, ref, watch } from 'vue';
const prop = defineProps({
    title: {
        type: String,
        default: ''
    },
    show: {
        type: Boolean,
        default: false
    },
    closeOnClickModal: {
        type: Boolean,
        default: false
    },
    showClose: {
        type: Boolean,
        default: true
    },
    coinType: {
        type: String,
        default: ''
    }
})

import { getAssets, applyTx } from '@/api/lhs/user'
import { formatMoney, img, showNotification } from '@/utils/utils';
const resp = reactive({
    assets: {}
})
watch(
    () => prop.show,
    (newVal, oldVal) => {
        console.log(oldVal);
        if (newVal == true) {
            getAssetsData()
        }
    }
)


const getAssetsData = () => {
    getAssets({}).then((res) => {
        resp.assets = res
    })
}


// form
import type { FormInstance, FormRules } from 'element-plus'
const ruleFormRef = ref<FormInstance>()

const formData = reactive({
    recive_address: '',
    amount: '',
})

interface RuleForm {
    recive_address: string,
    amount: Number,
}
const rules = reactive<FormRules<RuleForm>>({
    recive_address: [
        { required: true, message: 'Please input current solana wallet address', trigger: 'blur' },
        { min: 6, message: 'Please input current solana wallet address', trigger: 'blur' },
    ],
    amount: [
        { required: true, message: 'Please input current withdraw amount', trigger: 'blur' },
        { type: 'number', message: 'Please input current withdraw amount', trigger: 'blur', transform: (value) => Number(value) },
    ]
})

const submitLoading = ref(false)
const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    submitLoading.value = true
    await formEl.validate((valid, fields) => {
        if (valid) {
            Object.assign(formData, { coin_type: prop.coinType })
            applyTx(formData).then((res) => {
                showNotification('Withdrawal application successful', 'success')
                getAssetsData()
                submitLoading.value = false
                formEl.resetFields()
                closeDialogClick(false)
            }).catch((err) => {
                submitLoading.value = false
            })
            console.log('submit!', formData)
        } else {
            console.log('error submit!', fields)
            submitLoading.value = false
        }
    })
}

const useAll = () => {
    formData.amount = resp.assets[prop.coinType]
}





const emit = defineEmits(['closeDialog'])
const closeDialogClick = (res) => {
    ruleFormRef.value.resetFields()
    emit('closeDialog', res)
}

</script>
<style lang="scss" scoped>
@import "/src/assets/v5/css/common.scss";

.el-button--btn1 {
    background-image: none;
    background-color: #7140EB;
    color: #fff;
}

.coinOp {
    margin-bottom: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;



    .amount {
        font-family: Poppins;
        font-size: 16px;
        font-weight: 400;
        color: #AEAEB2;
    }

    .all {
        cursor: pointer;
        color: #7140EB
    }
}
</style>