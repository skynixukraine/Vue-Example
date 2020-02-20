<template>
	<div class = "aus-content">
		<div class = "news-section">
			<h1>Auszeichnungen</h1>
			<h3>AppDoc wurde bereits mehrfach ausgezeichnet und konnte außerdem bei externen Prüfungen überzeugen.</h3>
		</div>
		<div class = "news-section">
			<div class = "img-wrapper">
				<img :src = "require('~/static/images/images/innovationspreis.jpg')"
					 style = "max-height: 418px;"/>
			</div>
			<p>Bild: Vorsitzender des Berufsverbandes der Deutschen Dermatologen (BVDD) Dr. Klaus Strömer (links)
				überreicht AppDoc-Gründer Dr. Titus J. Brinker den Innovationspreis Dermatologie 2019.</p>
		</div>
		<div class = "news-section">
			<h3>Auszeichnungen: </h3>
			<h3>18.03.2019:</h3>
			<p>Innovationspreis Dermatologie des Berufsverbands der Deutschen</p>
			<p>Dermatologen:</p>
			<a class = 'link link--small-blue'
			   href = "https://www.bvdd.de/aktuelles-presse/newsroom/gesundheitspolitik/details/news/online-hautarzt-appdoc-ausgezeichnet/">Pressemitteilung
				BVDD vom 18.03.2019</a>
			<a class = 'link link--small-blue'
			   href = "https://www.nct-heidelberg.de/fuer-patienten/aktuelles/details/titus-brinker-mit-dem-innovationspreis-dermatologie-2019-ausgezeichnet.html">Pressemitteilung
				NCT Heidelberg vom 18.03.2019</a>
		</div>
		<div class = "news-section">
			<h3>13.02.2019:</h3>
			<p>Erfolgsrezept Praxispreis der Deutschen Ärztezeitung (3. Platz):</p>
			<a class = 'link link--small-blue'
			   href = "https://www.aerztezeitung.de/kooperationen/erfolgsrezept/article/981238/erfolgs-rezept-innovationen-ohne-bits-und-bytes.html">https://www.aerztezeitung.de/kooperationen/erfolgsrezept/article/981238/erfolgs-rezept-innovationen-ohne-bits-und-bytes.html</a>
			<div class = "img-wrapper">
				<img :src = "require('~/static/images/images/titus_brinker_preis.jpg')"
					 style = "max-height: 761px;"
					  />
			</div>
			<p>Bild: Dr. Titus Brinker erhält den dritten Platz beim Erfolgsrezept Praxispreis bei SPRINGER Medizin in
				Berlin für die Entwicklung von AppDoc.</p>
		</div>
		<div class = "news-section">
			<h3>Externe Tests</h3>
			<h3>11.07.2019:</h3>
			<p>Stimmt die Diagnose von AppDoc mit dem Besuch in der Praxis überein? Drei Patientinnen testen AppDoc. WDR
				Bericht vom 11.07.2019:</p>
			<div class = "iframe-wrapper">
				<iframe width = "648"
						height = "365"
						src = "https://www.youtube.com/embed/bHB3Rfq1Az4"
						frameborder = "0"
						allow = "accelerometer; encrypted-media; gyroscope; picture-in-picture"
						allowfullscreen></iframe>
			</div>
		</div>
		<div class = "news-section">
			
			
			<h3>08.12.2018:</h3>
			<a class = 'link link--small-blue'
			   href = "https://www.aerzteblatt.de/archiv/205568/Online-Hautarzt-AppDoc-Hautprobleme-digital-abklaeren">Datenschutz-
				& Sicherheitstest des Deutschen Ärzteblatts.</a>
		
		</div>
	</div>
</template>

<script>
    export default {};
</script>

<style lang = "scss" scoped>
	.aus-content {
		.news-section {
			margin : 0 auto 30px;
		}
		
		.iframe-wrapper {
			display         : flex;
			justify-content : center;
			align-items     : center;
			padding: 15px 0;
		}
		
		iframe {
			max-width : 100%;
		}
		
		.img-wrapper {
			text-align : center;
			padding: 15px 0;
		}
		
		img {
			max-width  : 100%;
			
		}
	}

</style>