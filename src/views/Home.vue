<template>
  <div class="home">
    <img alt="Logo" src="../assets/logo.png" />
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide>Slide 1</swiper-slide>
      <swiper-slide>Slide 2</swiper-slide>
      <swiper-slide>Slide 3</swiper-slide>
      <swiper-slide>Slide 4</swiper-slide>
      <swiper-slide>Slide 5</swiper-slide>
      <swiper-slide>Slide 6</swiper-slide>
      <swiper-slide>Slide 7</swiper-slide>
      <swiper-slide>Slide 8</swiper-slide>
      <swiper-slide>Slide 9</swiper-slide>
      <swiper-slide>Slide 10</swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
// @ is an alias to /src
// import Cancion from "./cancion/Index";

export default {
  name: "Home",
  data() {
    return {
      swiperOption: {
        navigation: {
          el: ".swiper-pagination"
        }
      }
    };
  }
};
</script>
