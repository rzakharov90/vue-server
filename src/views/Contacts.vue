<template>
<section class="contacts-page">
    <h2 class="page-title page-title_about">
                Контакты
            </h2>
    <div class="g-map">
        <div class="g-map__inner">

            <div class="content">
                <p>
                    Производство и офис: Московская область, Можайский район, с. Борисово
                </p>
                <p>
                    Тел: 8(926)530-22-63
                </p>
                <p>
                    E-mail: piloprom-order@yandex.ru
                </p>                        
            </div>
        </div>
        <div id="g-map" class="g-map__map"></div>
    </div>                    
</section>
            
            
</template>

<script>

    
export default {
  name: 'Contacts',
  mounted: function(){
      
      require.ensure(['google-maps'], function(require) {
        var GoogleMapsLoader = require('google-maps');
          GoogleMapsLoader.KEY = 'AIzaSyCl47AyRzLCarMN-G9a-hNPXT23AbVKwak';
        GoogleMapsLoader.load(function(google) {
            const uluru = {lat: 55.422, lng: 36.038};
            const map = new google.maps.Map(document.getElementById('g-map'), {
              zoom: 11,
              center: uluru
            });
            var marker = new google.maps.Marker({
              position: uluru,
              map: map,
              title: 'Piloprom',
              animation: google.maps.Animation.DROP,
            });
          });
      })
      
  }
}

</script>