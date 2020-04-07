<template>
	<div class = "agb-content">
<h3>{{ this.$t('agb-page.sub-title') }}</h3>
		<ol type="I">
			<li><a href = "#first"> {{ this.$t('agb-page.first.title') }}</a></li>
			<li><a href = "#last">{{ this.$t('agb-page.last.title') }}</a></li>
		</ol>
		
		<ol type="I" id="first" class="agb-content__title-list">
			<li><h4>{{ this.$t('agb-page.first.title') }}</h4></li>
		</ol>
		
		<ol type="A" class="agb-content__text-list">
			<li>
				<span>{{ this.$t('agb-page.first.a.title') }}</span>
				<p>{{ this.$t('agb-page.first.a.p1') }}</p>
				<p>{{ this.$t('agb-page.first.a.p2') }}</p>
				<p>{{ this.$t('agb-page.first.a.p3') }}</p>
				<ul>
					<li>{{ this.$t('agb-page.first.a.p4') }}</li>
					<li>{{ this.$t('agb-page.first.a.p5') }}</li>
				</ul>
			</li>
			<li>
				<span>{{ this.$t('agb-page.first.b.title') }}</span>
				<p>{{ this.$t('agb-page.first.b.p1') }}</p>
			</li>
			<li>
				<span>{{ this.$t('agb-page.first.c.title') }}</span>
				<p>{{ this.$t('agb-page.first.c.p1') }}</p>
			</li>
			<li>
				<span>{{ this.$t('agb-page.first.d.title') }}</span>
				<p>{{ this.$t('agb-page.first.d.p1') }}</p>
				<p>{{ this.$t('agb-page.first.d.p2') }}</p>
			</li>
			<li>
				<span>{{ this.$t('agb-page.first.e.title') }}</span>
				<p>{{ this.$t('agb-page.first.e.p1') }}</p>
			</li>
			<li>
				<span>{{ this.$t('agb-page.first.f.title') }}</span>
				<p>{{ this.$t('agb-page.first.f.p1') }}</p>
			</li>
			<li>
				<span>{{ this.$t('agb-page.first.g.title') }}</span>
				<p>{{ this.$t('agb-page.first.g.p1') }}</p>
			</li>
			<li>
				<span>{{ this.$t('agb-page.first.h.title') }}</span>
				<p>{{ this.$t('agb-page.first.h.p1') }}</p>
			</li>
		</ol>
		
		<ol type="I" start="2" id="last" class="agb-content__title-list">
			<li><h4>{{ this.$t('agb-page.last.title') }}</h4></li>
		</ol>
		
		<ol type="A" class="agb-content__text-list">
			<li>
				<span>{{ this.$t('agb-page.last.a.title') }}</span>
				<p>{{ this.$t('agb-page.last.a.p1') }}</p>
				<p>{{ this.$t('agb-page.last.a.p2') }}</p>
				<p>{{ this.$t('agb-page.last.a.p3') }}</p>
				<ul>
					<li>{{ this.$t('agb-page.last.a.p4') }}</li>
					<li>{{ this.$t('agb-page.last.a.p5') }}</li>
				</ul>
			</li>
			<li>
				<span>{{ this.$t('agb-page.last.b.title') }}</span>
				<p>{{ this.$t('agb-page.last.b.p1') }}</p>
			</li>
			<li>
				<span>{{ this.$t('agb-page.last.c.title') }}</span>
				<p>{{ this.$t('agb-page.last.c.p1') }}</p>
			</li>
			<li>
				<span>{{ this.$t('agb-page.last.d.title') }}</span>
				<p>{{ this.$t('agb-page.last.d.p1') }}</p>
			</li>
			<li>
				<span>{{ this.$t('agb-page.last.e.title') }}</span>
				<p>{{ this.$t('agb-page.last.e.p1') }} 	<NuxtLink :to = "$routes.privacy.path" exact>{{ this.$t('agb-page.link') }}</NuxtLink> {{ this.$t('agb-page.last.e.p1_2') }}</p>
			</li>
			<li>
				<span>{{ this.$t('agb-page.last.f.title') }}</span>
				<p>{{ this.$t('agb-page.last.f.p1') }}</p>
			</li>
			<li>
				<span>{{ this.$t('agb-page.last.g.title') }}</span>
				<p>{{ this.$t('agb-page.last.g.p1') }}</p>
			</li>
			<li>
				<span>{{ this.$t('agb-page.last.h.title') }}</span>
				<p>{{ this.$t('agb-page.last.h.p1') }}</p>
			</li>
		</ol>
		<p class="agb-content__status">{{ this.$t('agb-page.status') }}</p>
	</div>
</template>


<style lang = "scss" scoped>

	.agb-content {
		&__title-list {
			color: $color-curious-blue;
			padding: 0 20px;
		}
		&__text-list {
			font-weight: bold;
			padding: 0 5px;
			@include tablet-big {
				padding : 0 20px;
			}
			p, ul {
				margin-bottom: 10px;
			}
			p, ul li {
				font-weight: normal;
			}
		}
		&__status {
			margin-top: 20px;
		}
		
	}
	.container__mobile-adaptation {
		.title {
		
		}
	}

</style>