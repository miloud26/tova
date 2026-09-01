import React, { useEffect, useMemo, useRef, useState } from "react";

import { Box, Typography, TextField, Button } from "@mui/material";
import { data } from "../data.js";

const wilayaCommuneInfo = [
  {
    id: "",
    name: "",
    com: "",
  },
  {
    id: 1,
    name: "Adrar",
    com1: "Adrar",
    com2: "Akabli",
    com3: "Aoulef",
    com4: "Bouda",
    com5: "Fenoughil",
    com6: "In Zghmir",
    com7: "Ouled Ahmed Timmi",
    com8: "Reggane ",
    com9: "Sali",
    com10: "Sebaa",
    com11: "Tamantit",
    com12: "Tamest",
    com13: "Tit",
    com14: "Tsabit",
    com15: "Zaouiet Kounta",
  },
  {
    id: 2,
    name: "Chlef",
    com1: "Chlef",
    com2: "Abou El Hassan",
    com3: "Ain Merane",
    com4: "Benairia",
    com5: "Beni Bouattab",
    com6: "Beni Haoua",
    com7: "Beni Rached",
    com8: "Boukadir ",
    com9: "Bouzeghaia",
    com10: "Breira",
    com11: "Chettia",
    com12: "Dahra",
    com13: "El Hadjadj",
    com14: "El Karimia",
    com15: "El Marsa",
    com16: "Harchoun",
    com17: "Herenfa",
    com18: "Labiod Medjadja",
    com19: "Moussadek",
    com20: "Oued Fodda",
    com21: "Oued Goussine",
    com22: "Oued Sly",
    com23: "Ouled Abbes",
    com24: "Ouled Ben Abdelkader",
    com25: "Ouled Fares",
    com26: "Oum Drou",
    com27: "Sendjas",
    com28: "Sidi Abderrahmane",
    com29: "Sidi Akkacha",
    com30: "Sobha",
    com31: "Tadjena",
    com32: "Talassa",
    com33: "Taougrite",
    com34: "Tenes",
    com35: "Zeboudja",
  },
  {
    id: 3,
    name: "Laghouat",
    com1: "Aflou",
    com2: "Ain Mahdi",
    com3: "Ain Sidi Ali",
    com4: "Beidha",
    com5: "Benacer Benchohra",
    com6: "Brida ",
    com7: "El Assafia",
    com8: "El Ghicha",
    com9: "El Haouaita",
    com10: "Gueltat Sidi Saad",
    com11: "Hadj Mechri",
    com12: "Hassi Delaa",
    com13: "Hassi R'mel",
    com14: "Kheneg",
    com15: "Ksar El Hirane",
    com16: "Laghouat ",
    com17: "Oued M'zi",
    com18: "Oued Morra",
    com19: "Sebgag ",
    com20: "Sidi Bouzid ",
    com21: "Sidi Makhlouf",
    com22: "Tadjemout",
    com23: "Tadjrouna",
    com24: "Taouiala",
  },
  {
    id: 4,
    name: "Oum El Bouaghi ",
    com1: "Ain Babouche",
    com2: "Ain Beida ",
    com3: "Ain Diss",
    com4: "Ain Fekroune",
    com5: "Ain Kercha",
    com6: "Ain M'lila",
    com7: "Ain Zitoun",
    com8: "Behir Chergui",
    com9: "Berriche",
    com10: "Bir Chouhada",
    com11: "Dhala",
    com12: "El Amiria",
    com13: "El Belala",
    com14: "El Djazia",
    com15: "El Fedjoudj Boughrara Sa",
    com16: "El Harmilia",
    com17: "Fkirina ",
    com18: "Hanchir Toumghani ",
    com19: "Ksar Sbahi",
    com20: "Meskiana",
    com21: "Oued Nini",
    com22: "Ouled Gacem",
    com23: "Ouled Hamla ",
    com24: "Ouled Zouai ",
    com25: "Oum El Bouaghi ",
    com26: "Rahia ",
    com27: "Sigus",
    com28: "Souk Naamane",
    com29: "Zorg",
  },
  {
    id: 5,
    name: "Batna",
    com1: "",
    com2: "Ain Djasser",
    com3: "Ain Touta ",
    com4: "Ain Yagout",
    com5: "Arris",
    com6: "Azil Abedelkader",
    com7: "Barika",
    com8: "Batna",
    com9: "Beni Foudhala El Hakania",
    com10: "Bitam",
    com11: "Boulhilat",
    com12: "Boumagueur",
    com13: "Boumia",
    com14: "Bouzina",
    com15: "Chemora",
    com16: "Chir",
    com17: "Djerma",
    com18: "Djezzar",
    com19: "El Hassi",
    com20: "El Madher",
    com21: "Fesdis",
    com22: "Foum Toub ",
    com23: "Ghassira ",
    com24: "Gosbat",
    com25: "Guigba",
    com26: "Hidoussa",
    com27: "Ichmoul ",
    com28: "Inoughissen",
    com29: "Kimmel",
    com30: "Ksar Bellezma",
    com31: "Larbaa",
    com32: "Lazrou",
    com33: "Lemsane",
    com34: "M Doukal",
    com35: "Maafa",
    com36: "Menaa",
    com37: "Merouana",
    com38: "N Gaous",
    com39: "Oued Chaaba",
    com40: "Oued El Ma",
    com41: "Oued Taga",
    com42: "Ouled Ammar",
    com43: "Ouled Aouf",
    com44: "Ouled Fade",
    com45: "Ouled Sellem",
    com46: "Ouled Si Slimane",
    com47: "Ouyoun El Assafir",
    com48: "Rahbat",
    com49: "Ras El Aioun",
    com50: "Sefiane",
    com51: "Seggana",
    com52: "Seriana",
    com53: "T Kout",
    com54: "Talkhamt",
    com55: "Taxlent",
    com56: "Tazoult",
    com57: "Teniet El Abed",
    com58: "Tighanimine",
    com59: "Tigharghar",
    com60: "Tilatou",
    com61: "Timgad",
    com62: "Zanet El Beida",
  },
  {
    id: 6,
    name: "Bejaia",
    com1: "Adekar",
    com2: "Ait R'zine",
    com3: "Ait Smail",
    com4: "Akbou",
    com5: "Akfadou",
    com6: "Amalou",
    com7: "Amizour",
    com8: "Aokas",
    com9: "Barbacha",
    com10: "Bejaia",
    com11: "Beni Dejllil",
    com12: "Beni K'sila",
    com13: "Beni Mallikeche",
    com14: "Benimaouche",
    com15: "Boudjellil",
    com16: "Bouhamza",
    com17: "Boukhelifa",
    com18: "Chellata",
    com19: "Chemini",
    com20: "Darghina",
    com21: "Dra El Caid",
    com22: "El Kseur",
    com23: "Fenaia Il Maten",
    com24: "Feraoun",
    com25: "Ighil Ali",
    com26: "Ighram",
    com27: "Kendira",
    com28: "Kherrata",
    com29: "Leflaye",
    com30: "M'cisna",
    com31: "Melbou",
    com32: "Oued Ghir",
    com33: "Ouzellaguene",
    com34: "Seddouk",
    com35: "Sidi Aich",
    com36: "Sidi Ayad",
    com37: "Smaoun",
    com38: "Souk El Tenine",
    com39: "Souk Oufella",
    com40: "Tala Hamza",
    com41: "Tamokra",
    com42: "Tamridjet",
    com43: "Taourit Ighil",
    com44: "Taskriout",
    com45: "Tazmalt",
    com46: "Tibane",
    com47: "Tichy",
    com48: "Tifra",
    com49: "Timezrit",
    com50: "Tinebdar",
    com51: "Tizi N'berber",
    com52: "Toudja",
  },
  {
    id: 7,
    name: "Biskra",
    com1: "Ain Naga",
    com2: "Ain Zaatout",
    com3: "Biskra",
    com4: "Bordj Ben Azzouz",
    com5: "Bouchagroun",
    com6: "Branis",
    com7: "Chetma",
    com8: "Djemorah",
    com9: "El Feidh",
    com10: "El Ghrous",
    com11: "El Hadjab",
    com12: "El Haouch",
    com13: "El Kantara",
    com14: "El Outaya",
    com15: "Foughala",
    com16: "Khenguet Sidi Nadji",
    com17: "Lichana",
    com18: "Lioua",
    com19: "M'chouneche",
    com20: "M'lili",
    com21: "Mekhadma",
    com22: "Meziraa",
    com23: "Oumache",
    com24: "Ourlal ",
    com25: "Sidi Okba",
    com26: "Tolga",
    com27: "Zeribet El Oued",
  },
  {
    id: 8,
    name: "Bechar",
    com1: "Abadla",
    com2: "Bechar",
    com3: "Beni Ounif",
    com4: "Boukais",
    com5: "Erg Ferradj",
    com6: "Kenadsa",
    com7: "Lahmar",
    com8: "Mechraa H.boumediene",
    com9: "Meridja",
    com10: "Mogheul",
    com11: "Taghit",
  },
  {
    id: 9,
    name: "Blida",
    com1: "Ain Romana",
    com2: "Beni Mered",
    com3: "Beni Tamou",
    com4: "Benkhelil ",
    com5: "Blida",
    com6: "Bouarfa",
    com7: "Boufarik",
    com8: "Bougara",
    com9: "Bouinan",
    com10: "Chebli",
    com11: "Chiffa",
    com12: "Chrea",
    com13: "Djebabra",
    com14: "El Affroun",
    com15: "Guerrouaou",
    com16: "Hammam Melouane",
    com17: "Larbaa",
    com18: "Meftah",
    com19: "Mouzaia",
    com20: "Oued Djer",
    com21: "Oued El Alleug",
    com22: "Ouled Slama",
    com23: "Ouled Yaich",
    com24: "Souhane",
    com25: "Souma",
  },
  {
    id: 10,
    name: "Bouira",
    com1: "Aghbalou",
    com2: "Ahl El Ksar",
    com3: "Ain Bessem ",
    com4: "Ain El Hadjar",
    com5: "Ain Laloui",
    com6: "Ain Turk",
    com7: "Ait Laaziz",
    com8: "Aomar",
    com9: "Bechloul",
    com10: "Bir Ghbalou",
    com11: "Bordj Okhriss",
    com12: "Bouderbala",
    com13: "Bouira",
    com14: "Boukram",
    com15: "Chorfa",
    com16: "Dechmia",
    com17: "Dirah",
    com18: "Djebahia",
    com19: "El Adjiba",
    com20: "El Asnam",
    com21: "El Hachimia",
    com22: "El Hakimia ",
    com23: "El Khabouzia",
    com24: "El Mokrani ",
    com25: "Guerrouma",
    com26: "Hadjera Zerga",
    com27: "Haizer",
    com29: "Hanif",
    com28: "Kadiria",
    com30: "Lakhdaria",
    com31: "M Chedallah",
    com32: "Maala",
    com33: "Mamora",
    com34: "Mezdour",
    com35: "Oued El Berdi",
    com36: "Ouled Rached",
    com37: "Raouraoua",
    com38: "Ridane",
    com39: "Saharidj",
    com40: "Souk El Khemis",
    com41: "Sour El Ghozlane",
    com42: "Taghzout",
    com43: "Taguedite",
    com44: "Taourirt",
    com45: "Z'barbar",
  },
  {
    id: 11,
    name: "Tamanrasset",
    com1: "Abalessa",
    com2: "Ain Amgue",
    com3: "Idles",
    com4: "Tamanrasset",
    com5: "Tazrouk",
  },
  {
    id: 12,
    name: "Tebessa",
    com1: "Ain Zerga",
    com2: "Bedjene",
    com3: "Bekkaria",
    com4: "Bir Dheheb",
    com5: "Bir El Ater",
    com6: "Bir Mokkadem",
    com7: "Boukhadra",
    com8: "Boulhaf Dyr",
    com9: "Cheria",
    com10: "El Aouinet",
    com11: "El Houidjbet",
    com12: "El Kouif",
    com13: "El Malabiod",
    com14: "El Meridj",
    com15: "El Mezeraa",
    com16: "El Ogla",
    com17: "El Ogla El Malha",
    com18: "Ferkane",
    com19: "Guorriguer",
    com20: "Hammamet",
    com21: "Morssot",
    com22: "Negrine",
    com23: "Ouenza",
    com24: "Oum Ali",
    com25: "Saf Saf El Ouesra",
    com26: "Stah Guentis",
    com27: "Tebessa",
    com28: "Telidjen",
  },
  {
    id: 13,
    name: "Tlemcen",
    com1: "Ain Fettah ",
    com2: "Ain Fezza",
    com3: "Ain Ghoraba",
    com4: "Ain Kebira",
    com5: "Ain Nehala",
    com6: "Ain Tallout",
    com7: "Ain Youcef",
    com8: "Amieur",
    com9: "Azails",
    com10: "Bab El Assa",
    com11: "Beni Bahdel",
    com12: "Beni Boussaid",
    com13: "Beni Khaled",
    com14: "Beni Mester",
    com15: "Beni Ouarsous",
    com16: "Beni Smiel",
    com17: "Beni Snous",
    com18: "Bensekrane",
    com19: "Bouhlou",
    com20: "Bouihi",
    com21: "Chetouane",
    com22: "Dar Yaghmouracene",
    com23: "Djebala",
    com24: "El Aricha",
    com25: "El Fehoul",
    com26: "El Gor",
    com27: "Fellaoucene",
    com28: "Ghazaouet",
    com29: "Hammam Boughrara",
    com30: "Hennaya",
    com100: "Honaine",
    com101: "Maghnia",
    com102: "Mansourah",
    com103: "Marsa Ben M'hidi",
    com104: "Msirda Fouaga",
    com105: "Nedroma",
    com106: "Oued Chouly",
    com107: "Ouled Mimoun",
    com108: "Ouled Riyah",
    com109: "Remchi",
    com110: "Sabra",
    com111: "Sebbaa Chioukh",
    com112: "Sebdou",
    com113: "Sidi Abdelli ",
    com114: "Sidi Djilali",
    com115: "Sidi Medjahed",
    com1116: "Souahlia",
    com117: "Souani",
    com118: "Souk Tleta",
    com119: "Terny Beni Hediel",
    com120: "Tianet",
    com122: "Tlemcen",
    com123: "Zenata",
  },
  {
    id: 14,
    name: "Tiaret",
    com1: "Ain Bouchekif ",
    com2: "Ain Deheb",
    com3: "Ain El Hadid",
    com4: "Ain Kermes",
    com5: "Ain Zarit",
    com6: "Bougara",
    com7: "Chehaima",
    com8: "Dahmouni",
    com9: "Djebilet Rosfa",
    com10: "Djillali Ben Amar",
    com11: "Faidja",
    com12: "Frenda",
    com13: "Guertoufa",
    com14: "Hamadia",
    com15: "Ksar Chellala",
    com16: "Madna",
    com17: "Mahdia",
    com18: "Mechraa Safa",
    com19: "Medrissa",
    com20: "Medroussa",
    com21: "Meghila",
    com22: "Mellakou",
    com23: "Nadorah",
    com24: "Naima",
    com25: "Oued Lilli ",
    com26: "Rahouia",
    com27: "Rechaiga",
    com28: "Sebaine",
    com29: "Sebt",
    com30: "Serghine",
    com31: "Si Abdelghani",
    com32: "Sidi Abderrahmane",
    com33: "Sidi Ali Mellal",
    com34: "Sidi Bakhti",
    com35: "Sidi Hosni",
    com36: "Sougueur",
    com37: "Tagdemt",
    com38: "Takhemaret",
    com39: "Tiaret",
    com40: "Tidda",
    com41: "Tousnina",
    com42: "Zmalet El Emir Abdelkade",
  },
  {
    id: 15,
    name: "Tizi Ouzou",
    com1: "Abi Youcef",
    com2: "Aghribs",
    com3: "Agouni Gueghrane",
    com4: "Ain El Hammam",
    com5: "Ain Zaouia",
    com6: "Ait Aggouacha",
    com7: "Ait Bouaddou",
    com8: "Ait Boumehdi",
    com9: "Ait Chafaa",
    com10: "Ait Khellili ",
    com11: "Ait Mahmoud ",
    com12: "Ait Oumalou",
    com13: "Ait Toudert",
    com14: "Ait Yahia",
    com15: "Ait Yahia Moussa",
    com16: "Akbil",
    com17: "Akerrou",
    com18: "Assi Youcef",
    com19: "Azazga ",
    com21: "Azeffoun",
    com22: "Beni Aissi ",
    com23: "Beni Douala ",
    com24: "Beni Yenni",
    com25: "Beni Zikki",
    com26: "Beni Zmenzer",
    com27: "Boghni",
    com28: "Boudjima",
    com29: "Bounouh",
    com30: "Bouzeguene",
    com31: "Djebel Aissa Mimoun",
    com32: "Draa Ben Khedda",
    com33: "Draa El Mizan",
    com34: "Freha",
    com35: "Frikat",
    com36: "Iboudrarene",
    com37: "Idjeur",
    com38: "Iferhounene",
    com39: "Ifigha",
    com40: "Iflissen",
    com41: "Illilten",
    com42: "Illoula Oumalou",
    com43: "Imsouhal",
    com44: "Irdjen",
    com45: "Larba Nath Irathen",
    com46: "Larbaa Nath Irathen",
    com47: "M'kira ",
    com48: "Maatkas",
    com49: "Makouda",
    com50: "Mechtras",
    com51: "Mekla",
    com52: "Mizrana",
    com53: "Ouacif",
    com54: "Ouadhias",
    com55: "Ouaguenoune",
    com56: "Sidi Naamane",
    com57: "Souamaa",
    com58: "Souk El Thenine",
    com59: "Tadmait",
    com60: "Tigzirt",
    com61: "Timizart",
    com62: "Tirmitine",
    com63: "Tizi Ghenif",
    com64: "Tizi N'tleta",
    com65: "Tizi Ouzou",
    com66: "Tizi Rached",
    com67: "Yakourene",
    com68: "Yatafene",
    com69: "Zekri",
  },
  {
    id: 16,
    name: "Alger",
    com1: "Ain Benian",
    com2: "Ain Taya",
    com3: "Alger",
    com4: "Bab El Oued",
    com5: "Bab Ezzouar",
    com6: "Baba Hesen",
    com7: "Bachedjerah",
    com8: "Bains Romains",
    com9: "Baraki",
    com10: "Ben Aknoun",
    com11: "Beni Messous",
    com12: "Bir Mourad Rais",
    com13: "Bir Touta",
    com14: "Birkhadem",
    com15: "Bologhine Ibnou Ziri",
    com16: "Bordj El Bahri",
    com17: "Bordj El Kiffan",
    com18: "Bourouba",
    com19: "Bouzareah",
    com20: "Casbah",
    com21: "Cheraga",
    com22: "Dar El Beida",
    com23: "Dely Ibrahim",
    com24: "Djasr Kasentina",
    com25: "Douira",
    com26: "Draria",
    com27: "El Achour",
    com28: "El Biar",
    com29: "El Harrach",
    com30: "El Madania",
    com31: "El Magharia",
    com32: "El Merssa",
    com33: "El Mouradia",
    com34: "Herraoua ",
    com35: "Hussein Dey",
    com36: "Hydra",
    com37: "Kheraisia",
    com38: "Kouba",
    com39: "Les Eucalyptus",
    com40: "Maalma",
    com41: "Mohamed Belouzdad",
    com42: "Mohammadia",
    com43: "Oued Koriche",
    com44: "Oued Smar",
    com45: "Ouled Chebel",
    com46: "Ouled Fayet",
    com47: "Rahmania",
    com48: "Rais Hamidou",
    com49: "Reghaia",
    com50: "Rouiba",
    com51: "Sehaoula",
    com52: "Setaouali",
    com53: "Sidi M'hamed",
    com54: "Sidi Moussa",
    com55: "Souidania",
    com56: "Tessala El Merdja",
    com57: "Zeralda",
  },
  {
    id: 17,
    name: "Djelfa",
    com1: "Ain Chouhada ",
    com2: "Ain El Ibel",
    com3: "Ain Fekka",
    com4: "Ain Maabed",
    com5: "Ain Oussera",
    com6: "Amourah",
    com7: "Benhar",
    com8: "Benyagoub",
    com9: "Birine",
    com10: "Bouira Lahdab",
    com11: "Charef",
    com12: "Dar Chioukh",
    com13: "Deldoul",
    com14: "Djelfa",
    com15: "Douis",
    com16: "El Guedid",
    com17: "El Idrissia",
    com18: "El Khemis",
    com19: "Faidh El Botma",
    com20: "Guernini",
    com21: "Guettara",
    com22: "Had Sahary",
    com23: "Hassi Bahbah",
    com24: "Hassi El Euch",
    com25: "Hassi Fedoul",
    com26: "M Liliha",
    com27: "Messaad",
    com28: "Moudjebara",
    com29: "Oum Laadham",
    com30: "Sed Rahal",
    com31: "Selmana",
    com32: "Sidi Baizid ",
    com33: "Sidi Ladjel",
    com34: "Tadmit",
    com35: "Zaafrane",
    com36: "Zaccar",
  },
  {
    id: 18,
    name: "Jijel ",
    com1: "Bordj Tahar",
    com2: "Boudria Beniyadjis",
    com3: "Bouraoui Belhadef",
    com4: "Boussif Ouled Askeur",
    com5: "Chahna",
    com6: "Chekfa",
    com7: "Djemaa Beni Habibi",
    com8: "Djimla",
    com9: "El Ancer",
    com10: "El Aouana",
    com11: "El Kennar Nouchfi",
    com12: "El Milia",
    com13: "Emir Abdelkader",
    com14: "Erraguene",
    com15: "Ghebala",
    com16: "Jijel",
    com17: "Khiri Oued Adjoul",
    com18: "Kouas",
    com19: "Oudjana",
    com20: "Ouled Rabah",
    com21: "Ouled Yahia Khadrouch",
    com22: "Selma Benziada",
    com23: "Settara",
    com24: "Sidi Abdelaziz",
    com25: "Sidi Marouf",
    com26: "Taher",
    com27: "Texena",
    com28: "Ziama Mansouria",
  },
  {
    id: 19,
    name: "Setif",
    com1: "Ain Abessa",
    com2: "Ain Arnat",
    com3: "Ain Azel",
    com4: "Ain El Kebira",
    com5: "Ain Lahdjar",
    com6: "Ain Legradj",
    com7: "Ain Oulmane",
    com8: "Ain Roua",
    com9: "Ain Sebt",
    com10: "Ait Naoual Mezada",
    com11: "Ait Tizi",
    com12: "Amoucha",
    com13: "Babor",
    com14: "Bazer Sakra",
    com15: "Beidha Bordj",
    com16: "Bellaa",
    com17: "Beni Aziz",
    com18: "Beni Chebana",
    com19: "Beni Fouda",
    com20: "Beni Mouhli",
    com21: "Beni Ouartilane",
    com22: "Beni Oussine",
    com23: "Bir El Arch",
    com24: "Bir Haddada",
    com25: "Bouandas",
    com26: "Bougaa",
    com27: "Bousselam",
    com28: "Boutaleb",
    com29: "Dehamcha",
    com30: "Djemila",
    com31: "Draa Kebila",
    com32: "El Eulma",
    com33: "El Ouldja",
    com34: "El Ouricia",
    com35: "Guellal",
    com36: "Guelta Zerka",
    com37: "Guenzet",
    com38: "Guidjel",
    com39: "Hamam Soukhna",
    com40: "Hamma",
    com41: "Hammam Guergour",
    com42: "Harbil",
    com43: "Ksar El Abtal",
    com44: "Maaouia",
    com45: "Maouaklane",
    com46: "Mezloug",
    com47: "Oued El Barad",
    com48: "Ouled Addouane",
    com49: "Ouled Sabor",
    com50: "Ouled Si Ahmed",
    com51: "Ouled Tebben",
    com52: "Rosfa",
    com53: "Salah Bey",
    com54: "Serdj El Ghoul",
    com55: "Setif",
    com56: "Tachouda",
    com57: "Tala Ifacene",
    com58: "Taya",
    com59: "Tella",
    com60: "Tizi N'bechar",
  },
  {
    id: 20,
    name: "Saida",
    com1: "Ain El Hadjar",
    com2: "Ain Sekhouna",
    com3: "Ain Soltane",
    com4: "Doui Thabet",
    com5: "El Hassasna",
    com6: "Hounet",
    com7: "Maamora",
    com8: "Moulay Larbi",
    com9: "Ouled Brahim",
    com10: "Ouled Khaled",
    com11: "Saida",
    com12: "Sidi Ahmed",
    com13: "Sidi Amar",
    com14: "Sidi Boubekeur",
    com15: "Tircine",
    com16: "Youb",
  },
  {
    id: 21,
    name: "Skikda",
    com1: "Ain Bouziane",
    com2: "Ain Charchar",
    com3: "Ain Kechera",
    com4: "Ain Zouit",
    com5: "Azzaba",
    com6: "Bekkouche Lakhdar",
    com7: "Ben Azzouz",
    com8: "Beni Bechir",
    com9: "Beni Oulbane",
    com10: "Beni Zid",
    com11: "Bin El Ouiden",
    com12: "Bouchetata",
    com13: "Cheraia",
    com14: "Collo",
    com15: "Djendel Saadi Mohamed",
    com16: "El Arrouch",
    com17: "El Ghedir",
    com18: "El Hadaiek",
    com19: "El Marsa",
    com20: "Emjez Edchich",
    com21: "Es Sebt",
    com22: "Filfila",
    com23: "Hamadi Krouma",
    com24: "Kanoua",
    com25: "Kerkera",
    com26: "Khenag Mayoum",
    com27: "Oued Zhour",
    com28: "Ouldja Boulbalout",
    com29: "Ouled Attia",
    com30: "Ouled Habbeba",
    com31: "Oum Toub",
    com32: "Ramdane Djamel",
    com33: "Salah Bouchaour",
    com34: "Sidi Mezghiche",
    com35: "Skikda",
    com36: "Tamalous",
    com37: "Zerdezas",
    com38: "Zitouna",
  },
  {
    id: 22,
    name: "Sidi Bel Abbes ",
    com1: "Ain Adden",
    com2: "Ain El Berd",
    com3: "Ain Kada",
    com4: "Ain Thrid",
    com5: "Ain Tindamine",
    com6: "Amarnas",
    com7: "Badredine El Mokrani",
    com8: "Belarbi",
    com9: "Ben Badis",
    com10: "Benachiba Chelia",
    com11: "Bir El Hammam",
    com12: "Boudjebaa El Bordj",
    com13: "Boukhanafis",
    com14: "Chetouane Belaila",
    com15: "Dhaya",
    com16: "El Hacaiba",
    com17: "Hassi Dahou",
    com18: "Hassi Zahana",
    com19: "Lamtar",
    com20: "M'cid",
    com21: "Makedra",
    com22: "Marhoum",
    com23: "Merine",
    com24: "Mezaourou",
    com25: "Mostefa Ben Brahim",
    com26: "Moulay Slissen",
    com27: "Oued Sebaa",
    com28: "Oued Sefioun",
    com29: "Oued Taourira",
    com30: "Ras El Ma",
    com31: "Redjem Demouche",
    com32: "Sehala Thaoura",
    com33: "Sfissef",
    com34: "Sidi Ali Benyoub",
    com35: "Sidi Ali Boussidi",
    com36: "Sidi Bel Abbes",
    com37: "Sidi Brahim",
    com38: "Sidi Chaib",
    com39: "Sidi Dahou Zairs",
    com40: "Sidi Hamadouche",
    com41: "Sidi Khaled",
    com42: "Sidi Lahcene",
    com43: "Sidi Yacoub",
    com44: "Tabia",
    com45: "Tafissour",
    com46: "Taoudmout",
    com47: "Teghalimet",
    com48: "Telagh",
    com49: "Tenira",
    com50: "Tessala",
    com51: "Tilmouni",
    com52: "Zerouala",
  },
  {
    id: 24,
    name: "Guelma",
    com1: "Ain Ben Beida",
    com2: "Ain Hessania",
    com3: "Ain Larbi",
    com4: "Ain Makhlouf",
    com5: "Ain Reggada",
    com6: "Belkheir",
    com7: "Ben Djarah",
    com8: "Beni Mezline",
    com9: "Bordj Sabat",
    com10: "Bou Hachana",
    com11: "Bou Hamdane",
    com12: "Bouati Mahmoud",
    com13: "Bouchegouf",
    com14: "Bouhamra Ahmed",
    com15: "Dahouara",
    com16: "Djeballah Khemissi",
    com17: "El Fedjoudj",
    com18: "Guelaat Bou Sbaa",
    com19: "Guelma",
    com20: "Hamam Debagh",
    com21: "Hammam N'bail",
    com22: "Heliopolis",
    com23: "Khezara",
    com24: "Medjez Amar",
    com25: "Medjez Sfa",
    com26: "Nechmaya",
    com27: "Oued Cheham",
    com28: "Oued Fragha",
    com29: "Oued Zenati",
    com30: "Ras El Agba",
    com31: "Roknia",
    com32: "Sellaoua Announa",
    com33: "Sidi Sandel",
    com34: "Tamlouka",
  },
  {
    id: 23,
    name: "Annaba",
    com1: "Ain Berda",
    com2: "Annaba",
    com3: "Berrahel",
    com4: "Chetaibi",
    com5: "Cheurfa",
    com6: "El Bouni",
    com7: "El Hadjar",
    com8: "Eulma",
    com9: "Oued El Aneb",
    com10: "Seraidi",
    com11: "Sidi Amar",
    com12: "Treat",
  },
  {
    id: 25,
    name: "Constantine",
    com1: "Ain Abid",
    com2: "Ain Smara",
    com3: "Ben Badis",
    com4: "Beni Hamidene",
    com5: "Constantine",
    com6: "Didouche Mourad",
    com7: "El Khroub",
    com8: "Hamma Bouziane",
    com9: "Ibn Ziad",
    com10: "Messaoud Boujeriou",
    com11: "Ouled Rahmouni",
    com12: "Zighoud Youcef",
  },
  {
    id: 26,
    name: "Medea",
    com1: "Ain Boucif",
    com2: "Ain Ouksir",
    com3: "Aissaouia",
    com4: "Aziz",
    com5: "Baata",
    com6: "Ben Chicao",
    com7: "Beni Slimane",
    com8: "Berrouaghia",
    com9: "Bir Ben Laabed",
    com10: "Boghar",
    com11: "Bouaiche",
    com12: "Bouaichoune",
    com13: "Bouchrahil",
    com14: "Boughzoul",
    com15: "Bouskene",
    com16: "Chabounia",
    com17: "Chelalet El Adhaoura",
    com18: "Cheniguel",
    com19: "Damiat",
    com20: "Derrag",
    com21: "Deux Bassins",
    com22: "Djouab",
    com23: "Draa Essamar",
    com24: "El Azizia",
    com25: "El Guelbelkebir",
    com26: "El Hamdania",
    com27: "El Omaria",
    com28: "El Ouinet",
    com29: "Hannacha",
    com30: "Kef Lakhdar",
    com31: "Khams Djouamaa",
    com32: "Ksar El Boukhari",
    com33: "Maghraoua",
    com34: "Medea",
    com35: "Medjebar",
    com36: "Meftaha",
    com37: "Mezerana",
    com38: "Mihoub",
    com39: "Ouamri",
    com40: "Oued Harbil",
    com41: "Ouled Antar",
    com42: "Ouled Bouachra",
    com43: "Ouled Brahim",
    com44: "Ouled Deid",
    com45: "Ouled Hellal",
    com46: "Ouled Maaref",
    com47: "Oum El Djellil",
    com48: "Ouzera",
    com49: "Rebaia",
    com50: "Saneg",
    com51: "Sedraya",
    com52: "Seghouane",
    com53: "Si Mahdjoub",
    com54: "Sidi Demed",
    com55: "Sidi Naamane",
    com56: "Sidi Rabie",
    com57: "Sidi Zahar",
    com58: "Sidi Ziane",
    com59: "Souagui",
    com60: "Tablat",
    com61: "Tafraout",
    com62: "Tamesguida",
    com63: "Tletat Ed Douair",
    com64: "Zoubiria",
  },
  {
    id: 27,
    name: "Mostaganem",
    com1: "Achaacha",
    com2: "Ain Boudinar",
    com3: "Ain Nouissy",
    com4: "Ain Sidi Cherif",
    com5: "Ain Tedles",
    com6: "Benabdelmalek Ramdane",
    com7: "Bouguirat",
    com8: "Fornaka",
    com9: "Hadjadj",
    com10: "Hassi Mameche",
    com11: "Hassiane",
    com12: "Khadra",
    com13: "Kheir Eddine",
    com14: "Mansourah",
    com15: "Mazagran",
    com16: "Mesra",
    com17: "Mostaganem",
    com18: "Nekmaria",
    com19: "Oued El Kheir",
    com20: "Ouled Boughalem",
    com21: "Ouled Maalah",
    com22: "Safsaf",
    com23: "Sayada",
    com24: "Sidi Ali",
    com25: "Sidi Belaattar",
    com26: "Sidi Lakhdar",
    com27: "Sirat",
    com28: "Souaflia",
    com29: "Sour",
    com30: "Stidia",
    com31: "Tazgait",
    com32: "Touahria",
  },
  {
    id: 28,
    name: "M'sila",
    com1: "Ain El Hadjel",
    com2: "Ain El Melh",
    com3: "Ain Fares",
    com4: "Ain Khadra",
    com5: "Ain Rich",
    com6: "Belaiba",
    com7: "Ben Srour",
    com8: "Beni Ilmane",
    com9: "Benzouh",
    com10: "Berhoum",
    com11: "Bir Foda",
    com12: "Bou Saada",
    com13: "Bouti Sayeh",
    com14: "Chellal",
    com15: "Dehahna",
    com16: "Djebel Messaad",
    com17: "El Hamel",
    com18: "El Houamed",
    com19: "Hammam Dalaa",
    com20: "Khettouti Sed El Jir",
    com21: "Khoubana",
    com22: "M'cif",
    com23: "M'sila",
    com24: "M'tarfa",
    com25: "Maadid",
    com26: "Maarif",
    com27: "Magra",
    com28: "Medjedel",
    com29: "Menaa",
    com30: "Mohamed Boudiaf",
    com31: "Ouanougha",
    com32: "Ouled Addi Guebala",
    com33: "Ouled Derradj",
    com34: "Ouled Madhi",
    com35: "Ouled Mansour",
    com36: "Ouled Sidi Brahim",
    com37: "Ouled Slimane",
    com38: "Oulteme",
    com39: "Sidi Aissa",
    com40: "Sidi Ameur",
    com41: "Sidi Hadjeres",
    com42: "Sidi M'hamed",
    com43: "Slim",
    com44: "Souamaa",
    com45: "Tamsa",
    com46: "Tarmount",
    com47: "Zarzour",
  },
  {
    id: 29,
    name: "Mascara",
    com1: "Ain Fares",
    com2: "Ain Fekan",
    com3: "Ain Ferah",
    com4: "Ain Frass",
    com5: "Alaimia",
    com6: "Aouf",
    com7: "Benian",
    com8: "Bou Henni",
    com9: "Bouhanifia",
    com10: "Chorfa",
    com11: "El Bordj",
    com12: "El Gaada",
    com13: "El Ghomri",
    com14: "El Gueitena",
    com15: "El Hachem",
    com16: "El Keurt",
    com17: "El Mamounia",
    com18: "El Menaouer",
    com19: "Ferraguig",
    com20: "Froha",
    com21: "Gharrous",
    com22: "Ghriss",
    com23: "Guerdjoum",
    com24: "Hacine",
    com25: "Khalouia",
    com26: "Makhda",
    com27: "Maoussa",
    com28: "Mascara",
    com29: "Matemore",
    com30: "Mocta Douz",
    com31: "Mohammadia",
    com32: "Nesmot",
    com33: "Oggaz",
    com34: "Oued El Abtal",
    com35: "Oued Taria",
    com36: "Ras El Ain Amirouche",
    com37: "Sedjerara",
    com38: "Sehailia",
    com39: "Sidi Abdeldjebar",
    com40: "Sidi Abdelmoumene",
    com41: "Sidi Boussaid",
    com42: "Sidi Kada",
    com43: "Sig",
    com44: "Tighennif",
    com45: "Tizi",
    com46: "Zahana",
    com47: "Zelamta",
  },
  {
    id: 30,
    name: "Ouargla",
    com1: "Ain Beida",
    com2: "Hassi Ben Abdellah",
    com3: "Hassi Messaoud",
    com4: "N'goussa",
    com5: "Ouargla",
    com6: "Rouissat",
    com7: "Sidi Khouiled",
  },
  {
    id: 31,
    name: "Oran",
    com1: "Ain Biya",
    com2: "Ain Kerma",
    com3: "Ain Turk",
    com4: "Arzew",
    com5: "Ben Freha",
    com6: "Bethioua",
    com7: "Bir El Djir",
    com8: "Boufatis",
    com9: "Bousfer",
    com10: "Boutlelis",
    com11: "El Ancar",
    com12: "El Braya",
    com13: "El Kerma",
    com14: "Es Senia",
    com15: "Gdyel",
    com16: "Hassi Ben Okba",
    com17: "Hassi Bounif",
    com18: "Hassi Mefsoukh",
    com19: "Marsat El Hadjadj",
    com20: "Mers El Kebir",
    com21: "Messerghin",
    com22: "Oran",
    com23: "Oued Tlelat",
    com24: "Sidi Ben Yebka",
    com25: "Sidi Chami",
    com26: "Tafraoui",
  },
  {
    id: 32,
    name: "El Bayadh",
    com1: "Ain El Orak ",
    com2: "Arbaouat",
    com3: "Boualem",
    com4: "Bougtoub",
    com5: "Boussemghoun",
    com6: "Brezina",
    com7: "Cheguig",
    com8: "Chellala",
    com9: "El Bayadh",
    com10: "El Biodh Sidi Cheikh",
    com11: "El Bnoud",
    com12: "El Kheither",
    com13: "El Mehara",
    com14: "Ghassoul",
    com15: "Kef El Ahmar",
    com16: "Krakda",
    com17: "Rogassa",
    com18: "Sidi Ameur",
    com19: "Sidi Slimane",
    com20: "Sidi Tifour",
    com21: "Stitten",
    com22: "Tousmouline",
  },
  {
    id: 33,
    name: "Illizi",
    com1: "Debdeb",
    com2: "Illizi",
    com3: "In Amenas",
    com4: "Bordj Omar Driss",
  },
  {
    id: 34,
    name: "Bordj Bou Arreridj ",
    com1: "Ain Taghrout",
    com2: "Ain Tesra",
    com3: "Belimour",
    com4: "Ben Daoud",
    com5: "Bir Kasdali",
    com6: "Bordj Bou Arreridj",
    com7: "Bordj Ghdir",
    com8: "Bordj Zemora",
    com9: "Colla",
    com10: "Djaafra",
    com11: "El Ach",
    com12: "El Achir",
    com13: "El Anseur",
    com14: "El Hamadia",
    com15: "El M'hir",
    com16: "El Main",
    com17: "Ghilassa",
    com18: "Haraza",
    com19: "Hasnaoua",
    com20: "Khelil",
    com21: "Ksour",
    com22: "Mansoura",
    com23: "Medjana",
    com24: "Ouled Brahem",
    com25: "Ouled Dahmane",
    com26: "Ouled Sidi Brahim",
    com27: "Rabta",
    com28: "Ras El Oued",
    com29: "Sidi Embarek",
    com30: "Tafreg",
    com31: "Taglait",
    com32: "Teniet En Nasr",
    com33: "Tesmart",
    com34: "Tixter",
  },
  {
    id: 35,
    name: "Boumerdes",
    com1: "Afir",
    com2: "Ammal",
    com3: "Baghlia",
    com4: "Ben Choud",
    com5: "Beni Amrane",
    com6: "Bordj Menaiel",
    com7: "Boudouaou",
    com8: "Boudouaou El Bahri",
    com9: "Boumerdes",
    com10: "Bouzegza Keddara",
    com11: "Chabet El Ameur",
    com12: "Corso",
    com13: "Dellys",
    com14: "Djinet",
    com15: "El Kharrouba",
    com16: "Hammedi",
    com17: "Isser",
    com18: "Khemis El Khechna",
    com19: "Larbatache",
    com20: "Leghata",
    com21: "Naciria",
    com22: "Ouled Aissa",
    com23: "Ouled Hedadj",
    com24: "Ouled Moussa",
    com25: "Si Mustapha",
    com26: "Sidi Daoud",
    com27: "Souk El Haad",
    com28: "Taourga",
    com29: "Thenia",
    com30: "Tidjelabine",
    com31: "Timezrit",
    com32: "Zemmouri",
  },
  {
    id: 36,
    name: "El Tarf",
    com1: "Ain El Assel",
    com2: "Ain Kerma",
    com3: "Asfour",
    com4: "Ben M Hidi",
    com5: "Berrihane",
    com6: "Besbes",
    com7: "Bougous",
    com8: "Bouhadjar",
    com9: "Bouteldja",
    com10: "Chebaita Mokhtar",
    com11: "Chefia",
    com12: "Chihani",
    com13: "Drean",
    com14: "Echatt",
    com15: "El Aioun",
    com16: "El Kala",
    com17: "El Tarf",
    com18: "Hammam Beni Salah",
    com19: "Lac Des Oiseaux",
    com20: "Oued Zitoun",
    com21: "Raml Souk",
    com22: "Souarekh",
    com23: "Zerizer",
    com24: "Zitouna",
  },
  {
    id: 37,
    name: "Tindouf",
    com1: "Oum El Assel",
    com2: "Tindouf",
  },
  {
    id: 38,
    name: "Tissemsilt",
    com1: "Ammari",
    com2: "Beni Chaib",
    com3: "Beni Lahcene",
    com4: "Bordj Bounaama",
    com5: "Bordj El Emir Abdelkader",
    com6: "Bou Caid",
    com7: "Khemisti",
    com8: "Larbaa",
    com9: "Lardjem",
    com10: "Layoune",
    com11: "Lazharia",
    com12: "Maacem",
    com13: "Melaab",
    com14: "Ouled Bessem",
    com15: "Sidi Abed",
    com16: "Sidi Boutouchent",
    com17: "Sidi Lantri",
    com18: "Sidi Slimane",
    com19: "Tamellalet",
    com20: "Theniet El Had",
    com21: "Tissemsilt",
    com22: "Youssoufia",
  },
  {
    id: 39,
    name: "El Oued",
    com1: "Bayadha",
    com2: "Ben Guecha",
    com3: "Debila",
    com4: "Douar El Maa",
    com5: "El Ogla",
    com6: "El Oued",
    com7: "Guemar",
    com8: "Hamraia",
    com9: "Hassani Abdelkrim",
    com10: "Hassi Khalifa",
    com11: "Kouinine",
    com12: "Magrane",
    com13: "Mih Ouansa",
    com14: "Nakhla",
    com15: "Oued El Alenda",
    com16: "Ourmes",
    com17: "Reguiba",
    com18: "Robbah",
    com19: "Sidi Aoun",
    com20: "Taghzout",
    com21: "Taleb Larbi",
    com22: "Trifaoui",
  },
  {
    id: 40,
    name: "Khenchela",
    com1: "Ain Touila",
    com2: "Babar",
    com3: "Baghai",
    com4: "Bouhmama",
    com5: "Chelia",
    com6: "Cherchar",
    com7: "Djellal",
    com8: "El Hamma",
    com9: "El Mahmal",
    com10: "El Oueldja",
    com11: "Ensigha",
    com12: "Kais",
    com13: "Khenchela",
    com14: "Khirane",
    com15: "M'sara",
    com16: "M'toussa",
    com17: "Ouled Rechache",
    com18: "Remila",
    com19: "Tamza",
    com20: "Taouzianat",
    com21: "Yabous",
  },
  {
    id: 41,
    name: "Souk Ahras",
    com1: "Ain Soltane",
    com2: "Ain Zana",
    com3: "Bir Bouhouche",
    com4: "Drea",
    com5: "Haddada",
    com6: "Hanencha",
    com7: "Khedara",
    com8: "Khemissa",
    com9: "M'daourouche",
    com10: "Machroha",
    com11: "Merahna",
    com12: "Oued Kebrit",
    com13: "Ouled Driss",
    com14: "Ouled Moumen",
    com15: "Oum El Adhaim",
    com16: "Quillen",
    com17: "Ragouba",
    com18: "Safel El Ouiden",
    com19: "Sedrata",
    com20: "Sidi Fredj",
    com21: "Souk Ahras",
    com22: "Taoura",
    com23: "Terraguelt",
    com24: "Tiffech",
    com25: "Zaarouria",
    com26: "Zouabi",
  },
  {
    id: 42,
    name: "Tipaza",
    com1: "Aghbal",
    com2: "Ahmer El Ain",
    com3: "Ain Tagourait",
    com4: "Attatba",
    com5: "Beni Mileuk",
    com6: "Bou Haroun",
    com7: "Bou Ismail",
    com8: "Bourkika",
    com9: "Chaiba",
    com10: "Cherchell",
    com11: "Damous",
    com12: "Douaouda",
    com13: "Fouka",
    com14: "Gouraya",
    com15: "Hadjout",
    com16: "Hadjret Ennous",
    com17: "Khemisti",
    com18: "Kolea",
    com19: "Larhat",
    com20: "Menaceur",
    com21: "Merad",
    com22: "Messelmoun",
    com23: "Nador",
    com24: "Sidi Amar",
    com25: "Sidi Ghiles",
    com26: "Sidi Rached",
    com27: "Sidi Semiane",
    com28: "Tipaza",
  },
  {
    id: 43,
    name: "Mila",
    com1: "Ahmed Rachedi",
    com2: "Ain Beida Harriche",
    com3: "Ain Mellouk",
    com4: "Ain Tine",
    com5: "Amira Arres",
    com6: "Benyahia Abderrahmane",
    com7: "Bouhatem",
    com8: "Chelghoum Laid",
    com9: "Chigara",
    com10: "Derrahi Bousselah",
    com11: "El Mechira",
    com12: "Elayadi Barbes",
    com13: "Ferdjioua",
    com14: "Grarem Gouga",
    com15: "Hamala",
    com16: "Mila",
    com17: "Minar Zarza",
    com18: "Oued Athmenia",
    com19: "Oued Endja",
    com20: "Oued Seguen",
    com21: "Ouled Khalouf",
    com22: "Rouached",
    com23: "Sidi Khelifa",
    com24: "Sidi Merouane",
    com25: "Tadjenanet",
    com26: "Tassadane Haddada",
    com27: "Teleghma",
    com28: "Terrai Bainem",
    com29: "Tessala",
    com30: "Tiberguent",
    com31: "Yahia Beniguecha",
    com32: "Zeghaia",
  },
  {
    id: 44,
    name: "Ain Defla",
    com1: "Ain Benian",
    com2: "Ain Bouyahia",
    com3: "Ain Defla",
    com4: "Ain Lechiakh",
    com5: "Ain Soltane",
    com6: "Ain Tork",
    com7: "Arib",
    com8: "Barbouche",
    com9: "Bathia",
    com10: "Belaas",
    com11: "Ben Allal",
    com12: "Bir Ould Khelifa",
    com13: "Bordj Emir Khaled",
    com14: "Boumedfaa",
    com15: "Bourached",
    com16: "Djelida",
    com17: "Djemaa Ouled Cheikh",
    com18: "Djendel",
    com19: "El Abadia",
    com20: "El Amra",
    com21: "El Attaf",
    com22: "El Maine",
    com23: "Hammam Righa",
    com24: "Hassania",
    com25: "Hoceinia",
    com26: "Khemis Miliana",
    com27: "Mekhatria",
    com28: "Miliana",
    com29: "Oued Chorfa",
    com30: "Oued Djemaa",
    com31: "Rouina",
    com32: "Sidi Lakhdar",
    com33: "Tacheta Zegagha",
    com34: "Tarik Ibn Ziad",
    com35: "Tiberkanine",
    com36: "Zeddine",
  },
  {
    id: 45,
    name: "Naama",
    com1: "Ain Ben Khelil",
    com2: "Ain Safra",
    com3: "Assela",
    com4: "Djeniane Bourzeg",
    com5: "El Biod",
    com6: "Kasdir",
    com7: "Makman Ben Amer",
    com8: "Mecheria",
    com9: "Moghrar",
    com10: "Naama",
    com11: "Sfissifa",
    com12: "Tiout",
  },
  {
    id: 46,
    name: "Ain Temouchent",
    com1: "Aghlal",
    com2: "Ain El Arbaa",
    com3: "Ain Kihal",
    com4: "Ain Temouchent",
    com5: "Ain Tolba",
    com6: "Aoubellil",
    com7: "Beni Saf",
    com8: "Bouzedjar",
    com9: "Chaabat El Ham",
    com10: "Chentouf",
    com11: "El Amria",
    com12: "El Malah",
    com13: "El Messaid",
    com14: "Emir Abdelkader",
    com15: "Hammam Bouhadjar",
    com16: "Hassasna",
    com17: "Hassi El Ghella",
    com18: "Oued Berkeche",
    com19: "Oued Sebbah",
    com20: "Ouled Boudjemaa",
    com21: "Ouled Kihal",
    com22: "Oulhaca El Gheraba",
    com23: "Sidi Ben Adda",
    com24: "Sidi Boumediene",
    com25: "Sidi Ouriache",
    com26: "Sidi Safi",
    com27: "Tamzoura",
    com28: "Terga",
  },
  {
    id: 47,
    name: "Ghardaia",
    com1: "Berriane",
    com2: "Bounoura",
    com3: "Dhayet Bendhahoua",
    com4: "El Atteuf",
    com5: "El Guerrara",
    com6: "Ghardaia",
    com7: "Mansoura",
    com8: "Metlili",
    com9: "Sebseb",
    com10: "Zelfana",
  },
  {
    id: 48,
    name: "Relizane",
    com1: "Ain Rahma",
    com2: "Ain Tarek",
    com3: "Ammi Moussa",
    com4: "Belaassel Bouzagza",
    com5: "Bendaoud",
    com6: "Beni Dergoun",
    com7: "Beni Zentis",
    com8: "Dar Ben Abdelah",
    com9: "Djidiouia",
    com10: "El Guettar",
    com11: "El H'madna",
    com12: "El Hassi",
    com13: "El Matmar",
    com14: "El Ouldja",
    com15: "Had Echkalla",
    com16: "Hamri",
    com17: "Kalaa",
    com18: "Lahlef",
    com19: "Mazouna",
    com20: "Mediouna",
    com21: "Mendes",
    com22: "Merdja Sidi Abed",
    com23: "Ouarizane",
    com24: "Oued El Djemaa",
    com25: "Oued Essalem",
    com26: "Oued Rhiou",
    com27: "Ouled Aiche",
    com28: "Ouled Sidi Mihoub",
    com29: "Ramka",
    com30: "Relizane",
    com31: "Sidi Khettab",
    com32: "Sidi Lazreg",
    com33: "Sidi M'hamed Benali",
    com34: "Sidi M'hamed Benaouda",
    com35: "Sidi Saada",
    com36: "Souk El Had",
    com37: "Yellel",
    com38: "Zemmoura",
  },
  {
    id: 49,
    name: "Timimoun",
    com1: "Aougrout",
    com2: "Charouine",
    com3: "Deldoul",
    com4: "Ksar Kaddour",
    com5: "Metarfa",
    com6: "Ouled Aissa",
    com7: "Ouled Said",
    com8: "Talmine",
    com9: "Timimoun",
    com10: "Tinerkouk",
  },
  {
    id: 50,
    name: "Bordj Badji Mokhtar",
    com1: "Bordj Badji Mokhtar",
    com2: "Timiaouine",
  },
  {
    id: 51,
    name: "Ouled Djellal",
    com1: "Besbes",
    com2: "Chaiba",
    com3: "Doucen",
    com4: "Ouled Djellal",
    com5: "Ras El Miad",
    com7: "Sidi Khaled",
  },
  {
    id: 52,
    name: "Beni Abbes",
    com1: "Beni Abbes",
    com2: "Beni Ikhlef",
    com3: "El Ouata",
    com4: "Igli",
    com5: "Kerzaz",
    com6: "Ksabi",
    com7: "Ouled Khoudir",
    com8: "Tabelbala",
    com9: "Tamtert",
    com10: "Timoudi",
  },
  {
    id: 53,
    name: "In Salah",
    com1: "In Salah",
    com2: "Foggaret Azzaouia ",
    com3: "In Ghar",
  },
  {
    id: 54,
    name: "In Guezzam",
    com1: "In Guezzam",
    com2: "Tin Zouatine",
  },
  {
    id: 55,
    name: "Touggourt",
    com1: "Benaceur",
    com2: "Blidet Amor",
    com3: "El Alia",
    com4: "El Hadjira",
    com5: "Megarine",
    com6: "Mnaguer",
    com7: "Nezla",
    com8: "Sidi Slimane",
    com9: "Taibet",
    com10: "Tebesbest",
    com11: "Temacine",
    com12: "Touggourt",
    com13: "Zaouia El Abidia",
  },
  {
    id: 56,
    name: "Djanet",
    com1: "Djanet",
    com2: "Bordj El Haouasse",
  },
  {
    id: 57,
    name: "El M'ghair",
    com1: "Djamaa",
    com2: "El M'ghair",
    com3: "Mrara",
    com4: "Oum Touyour",
    com5: "Sidi Amrane",
    com6: "Sidi Khelil",
    com7: "Still",
    com8: "Tenedla",
  },
  {
    id: 58,
    name: "El Meniaa",
    com1: "El Meniaa",
    com2: "Hassi Fehal",
    com3: "Hassi Gara",
  },
];

const wilayaInfo = wilayaCommuneInfo.map((item) => {
  const { id, name } = item;
  return { id, name };
});
/*const priceDelevry = wilayaCommuneInfo.slice(1).map((item) => {
  const { id, name, del } = item;
  return { id, name, del };
});*/

export default function Form({ id }) {
  const [btnDisebled, setBtnDisebled] = useState(true);

  const [purchaise, setPurchaise] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [wilaya, setWilaya] = useState("");
  const [commune, setCommune] = useState("");
  //const [adress, setAdress] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [selectedOffer, setSelectedOffer] = useState("single");
  const fakeBtn = false;
  const [correctNumber, setCorrectNumber] = useState(false);
  const [isDelevery /*setIsDelevery*/] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // جديد: حالة منع الطلب لمدة 24 ساعة
  const [orderCooldown, setOrderCooldown] = useState(false);

  //const [delevry, setDelevery] = useState(0);
  const phoneInput = useRef(null);
  //nothing
  const product = data.find((item) => item.id === id) || data[0] || {};
  const { price = 0, delevery = "", url = "" } = product;

  const communes = useMemo(() => {
    const selectedWilaya = wilayaCommuneInfo.find(
      (item) => item.name === wilaya,
    );
    if (!selectedWilaya) return [];

    return Object.keys(selectedWilaya)
      .filter((key) => /^com\d+$/.test(key))
      .map((key) => selectedWilaya[key])
      .filter(Boolean);
  }, [wilaya]);

  /*  useEffect(() => {
    const price = priceDelevry.filter((item) => item.name === wilaya)[0]?.del;
    setDelevery(price);
  }, [wilaya]);*/

  useEffect(() => {
    const normalizedPhone = phone.replace(/\s+/g, "");
    const validPhone = /^0[5-7]\d{8}$/.test(normalizedPhone);
    setCorrectNumber(Boolean(normalizedPhone) && !validPhone);
    setBtnDisebled(!validPhone || !name.trim() || !wilaya || !commune);
  }, [phone, name, wilaya, commune]);

  // جديد: التحقق من آخر طلب عند فتح الصفحة
  useEffect(() => {
    const lastOrderTime = localStorage.getItem("lastOrderTime");

    if (!lastOrderTime) {
      return;
    }

    const twentyFourHours = 24 * 60 * 60 * 1000;
    const currentTime = Date.now();
    const elapsedTime = currentTime - Number(lastOrderTime);

    if (elapsedTime < twentyFourHours) {
      setOrderCooldown(true);

      const remainingTime = twentyFourHours - elapsedTime;

      const timeout = setTimeout(() => {
        localStorage.removeItem("lastOrderTime");
        setOrderCooldown(false);
        setSubmitError("");
      }, remainingTime);

      return () => clearTimeout(timeout);
    } else {
      localStorage.removeItem("lastOrderTime");
      setOrderCooldown(false);
    }
  }, []);

  const handleSubmitOrder = async (e) => {
    e.preventDefault();

    // جديد: منع إرسال طلب آخر قبل مرور 24 ساعة
    const lastOrderTime = localStorage.getItem("lastOrderTime");
    const twentyFourHours = 24 * 60 * 60 * 1000;

    if (lastOrderTime && Date.now() - Number(lastOrderTime) < twentyFourHours) {
      setOrderCooldown(true);
      setSubmitError(
        "لقد قمت بالفعل بإرسال طلب. يمكنك إرسال طلب جديد بعد مرور 24 ساعة.",
      );
      return;
    }

    setBtnDisebled(true);

    try {
      const data = new FormData();

      data.append(
        "date",
        `${new Date().getDate()}/${
          new Date().getMonth() + 1
        } - ${new Date().getHours()}H : ${new Date().getMinutes()}M`,
      );

      //data.append("product", product.name || "");
      data.append("product", "créme psoriasis");

      data.append("name", name);

      const normalizedPhone = phone.replace(/\s+/g, "");

      if (!/^0[5-7]\d{8}$/.test(normalizedPhone)) {
        setCorrectNumber(true);
        phoneInput.current?.focus();
        setBtnDisebled(true);
        return;
      }

      if (!name.trim() || !wilaya || !commune) return;

      data.append("phone", normalizedPhone);
      data.append("wilaya", wilaya);
      data.append("commune", commune);

      //data.append("adress", adress);
      // data.append("model", "منتج بدون مقاس أو لون");

      const orderQty = Math.max(1, Number(quantity) || 1);

      const productQty = selectedOffer === "bundle" ? orderQty * 3 : orderQty;

      const productsPrice =
        selectedOffer === "bundle"
          ? Number(price) * 2 * orderQty
          : Number(price) * orderQty;

      const deliveryPrice =
        delevery.trim() !== "" && !isNaN(Number(delevery))
          ? Number(delevery)
          : 0;

      data.append("quantity", productQty.toString());

      data.append(
        "offer",
        selectedOffer === "bundle" ? "02 + 01 مجاناً" : "01",
      );

      data.append("prix", `${productsPrice + deliveryPrice}`);

      if (!url) throw new Error("Missing order endpoint");

      const response = await fetch(url, {
        method: "POST",
        body: data,
      });

      if (!response.ok)
        throw new Error(`Order request failed (${response.status})`);

      // جديد: تخزين وقت الطلب فقط بعد نجاح الإرسال
      localStorage.setItem("lastOrderTime", Date.now().toString());

      setOrderCooldown(true);

      setBtnDisebled(false);
      setSubmitError("");

      setPurchaise(true);

      window.scrollTo({
        top: 500,
        behavior: "smooth", // Smooth scrolling animation
      });
    } catch (error) {
      console.error(error);

      setBtnDisebled(false);

      setSubmitError("تعذر إرسال الطلب. يرجى المحاولة مرة أخرى.");
    }
  };

  return (
    <Box>
      {isDelevery ? (
        <Box margin={"50px 0"}>
          <Typography sx={{ fontSize: "32px", textAlign: "center" }}>
            نعتدر التوصيل غير متوفر لولايتكم
          </Typography>

          <Typography sx={{ fontSize: "32px", textAlign: "center" }}>
            شكرا لكم
          </Typography>
        </Box>
      ) : (
        <Box>
          {purchaise ? (
            <Box margin={"50px 0"}>
              <Typography sx={{ fontSize: "32px", textAlign: "center" }}>
                لقد تم تقديم طلبك بنجاح سيتم الاتصال بك قريبا لتأكيد طلبيتك
              </Typography>

              <Typography sx={{ fontSize: "32px", textAlign: "center" }}>
                شكرا لك
              </Typography>
            </Box>
          ) : fakeBtn ? (
            <Box margin={"50px 0"}>
              <Typography sx={{ fontSize: "32px", textAlign: "center" }}>
                {` غير متوفر الآن ${wilaya}  التوصيل لولايتك `}
              </Typography>

              <Typography sx={{ fontSize: "32px", textAlign: "center" }}>
                نرجوا المعذرة و شكرا
              </Typography>
            </Box>
          ) : (
            <Box sx={{ width: "100%", direction: "rtl" }}>
              <form
                onSubmit={handleSubmitOrder}
                style={{
                  border: "1px solid #d9d9d9",
                  borderRadius: "4px",
                  padding: "20px 15px 16px",
                  margin: 0,
                  backgroundColor: "#fff",
                  direction: "rtl",
                  boxSizing: "border-box",
                }}
              >
                <Typography
                  sx={{
                    textAlign: "center",
                    fontSize: { xs: "14px", sm: "15px" },
                    fontWeight: 500,
                    color: "#222",
                    lineHeight: 1.7,
                    marginBottom: "18px",
                    whiteSpace: "normal",
                  }}
                >
                  للطلب أدخل معلوماتك في الخانات أسفله ⬇⬇ ثم إضغط على " إضغط هنا
                  للطلب "
                </Typography>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                    gap: "15px",
                  }}
                >
                  <TextField
                    required
                    fullWidth
                    variant="outlined"
                    placeholder="الاسم الأول"
                    inputProps={{ dir: "rtl", "aria-label": "الاسم الأول" }}
                    onChange={(e) => setName(e.target.value)}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        height: "50px",
                        borderRadius: "3px",
                        fontSize: "14px",
                      },
                      "& input::placeholder": {
                        opacity: 1,
                        color: "#b7b7b7",
                      },
                    }}
                  />

                  <TextField
                    ref={phoneInput}
                    required
                    fullWidth
                    type="tel"
                    inputMode="numeric"
                    variant="outlined"
                    placeholder="رقم الهاتف"
                    inputProps={{
                      dir: "rtl",
                      "aria-label": "رقم الهاتف",
                      maxLength: 10,
                    }}
                    onChange={(e) => setPhone(e.target.value)}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        height: "50px",
                        borderRadius: "3px",
                        fontSize: "14px",
                      },
                      "& input::placeholder": {
                        opacity: 1,
                        color: "#b7b7b7",
                      },
                    }}
                  />

                  <select
                    className="fast-select"
                    required
                    aria-label="الولاية"
                    value={wilaya}
                    onChange={(e) => {
                      setCommune("");
                      setWilaya(e.target.value);
                    }}
                  >
                    <option value="">اختر الولاية</option>

                    {wilayaInfo.slice(1).map((item) => (
                      <option key={item.id} value={item.name}>
                        {item.id} - {item.name}
                      </option>
                    ))}
                  </select>

                  <select
                    className="fast-select"
                    required
                    aria-label="البلدية"
                    value={commune}
                    disabled={!wilaya}
                    onChange={(e) => setCommune(e.target.value)}
                  >
                    <option value="">اختر البلدية</option>

                    {communes.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </Box>

                {correctNumber && (
                  <Typography
                    sx={{
                      color: "#d32f2f",
                      fontSize: "12px",
                      textAlign: "right",
                      marginTop: "6px",
                    }}
                  >
                    أدخل رقم هاتف صحيح
                  </Typography>
                )}

                {submitError && (
                  <Typography
                    role="alert"
                    sx={{
                      color: "#d32f2f",
                      fontSize: "13px",
                      textAlign: "right",
                      marginTop: "6px",
                    }}
                  >
                    {submitError}
                  </Typography>
                )}

                {orderCooldown && (
                  <Typography
                    sx={{
                      color: "#d32f2f",
                      fontSize: "13px",
                      textAlign: "center",
                      marginTop: "10px",
                      fontWeight: 600,
                    }}
                  >
                    لقد قمت بالفعل بإرسال طلب. يمكنك إرسال طلب جديد بعد مرور 24
                    ساعة.
                  </Typography>
                )}

                <Box sx={{ marginTop: "18px" }}>
                  <Box
                    role="button"
                    tabIndex={0}
                    aria-pressed={selectedOffer === "single"}
                    aria-label="طلب علبة واحدة"
                    onClick={() => {
                      setSelectedOffer("single");
                      setQuantity("1");
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelectedOffer("single");
                        setQuantity("1");
                      }
                    }}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      cursor: "pointer",
                      marginBottom: "17px",
                      minHeight: "28px",
                    }}
                  >
                    <Box
                      sx={{
                        width: "27px",
                        height: "27px",
                        border: "1px solid #d6d6d6",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        backgroundColor: "#fff",
                        boxSizing: "border-box",
                      }}
                    >
                      {selectedOffer === "single" && (
                        <Box
                          sx={{
                            width: "15px",
                            height: "15px",
                            borderRadius: "50%",
                            backgroundColor: "#000",
                          }}
                        />
                      )}
                    </Box>

                    <Typography
                      sx={{
                        fontSize: "15px",
                        fontWeight: 700,
                        flex: 1,
                        textAlign: "right",
                      }}
                    >
                      عند طلب علبة 01&nbsp;&nbsp;{Number(price)} دج
                    </Typography>
                  </Box>

                  <Box
                    role="button"
                    tabIndex={0}
                    aria-pressed={selectedOffer === "bundle"}
                    aria-label="طلب عرض علبتين وواحدة مجانية"
                    onClick={() => {
                      setSelectedOffer("bundle");
                      setQuantity("1");
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelectedOffer("bundle");
                        setQuantity("1");
                      }
                    }}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      cursor: "pointer",
                      minHeight: "28px",
                    }}
                  >
                    <Box
                      sx={{
                        width: "27px",
                        height: "27px",
                        border: "1px solid #d6d6d6",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        backgroundColor: "#fff",
                        boxSizing: "border-box",
                      }}
                    >
                      {selectedOffer === "bundle" && (
                        <Box
                          sx={{
                            width: "15px",
                            height: "15px",
                            borderRadius: "50%",
                            backgroundColor: "#000",
                          }}
                        />
                      )}
                    </Box>

                    <Typography
                      sx={{
                        fontSize: "15px",
                        fontWeight: 700,
                        flex: 1,
                        textAlign: "right",
                      }}
                    >
                      عند طلب 02 + واحدة مجانًا&nbsp;&nbsp;{Number(price) * 2}{" "}
                      دج
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    marginTop: "18px",
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    direction: "rtl",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      flexShrink: 0,
                    }}
                  >
                    <Button
                      type="button"
                      onClick={() =>
                        setQuantity((q) => String(Math.max(1, Number(q) - 1)))
                      }
                      sx={{
                        minWidth: "31px",
                        width: "31px",
                        height: "31px",
                        border: "1px solid #ddd",
                        color: "#222",
                        backgroundColor: "#fff",
                        borderRadius: "2px",
                        padding: 0,
                        fontSize: "20px",
                        lineHeight: 1,
                        boxShadow: "none",
                        "&:hover": {
                          backgroundColor: "#fafafa",
                          boxShadow: "none",
                        },
                      }}
                    >
                      −
                    </Button>

                    <Typography
                      sx={{
                        minWidth: "18px",
                        textAlign: "center",
                        fontSize: "16px",
                        fontWeight: 700,
                      }}
                    >
                      {quantity}
                    </Typography>

                    <Button
                      type="button"
                      onClick={() => setQuantity((q) => String(Number(q) + 1))}
                      sx={{
                        minWidth: "31px",
                        width: "31px",
                        height: "31px",
                        border: "1px solid #ddd",
                        color: "#222",
                        backgroundColor: "#fff",
                        borderRadius: "2px",
                        padding: 0,
                        fontSize: "20px",
                        lineHeight: 1,
                        boxShadow: "none",
                        "&:hover": {
                          backgroundColor: "#fafafa",
                          boxShadow: "none",
                        },
                      }}
                    >
                      +
                    </Button>
                  </Box>

                  <Button
                    disabled={btnDisebled || orderCooldown}
                    variant="contained"
                    type="submit"
                    sx={{
                      flex: 1,
                      minWidth: 0,
                      minHeight: "47px",
                      margin: 0,
                      color: "#fff",
                      backgroundColor: "#000",
                      borderRadius: 0,
                      fontSize: { xs: "15px", sm: "16px" },
                      fontWeight: 800,
                      boxShadow: "none",
                      "&:hover": {
                        backgroundColor: "#111",
                        boxShadow: "none",
                      },
                      "&.Mui-disabled": {
                        backgroundColor: "#000",
                        color: "#fff",
                        opacity: 0.65,
                      },
                    }}
                  >
                    إضغط هنا للطلب
                  </Button>
                </Box>
              </form>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}

/*
<script>
(function(){
const CONFIG={productName:'PRODUCT_NAME',productPrice:1000,deliveryPrice:0,orderUrl:'https://script.google.com/macros/s/AKfycbzC8BfyctPSx--UbjjENSSufvoaQIOAu0-KVpUWy9xArzPeUFj1l_RGxMtSCcbl1eUPIA/exec',fakeBtn:false,deliveryUnavailable:false};

const WILAYAS={
"1":{name:"Adrar",communes:["Adrar","Akabli","Aoulef","Bouda","Fenoughil","In Zghmir","Ouled Ahmed Timmi","Reggane","Sali","Sebaa","Tamantit","Tamest","Tit","Tsabit","Zaouiet Kounta"]},
"2":{name:"Chlef",communes:["Chlef","Abou El Hassan","Ain Merane","Benairia","Beni Bouattab","Beni Haoua","Beni Rached","Boukadir","Bouzeghaia","Breira","Chettia","Dahra","El Hadjadj","El Karimia","El Marsa","Harchoun","Herenfa","Labiod Medjadja","Moussadek","Oued Fodda","Oued Goussine","Oued Sly","Ouled Abbes","Ouled Ben Abdelkader","Ouled Fares","Oum Drou","Sendjas","Sidi Abderrahmane","Sidi Akkacha","Sobha","Tadjena","Talassa","Taougrite","Tenes","Zeboudja"]},
"3":{name:"Laghouat",communes:["Aflou","Ain Mahdi","Ain Sidi Ali","Beidha","Benacer Benchohra","Brida","El Assafia","El Ghicha","El Haouaita","Gueltat Sidi Saad","Hadj Mechri","Hassi Delaa","Hassi R'mel","Kheneg","Ksar El Hirane","Laghouat","Oued M'zi","Oued Morra","Sebgag","Sidi Bouzid","Sidi Makhlouf","Tadjemout","Tadjrouna","Taouiala"]},
"4":{name:"Oum El Bouaghi",communes:["Ain Babouche","Ain Beida","Ain Diss","Ain Fekroune","Ain Kercha","Ain M'lila","Ain Zitoun","Behir Chergui","Berriche","Bir Chouhada","Dhala","El Amiria","El Belala","El Djazia","El Fedjoudj Boughrara Sa","El Harmilia","Fkirina","Hanchir Toumghani","Ksar Sbahi","Meskiana","Oued Nini","Ouled Gacem","Ouled Hamla","Ouled Zouai","Oum El Bouaghi","Rahia","Sigus","Souk Naamane","Zorg"]},
"5":{name:"Batna",communes:["Ain Djasser","Ain Touta","Ain Yagout","Arris","Azil Abedelkader","Barika","Batna","Beni Foudhala El Hakania","Bitam","Boulhilat","Boumagueur","Boumia","Bouzina","Chemora","Chir","Djerma","Djezzar","El Hassi","El Madher","Fesdis","Foum Toub","Ghassira","Gosbat","Guigba","Hidoussa","Ichmoul","Inoughissen","Kimmel","Ksar Bellezma","Larbaa","Lazrou","Lemsane","M Doukal","Maafa","Menaa","Merouana","N Gaous","Oued Chaaba","Oued El Ma","Oued Taga","Ouled Ammar","Ouled Aouf","Ouled Fade","Ouled Sellem","Ouled Si Slimane","Ouyoun El Assafir","Rahbat","Ras El Aioun","Sefiane","Seggana","Seriana","T Kout","Talkhamt","Taxlent","Tazoult","Teniet El Abed","Tighanimine","Tigharghar","Tilatou","Timgad","Zanet El Beida"]},
"6":{name:"Bejaia",communes:["Adekar","Ait R'zine","Ait Smail","Akbou","Akfadou","Amalou","Amizour","Aokas","Barbacha","Bejaia","Beni Dejllil","Beni K'sila","Beni Mallikeche","Benimaouche","Boudjellil","Bouhamza","Boukhelifa","Chellata","Chemini","Darghina","Dra El Caid","El Kseur","Fenaia Il Maten","Feraoun","Ighil Ali","Ighram","Kendira","Kherrata","Leflaye","M'cisna","Melbou","Oued Ghir","Ouzellaguene","Seddouk","Sidi Aich","Sidi Ayad","Smaoun","Souk El Tenine","Souk Oufella","Tala Hamza","Tamokra","Tamridjet","Taourit Ighil","Taskriout","Tazmalt","Tibane","Tichy","Tifra","Timezrit","Tinebdar","Tizi N'berber","Toudja"]},
"7":{name:"Biskra",communes:["Ain Naga","Ain Zaatout","Biskra","Bordj Ben Azzouz","Bouchagroun","Branis","Chetma","Djemorah","El Feidh","El Ghrous","El Hadjab","El Haouch","El Kantara","El Outaya","Foughala","Khenguet Sidi Nadji","Lichana","Lioua","M'chouneche","M'lili","Mekhadma","Meziraa","Oumache","Ourlal","Sidi Okba","Tolga","Zeribet El Oued"]},
"8":{name:"Bechar",communes:["Abadla","Bechar","Beni Ounif","Boukais","Erg Ferradj","Kenadsa","Lahmar","Mechraa H.boumediene","Meridja","Mogheul","Taghit"]},
"9":{name:"Blida",communes:["Ain Romana","Beni Mered","Beni Tamou","Benkhelil","Blida","Bouarfa","Boufarik","Bougara","Bouinan","Chebli","Chiffa","Chrea","Djebabra","El Affroun","Guerrouaou","Hammam Melouane","Larbaa","Meftah","Mouzaia","Oued Djer","Oued El Alleug","Ouled Slama","Ouled Yaich","Souhane","Souma"]},
"10":{name:"Bouira",communes:["Aghbalou","Ahl El Ksar","Ain Bessem","Ain El Hadjar","Ain Laloui","Ain Turk","Ait Laaziz","Aomar","Bechloul","Bir Ghbalou","Bordj Okhriss","Bouderbala","Bouira","Boukram","Chorfa","Dechmia","Dirah","Djebahia","El Adjiba","El Asnam","El Hachimia","El Hakimia","El Khabouzia","El Mokrani","Guerrouma","Hadjera Zerga","Haizer","Hanif","Kadiria","Lakhdaria","M Chedallah","Maala","Mamora","Mezdour","Oued El Berdi","Ouled Rached","Raouraoua","Ridane","Saharidj","Souk El Khemis","Sour El Ghozlane","Taghzout","Taguedite","Taourirt","Z'barbar"]},
"11":{name:"Tamanrasset",communes:["Abalessa","Ain Amgue","Idles","Tamanrasset","Tazrouk"]},
"12":{name:"Tebessa",communes:["Ain Zerga","Bedjene","Bekkaria","Bir Dheheb","Bir El Ater","Bir Mokkadem","Boukhadra","Boulhaf Dyr","Cheria","El Aouinet","El Houidjbet","El Kouif","El Malabiod","El Meridj","El Mezeraa","El Ogla","El Ogla El Malha","Ferkane","Guorriguer","Hammamet","Morssot","Negrine","Ouenza","Oum Ali","Saf Saf El Ouesra","Stah Guentis","Tebessa","Telidjen"]},
"13":{name:"Tlemcen",communes:["Ain Fettah","Ain Fezza","Ain Ghoraba","Ain Kebira","Ain Nehala","Ain Tallout","Ain Youcef","Amieur","Azails","Bab El Assa","Beni Bahdel","Beni Boussaid","Beni Khaled","Beni Mester","Beni Ouarsous","Beni Smiel","Beni Snous","Bensekrane","Bouhlou","Bouihi","Chetouane","Dar Yaghmouracene","Djebala","El Aricha","El Fehoul","El Gor","Fellaoucene","Ghazaouet","Hammam Boughrara","Hennaya","Honaine","Maghnia","Mansourah","Marsa Ben M'hidi","Msirda Fouaga","Nedroma","Oued Chouly","Ouled Mimoun","Ouled Riyah","Remchi","Sabra","Sebbaa Chioukh","Sebdou","Sidi Abdelli","Sidi Djilali","Sidi Medjahed","Souahlia","Souani","Souk Tleta","Terny Beni Hediel","Tianet","Tlemcen","Zenata"]},
"14":{name:"Tiaret",communes:["Ain Bouchekif","Ain Deheb","Ain El Hadid","Ain Kermes","Ain Zarit","Bougara","Chehaima","Dahmouni","Djebilet Rosfa","Djillali Ben Amar","Faidja","Frenda","Guertoufa","Hamadia","Ksar Chellala","Madna","Mahdia","Mechraa Safa","Medrissa","Medroussa","Meghila","Mellakou","Nadorah","Naima","Oued Lilli","Rahouia","Rechaiga","Sebaine","Sebt","Serghine","Si Abdelghani","Sidi Abderrahmane","Sidi Ali Mellal","Sidi Bakhti","Sidi Hosni","Sougueur","Tagdemt","Takhemaret","Tiaret","Tidda","Tousnina","Zmalet El Emir Abdelkade"]},
"15":{name:"Tizi Ouzou",communes:["Abi Youcef","Aghribs","Agouni Gueghrane","Ain El Hammam","Ain Zaouia","Ait Aggouacha","Ait Bouaddou","Ait Boumehdi","Ait Chafaa","Ait Khellili","Ait Mahmoud","Ait Oumalou","Ait Toudert","Ait Yahia","Ait Yahia Moussa","Akbil","Akerrou","Assi Youcef","Azazga","Azeffoun","Beni Aissi","Beni Douala","Beni Yenni","Beni Zikki","Beni Zmenzer","Boghni","Boudjima","Bounouh","Bouzeguene","Djebel Aissa Mimoun","Draa Ben Khedda","Draa El Mizan","Freha","Frikat","Iboudrarene","Idjeur","Iferhounene","Ifigha","Iflissen","Illilten","Illoula Oumalou","Imsouhal","Irdjen","Larba Nath Irathen","Larbaa Nath Irathen","M'kira","Maatkas","Makouda","Mechtras","Mekla","Mizrana","Ouacif","Ouadhias","Ouaguenoune","Sidi Naamane","Souamaa","Souk El Thenine","Tadmait","Tigzirt","Timizart","Tirmitine","Tizi Ghenif","Tizi N'tleta","Tizi Ouzou","Tizi Rached","Yakourene","Yatafene","Zekri"]},
"16":{name:"Alger",communes:["Ain Benian","Ain Taya","Alger","Bab El Oued","Bab Ezzouar","Baba Hesen","Bachedjerah","Bains Romains","Baraki","Ben Aknoun","Beni Messous","Bir Mourad Rais","Bir Touta","Birkhadem","Bologhine Ibnou Ziri","Bordj El Bahri","Bordj El Kiffan","Bourouba","Bouzareah","Casbah","Cheraga","Dar El Beida","Dely Ibrahim","Djasr Kasentina","Douira","Draria","El Achour","El Biar","El Harrach","El Madania","El Magharia","El Merssa","El Mouradia","Herraoua","Hussein Dey","Hydra","Kheraisia","Kouba","Les Eucalyptus","Maalma","Mohamed Belouzdad","Mohammadia","Oued Koriche","Oued Smar","Ouled Chebel","Ouled Fayet","Rahmania","Rais Hamidou","Reghaia","Rouiba","Sehaoula","Setaouali","Sidi M'hamed","Sidi Moussa","Souidania","Tessala El Merdja","Zeralda"]},
"17":{name:"Djelfa",communes:["Ain Chouhada","Ain El Ibel","Ain Fekka","Ain Maabed","Ain Oussera","Amourah","Benhar","Benyagoub","Birine","Bouira Lahdab","Charef","Dar Chioukh","Deldoul","Djelfa","Douis","El Guedid","El Idrissia","El Khemis","Faidh El Botma","Guernini","Guettara","Had Sahary","Hassi Bahbah","Hassi El Euch","Hassi Fedoul","M Liliha","Messaad","Moudjebara","Oum Laadham","Sed Rahal","Selmana","Sidi Baizid","Sidi Ladjel","Tadmit","Zaafrane","Zaccar"]},
"18":{name:"Jijel",communes:["Bordj Tahar","Boudria Beniyadjis","Bouraoui Belhadef","Boussif Ouled Askeur","Chahna","Chekfa","Djemaa Beni Habibi","Djimla","El Ancer","El Aouana","El Kennar Nouchfi","El Milia","Emir Abdelkader","Erraguene","Ghebala","Jijel","Khiri Oued Adjoul","Kouas","Oudjana","Ouled Rabah","Ouled Yahia Khadrouch","Selma Benziada","Settara","Sidi Abdelaziz","Sidi Marouf","Taher","Texena","Ziama Mansouria"]},
"19":{name:"Setif",communes:["Ain Abessa","Ain Arnat","Ain Azel","Ain El Kebira","Ain Lahdjar","Ain Legradj","Ain Oulmane","Ain Roua","Ain Sebt","Ait Naoual Mezada","Ait Tizi","Amoucha","Babor","Bazer Sakra","Beidha Bordj","Bellaa","Beni Aziz","Beni Chebana","Beni Fouda","Beni Mouhli","Beni Ouartilane","Beni Oussine","Bir El Arch","Bir Haddada","Bouandas","Bougaa","Bousselam","Boutaleb","Dehamcha","Djemila","Draa Kebila","El Eulma","El Ouldja","El Ouricia","Guellal","Guelta Zerka","Guenzet","Guidjel","Hamam Soukhna","Hamma","Hammam Guergour","Harbil","Ksar El Abtal","Maaouia","Maouaklane","Mezloug","Oued El Barad","Ouled Addouane","Ouled Sabor","Ouled Si Ahmed","Ouled Tebben","Rosfa","Salah Bey","Serdj El Ghoul","Setif","Tachouda","Tala Ifacene","Taya","Tella","Tizi N'bechar"]},
"20":{name:"Saida",communes:["Ain El Hadjar","Ain Sekhouna","Ain Soltane","Doui Thabet","El Hassasna","Hounet","Maamora","Moulay Larbi","Ouled Brahim","Ouled Khaled","Saida","Sidi Ahmed","Sidi Amar","Sidi Boubekeur","Tircine","Youb"]},
"21":{name:"Skikda",communes:["Ain Bouziane","Ain Charchar","Ain Kechera","Ain Zouit","Azzaba","Bekkouche Lakhdar","Ben Azzouz","Beni Bechir","Beni Oulbane","Beni Zid","Bin El Ouiden","Bouchetata","Cheraia","Collo","Djendel Saadi Mohamed","El Arrouch","El Ghedir","El Hadaiek","El Marsa","Emjez Edchich","Es Sebt","Filfila","Hamadi Krouma","Kanoua","Kerkera","Khenag Mayoum","Oued Zhour","Ouldja Boulbalout","Ouled Attia","Ouled Habbeba","Oum Toub","Ramdane Djamel","Salah Bouchaour","Sidi Mezghiche","Skikda","Tamalous","Zerdezas","Zitouna"]},
"22":{name:"Sidi Bel Abbes",communes:["Ain Adden","Ain El Berd","Ain Kada","Ain Thrid","Ain Tindamine","Amarnas","Badredine El Mokrani","Belarbi","Ben Badis","Benachiba Chelia","Bir El Hammam","Boudjebaa El Bordj","Boukhanafis","Chetouane Belaila","Dhaya","El Hacaiba","Hassi Dahou","Hassi Zahana","Lamtar","M'cid","Makedra","Marhoum","Merine","Mezaourou","Mostefa Ben Brahim","Moulay Slissen","Oued Sebaa","Oued Sefioun","Oued Taourira","Ras El Ma","Redjem Demouche","Sehala Thaoura","Sfissef","Sidi Ali Benyoub","Sidi Ali Boussidi","Sidi Bel Abbes","Sidi Brahim","Sidi Chaib","Sidi Dahou Zairs","Sidi Hamadouche","Sidi Khaled","Sidi Lahcene","Sidi Yacoub","Tabia","Tafissour","Taoudmout","Teghalimet","Telagh","Tenira","Tessala","Tilmouni","Zerouala"]},
"23":{name:"Annaba",communes:["Ain Berda","Annaba","Berrahel","Chetaibi","Cheurfa","El Bouni","El Hadjar","Eulma","Oued El Aneb","Seraidi","Sidi Amar","Treat"]},
"24":{name:"Guelma",communes:["Ain Ben Beida","Ain Hessania","Ain Larbi","Ain Makhlouf","Ain Reggada","Belkheir","Ben Djarah","Beni Mezline","Bordj Sabat","Bou Hachana","Bou Hamdane","Bouati Mahmoud","Bouchegouf","Bouhamra Ahmed","Dahouara","Djeballah Khemissi","El Fedjoudj","Guelaat Bou Sbaa","Guelma","Hamam Debagh","Hammam N'bail","Heliopolis","Khezara","Medjez Amar","Medjez Sfa","Nechmaya","Oued Cheham","Oued Fragha","Oued Zenati","Ras El Agba","Roknia","Sellaoua Announa","Sidi Sandel","Tamlouka"]},
"25":{name:"Constantine",communes:["Ain Abid","Ain Smara","Ben Badis","Beni Hamidene","Constantine","Didouche Mourad","El Khroub","Hamma Bouziane","Ibn Ziad","Messaoud Boujeriou","Ouled Rahmouni","Zighoud Youcef"]},
"26":{name:"Medea",communes:["Ain Boucif","Ain Ouksir","Aissaouia","Aziz","Baata","Ben Chicao","Beni Slimane","Berrouaghia","Bir Ben Laabed","Boghar","Bouaiche","Bouaichoune","Bouchrahil","Boughzoul","Bouskene","Chabounia","Chelalet El Adhaoura","Cheniguel","Damiat","Derrag","Deux Bassins","Djouab","Draa Essamar","El Azizia","El Guelbelkebir","El Hamdania","El Omaria","El Ouinet","Hannacha","Kef Lakhdar","Khams Djouamaa","Ksar El Boukhari","Maghraoua","Medea","Medjebar","Meftaha","Mezerana","Mihoub","Ouamri","Oued Harbil","Ouled Antar","Ouled Bouachra","Ouled Brahim","Ouled Deid","Ouled Hellal","Ouled Maaref","Oum El Djellil","Ouzera","Rebaia","Saneg","Sedraya","Seghouane","Si Mahdjoub","Sidi Demed","Sidi Naamane","Sidi Rabie","Sidi Zahar","Sidi Ziane","Souagui","Tablat","Tafraout","Tamesguida","Tletat Ed Douair","Zoubiria"]},
"27":{name:"Mostaganem",communes:["Achaacha","Ain Boudinar","Ain Nouissy","Ain Sidi Cherif","Ain Tedles","Benabdelmalek Ramdane","Bouguirat","Fornaka","Hadjadj","Hassi Mameche","Hassiane","Khadra","Kheir Eddine","Mansourah","Mazagran","Mesra","Mostaganem","Nekmaria","Oued El Kheir","Ouled Boughalem","Ouled Maalah","Safsaf","Sayada","Sidi Ali","Sidi Belaattar","Sidi Lakhdar","Sirat","Souaflia","Sour","Stidia","Tazgait","Touahria"]},
"28":{name:"M'sila",communes:["Ain El Hadjel","Ain El Melh","Ain Fares","Ain Khadra","Ain Rich","Belaiba","Ben Srour","Beni Ilmane","Benzouh","Berhoum","Bir Foda","Bou Saada","Bouti Sayeh","Chellal","Dehahna","Djebel Messaad","El Hamel","El Houamed","Hammam Dalaa","Khettouti Sed El Jir","Khoubana","M'cif","M'sila","M'tarfa","Maadid","Maarif","Magra","Medjedel","Menaa","Mohamed Boudiaf","Ouanougha","Ouled Addi Guebala","Ouled Derradj","Ouled Madhi","Ouled Mansour","Ouled Sidi Brahim","Ouled Slimane","Oulteme","Sidi Aissa","Sidi Ameur","Sidi Hadjeres","Sidi M'hamed","Slim","Souamaa","Tamsa","Tarmount","Zarzour"]},
"29":{name:"Mascara",communes:["Ain Fares","Ain Fekan","Ain Ferah","Ain Frass","Alaimia","Aouf","Benian","Bou Henni","Bouhanifia","Chorfa","El Bordj","El Gaada","El Ghomri","El Gueitena","El Hachem","El Keurt","El Mamounia","El Menaouer","Ferraguig","Froha","Gharrous","Ghriss","Guerdjoum","Hacine","Khalouia","Makhda","Maoussa","Mascara","Matemore","Mocta Douz","Mohammadia","Nesmot","Oggaz","Oued El Abtal","Oued Taria","Ras El Ain Amirouche","Sedjerara","Sehailia","Sidi Abdeldjebar","Sidi Abdelmoumene","Sidi Boussaid","Sidi Kada","Sig","Tighennif","Tizi","Zahana","Zelamta"]},
"30":{name:"Ouargla",communes:["Ain Beida","Hassi Ben Abdellah","Hassi Messaoud","N'goussa","Ouargla","Rouissat","Sidi Khouiled"]},
"31":{name:"Oran",communes:["Ain Biya","Ain Kerma","Ain Turk","Arzew","Ben Freha","Bethioua","Bir El Djir","Boufatis","Bousfer","Boutlelis","El Ancar","El Braya","El Kerma","Es Senia","Gdyel","Hassi Ben Okba","Hassi Bounif","Hassi Mefsoukh","Marsat El Hadjadj","Mers El Kebir","Messerghin","Oran","Oued Tlelat","Sidi Ben Yebka","Sidi Chami","Tafraoui"]},
"32":{name:"El Bayadh",communes:["Ain El Orak","Arbaouat","Boualem","Bougtoub","Boussemghoun","Brezina","Cheguig","Chellala","El Bayadh","El Biodh Sidi Cheikh","El Bnoud","El Kheither","El Mehara","Ghassoul","Kef El Ahmar","Krakda","Rogassa","Sidi Ameur","Sidi Slimane","Sidi Tifour","Stitten","Tousmouline"]},
"33":{name:"Illizi",communes:["Debdeb","Illizi","In Amenas","Bordj Omar Driss"]},
"34":{name:"Bordj Bou Arreridj",communes:["Ain Taghrout","Ain Tesra","Belimour","Ben Daoud","Bir Kasdali","Bordj Bou Arreridj","Bordj Ghdir","Bordj Zemora","Colla","Djaafra","El Ach","El Achir","El Anseur","El Hamadia","El M'hir","El Main","Ghilassa","Haraza","Hasnaoua","Khelil","Ksour","Mansoura","Medjana","Ouled Brahem","Ouled Dahmane","Ouled Sidi Brahim","Rabta","Ras El Oued","Sidi Embarek","Tafreg","Taglait","Teniet En Nasr","Tesmart","Tixter"]},
"35":{name:"Boumerdes",communes:["Afir","Ammal","Baghlia","Ben Choud","Beni Amrane","Bordj Menaiel","Boudouaou","Boudouaou El Bahri","Boumerdes","Bouzegza Keddara","Chabet El Ameur","Corso","Dellys","Djinet","El Kharrouba","Hammedi","Isser","Khemis El Khechna","Larbatache","Leghata","Naciria","Ouled Aissa","Ouled Hedadj","Ouled Moussa","Si Mustapha","Sidi Daoud","Souk El Haad","Taourga","Thenia","Tidjelabine","Timezrit","Zemmouri"]},
"36":{name:"El Tarf",communes:["Ain El Assel","Ain Kerma","Asfour","Ben M Hidi","Berrihane","Besbes","Bougous","Boutin","Chefia","Chetaibi","Drean","Echatt","El Aioun","El Kala","El Tarf","Hammam Beni Salah","Lac des Oiseaux","Oued Zitoun","Raml Souk","Souarekh","Zerizer","Zitouna","Zitouna","Chefia"]},
"37":{name:"Tindouf",communes:["Oum El Assel","Tindouf"]},
"38":{name:"Tissemsilt",communes:["Ammari","Beni Chaib","Beni Lahcene","Boucaid","Bordj Bounaama","Bordj El Emir Abdelkader","Khemisti","Larbaa","Lardjem","Layoune","Maacem","Melaab","Ouled Bessem","Sidi Abed","Sidi Lantri","Sidi Slimane","Tamalaht","Theniet El Had","Tissemsilt","Youssoufia","Lazharia","Bordj El Emir Abdelkader"]},
"39":{name:"El Oued",communes:["Bayadha","Ben Guecha","Debila","Douar El Ma","El Ogla","El Oued","Guemar","Hamraia","Hassi Khalifa","Kouinine","Magrane","Mih Ouensa","Nakhla","Ourmes","Oued El Alenda","Reguiba","Robbah","Rohba","Sidi Aoun","Still","Taghzout","Trifaoui"]},
"40":{name:"Khenchela",communes:["Ain Touila","Babar","Baghai","Bouhmama","Chechar","Chelia","Djellal","El Hamma","El Mahmal","Ensigha","Kais","Khenchela","Khirane","M'Toussa","Ouled Rechache","Remila","Tamza","Taouzianat","Yabous","Ain Touila","Babar"]},
"41":{name:"Souk Ahras",communes:["Ain Zana","Bir Bouhouche","Drea","Hanancha","Khedara","Khemissa","Kheddara","M'daourouch","Machroha","Mechroha","Merahna","Ouled Driss","Ouled Moumen","Ouled Zitoun","Oum El Adhaim","Sedrata","Sidi Fredj","Souk Ahras","Taoura","Terraguelt","Tiffech","Zaarouria","Zouabi","Ragouba","Hammam Tassa"]},
"42":{name:"Tipaza",communes:["Aghbal","Ahmer El Ain","Ain Tagourait","Attatba","Beni Mileuk","Bouharoun","Bou Ismail","Chaiba","Cherchell","Damous","Damous","Douaouda","El Affroun","Fouka","Gouraya","Hadjeret Ennous","Hadjout","Hadjout","Khemisti","Kolea","Larhat","Menaceur","Messelmoun","Merad","Nador","Sidi Amar","Sidi Ghiles","Tipaza"]},
"43":{name:"Mila",communes:["Ahmed Rachedi","Ain Beida Harriche","Ain Mellouk","Ain Tine","Boudrousse","Chelghoum Laid","Chigara","Derrahi Bousselah","Elayadi Barbes","Ferdjioua","Grarem Gouga","Hamala","Mila","Minar Zarza","Oued Athmania","Oued Endja","Oued Seguen","Rouached","Sidi Khelifa","Sidi Merouane","Tadjenanet","Tassadane Haddada","Teleghma","Terrai Bainen","Tiberguent","Yahia Beni Guecha","Zeghaia","Benyahia Abderrahmane","Bouhatem","Ain Tine","Chelghoum Laid"]},
"44":{name:"Ain Defla",communes:["Ain Benian","Ain Bouyahia","Ain Defla","Ain Lechiakh","Ain Soltane","Ain Torki","Arib","Bathia","Belaas","Bir Ould Khelifa","Bordj Emir Khaled","Boumedfaa","Bourached","Djelida","Djemaa Ouled Cheikh","Djendel","El Abadia","El Amra","El Attaf","El Hassania","El Maine","Hammam Righa","Hoceinia","Khemis Miliana","Lahlef","Mekhatria","Miliana","Oued Chorfa","Oued Djemaa","Rouina","Sidi Lakhdar","Tacheta Zougagha","Tarik Ibn Ziad","Tiberkanine","Tibouanine","Zeddine"]},
"45":{name:"Naama",communes:["Ain Ben Khelil","Ain Sefra","Asla","Djenien Bourezg","El Biod","Kasdir","Moghrar","Naama","Sfissifa","Tiout","Mechria","Mekmen Ben Amar"]},
"46":{name:"Ain Temouchent",communes:["Aghlal","Ain El Arbaa","Ain Kihal","Ain Temouchent","Ain Tolba","Ain Larbaa","Aoubellil","Beni Saf","Bouzedjar","Chaabat El Leham","Chentouf","El Amria","El Emir Abdelkader","El Malah","El Maleh","Hammam Bou Hadjar","Hassi El Ghella","Oulhaça Gheraba","Ouled Boudjemaa","Ouled Kihal","Ouled Mimoun","Oued Berkeche","Ramdess","Sidi Ben Adda","Sidi Boumediene","Sidi Safi","Tamzoura","Terga"]},
"47":{name:"Ghardaia",communes:["Berriane","Bounoura","Dhayet Bendhahoua","El Atteuf","Ghardaia","Guerrara","Metlili","Sebseb","Zelfana","Mansoura"]},
"48":{name:"Relizane",communes:["Ain Rahma","Ain Tarek","Ammi Moussa","Belassel Bouzegza","Belaassel Bouzegza","Bendaoud","Beni Dergoun","Beni Zentis","Dar Ben Abdellah","Djidiouia","El Guettar","El Hamadna","El Hassi","El Matmar","El Ouldja","El Oued","Had Echkalla","Hamri","Kalaa","Lahlef","Mazouna","Mendes","Merdja Sidi Abed","Oued Rhiou","Ouled Aiche","Ouled Sidi Mihoub","Ramka","Relizane","Sidi Khettab","Sidi Lazreg","Sidi M'Hamed Ben Ali","Sidi M'Hamed Benaouda","Sidi Saada","Souk El Had","Yellel","Zemmoura","Mediouna","Ouarizane"]},
"49":{name:"Timimoun",communes:["Aougrout","Charouine","Deldoul","Ksar Kaddour","Ouled Said","Talmine","Timimoun","Tinerkouk","Tonzout","Ain Bel"]},
"50":{name:"Bordj Badji Mokhtar",communes:["Bordj Badji Mokhtar","Timiaouine"]},
"51":{name:"Ouled Djellal",communes:["Besbes","Doucen","Ouled Djellal","Ras El Miaad","Sidi Khaled","Chaiba"]},
"52":{name:"Beni Abbes",communes:["Beni Abbes","El Ouata","Igli","Kerzaz","Ksabi","Ouled Khoudir","Tamtert","Tabalbala","Timoudi","Beni Ikhlef"]},
"53":{name:"In Salah",communes:["In Ghar","Foggaret Ezzaouia","In Salah"]},
"54":{name:"In Guezzam",communes:["In Guezzam","Tin Zaouatine"]},
"55":{name:"Touggourt",communes:["Blidet Amor","El Hadjira","El Alia","Megarine","Nezla","Taibet","Tebesbest","Temacine","Touggourt","Zaouia El Abidia","Sidi Slimane","Benaceur","Megarine"]},
"56":{name:"Djanet",communes:["Djanet","Bordj El Haouas"]},
"57":{name:"El M'ghair",communes:["Djamaa","El M'ghair","M'Rara","Oum Touyour","Sidi Amrane","Still","Sidi Khelil","Hamraia"]},
"58":{name:"El Meniaa",communes:["El Meniaa","Hassi Gara","Hassi Fehal"]}
};

const CSS=`
#custom-order-root,#custom-order-root *{box-sizing:border-box}
#custom-order-root{width:100%;direction:rtl;font-family:inherit}
.custom-order-form{width:100%;border:1px solid #d9d9d9;border-radius:4px;padding:20px 15px 16px;margin:0;background:#fff;direction:rtl}
.custom-order-title{text-align:center;font-size:15px;font-weight:500;color:#222;line-height:1.7;margin:0 0 18px}
.custom-order-fields{display:grid;grid-template-columns:1fr 1fr;gap:15px}
.custom-order-input,.custom-order-select{width:100%;height:50px;border:1px solid #d9d9d9;border-radius:3px;background:#fff;color:#222;font-family:inherit;font-size:14px;outline:none;padding:0 13px;direction:rtl}
.custom-order-input::placeholder{color:#b7b7b7;opacity:1}
.custom-order-input:focus,.custom-order-select:focus{border-color:#999}
.custom-order-select{cursor:pointer}
.custom-order-select:disabled{background:#f7f7f7;color:#999;cursor:not-allowed}
.custom-order-error{display:none;color:#d32f2f;font-size:12px;text-align:right;margin-top:6px;line-height:1.5}
.custom-order-offers{margin-top:18px}
.custom-order-offer{display:flex;align-items:center;gap:10px;min-height:28px;cursor:pointer;user-select:none}
.custom-order-offer+.custom-order-offer{margin-top:17px}
.custom-order-radio{width:27px;height:27px;min-width:27px;border:1px solid #d6d6d6;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;background:#fff}
.custom-order-radio.active:after{content:'';display:block;width:15px;height:15px;border-radius:50%;background:#000}
.custom-order-offer-text{flex:1;text-align:right;color:#222;font-size:15px;font-weight:700;line-height:1.5}
.custom-order-bottom{margin-top:18px;display:flex;align-items:center;gap:14px;direction:rtl}
.custom-order-quantity{display:flex;align-items:center;gap:10px;flex-shrink:0}
.custom-order-quantity button{min-width:31px;width:31px;height:31px;border:1px solid #ddd;color:#222;background:#fff;border-radius:2px;padding:0;font-family:inherit;font-size:20px;line-height:1;cursor:pointer}
.custom-order-quantity button:hover{background:#fafafa}
.custom-order-quantity-value{min-width:18px;text-align:center;color:#222;font-size:16px;font-weight:700}
.custom-order-submit{flex:1;min-width:0;min-height:47px;margin:0;padding:0 15px;border:0;border-radius:0;color:#fff;background:#000;font-family:inherit;font-size:16px;font-weight:800;cursor:pointer}
.custom-order-submit:hover{background:#111}
.custom-order-submit:disabled{background:#000;color:#fff;opacity:.65;cursor:not-allowed}
.custom-order-success,.custom-order-unavailable,.custom-order-fake{width:100%;margin:50px 0;text-align:center;color:#222;font-size:32px;line-height:1.7}
.custom-order-success span,.custom-order-unavailable span,.custom-order-fake span{display:block}
@media(max-width:600px){
.custom-order-form{padding:20px 15px 16px}
.custom-order-title{font-size:14px}
.custom-order-fields{grid-template-columns:1fr}
.custom-order-offer-text{font-size:15px}
.custom-order-bottom{gap:10px}
.custom-order-submit{font-size:15px}
.custom-order-success,.custom-order-unavailable,.custom-order-fake{font-size:24px}
}
`;

function addStyles(){
if(document.getElementById('custom-order-style'))return;
const style=document.createElement('style');
style.id='custom-order-style';
style.textContent=CSS;
document.head.appendChild(style);
}

function escapeHtml(value){
return String(value).replace(/[&<>"']/g,function(char){
return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[char];
});
}

function getWilayaOptions(){
return Object.keys(WILAYAS).sort(function(a,b){return Number(a)-Number(b)}).map(function(id){
return '<option value="'+escapeHtml(WILAYAS[id].name)+'">'+String(id).padStart(2,'0')+' - '+escapeHtml(WILAYAS[id].name)+'</option>';
}).join('');
}

function createForm(){
const wrapper=document.createElement('div');

wrapper.innerHTML=`
<form class="custom-order-form">
<div class="custom-order-title">
للطلب أدخل معلوماتك في الخانات أسفله ⬇⬇ ثم إضغط على " إضغط هنا للطلب "
</div>

<div class="custom-order-fields">

<input
class="custom-order-input"
name="name"
type="text"
placeholder="الاسم الأول"
aria-label="الاسم الأول"
required
>

<input
class="custom-order-input"
name="phone"
type="tel"
inputmode="numeric"
maxlength="10"
placeholder="رقم الهاتف"
aria-label="رقم الهاتف"
required
>

<select
class="custom-order-select"
name="wilaya"
aria-label="الولاية"
required
>
<option value="">اختر الولاية</option>
${getWilayaOptions()}
</select>

<select
class="custom-order-select"
name="commune"
aria-label="البلدية"
required
disabled
>
<option value="">اختر البلدية</option>
</select>

</div>

<div class="custom-order-error custom-phone-error">
أدخل رقم هاتف صحيح
</div>

<div class="custom-order-error custom-submit-error"></div>

<div class="custom-order-offers">

<div class="custom-order-offer custom-offer-single">
<div class="custom-order-radio active"></div>
<div class="custom-order-offer-text">
عند طلب علبة 01&nbsp;&nbsp;<span class="single-price"></span> دج
</div>
</div>

<div class="custom-order-offer custom-offer-bundle">
<div class="custom-order-radio"></div>
<div class="custom-order-offer-text">
عند طلب 02 + واحدة مجانًا&nbsp;&nbsp;<span class="bundle-price"></span> دج
</div>
</div>

</div>

<div class="custom-order-bottom">

<div class="custom-order-quantity">

<button type="button" class="custom-minus">−</button>

<div class="custom-order-quantity-value">1</div>

<button type="button" class="custom-plus">+</button>

</div>

<button
type="submit"
class="custom-order-submit"
disabled
>
إضغط هنا للطلب
</button>

</div>

</form>
`;

return wrapper.firstElementChild;
}

function fillCommunes(form,wilaya){
const communeSelect=form.querySelector('[name="commune"]');

communeSelect.innerHTML='<option value="">اختر البلدية</option>';

const selected=Object.values(WILAYAS).find(function(item){
return item.name===wilaya;
});

if(!selected){
communeSelect.disabled=true;
return;
}

selected.communes.forEach(function(commune){
const option=document.createElement('option');
option.value=commune;
option.textContent=commune;
communeSelect.appendChild(option);
});

communeSelect.disabled=false;
}

function validateForm(form){
const name=form.querySelector('[name="name"]').value.trim();
const phone=form.querySelector('[name="phone"]').value.replace(/\s+/g,'');
const wilaya=form.querySelector('[name="wilaya"]').value;
const commune=form.querySelector('[name="commune"]').value;

const validPhone=/^0[5-7]\d{8}$/.test(phone);

const phoneError=form.querySelector('.custom-phone-error');
phoneError.style.display=phone&&!validPhone?'block':'none';

const submit=form.querySelector('.custom-order-submit');
submit.disabled=!validPhone||!name||!wilaya||!commune;

return {
name:name,
phone:phone,
wilaya:wilaya,
commune:commune,
validPhone:validPhone
};
}

function showSuccess(container){
container.innerHTML=`
<div class="custom-order-success">
<span>لقد تم تقديم طلبك بنجاح سيتم الاتصال بك قريبا لتأكيد طلبيتك</span>
<span>شكرا لك</span>
</div>
`;

window.scrollTo({
top:500,
behavior:'smooth'
});
}

function showUnavailable(container){
container.innerHTML=`
<div class="custom-order-unavailable">
<span>نعتدر التوصيل غير متوفر لولايتكم</span>
<span>شكرا لكم</span>
</div>
`;
}

function showFake(container,wilaya){
container.innerHTML=`
<div class="custom-order-fake">
<span>غير متوفر الآن ${escapeHtml(wilaya||'')} التوصيل لولايتك</span>
<span>نرجوا المعذرة و شكرا</span>
</div>
`;
}

function setupForm(container,form){

let quantity=1;
let selectedOffer='single';

const nameInput=form.querySelector('[name="name"]');
const phoneInput=form.querySelector('[name="phone"]');
const wilayaSelect=form.querySelector('[name="wilaya"]');
const communeSelect=form.querySelector('[name="commune"]');

const quantityValue=form.querySelector('.custom-order-quantity-value');

const minusButton=form.querySelector('.custom-minus');
const plusButton=form.querySelector('.custom-plus');

const singleOffer=form.querySelector('.custom-offer-single');
const bundleOffer=form.querySelector('.custom-offer-bundle');

const submitButton=form.querySelector('.custom-order-submit');

const singleRadio=singleOffer.querySelector('.custom-order-radio');
const bundleRadio=bundleOffer.querySelector('.custom-order-radio');

const submitError=form.querySelector('.custom-submit-error');

const price=Number(CONFIG.productPrice)||0;

form.querySelector('.single-price').textContent=price;
form.querySelector('.bundle-price').textContent=price*2;

function refresh(){
validateForm(form);
}

nameInput.addEventListener('input',refresh);
phoneInput.addEventListener('input',refresh);

wilayaSelect.addEventListener('change',function(){
fillCommunes(form,wilayaSelect.value);
refresh();
});

communeSelect.addEventListener('change',refresh);

minusButton.addEventListener('click',function(){
quantity=Math.max(1,quantity-1);
quantityValue.textContent=quantity;
});

plusButton.addEventListener('click',function(){
quantity+=1;
quantityValue.textContent=quantity;
});

singleOffer.addEventListener('click',function(){
selectedOffer='single';
singleRadio.classList.add('active');
bundleRadio.classList.remove('active');
quantity=1;
quantityValue.textContent='1';
});

bundleOffer.addEventListener('click',function(){
selectedOffer='bundle';
bundleRadio.classList.add('active');
singleRadio.classList.remove('active');
quantity=1;
quantityValue.textContent='1';
});

form.addEventListener('submit',async function(event){

event.preventDefault();

const values=validateForm(form);

if(!values.validPhone){
phoneInput.focus();
return;
}

if(!values.name||!values.wilaya||!values.commune){
return;
}

submitButton.disabled=true;
submitError.style.display='none';
submitError.textContent='';

const orderQty=Math.max(1,Number(quantity)||1);

const productQty=
selectedOffer==='bundle'
?orderQty*3
:orderQty;

const productsPrice=
selectedOffer==='bundle'
?price*2*orderQty
:price*orderQty;

const deliveryPrice=Number(CONFIG.deliveryPrice)||0;

const totalPrice=productsPrice+deliveryPrice;

const now=new Date();

const formData=new FormData();

formData.append(
'date',
`${now.getDate()}/${now.getMonth()+1} - ${now.getHours()}H : ${now.getMinutes()}M`
);

formData.append(
'product',
CONFIG.productName||''
);

formData.append(
'name',
values.name
);

formData.append(
'phone',
values.phone
);

formData.append(
'wilaya',
values.wilaya
);

formData.append(
'commune',
values.commune
);

formData.append(
'quantity',
String(productQty)
);

formData.append(
'offer',
selectedOffer==='bundle'
?'02 + 01 مجاناً'
:'01'
);

formData.append(
'prix',
String(totalPrice)
);

try{

if(!CONFIG.orderUrl){
throw new Error('Missing order endpoint');
}

const response=await fetch(
CONFIG.orderUrl,
{
method:'POST',
body:formData
}
);

if(!response.ok){
throw new Error('Order request failed');
}

showSuccess(container);

}catch(error){

console.error(error);

submitButton.disabled=false;

submitError.textContent=
'تعذر إرسال الطلب. يرجى المحاولة مرة أخرى.';

submitError.style.display='block';
}

});

refresh();

if(CONFIG.deliveryUnavailable){
showUnavailable(container);
return;
}

if(CONFIG.fakeBtn){
showFake(container,'');
}
}

function replaceOriginalForm(){

document.querySelectorAll('.product_form_checkout').forEach(function(container){

if(container.querySelector('.custom-order-form')){
return;
}

const originalForm=
container.querySelector('form:not(.custom-order-form)');

if(!originalForm){
return;
}

originalForm.style.setProperty(
'display',
'none',
'important'
);

const newForm=createForm();

container.insertBefore(newForm,originalForm);

setupForm(container,newForm);

});

}

function init(){

addStyles();

replaceOriginalForm();

const observer=new MutationObserver(function(){
replaceOriginalForm();
});

observer.observe(
document.documentElement,
{
childList:true,
subtree:true
});

}

if(document.readyState==='loading'){
document.addEventListener('DOMContentLoaded',init);
}else{
init();
}

})();
</script>
*/
