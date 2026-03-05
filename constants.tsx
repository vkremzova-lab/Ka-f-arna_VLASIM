
import { MenuItem } from './types';

export const MENU_ITEMS: MenuItem[] = [
  { id: '1', name: 'Espresso', category: 'Classic Coffee', description: 'Intenzivní chuť v malém šálku.', tags: ['short', 'strong', 'classic'] },
  { id: '2', name: 'Lungo', category: 'Classic Coffee', description: 'Prodloužené espresso pro delší požitek.', tags: ['longer', 'classic'] },
  { id: '3', name: 'Cappuccino', category: 'Classic Coffee', description: 'Vyvážený poměr espressa, horkého mléka a bohaté pěny.', tags: ['milky', 'comfort', 'classic'] },
  { id: '4', name: 'Latte', category: 'Classic Coffee', description: 'Jemné mléčné pohlazení s kapkou kávy.', tags: ['creamy', 'large', 'classic'] },
  { id: '5', name: 'Flat White', category: 'Classic Coffee', description: 'Dvojité espresso s mikropěnou. Silnější a krémovější.', tags: ['strong', 'creamy', 'modern'] },
  { id: '6', name: 'Filtrovaná káva', category: 'Classic Coffee', description: 'Čistá chuť výběrové kávy připravená s láskou.', tags: ['clean', 'black', 'aromatic'] },
  { id: '7', name: 'Matcha Latte', category: 'Tea & Others', description: 'Energizující zelený čaj s napěněným mlékem.', tags: ['healthy', 'refreshing', 'green', 'specialty'] },
  { id: '8', name: 'Black Latte', category: 'Winter Specials', description: 'Tajemný nápoj s aktivním uhlím. Stylový a jiný.', tags: ['unique', 'dark', 'specialty'] },
  { id: '9', name: 'Chai Latte', category: 'Tea & Others', description: 'Kořeněný černý čaj s mlékem, který zahřeje na duši.', tags: ['spicy', 'comfort', 'warming'] },
  { id: '10', name: 'Perníčkové Latte', category: 'Winter Specials', description: 'Se šlehačkou a chutí vánoc.', tags: ['sweet', 'festive', 'winter'] },
  { id: '11', name: 'Horká čokoláda', category: 'Winter Specials', description: 'Hustá, tmavá a neodolatelně sladká.', tags: ['sweet', 'heavy', 'comfort'] },
  { id: '12', name: 'Irish Coffee', category: 'Winter Specials', description: 'Klasika s kapkou irské whisky a smetanou.', tags: ['boozy', 'classic', 'strong'] },
  { id: '13', name: 'Baileys Cappuccino', category: 'Winter Specials', description: 'Jemné cappuccino s likérem Baileys.', tags: ['boozy', 'sweet', 'specialty'] },
  { id: '14', name: 'Něco slaďoučkého', category: 'Desserts', description: 'Dnes máme v nabídce různé dobroty. Mrkněte do vitríny nebo se zeptejte obsluhy na aktuální výběr.', tags: ['sweet', 'fresh', 'daily'] },
  { id: '15', name: 'Speciální sezónní nabídka', category: 'Winter Specials', description: 'Máme rádi experimenty! Zeptejte se obsluhy, co speciálního jsme pro vás dnes připravili.', tags: ['experiment', 'seasonal', 'special'] },
];

export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/kafarna_vlasim?igsh=MThsd2ZjcGprM3NqZg==",
  facebook: "https://www.facebook.com/share/16puzxL2R1/?mibextid=wwXIfr",
  hashtag: "#kafarnavlasim"
};

export const OPENING_HOURS = [
  { label: "Pondělí - Pátek", value: "7:30 - 17:00" },
  { label: "Sobota", value: "9:00 - 15:00" },
  { label: "Neděle", value: "ZAVŘENO" }
];

export const FORTUNE_QUOTES = [
  "Dnešní káva chutná po novém začátku.",
  "Úsměv je nejkratší vzdálenost mezi dvěma lidmi. Zkus ho dnes.",
  "Dělej dnes věci, které tě dělají šťastným, ne jen ty, které musíš.",
  "Nečekej na ideální moment, vezmi ten stávající a udělej ho ideálním.",
  "Dnes potkáš někoho, kdo ti zlepší den. Možná je to tvůj barista!",
  "Každý doušek kávy je malá oslava života.",
  "Nejlepší věci v životě nejsou věci. Jsou to chvíle u dobrého kafe.",
  "Tvé dnešní štěstí se skrývá v maličkostech.",
  "Dovol si dnes na chvíli jen tak být.",
  "Dnešek je plný možností. Stačí se jen pořádně napít.",
  "Kávou se nic nezkazí, kávou se den jen zlepší.",
  "Odvaha není v tom, nebát se, ale v tom, jít dál i se strachem... a kávou.",
  "Tvé srdce ví, co potřebuje. Poslouchej ho.",
  "Dnes tě čeká milé překvapení, měj oči otevřené.",
  "Kousek dortu ještě nikoho nezabil, ale udělal ho mnohem šťastnějším.",
  "Každý den je nová šance na dobrou kávu.",
  "Zastav se a nadechni. Svět počká.",
  "Dnešní den bude tak skvělý, jaký si ho uděláš."
];
