export interface GreetingInfo {
  language: string
  message: string
  flags: string[]
}

export interface FlagInfo {
  name: string
  countryName: string
}

export const GREETINGS: GreetingInfo[] = [
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
    message: 'Γειά σου Κόσμε!',
    flags: ['gr'],
  },
  {
    language: 'Hebrew',
    message: '!שלום עולם',
    flags: ['il'],
  },
  {
    language: 'Russian',
    message: 'Привет мир!',
    flags: ['ru', 'ua'],
  },
  {
    language: 'Ukrainian',
    message: 'Привіт світ!',
    flags: ['ua'],
  },
  {
    language: 'Hindi',
    message: 'नमस्ते विश्व!',
    flags: ['in'],
  },
  {
    language: 'Gujarati',
    message: 'નમસ્તે વિશ્વ!',
    flags: ['in'],
  },
  {
    language: 'Tamil',
    message: 'வணக்கம் உலகம்!',
    flags: ['in'],
  },
  {
    language: 'Thai',
    message: 'สวัสดีชาวโลก!',
    flags: ['th'],
  },
  {
    language: 'Arabic',
    message: '!مرحبا بالعالم',
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
    message: '안녕하세요 월드!',
    flags: ['kr'],
  },
  {
    language: 'Japanese',
    message: 'こんにちは世界!',
    flags: ['jp'],
  },
  {
    language: 'Chinese',
    message: '你好 世界!',
    flags: ['cn', 'tw'],
  },
  {
    language: 'Vietnamese',
    message: 'Chào thế Giới!',
    flags: ['vn'],
  },
]

export const FLAGS: FlagInfo[] = [
  { name: 'us', countryName: 'United States of America' },
  { name: 'gb', countryName: 'United Kingdom' },

  { name: 'fr', countryName: 'France' },
  { name: 'ca', countryName: 'Canada' },

  { name: 'au', countryName: 'Australia' },

  { name: 'it', countryName: 'Italy' },

  { name: 'de', countryName: 'Germany' },
  { name: 'at', countryName: 'Austria' },
  { name: 'ch', countryName: 'Switzerland' },

  { name: 'es', countryName: 'Spain' },
  { name: 'mx', countryName: 'Mexico' },
  { name: 'co', countryName: 'Colombia' },

  { name: 'pt', countryName: 'Portugal' },
  { name: 'br', countryName: 'Brazil' },

  { name: 'eg', countryName: 'Egypt' },
  { name: 'ae', countryName: 'United Arab Emirates' },
  { name: 'jo', countryName: 'Jordan' },

  { name: 'cn', countryName: 'China' },
  { name: 'tw', countryName: 'Taiwan' },

  { name: 'cz', countryName: 'Czechia' },
  { name: 'dk', countryName: 'Denmark' },
  { name: 'fi', countryName: 'Finland' },
  { name: 'gr', countryName: 'Greece' },
  { name: 'hr', countryName: 'Croatia' },
  { name: 'hu', countryName: 'Hungary' },
  { name: 'il', countryName: 'Israel' },
  { name: 'in', countryName: 'India' },
  { name: 'jp', countryName: 'Japan' },
  { name: 'kr', countryName: 'South Korea' },
  { name: 'nl', countryName: 'Netherlands' },
  { name: 'ph', countryName: 'Philippines' },
  { name: 'pl', countryName: 'Poland' },
  { name: 'ru', countryName: 'Russia' },
  { name: 'se', countryName: 'Sweden' },
  { name: 'th', countryName: 'Thailand' },
  { name: 'tr', countryName: 'Turkey' },
  { name: 'ua', countryName: 'Ukraine' },
  { name: 'vn', countryName: 'Vietnam' },
]
