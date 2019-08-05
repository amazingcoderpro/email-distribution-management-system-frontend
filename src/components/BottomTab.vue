<template>
    <nav class="bar bar-tab">
        <template v-for="(item,index) in tabArray">
            <div class="tab-item active" :key="index">
                <router-link :to="item.href">
                    <span :class="item.icon"></span>
                    <span class="tab-label">{{item.name}}</span>
                </router-link>
            </div>
        </template>
    </nav>
</template>

<script>
export default {
        name: "BottomTab",
        components: {},
        data() {
            return {
                tabArray:[
                    {"href":"/Home","name":"首页","icon":"icon icon-home"},
                    {"href":"/MyContent","name":"我的","icon":"icon icon-home"},
                    {"href":"/List","name":"列表","icon":"icon icon-home"},
                    {"href":"/Home","name":"首页","icon":"icon icon-home"}
                ]
            };//这里存放数据
        }
}
</script>