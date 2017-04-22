<template>
	<div id="article">
    <h1 class="title">{{title}}</h1>
		<div class="article-info">
			<div class="avatar">
        <img :src="avatar" alt="">
      </div>
      <div class="author">
        <div class="name">{{originator}}</div>
        <span class="label">作者</span>
      </div>
			<span class="attention">+关注</span>
		</div>
		<div class="meta">
			<span>{{publishTime}}</span>&nbsp;&nbsp;<span>字数{{wordage}}</span>&nbsp;&nbsp;<span>阅读{{readNum}}</span>
		</div>
		<div class="content" v-html="compiledMarkdown"></div>
    <div class="comment-list">
      <div class="like-btn">
          <div  v-if="isSupport"  class="like-img support" v-on:click="support">
          </div>
          <div  v-else="isSupport"  class="like-img" v-on:click="support">
          </div>
          <p class="like-num">{{likeNum}}</p>
          <p class="copyright">© 著作权归作者所有</p>
      </div>
			<div class="comment-action">
				<span>评论32</span>
				<span>只看作者</span>
				<span>按时间倒序</span>
			</div>
			<div class="comment">
			  <div class="info">
					<div class="info-head">
					</div>
					<div class="info-date">
						<p>965588</p>
						<p>21楼 04.20 15:04</p>
					</div>
					<div class="info-action">
						<span></span>
						<span></span>
					</div>
				</div>
			</div>
    </div>
	</div>
</template>
<script>
	import axios from 'axios';
	import marked from 'marked';
	import { baseUrl } from '../common/js/config.js';
	import { setToken } from '../common/js/common.js';
	import { getToken } from '../common/js/common.js';
	export default {
		name: 'Article',
		data() {
			return {
				input: '解决',
        title:'',
        originator:'',
        avatar:'',
        wordage:0,
        isSupport:false,
        readNum:0,
        likeNum:0,
        publishTime:0,
        isClick:false
			}
		},
		created: function() {
			const id = this.$route.query.id;
			console.log(id);
			axios.get(baseUrl + '/articles/' + id + '?token=' + getToken()).then((res) => {
        const data = res.data.data;
				this.input =data.content.trim();
        this.title =data.title;
        this.originator = data.originator;
        this.avatar = data.avatar;
        this.wordage=data.wordage;
        this.isSupport = data.isSupport;
        this.likeNum = data.likeNum;
        this.readNum = data.readNum;
        this.publishTime =data.publishTime.replace('*','');
			});
		},
		computed: {
			compiledMarkdown: function() {
				return marked(this.input, { sanitize: true })
			}
		},
    methods:{
      support(){
        if(this.isClick){
          return false;
        }
        this.isClick =true;
        axios.post(baseUrl+'/articles/support?token=' + getToken(),{
            articleId:this.$route.query.id
        }).then((res)=>{
          this.isClick = false;
          if(res.data.code !=200){
            alert(res.data.message);
          }else{
						//status ===0 表示取消点赞,1表示点赞
            if(res.data.status === 0){
							this.isSupport = false;
           		this.likeNum --;
						}else{
							this.isSupport = true;
           		this.likeNum ++;
						}
          }
        });
      }
    }
	}
</script>
<style lang="scss">
	@import '../common/scss/base.scss';
  .title {
      margin: 0.4rem 0;
      font-size: 0.8rem;
      font-weight: 700;
      font-family: -apple-system,SF UI Display,Arial,PingFang SC,Hiragino Sans GB,Microsoft YaHei,WenQuanYi Micro Hei,sans-serif;
      color: #2f2f2f;
      word-break: break-word;
      line-height: 1.4;
  }
  #article {
    padding:pxToRem(36) pxToRem(36) 0;
  }
  .article-info {
    @extend %flexCenter;
  }
  .article-info .avatar {
    vertical-align: middle;
    display: inline-block;
    line-height: 1;
  }
  .avatar img {
    width: pxToRem(68);
    height:  pxToRem(68);
    border-radius: 100px;
    border: 1px solid #ddd;
  }
  .article-info .author {
    @extend %flexItem;
  }
  .article-info .name {
    margin: 0  pxToRem(10);
    font-size: pxToRem(32);
    color: #484848;
    display: inline-block;
  }
  .article-info .label {
    padding: pxToRem(2) pxToRem(4);
    font-size: pxToRem(24);
    color: #ea6f5a;
    border: 1px solid #ea6f5a;
    border-radius: pxToRem(6);
  }
  .article-info .attention {
     font-size: pxToRem(24);
     padding:pxToRem(10) pxToRem(20);
    color: #fff;
    background:#42c02e;
    border-radius: pxToRem(6);
  }
	.comment-list{
		position: relative;
		padding-bottom: pxToRem(30);
		&:before{
			content:'';
			position: absolute;
			left: 0;
			bottom:0;
			height:1px;
			width:100%;
			transform: scaleY(0.5);
			background:#ccc;
		}
	}
	.comment-action {
		padding: pxToRem(20) 0;
	}
  .meta {
    margin-top: pxToRem(20);
    font-size: pxToRem(26);
    color: #b1b1b1;
  }

  .like-btn {
    @extend %flexCenter;
    .like-img {
      width:pxToRem(54);
      height:pxToRem(54);
      margin-right:pxToRem(10);
      background-image:url('../assets/like.png');
      @extend %backgroundImage;
      &.support {
         background-image:url('../assets/like-a.png');
      }
    }
    .like-num {
      font-size:0.4rem;
      color:#979797;
    }
    .copyright {
      @extend %flexItem;
      text-align: right;
      font-size: pxToRem(26);
      color: #e6e6e6;
    }
  }

	.content {
		color: #2f2f2f;
		font-size: 0.4266rem;
		font-weight: 400;
		line-height: 1.7;
    margin-top:pxToRem(40);
	}

	.content p {
		margin: 0 0 pxToRem(50);
	}

	.content blockquote h1:last-child,
	.content blockquote h2:last-child,
	.content blockquote h3:last-child,
	.content blockquote h4:last-child,
	.content blockquote h5:last-child,
	.content blockquote h6:last-child,
	.content blockquote li:last-child,
	.content blockquote ol:last-child,
	.content blockquote p:last-child,
	.content blockquote ul:last-child {
		margin-bottom: 0
	}

	.content .video-package .video-description p {
		margin: 0
	}

	.content li p {
		overflow: visible
	}

	.content a {
		color: #3194d0
	}

	.content a:hover {
		color: #3194d0;
		text-decoration: underline
	}

	.content a.active,
	.content a:active,
	.content a:focus {
		color: #3194d0
	}

	.content a.disabled,
	.content a.disabled.active,
	.content a.disabled:active,
	.content a.disabled:focus,
	.content a.disabled:hover,
	.content a[disabled],
	.content a[disabled].active,
	.content a[disabled]:active,
	.content a[disabled]:focus,
	.content a[disabled]:hover {
		cursor: not-allowed;
		color: #f5f5f5
	}

	.content ol,
	.content p,
	.content ul {
		word-break: break-word
	}

	.content hr {
		margin: 0 0 0.5333rem;
		border-top: 0.0266rem solid #ddd
	}

	.content h1,
	.content h2,
	.content h3,
	.content h4,
	.content h5,
	.content h6 {
		margin: 0 0 0.4rem;
		font-weight: 700;
		color: #2f2f2f;
		line-height: 1.7;
		text-rendering: optimizelegibility
	}

	.content h1 {
		font-size: 0.6933rem;
	}

	.content h2 {
		font-size: 0.64rem;
	}

	.content h3 {
		font-size: 0.5866rem;
	}

	.content h4 {
		font-size: 0.5333rem;
	}

	.content h5 {
		font-size: 0.48rem;
	}

	.content h6 {
		font-size: 0.4266rem;
	}

	.content img {
		max-width: 100%
	}

	.content blockquote {
		padding: 0.5333rem;
		margin-bottom: 0.6666rem;
		background-color: #f7f7f7;
		border-left: 0.16rem solid #b4b4b4;
		word-break: break-word;
		font-size: 0.4266rem;
		line-height: 0.8rem;
	}

	.content blockquote p {
		font-size: 0.4266rem;
		font-weight: 400;
		line-height: 1.7
	}

	.content blockquote .image-package {
		margin-left: 0;
		margin-right: 0
	}

	.content ol,
	.content ul {
		padding: 0;
		margin-left: 0.5866rem;
		margin-bottom: 0.5333rem;
	}

	.content ol li,
	.content ul li {
		line-height: 0.8rem;
	}

	.content ol li ol,
	.content ol li ul,
	.content ul li ol,
	.content ul li ul {
		margin-top: 0.4rem;
	}

	.content ol .image-package,
	.content ul .image-package {
		margin: 0.2666rem 0 0.6666rem !important
	}

	.content pre {
		padding: 0.4rem;
		margin-bottom: 0.5333rem;
		word-wrap: normal;
		word-break: break-word;
		white-space: pre;
		overflow: auto;
		border: 0.0266rem solid #ccc
	}

	.content pre code {
		padding: 0;
		background-color: transparent;
		white-space: pre
	}

	.content code {
		padding: 0.0533rem 0.1066rem;
		margin: 0.0533rem;
		background-color: #f6f6f6;
		color: #657b83;
		font-size: 0.32rem;
		white-space: pre-wrap
	}

	.content table {
		width: 100%;
		margin-bottom: 0.5333rem;
		border: 1px solid #ddd;
		border-collapse: collapse;
		border-left: none
	}

	.content table tr:nth-of-type(2n) {
		background-color: hsla(0, 0%, 71%, .1)
	}

	.content table thead th {
		vertical-align: middle;
		text-align: inherit
	}

	.content table td,
	.content table th {
		padding: 0.2133rem;
		border: 0.0266rem solid #ddd;
		line-height: 0.5333rem;
		vertical-align: middle;
	}

	.content table th {
		font-weight: 700;
	}
  .content img {
    margin-top:pxToRem(50);
    width:100%;
  }
</style>