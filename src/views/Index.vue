<template>
    <section>
        <div class="gap">
            <router-link  class="img-block sm-img-block" to="/derevyannyi-brus">
                <img src="/img/main-img1.jpg" class="img-block__img sm-img-block__img" />
                <div  class="img-block__desc sm-img-block__desc">
                    Деревянный брус
                </div>
            </router-link >
        </div>
        <div class="flex-cols sm-flex-cols_wrap">
            <div class="flex-cols__col col-6 sm-col-12 sm-gap">
                <router-link  class="img-block sm-img-block" to="/obreznaya-doska">
                    <img src="/img/main-img2.jpg" class="img-block__img sm-img-block__img" />
                    <div  class="img-block__desc img-block__desc_small sm-img-block__desc">
                        Обрезная доска
                    </div>
                </router-link >
            </div>
            <div class="flex-cols__col col-6 sm-col-12">
                <router-link  class="img-block sm-img-block" to="/bruski">
                    <img src="/img/main-img3.jpg" class="img-block__img sm-img-block__img" />
                    <div  class="img-block__desc img-block__desc_small sm-img-block__desc">
                        Бруски
                    </div>
                </router-link >
            </div>
        </div>
    </section>
</template>
