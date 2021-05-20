import { createLocalVue, shallowMount } from "@vue/test-utils";
import Autor from "../../src/views/album/Autor.vue";
import Vuex from "vuex";
import Vuetify from "vuetify";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Autor.vue", () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });
  it("Renders correctly the autor information", () => {
    const autor = {
      idAutor: 1,
      nombres: "José",
      apellidos: "Madero Vizcaíno",
      urlFoto:
        "https://images.vice.com/vice/images/articles/meta/2016/12/02/entrevistamos-a-jose-madero-vocalista-de-pxndx-1480712778.jpg",
      fechaNacimiento: "1980-08-30",
      alias: "Pepe",
      biografia:
        "José Madero Vizcaíno, más conocido como Pepe Madero es un cantante, músico, compositor, productor, abogado, escritor y podcaster mexicano."
    };
    const wrapper = shallowMount(Autor, {
      propsData: { autor },
      vuetify,
      localVue
    });
    expect(wrapper.props("autor")).toBe(autor);
  });

  it("Checks if the v-card-subtitle contains the correct name & lastname", () => {
    const autor = {
      idAutor: 1,
      nombres: "José",
      apellidos: "Madero Vizcaíno",
      urlFoto:
        "https://images.vice.com/vice/images/articles/meta/2016/12/02/entrevistamos-a-jose-madero-vocalista-de-pxndx-1480712778.jpg",
      fechaNacimiento: "1980-08-30",
      alias: "Pepe",
      biografia:
        "José Madero Vizcaíno, más conocido como Pepe Madero es un cantante, músico, compositor, productor, abogado, escritor y podcaster mexicano."
    };
    const wrapper = shallowMount(Autor, {
      propsData: { autor },
      vuetify,
      localVue
    });
    expect(wrapper.find("div").text()).toContain("José");
  });
});
