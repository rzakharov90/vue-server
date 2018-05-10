<template>
    <header class="gap container">
            <div class="header-top sm-header-top">
                <div class="header-top__logo sm-header-top__logo sm-gap">
                    <router-link to="/" class="header-top__logo-link sm-header-top__logo-link">
                        Пиломатериалы <br><span class="header-top__logo-span">от производителя</span>
                    </router-link>
                </div>
                <div class="header-top__phone sm-header-top__phone">
                    <a href="tel:89773095660" class="header-top__phone-link sm-header-top__phone-link">
                        8 (977) 309-56-60
                    </a>
                </div>
            </div>
            <nav class="main-nav sm-main-nav">
                <router-link to="/" class="main-nav__item sm-main-nav__item" exact-active-class="main-nav__item_active">Главная</router-link>
                <router-link to="about" class="main-nav__item sm-main-nav__item" exact-active-class="main-nav__item_active">О компании</router-link>
                <router-link to="delivery" class="main-nav__item sm-main-nav__item" exact-active-class="main-nav__item_active">Оплата и доставка</router-link>
                <router-link to="contacts" class="main-nav__item sm-main-nav__item" exact-active-class="main-nav__item_active">Контакты</router-link>
            </nav>
        </header>
</template>

<script>
    

export default {
  name: 'Header',
  components: {
    
  }
}
</script>

<style>




</style>
