<template>
  <div id="app">
    <Header></Header>
    <main>
        <div class="container">
            <div class="flex-cols gap_xl md-flex-cols_wrap">
                
                <div class="flex-cols__col flex-cols__col_nav md-flex-cols__col_nav">
                    <CatalogNav></CatalogNav>
                    <div class="guarantee-banner md-hide">
                        <img src="/img/guarantee.jpg" class="guarantee-banner__img" />
                        <div class="guarantee-banner__desc">
                            Мы гарантируем, что все цены и размеры, предоставленные на сайте соответствуют фактическим.
                        </div>
                    </div>
                </div>
                <div class="flex-cols__col">
                    <router-view/>
                </div>
            </div>
        </div>
    </main>
    <footer>
            <WhyUs></WhyUs>
            <div class="footer">
                <div class="container">
                    <FooterNav></FooterNav>                
                </div>
            </div>
        </footer>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import CatalogNav from './components/CatalogNav.vue'
import FooterNav from './components/FooterNav.vue'
import WhyUs from './components/WhyUs.vue'

export default {
  name: 'App',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
        category: null,
        city: null
    }
  },
  components: {
    Header, CatalogNav,FooterNav, WhyUs
  }
}

</script>

<style  src="./css/app.css"></style>
