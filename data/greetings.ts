export interface Greeting {
  language: string
  message: string
  flags: string[]
}

export const GREETINGS: Greeting[] = [
  {
    language: 'English',
    message: 'Hello World!',
    flags: ['us', 'gb', 'ca', 'au'],
  },
  {
    language: 'German',
    message: 'Hallo Welt!',
    flags: ['de', 'at', 'ch'],
  },
  {
    language: 'French',
    message: 'Bonjour le monde!',
    flags: ['fr', 'ca', 'ch'],
  },
  {
    language: 'Spanish',
    message: '¡Hola Mundo!',
    flags: ['es', 'mx', 'co'],
  },
  {
    language: 'Portuguese',
    message: 'Olá Mundo!',
    flags: ['pt', 'br'],
  },
  {
    language: 'Italian',
    message: 'Ciao mondo!',
    flags: ['it', 'ch'],
  },
  {
    language: 'Dutch',
    message: 'Hallo Wereld!',
    flags: ['nl'],
  },
  {
    language: 'Polish',
    message: 'Witaj świecie!',
    flags: ['pl'],
  },
  {
    language: 'Croatian',
    message: 'Pozdrav svijete!',
    flags: ['hr'],
  },
  {
    language: 'Czech',
    message: 'Ahoj světe!',
    flags: ['cz'],
  },
  {
    language: 'Hungarian',
    message: 'Helló Világ!',
    flags: ['hu'],
  },
  {
    language: 'Finnish',
    message: 'Hei maailma!',
    flags: ['fi'],
  },
  {
    language: 'Swedish',
    message: 'Hej världen!',
    flags: ['se'],
  },
  {
    language: 'Danish',
    message: 'Hej Verden!',
    flags: ['dk'],
  },
  {
    language: 'Greek',
    message: 'Γειά σου Κόσμε',
    flags: ['gr'],
  },
  {
    language: 'Hebrew',
    message: 'שלום עולם',
    flags: ['il'],
  },
  {
    language: 'Russian',
    message: 'Привет мир',
    flags: ['ru'],
  },
  {
    language: 'Ukrainian',
    message: 'Привіт світ',
    flags: ['ua'],
  },
  {
    language: 'Hindi',
    message: 'नमस्ते विश्व',
    flags: ['in'],
  },
  {
    language: 'Gujarati',
    message: 'નમસ્તે વિશ્વ',
    flags: ['in'],
  },
  {
    language: 'Tamil',
    message: 'வணக்கம் உலகம்',
    flags: ['in'],
  },
  {
    language: 'Thai',
    message: 'สวัสดีชาวโลก',
    flags: ['th'],
  },
  {
    language: 'Arabic',
    message: 'مرحبا بالعالم',
    flags: ['eg', 'ae', 'jo'],
  },
  {
    language: 'Turkish',
    message: 'Selam Dünya!',
    flags: ['tr'],
  },
  {
    language: 'Filipino',
    message: 'Kumusta Mundo!',
    flags: ['ph'],
  },
  {
    language: 'Korean',
    message: '안녕하세요 월드',
    flags: ['kr'],
  },
  {
    language: 'Japanese',
    message: 'こんにちは世界',
    flags: ['jp'],
  },
  {
    language: 'Chinese',
    message: '你好 世界',
    flags: ['cn', 'tw'],
  },
  {
    language: 'Vietnamese',
    message: 'Chào thế giới',
    flags: ['vn'],
  },
]

export const FLAGS: string[] = [
  'ae',
  'at',
  'au',
  'br',
  'ca',
  'ch',
  'cn',
  'co',
  'cz',
  'de',
  'dk',
  'eg',
  'es',
  'fi',
  'fr',
  'gb',
  'gr',
  'hr',
  'hu',
  'il',
  'in',
  'it',
  'jo',
  'jp',
  'kr',
  'mx',
  'nl',
  'ph',
  'pl',
  'pt',
  'ru',
  'se',
  'th',
  'tr',
  'tw',
  'ua',
  'us',
  'vn',
]
