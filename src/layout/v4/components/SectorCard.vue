<template>
    <div class="carousel">
        <div class="card" v-for="(item, index) in items" :key="index" :style="cardStyle(index)">
            {{ item }}
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted, computed } from 'vue';

export default defineComponent({
    name: 'FanShapeCarousel',
    setup() {
        const carousel = ref(null);
        const items = ref(['卡片1', '卡片2', '卡片3', '卡片4', '卡片5', '卡片6']); // 示例卡片内容
        const state = reactive({
            angle: 0, // 轮播的起始角度
            spacing: 0, // 卡片之间的间距
        });

        onMounted(() => {
            if (carousel.value) {
                const carouselWidth = carousel.value.offsetWidth;
                state.spacing = carouselWidth / items.value.length; // 根据屏幕宽度计算卡片间距
            }
        });

        const cardStyle = (index: number) => {
            const rotateAngle = state.angle + (index * (180 / (items.value.length - 1))); // 计算每张卡片的旋转角度
            return {
                transform: `translateX(${index * state.spacing}px) rotateY(${rotateAngle}deg)`,
                transformOrigin: 'center center',
                transition: 'transform 1s',
                position: 'absolute',
                left: '50%',
                marginLeft: `-${state.spacing / 2}px`, // 使卡片居中
            };
        };

        const rotateCarousel = () => {
            state.angle -= 180 / (items.value.length - 1); // 每次点击逆时针旋转一个卡片的角度
        };

        return {
            carousel,
            items,
            cardStyle,
            rotateCarousel,
        };
    },
});
</script>

<style scoped>
.carousel {
    position: relative;
    width: 100%;
    height: 300px;
    /* 根据需要调整高度 */
    overflow: hidden;
}

.card {
    background-color: #fff;
    border: 1px solid #ddd;
    padding: 20px;
    width: 200px;
    /* 根据需要调整宽度 */
    height: 250px;
    /* 根据需要调整高度 */
}
</style>