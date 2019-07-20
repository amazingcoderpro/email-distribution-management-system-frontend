<template>
    <div class="EmailPage">
                <div class="showBox" style="word-wrap:break-word;text-align:center;font-size:14px;">
                    <div style="margin: 0px auto;width: 100%;border-bottom: 1px solid #ccc;padding-bottom: 20px;">
                        <div style="margin:0 auto;width:30%;">
                            <h2>Subject Line</h2>
                            <div v-if="fromData.SubjectText">{{fromData.SubjectText}}</div>
                            <div v-else>We just picked up some new items for you</div>
                        </div>
                    </div>
                    <div style="width: 100%;padding-bottom: 20px;">
                        <div style="margin:0 auto;width:70%;line-height:20px;padding: 20px 0;">
                            <div v-if="fromData.HeadingText" style="padding: 10px 0;">{{fromData.HeadingText}}</div>
                            <div v-else style="padding: 10px 0;">Styles you love - selling fast!</div>
                            <div style="padding: 10px 0;">If you are having trouble viewing this email, please click here.</div>
                        </div>
                    </div>
                    <div style="width: 100%;padding-bottom: 20px;">
                        <div v-if="logoUrl" style="width: 30%;margin: 0 auto;">
                            <img :src="logoUrl" style="width: 100%;"/>
                        </div>
                        <div v-else style="font-size: 30px;border: 1px solid #ddd;font-weight: 900;padding: 12px 0;width: 30%;margin: 0 auto;">YOUR LOGO</div>
                    </div>
                    <div style="width: 100%;padding-bottom: 20px;">
                        <div v-if="bannerUrl" style="width: 100%;">
                            <img :src="bannerUrl" style="width: 100%;"/>
                        </div>
                        <div v-else style="font-size: 30px;border: 1px solid #ddd;font-weight: 900;padding: 130px;">YOUR BANNER</div>
                    </div>
                    <div style="width: 100%;padding-bottom: 20px;">
                        <div style="font-size: 28px;font-weight: 700;" v-if="fromData.Headline">{{fromData.Headline}}</div>
                        <div style="font-size: 28px;font-weight: 700;" v-else>STILL SEARCHING FOR WHAT YOU NEED?</div>
                    </div>
                    <div style="width: 100%;padding-bottom: 20px;">
                        <div style="font-family: 'Segoe UI Emoji';font-weight: 400;font-style: normal;font-size:16px;" v-if="fromData.bodyText">{{fromData.bodyText}}</div>
                        <div style="font-family: 'Segoe UI Emoji';font-weight: 400;font-style: normal;font-size:16px;" v-else>It seems like you didn't find what you were looking for during your last visit to {店铺名}.Do you need another look?</div>
                    </div>
                    <div style="width: 60%;padding: 20px 12px;margin: 0 auto;">
                        <template v-for="(item,index) in imgArray" >
                            <div :key="index" style="width:calc(50% - 24px);margin:10px;height:100px;display:inline-block;border:1px solid #ccc;">
                                <img :src="item.url" style="width:100%;"/>
                                <h3 style="font-weight:700;">{{item.title}}</h3>
                                <h3>{{item.price}}</h3>
                            </div>
                        </template>
                    </div>
                    <div style="width:100%;padding-bottom: 20px;">
                        <div style="display: inline-block;padding: 20px;background: #000;color: #fff;font-size: 16px;font-weight: 900;border-radius: 10px;">Back to Shop >>></div>
                    </div>
                    <div style="width:100%;padding-bottom: 20px;">
                        <div style="">{shop_email}</div>
                    </div>
                    <div style="width:100%;padding-bottom: 20px;">
                        <div style="">{year} {shop_name}. All rights reserved.</div>
                    </div>
                    <div style="width:100%;padding-bottom: 20px;">
                        <div style="">{shop_address}</div>
                    </div>
                    <div style="width:100%;padding-bottom: 20px;">
                        <div style="display: inline-block;padding: 10px;color: #ccc;font-size: 14px;border-radius: 10px;border: 1px solid #ccc;">Unsubscribe</div>
                    </div>
                </div>

    </div>
</template>

<script>
export default {
    name:"EmailPage",
    data(){
        return {
            logoUrl: '',
            bannerUrl:'',
            fromData:{
                SubjectText:'',
                HeadingText:'',
                Headline:'',
                bodyText:'',
                searchImgType:'0',
                SegmentValue:[],
                SegmentState:[],
                periodTime:[],
                SendTimeType:'0',
                SendValue:new Date(2016, 9, 10, 18, 40),
            },
            imgArray:[
                {"state":true,"url":"http://sysadmin.koudl.com//UPloadFiles/AppHomeImage/829287888f6149d8b52135c66fc5eb6cpic.jpg?t=20190704104027756","title":"God T-xunste","price":"12.32"},
                {"state":true,"url":"http://sysadmin.koudl.com//UPloadFiles/AppHomeImage/829287888f6149d8b52135c66fc5eb6cpic.jpg?t=20190704104027756","title":"God T-xunste","price":"12.32"},
                {"state":true,"url":"http://sysadmin.koudl.com//UPloadFiles/AppHomeImage/829287888f6149d8b52135c66fc5eb6cpic.jpg?t=20190704104027756","title":"God T-xunste","price":"12.32"},
                {"state":true,"url":"http://sysadmin.koudl.com//UPloadFiles/AppHomeImage/829287888f6149d8b52135c66fc5eb6cpic.jpg?t=20190704104027756","title":"God T-xunste","price":"12.32"},
                {"state":true,"url":"http://sysadmin.koudl.com//UPloadFiles/AppHomeImage/829287888f6149d8b52135c66fc5eb6cpic.jpg?t=20190704104027756","title":"God T-xunste","price":"12.32"},
                {"state":true,"url":"http://sysadmin.koudl.com//UPloadFiles/AppHomeImage/829287888f6149d8b52135c66fc5eb6cpic.jpg?t=20190704104027756","title":"God T-xunste","price":"12.32"}
            ],
        }
    },
    mounted(){
    },
    methods:{
    },
}
</script>

<style>
</style>


