<template>
   <div id="map"></div>
</template>

<script>


let map, placemark
export default {
   name: 'BaseMap',
   props: {
      modelValue: {
         type: Array,
         default() {
            return null
         }
      },
      disabled: {
         type: Boolean,
         default: false
      }
   },
   data() {
      return {
         coords: []
      }
   },
   mounted() {
      this.init()
   },
   methods: {
      init() {
         const script = document.createElement('script')
         script.setAttribute(
            'src',
            `https://api-maps.yandex.ru/2.1/?apikey=${process.env.VUE_APP_MAP_API}&lang=ru_RU`
         )
         script.classList.add('Ymap')
         document.head.appendChild(script)
         script.onload = () => {
            window.ymaps.ready(() => {
               map = new window.ymaps.Map('map', {
                  center: [42.972107051983414, 47.50166365362544],
                  zoom: 13,
                  controls: []
               })
               this.placemarkHandler()
            })
         }
      },
      placemarkHandler() {
         if (this.modelValue.length) {
            this.coords = this.modelValue[1]
            this.setPlacemark()
            this.changeAddressPlacemark()
         } else if (!this.disabled) {
            map.events.add('click', (e) => {
               this.coords = e.get('coords')
               this.deletePlacemark()
               this.setPlacemark()
               this.changeAddressPlacemark()
            })
         }
      },
      movePlacemark() {
         placemark.geometry.setCoordinates(this.coords)
      },
      setPlacemark() {
         placemark = new window.ymaps.Placemark(this.coords)
         map.geoObjects.add(placemark)
      },
      deletePlacemark() {
         map.geoObjects.removeAll()
      },
      async changeAddressPlacemark() {
         placemark.properties.set('iconCaption', 'поиск...')
         const geoObject = await this.getGeoObject(this.coords)

         placemark.properties.set({
            iconCaption: await this.generateAddress(geoObject),
            balloonContent: geoObject.getAddressLine()
         })
         this.emitAddress(await this.generateAddress(geoObject), this.coords)
      },
      async getGeoObject() {
         const res = await window.ymaps.geocode(this.coords)
         return res.geoObjects.get(0)
      },
      async generateAddress(geoObject) {
         return [
            geoObject.getLocalities().length
               ? geoObject.getLocalities()
               : geoObject.getAdministrativeAreas(),
            geoObject.getThoroughfare() || geoObject.getPremise()
         ]
            .filter(Boolean)
            .join(', ')
      },
      emitAddress(address, coords) {
         this.$emit('update:modelValue', [address, coords])
      }
   }
}
</script>

<style>
#map {
   height: 400px;
   width: 100%;
   margin: 20px 0px;
}

[class*='copyrights-pane'] {
   display: none !important;
}
</style>
