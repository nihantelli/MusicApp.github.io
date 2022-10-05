class Music {
  constructor(title, singer, img, file) {
    this.title = title;
    this.singer = singer;
    this.img = img;
    this.file = file;
  }

  getName() {
    return this.title;
  }
}

const musicList = [
  new Music("Hope", "Mark Eliyahu", "1.jpg", "1.mp3"),
  new Music("Say It Right", "Asher", "2.jpg", "2.mp3"),
  new Music("SummerTime Sadness", "Lana Del Rey", "3.jpg", "3.mp3"),
  new Music("Lovely", "Billie Ellish", "4.jpg", "4.mp3"),
];

// MUSICE AİT title, SINGER, IMG , FILE BİLGİLERİNİ CLASSA TANIMLADIM.
// MUSIC LISTESİNİN İÇİNE, MUSIC CLASSINA ULAŞARAK ŞARKI BİLGİLERİNİ ATTIM
