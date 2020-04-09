<template>
	<div class = "arztvertrag-content">
		<h4>
	<p><span>{{ this.$t('arztvertrag-page.between.title') }}</span></p>
		<p>{{ this.$t('arztvertrag-page.between.p1') }} <br>
			{{ this.$t('arztvertrag-page.between.p2') }}<br>
			{{ this.$t('arztvertrag-page.between.p3') }}<br>
			{{ this.$t('arztvertrag-page.between.p4') }}<br>
		</p>
		<p><span>{{ this.$t('arztvertrag-page.and.title') }}</span></p>
		<p>{{ this.$t('arztvertrag-page.and.p1') }} </p>
		<p><span>{{ this.$t('arztvertrag-page.and.p2_st') }}</span> {{ this.$t('arztvertrag-page.and.p2') }}</p>
		</h4>
		<ol class = "arztvertrag-content__list">
			<li>
				<span>{{ this.$t('arztvertrag-page.list.a.title') }}</span>
				<p>{{ this.$t('arztvertrag-page.list.a.p1') }}</p>
				<p>{{ this.$t('arztvertrag-page.list.a.p2') }}</p>
				<ul>
					<li>{{ this.$t('arztvertrag-page.list.a.p3') }}</li>
					<li>{{ this.$t('arztvertrag-page.list.a.p4') }}</li>
				</ul>
			</li>
			<li>
				<span>{{ this.$t('arztvertrag-page.list.b.title') }}</span>
				<p>{{ this.$t('arztvertrag-page.list.b.p1') }}</p>
			</li>
			<li>
				<span>{{ this.$t('arztvertrag-page.list.c.title') }}</span>
				<p>{{ this.$t('arztvertrag-page.list.c.p1') }}</p>
				<p>{{ this.$t('arztvertrag-page.list.c.p2') }}</p>
			</li>
			<li>
				<span>{{ this.$t('arztvertrag-page.list.d.title') }}</span>
				<p>{{ this.$t('arztvertrag-page.list.d.p1') }}</p>
			</li>
			<li>
				<span>{{ this.$t('arztvertrag-page.list.e.title') }}</span>
				<p>{{ this.$t('arztvertrag-page.list.e.p1') }}</p>
			</li>
			<li>
				<span>{{ this.$t('arztvertrag-page.list.f.title') }}</span>
				<p>{{ this.$t('arztvertrag-page.list.f.p1') }}</p>
			</li>
		</ol>
		
	</div>
</template>


<style lang = "scss" scoped>
	
	.arztvertrag-content {
		span {
			color:rgb(122, 125, 132);
			display:inline-block;
			font-family:TheSansB, sans-serif;
			font-size:18px;
			font-weight:700;
		}
		p {
			color:rgb(122, 125, 132);
			display: block;
			font-family:TheSansB, sans-serif;
			font-size:18px;
			font-weight:400;
		}
		h4 {
			margin: 0 0 30px;
			color: unset;
		}
		p{
			margin-bottom: 15px;
		}
		&__list {
			font-weight: bold;
			padding: 0;
			@include tablet-big {
				padding : 0 20px;
			}
			
			li {
				margin-bottom   : 15px;
				list-style-type : none;

				span {
					display: inline-block;
					margin-bottom: 15px;
				}
				li {
					list-style-type: disc;
					&:before {
						content : "";
						display : none;
					}
				}
			}
			
			p, ul li {
				font-weight: normal;
			}
		}
		
	}
	.title, .subtext {
		color: white;
	}
</style>