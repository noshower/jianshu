<template>
	<div id="article">
    <h1 class="title">{{title}}</h1>
		<div class="article-info">
			<div class="avatar">
        <img :src="avatar" alt="">
      </div>
      <div class="author">
        <div class="name">{{author}}</div>
        <span class="label">作者</span>
      </div>
			<span class="attention">+关注</span>
		</div>
		<div class="meta">
			<span>16.03.24 00:02</span>&nbsp;&nbsp;<span>字数1938</span>&nbsp;&nbsp;<span>阅读1666</span>
		</div>
		<div class="content" v-html="compiledMarkdown"></div>
    <div class="comment-list"></div>
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
        author:'',
        avatar:''
			}
		},
		created: function() {
			const id = this.$route.query.id;
			console.log(id);
			axios.get(baseUrl + '/articles/' + id + '?token=' + getToken()).then((res) => {
        const data = res.data.data;
				this.input =data.content.trim();
        this.title =data.title;
        this.author = data.author;
        this.avatar = data.avatar;
			});
		},
		computed: {
			compiledMarkdown: function() {
				return marked(this.input, { sanitize: true })
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
    color: #e78170;
    border: 1px solid #e78170;
    border-radius: pxToRem(6);
  }
  .article-info .attention {
     font-size: pxToRem(24);
     padding:pxToRem(10) pxToRem(20);
    color: #fff;
    background:#42c02e;
    border-radius: pxToRem(6);
  }
  .meta {
    margin-top: pxToRem(20);
    font-size: pxToRem(26);
    color: #b1b1b1;
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