<template>
  <div id="main">
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="img in imgs" v-bind:style="{backgroundImage:'url('+img+')'}">
            </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
    </div>
    <div class="articles">
        <div class="article" v-for="article in articles">
            <div class="article-info">
                <div class="author-info">
                    <img class="author-head" src="http://vuejs.org/images/logo.png" alt="">
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
            <div class="article-image" v-bind:style="{backgroundImage:'url('+article.avatar+')'}">
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import {baseUrl} from '../common/js/config.js';
export default {
  data () {
    return {
        imgs:[],
        articles:[]
    }
  },
  created:function(){
    axios.get(baseUrl+'/getActivities?status=1').then((res)=>{
       this.imgs = res.data.activities; 
       this.$nextTick(function(){
        var swiper = new Swiper('.swiper-container', {
                    pagination: '.swiper-pagination',
                    paginationClickable: true
         });
       });
    });
    axios.get(baseUrl+'/getArticleList?pageSize=10&pageNum=1').then((res)=>{
        this.articles = res.data.message.data;
        this.$nextTick(function(){

        })
    })
  },
  mounted(){
       
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '../common/scss/base.scss';
@import '../common/css/swiper-3.4.2.min.css';
#main {
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
                bottom:0;
                height:1px;
                width:9.6rem;
                background:#ccc;
                -webkit-transform:scaleY(0.5);
                transform:scaleY(0.5);
            }
        }
    }
}
</style>
