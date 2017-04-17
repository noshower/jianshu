<template>
    <div id="main" ref="article">
      <div >
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="img in imgs" v-bind:style="{backgroundImage:'url('+img+')'}">
                </div>
            </div>
            <!-- Add Pagination -->
            <div class="swiper-pagination"></div>
        </div>
        <div class="articles"  >
            <div class="article" v-for="article in articles">
                <div class="article-info">
                    <div class="author-info">
                        <img class="author-head" :src="article.avatar" alt="">
                        <span class="author-nick">{{article.author}}</span>
                    </div>
                    <div class="article-title">
                        {{article.title}}
                    </div>
                    <div class="other-info">
                        <span class="type">{{article.type}}</span>
                        <span class="read-num">阅读 {{article.readNum}}</span>
                        <span class="comments-num">评论 {{article.commentsNum}}</span>
                        <span class="like-num">喜欢 {{article.likeNum}}</span>
                    </div>
                </div>
                <div class="article-image" v-bind:style="{backgroundImage:'url('+article.mainPicture+')'}">
                </div>
            </div>
            <div v-show="!hasData" class="no-data">
                亲，没有更多文章了！
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import BScroll from 'better-scroll';
import {baseUrl} from '../common/js/config.js';
import {getToken} from '../common/js/common.js';
export default {
  data () {
    return {
        imgs:[],
        articles:[],
        hasData:true,
        pageNum:1
    }
  },
  created:function(){
    axios.get(baseUrl+'/activities?status=1&&token='+getToken()).then((res)=>{
       this.imgs = res.data.activities; 
       this.$nextTick(()=>{
         var swiper = new Swiper('.swiper-container', {
                    pagination: '.swiper-pagination',
                    paginationClickable: true
          });
       });
    });
    this.getArticleList();
  },
  methods:{
      getArticleList(){
        axios.get(baseUrl+'/articles?pageSize=10&pageNum='+this.pageNum+'&token='+getToken()).then((res)=>{
                let data= res.data;
                this.articles.push(...data.message.data);
                if(data.message.length<data.pageSize){
                    this.hasData=false;
                }
                this.$nextTick(()=>{
                    if(!this.scroll){
                        this.scroll = new BScroll(this.$refs['article'],{
                            click:true
                         });
                    }else{
                        this.scroll.refresh();
                    }
                    let clientH=document.getElementById('main').clientHeight;
                    //上拉加载更多
                    this.scroll.on('touchend',(pos)=>{
                        let diff = clientH+pos.y;
                        if(this.hasData && diff <-200){
                            this.pageNum++;
                            this.getArticleList();
                        }
                    });
                })
            })
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '../common/scss/base.scss';
@import '../common/css/swiper-3.4.2.min.css';
#main {
     position:absolute;
     top:0;
     bottom:0;
     left:0;
     right:0;
     overflow:hidden;
     .swiper-container {
        width: 100%;
        height: 100%;
        height:4.5rem;
        .swiper-slide {
            text-align: center;
            font-size: pxToRem(36);
            display: -webkit-box;
            display: -webkit-flex;
            display: flex;
            -webkit-box-pack: center;
            -webkit-justify-content: center;
            justify-content: center;
            -webkit-box-align: center;
            -webkit-align-items: center;
            align-items: center;
            @extend %backgroundImage;
        }
        .swiper-pagination-bullet {
            width: pxToRem(12);
            height:  pxToRem(12);
        }
    }
    .articles {
        .article {
            position:relative;
            width:100%;
            padding:pxToRem(50) pxToRem(30);
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            @extend %flexCenter;
            .article-info {
                @extend %flexItem;
            }
            .article-image{
                height:pxToRem(120);
                width:pxToRem(120);
                border-radius:pxToRem(4);
                @extend %backgroundImage;
            }
            .author-info {
                text-align:left;
                font-size:0;
                margin-bottom:pxToRem(20);
                .author-head {
                    width:pxToRem(30);
                    height:pxToRem(30);
                    border-radius:50%;
                    vertical-align:middle;
                    margin-right:pxToRem(10);
                }
                .author-nick {
                    display:inline-block;
                    color:#666;
                    font-size:pxToRem(22);
                    line-height:pxToRem(30);
                    vertical-align:middle;
                }
            }
            .article-title {
                font-size:pxToRem(26);
                color:#333;
                margin-bottom:pxToRem(20);
                line-height:1.5;
            }
            .other-info {
                .type {
                    padding:pxToRem(5) pxToRem(10);
                    font-size:pxToRem(20);
                    color:rgb(220,142,104);
                    border:1px solid rgb(220,142,104);
                    border-radius:pxToRem(2);
                    margin-right:pxToRem(5);
                }
                .read-num,.comments-num,.like-num {
                    color:#ccc;
                    font-size:pxToRem(20);
                    margin-right:pxToRem(5);
                }
            }
            &:before{
                content:'';
                position:absolute;
                right:0;
                top:0;
                height:1px;
                width:9.6rem;
                background:#ccc;
                -webkit-transform:scaleY(0.5);
                transform:scaleY(0.5);
            }
            &:first-child:before{
              height:0;
            }
        }
        .no-data {
            font-size:pxToRem(24);
            text-align:center;
            line-height:3.5;

        }
    }
}
</style>
