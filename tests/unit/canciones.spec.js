import { createLocalVue, shallowMount } from "@vue/test-utils";
import Canciones from "../../src/components/Canciones.vue";
import Vuetify from "vuetify";
import Vuex from "vuex";
import VueRouter from "vue-router";

const localVue = createLocalVue();
localVue.use(Vuex);
const router = new VueRouter();
describe("Canciones.vue", () => {
  let vuetify;
  let store;
  let getters;

  beforeEach(() => {
    getters = {
      usuarioAutenticado: () => true
    };
    vuetify = new Vuetify();
    store = new Vuex.Store({
      getters
    });
  });
  it("Should if the props pass correct", () => {
    const canciones = [
      {
        idCancion: "b3a899d6-8586-4c56-8ab3-551af230ec32",
        nombre: "Irokousui",
        fechaLanzamiento: "2021-01-14",
        idioma: {
          idIdioma: 2,
          nombre: "Japonés"
        },
        letra:
          "Kitto kienai kyou wa ienai\nMoto douri ni wa mou dekinai\nAno koro ni kimi wo nokoshita mama\n\nKioku no naka de wa harema no heya\nHikareaeba saraba shiritakunai\nOmoidaseba ima mo fuwatto kaoru\nKimi to boku wa onaji iro kousui\n\nHon no sukoshi senobi wo shite aruita michi\nBiidoro no kutsu utsurikawaru kisetsu moyou\n\nKitto kienai kyou wa ienai\nMoto douri ni wa mou dekinai\nAno koro ni kakushita honmono wa doko\nOkotte kurenai wakai tte kurenai\nOmottemo tada tsunote shimau dake\nNatsukashii nioi to kono uta ga nokoru\n\nKioku no nakade wa futari no heya\nHika re aeba bokura kono mama\nOmoidaseba ima mo fuwatto kaoru\nKimitoboku wa onaji iro kousui\n\nUshinau hodo\nYasashi sa sura iya ni natte\nBiidama no naka koboreochiru namida no you\n\nKitto kienai kyou wa ienai\nMoto douri ni wa mou dekinai\nAno natsu ni kakushita hontou wa mou\nOkotte kurenai wakai tte kurenai\nOmotte mo tada tsunotte shimau dake\nAtarashii nioi to kono machi ni nokoru\n\nItsuka itsuka\nKuchi o tsuita kono uso ga\nHitotsu nokorazu hontou ni natte\nDou ka dou ka\nKurikaeshi tonaete ita\nKimi ga toumei ni natta mama\n\nKitto kienai kyou wa ienai\nMoto douri ni wa mou dekinai\nAno koro ni kakushita honmono wa doko\nOkotte kurenai wakai tte kurenai\nOmottemo tada tsunote shimau dake\nNatsukashii nioi to kono uta ga nokoru",
        urlVideo: "https://www.youtube.com/watch?v=kQYLHjgUh_g",
        estadoCancion: "Activo",
        isEditado: true,
        album: {
          idAlbum: 5,
          autor: {
            idAutor: 2,
            nombres: "Yoh",
            apellidos: "Kamiyama",
            urlFoto:
              "https://www.anime-planet.com/images/people/yoh-kamiyama-32659.jpg?t=1610510576",
            fechaNacimiento: "1995-01-08",
            alias: "uki3",
            biografia:
              'Yoh Kamiyama (神山羊) nació el 09 de enero en Japón. Es un cantante, letrista, compositor y productor VOCALOID. En noviembre de 2018, anunció el cambio de su nombre a "Yoh Kamiyama" (神 山羊) como artista, mientras que su alias como productor de VOCALOID se mantendrá como uki3.'
          },
          genero: {
            idGenero: 4,
            nombre: "Alternativo"
          },
          subGeneros: [
            {
              idGenero: 2,
              nombre: "Lo-fi"
            }
          ],
          nombre: "Irokousui",
          fechaLanzamiento: "2021-01-12"
        },
        usuario: {
          idUsuario: 2,
          nombres: "Omar Fabricio",
          apellidos: "Arauco Belahonia",
          nombreDeUsuario: "omar123",
          correo: "enzoarauco83@hotmail.com"
        }
      },
      {
        idCancion: "8ac4e18c-c9e5-4ee0-bdac-6cedb67e33ec",
        nombre: "Teo el gato persa rinde su declaracion",
        fechaLanzamiento: "2018-04-11",
        idioma: {
          idIdioma: 1,
          nombre: "Español"
        },
        letra:
          "Siempre yo recuerdo el día en que te conocí\nMi dueña te invitó a comer\nSupuse que eran novios, por los besos y demás\nNo me invitaste a jugar\nFue por eso que al principio actuaba como vil felino\nY me empezaste a chiflar\nY desde ahí me encanta escuchar tu silbido\nTe hiciste mi amigo, te empezaba a extrañar\nLa besabas, me decías adiós\nJugabas conmigo, ella te hacía esperar\nSilla rosa en el comedor\nY me subía al sillón de la televisión\nQuería verla contigo, ella y yo\nMas me conformo con sólo escuchar tu silbido\nMe acariciabas el pelaje sin cesar\nYo bostezaba cada que me hacías masaje cabezal\nMas lo que prefería era oírte silbar\nMe inventaste ese sonido especial\nYo ronroneaba al acostarme en ti y oírte respirar\nHace un año no te veo y me pregunto dónde estás\n¿Dónde estás?\nSiempre que visitabas te recibíamos con fervor\nQuién se emocionaba más, ¿ella o yo?\nAhora que recuerdo, mi dueña me contó que hace poco terminó el amor\nY yo no entiendo, ¿te olvidaste ya de mí?\nVen, te cuento, ella llora al dormir\nYo no entiendo, su amor debería durar mucho tiempo\nPor fa, venme a visitar\nPues en verdad extraño mucho tu silbido\nSólo ven una vez más, pues no me puedo acordar de tu silbido",
        urlVideo: "https://www.youtube.com/watch?v=gz7Ma6tLcBw",
        estadoCancion: "Activo",
        isEditado: true,
        album: {
          idAlbum: 1,
          autor: {
            idAutor: 1,
            nombres: "José",
            apellidos: "Madero Vizcaíno",
            urlFoto:
              "https://images.vice.com/vice/images/articles/meta/2016/12/02/entrevistamos-a-jose-madero-vocalista-de-pxndx-1480712778.jpg",
            fechaNacimiento: "1980-08-30",
            alias: "Pepe",
            biografia:
              "José Madero Vizcaíno, más conocido como Pepe Madero es un cantante, músico, compositor, productor, abogado, escritor y podcaster mexicano."
          },
          genero: {
            idGenero: 1,
            nombre: "Rock"
          },
          subGeneros: [
            {
              idGenero: 4,
              nombre: "Alternativo"
            },
            {
              idGenero: 1,
              nombre: "Rock"
            }
          ],
          nombre: "Carmesi",
          fechaLanzamiento: "2017-03-12"
        },
        usuario: {
          idUsuario: 1,
          nombres: "Enzo Daniel",
          apellidos: "Arauco Belahonia",
          nombreDeUsuario: "halstan",
          correo: "enzoarauco@gmail.com"
        }
      }
    ];
    const wrapper = shallowMount(Canciones, {
      stubs: ["router-link"],
      router,
      store,
      vuetify,
      propsData: {
        canciones
      },
      localVue
    });
    expect(wrapper.props("canciones")).toBe(canciones);
  });
  it("Should change the contain of the url", () => {
    const canciones = [
      {
        idCancion: "b3a899d6-8586-4c56-8ab3-551af230ec32",
        nombre: "Irokousui",
        fechaLanzamiento: "2021-01-14",
        idioma: {
          idIdioma: 2,
          nombre: "Japonés"
        },
        letra:
          "Kitto kienai kyou wa ienai\nMoto douri ni wa mou dekinai\nAno koro ni kimi wo nokoshita mama\n\nKioku no naka de wa harema no heya\nHikareaeba saraba shiritakunai\nOmoidaseba ima mo fuwatto kaoru\nKimi to boku wa onaji iro kousui\n\nHon no sukoshi senobi wo shite aruita michi\nBiidoro no kutsu utsurikawaru kisetsu moyou\n\nKitto kienai kyou wa ienai\nMoto douri ni wa mou dekinai\nAno koro ni kakushita honmono wa doko\nOkotte kurenai wakai tte kurenai\nOmottemo tada tsunote shimau dake\nNatsukashii nioi to kono uta ga nokoru\n\nKioku no nakade wa futari no heya\nHika re aeba bokura kono mama\nOmoidaseba ima mo fuwatto kaoru\nKimitoboku wa onaji iro kousui\n\nUshinau hodo\nYasashi sa sura iya ni natte\nBiidama no naka koboreochiru namida no you\n\nKitto kienai kyou wa ienai\nMoto douri ni wa mou dekinai\nAno natsu ni kakushita hontou wa mou\nOkotte kurenai wakai tte kurenai\nOmotte mo tada tsunotte shimau dake\nAtarashii nioi to kono machi ni nokoru\n\nItsuka itsuka\nKuchi o tsuita kono uso ga\nHitotsu nokorazu hontou ni natte\nDou ka dou ka\nKurikaeshi tonaete ita\nKimi ga toumei ni natta mama\n\nKitto kienai kyou wa ienai\nMoto douri ni wa mou dekinai\nAno koro ni kakushita honmono wa doko\nOkotte kurenai wakai tte kurenai\nOmottemo tada tsunote shimau dake\nNatsukashii nioi to kono uta ga nokoru",
        urlVideo: "https://www.youtube.com/watch?v=kQYLHjgUh_g",
        estadoCancion: "Activo",
        isEditado: true,
        album: {
          idAlbum: 5,
          autor: {
            idAutor: 2,
            nombres: "Yoh",
            apellidos: "Kamiyama",
            urlFoto:
              "https://www.anime-planet.com/images/people/yoh-kamiyama-32659.jpg?t=1610510576",
            fechaNacimiento: "1995-01-08",
            alias: "uki3",
            biografia:
              'Yoh Kamiyama (神山羊) nació el 09 de enero en Japón. Es un cantante, letrista, compositor y productor VOCALOID. En noviembre de 2018, anunció el cambio de su nombre a "Yoh Kamiyama" (神 山羊) como artista, mientras que su alias como productor de VOCALOID se mantendrá como uki3.'
          },
          genero: {
            idGenero: 4,
            nombre: "Alternativo"
          },
          subGeneros: [
            {
              idGenero: 2,
              nombre: "Lo-fi"
            }
          ],
          nombre: "Irokousui",
          fechaLanzamiento: "2021-01-12"
        },
        usuario: {
          idUsuario: 2,
          nombres: "Omar Fabricio",
          apellidos: "Arauco Belahonia",
          nombreDeUsuario: "omar123",
          correo: "enzoarauco83@hotmail.com"
        }
      },
      {
        idCancion: "8ac4e18c-c9e5-4ee0-bdac-6cedb67e33ec",
        nombre: "Teo el gato persa rinde su declaracion",
        fechaLanzamiento: "2018-04-11",
        idioma: {
          idIdioma: 1,
          nombre: "Español"
        },
        letra:
          "Siempre yo recuerdo el día en que te conocí\nMi dueña te invitó a comer\nSupuse que eran novios, por los besos y demás\nNo me invitaste a jugar\nFue por eso que al principio actuaba como vil felino\nY me empezaste a chiflar\nY desde ahí me encanta escuchar tu silbido\nTe hiciste mi amigo, te empezaba a extrañar\nLa besabas, me decías adiós\nJugabas conmigo, ella te hacía esperar\nSilla rosa en el comedor\nY me subía al sillón de la televisión\nQuería verla contigo, ella y yo\nMas me conformo con sólo escuchar tu silbido\nMe acariciabas el pelaje sin cesar\nYo bostezaba cada que me hacías masaje cabezal\nMas lo que prefería era oírte silbar\nMe inventaste ese sonido especial\nYo ronroneaba al acostarme en ti y oírte respirar\nHace un año no te veo y me pregunto dónde estás\n¿Dónde estás?\nSiempre que visitabas te recibíamos con fervor\nQuién se emocionaba más, ¿ella o yo?\nAhora que recuerdo, mi dueña me contó que hace poco terminó el amor\nY yo no entiendo, ¿te olvidaste ya de mí?\nVen, te cuento, ella llora al dormir\nYo no entiendo, su amor debería durar mucho tiempo\nPor fa, venme a visitar\nPues en verdad extraño mucho tu silbido\nSólo ven una vez más, pues no me puedo acordar de tu silbido",
        urlVideo: "https://www.youtube.com/watch?v=gz7Ma6tLcBw",
        estadoCancion: "Activo",
        isEditado: true,
        album: {
          idAlbum: 1,
          autor: {
            idAutor: 1,
            nombres: "José",
            apellidos: "Madero Vizcaíno",
            urlFoto:
              "https://images.vice.com/vice/images/articles/meta/2016/12/02/entrevistamos-a-jose-madero-vocalista-de-pxndx-1480712778.jpg",
            fechaNacimiento: "1980-08-30",
            alias: "Pepe",
            biografia:
              "José Madero Vizcaíno, más conocido como Pepe Madero es un cantante, músico, compositor, productor, abogado, escritor y podcaster mexicano."
          },
          genero: {
            idGenero: 1,
            nombre: "Rock"
          },
          subGeneros: [
            {
              idGenero: 4,
              nombre: "Alternativo"
            },
            {
              idGenero: 1,
              nombre: "Rock"
            }
          ],
          nombre: "Carmesi",
          fechaLanzamiento: "2017-03-12"
        },
        usuario: {
          idUsuario: 1,
          nombres: "Enzo Daniel",
          apellidos: "Arauco Belahonia",
          nombreDeUsuario: "halstan",
          correo: "enzoarauco@gmail.com"
        }
      }
    ];
    const wrapper = shallowMount(Canciones, {
      stubs: ["router-link"],
      router,
      store,
      vuetify,
      propsData: {
        canciones
      },
      localVue
    });
    /*canciones.map(cancion => {
      wrapper.vm.addEmbed(cancion.urlVideo);
    });*/
    /*wrapper.props("canciones").forEach(cancion => {
      expect(cancion.urlVideo).toContain("embed");
    });*/
    expect(wrapper.find("iframe").attributes(["src"])).toContain("embed");
  });
});
