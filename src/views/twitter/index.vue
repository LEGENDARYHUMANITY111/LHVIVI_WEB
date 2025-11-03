<template>
    <div>
        <div class="bg">
            <div class="container">

                <div class="cnt" v-loading="true" element-loading-background="transparent"
                    element-loading-text="Waiting Twitter Auth">
                </div>

            </div>

        </div>

    </div>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router';
//import { doTwitterTask } from '@/api/lhs/common'
import { toUrl } from '@/utils/router';
const router = useRouter()
import { getTwitterOauthToken } from '@/api/lhs/common'
if (Object.keys(router.currentRoute.value.query).length > 0) {
    getTwitterOauthToken(router.currentRoute.value.query).then((res) => {

        setTimeout(() => {
            toUrl('/?from=twitter.getTwitterOauthToken.success');
        }, 5 * 1000)

    }).catch((err) => {
        toUrl('/?from=twitter.getTwitterOauthToken.error');
    })
}

</script>
<style lang="scss" scoped>
@import "/src/assets/lhs/v4/css/v4.scss";

.bg {
    //background-image: url('@/assets/lhs/v4/image/default_bg.jpg');
    /* 背景图垂直、水平均居中 */
    background-position: top left;
    /* 背景图不平铺 */
    background-repeat: no-repeat;
    /* 当内容高度大于图片高度时，背景图像的位置相对于viewport固定 */
    //background-attachment: fixed;
    /* 让背景图基于容器大小伸缩 */
    background-size: 100%;
    /* 设置背景颜色，背景图加载过程中会显示背景色 */
    //background-color: #111111;
    min-width: 375px;
    color: white;
    overflow: hidden;
    width: 100%;
    padding-top: 120px;
    //height: 778px;
}

.cnt {
    min-height: 650px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0px 0 100px 0;
}

::v-deep .el-loading-mask {
    z-index: 900;
}
</style>