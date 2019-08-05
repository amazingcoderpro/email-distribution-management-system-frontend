<template>
    <div class="index"> 
        <Head></Head>
        <BottomTab></BottomTab>
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import BottomTab from '../components/BottomTab.vue';
import Head from '../components/Head.vue';

export default {
    name: "index",
    components:{
        BottomTab,
        Head
    }
}



</script>

