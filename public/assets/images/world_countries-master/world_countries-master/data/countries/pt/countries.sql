SET NAMES utf8;

DROP TABLE IF EXISTS `countries`;

CREATE TABLE `countries` (
  `id` int(11) NOT NULL,
  `alpha_2` char(2) NOT NULL DEFAULT "",
  `alpha_3` char(3) NOT NULL DEFAULT "",
  `name` varchar(75) NOT NULL DEFAULT "",
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

INSERT INTO `countries` (`id`, `alpha_2`, `alpha_3`, `name`) VALUES
(4,"af","afg","Afeganistão"),
(710,"za","zaf","África do Sul"),
(8,"al","alb","Albânia"),
(276,"de","deu","Alemanha"),
(20,"ad","and","Andorra"),
(24,"ao","ago","Angola"),
(28,"ag","atg","Antígua e Barbuda"),
(682,"sa","sau","Arábia Saudita"),
(12,"dz","dza","Argélia"),
(32,"ar","arg","Argentina"),
(51,"am","arm","Armênia"),
(36,"au","aus","Austrália"),
(40,"at","aut","Áustria"),
(31,"az","aze","Azerbaijão"),
(44,"bs","bhs","Bahamas"),
(50,"bd","bgd","Bangladexe"),
(52,"bb","brb","Barbados"),
(48,"bh","bhr","Barém"),
(56,"be","bel","Bélgica"),
(84,"bz","blz","Belize"),
(204,"bj","ben","Benim"),
(112,"by","blr","Bielorrússia"),
(68,"bo","bol","Bolívia"),
(70,"ba","bih","Bósnia e Herzegovina"),
(72,"bw","bwa","Botsuana"),
(76,"br","bra","Brasil"),
(96,"bn","brn","Brunei"),
(100,"bg","bgr","Bulgária"),
(854,"bf","bfa","Burquina Fasso"),
(108,"bi","bdi","Burundi"),
(64,"bt","btn","Butão"),
(132,"cv","cpv","Cabo Verde"),
(116,"kh","khm","Camboja"),
(120,"cm","cmr","Camarões"),
(124,"ca","can","Canadá"),
(634,"qa","qat","Catar"),
(398,"kz","kaz","Cazaquistão"),
(140,"cf","caf","República Centro-Africana"),
(148,"td","tcd","Chade"),
(203,"cz","cze","Chéquia"),
(152,"cl","chl","Chile"),
(156,"cn","chn","China"),
(196,"cy","cyp","Chipre"),
(170,"co","col","Colômbia"),
(174,"km","com","Comores"),
(178,"cg","cog","República do Congo"),
(180,"cd","cod","República Democrática do Congo"),
(410,"kr","kor","Coreia do Sul"),
(408,"kp","prk","Coreia do Norte"),
(384,"ci","civ","Costa do Marfim"),
(188,"cr","cri","Costa Rica"),
(191,"hr","hrv","Croácia"),
(192,"cu","cub","Cuba"),
(208,"dk","dnk","Dinamarca"),
(262,"dj","dji","Djibuti"),
(212,"dm","dma","Dominica"),
(214,"do","dom","República Dominicana"),
(818,"eg","egy","Egito"),
(222,"sv","slv","El Salvador"),
(784,"ae","are","Emirados Árabes Unidos"),
(218,"ec","ecu","Equador"),
(232,"er","eri","Eritreia"),
(703,"sk","svk","Eslováquia"),
(705,"si","svn","Eslovênia"),
(724,"es","esp","Espanha"),
(840,"us","usa","Estados Unidos"),
(233,"ee","est","Estónia"),
(748,"sz","swz","Essuatíni"),
(231,"et","eth","Etiópia"),
(242,"fj","fji","Fiji"),
(608,"ph","phl","Filipinas"),
(246,"fi","fin","Finlândia"),
(250,"fr","fra","França"),
(266,"ga","gab","Gabão"),
(270,"gm","gmb","Gâmbia"),
(288,"gh","gha","Gana"),
(268,"ge","geo","Geórgia"),
(308,"gd","grd","Granada"),
(300,"gr","grc","Grécia"),
(320,"gt","gtm","Guatemala"),
(328,"gy","guy","Guiana"),
(624,"gw","gnb","Guiné-Bissau"),
(324,"gn","gin","Guiné"),
(226,"gq","gnq","Guiné Equatorial"),
(332,"ht","hti","Haiti"),
(340,"hn","hnd","Honduras"),
(348,"hu","hun","Hungria"),
(887,"ye","yem","Iêmen"),
(356,"in","ind","Índia"),
(360,"id","idn","Indonésia"),
(368,"iq","irq","Iraque"),
(364,"ir","irn","Irã"),
(372,"ie","irl","Irlanda"),
(352,"is","isl","Islândia"),
(376,"il","isr","Israel"),
(380,"it","ita","Itália"),
(388,"jm","jam","Jamaica"),
(392,"jp","jpn","Japão"),
(400,"jo","jor","Jordânia"),
(414,"kw","kwt","Kuwait"),
(418,"la","lao","Laos"),
(426,"ls","lso","Lesoto"),
(428,"lv","lva","Letônia"),
(422,"lb","lbn","Líbano"),
(430,"lr","lbr","Libéria"),
(434,"ly","lby","Líbia"),
(438,"li","lie","Listenstaine"),
(440,"lt","ltu","Lituânia"),
(442,"lu","lux","Luxemburgo"),
(807,"mk","mkd","Macedônia do Norte"),
(450,"mg","mdg","Madagáscar"),
(458,"my","mys","Malásia"),
(454,"mw","mwi","Maláui"),
(462,"mv","mdv","Maldivas"),
(466,"ml","mli","Mali"),
(470,"mt","mlt","Malta"),
(504,"ma","mar","Marrocos"),
(584,"mh","mhl","Ilhas Marshall"),
(480,"mu","mus","Ilhas Maurícias"),
(478,"mr","mrt","Mauritânia"),
(484,"mx","mex","México"),
(104,"mm","mmr","Mianmar"),
(583,"fm","fsm","Estados Federados da Micronésia"),
(508,"mz","moz","Moçambique"),
(498,"md","mda","Moldávia"),
(492,"mc","mco","Mónaco"),
(496,"mn","mng","Mongólia"),
(499,"me","mne","Montenegro"),
(516,"na","nam","Namíbia"),
(520,"nr","nru","Nauru"),
(524,"np","npl","Nepal"),
(558,"ni","nic","Nicarágua"),
(562,"ne","ner","Níger"),
(566,"ng","nga","Nigéria"),
(578,"no","nor","Noruega"),
(554,"nz","nzl","Nova Zelândia"),
(512,"om","omn","Omã"),
(528,"nl","nld","Países Baixos"),
(585,"pw","plw","Palau"),
(591,"pa","pan","Panamá"),
(598,"pg","png","Papua-Nova Guiné"),
(586,"pk","pak","Paquistão"),
(600,"py","pry","Paraguai"),
(604,"pe","per","Peru"),
(616,"pl","pol","Polónia"),
(620,"pt","prt","Portugal"),
(404,"ke","ken","Quênia"),
(417,"kg","kgz","Quirguistão"),
(296,"ki","kir","Quiribáti"),
(826,"gb","gbr","Reino Unido"),
(642,"ro","rou","Roménia"),
(646,"rw","rwa","Ruanda"),
(643,"ru","rus","Rússia"),
(882,"ws","wsm","Samoa"),
(90,"sb","slb","Ilhas Salomão"),
(674,"sm","smr","San Marino"),
(662,"lc","lca","Santa Lúcia"),
(659,"kn","kna","São Cristóvão e Neves"),
(678,"st","stp","São Tomé e Príncipe"),
(670,"vc","vct","São Vicente e Granadinas"),
(690,"sc","syc","Seicheles"),
(686,"sn","sen","Senegal"),
(144,"lk","lka","Seri Lanca"),
(694,"sl","sle","Serra Leoa"),
(688,"rs","srb","Sérvia"),
(702,"sg","sgp","Singapura"),
(760,"sy","syr","Síria"),
(706,"so","som","Somália"),
(729,"sd","sdn","Sudão"),
(728,"ss","ssd","Sudão do Sul"),
(752,"se","swe","Suécia"),
(756,"ch","che","Suíça"),
(740,"sr","sur","Suriname"),
(764,"th","tha","Tailândia"),
(762,"tj","tjk","Tajiquistão"),
(834,"tz","tza","Tanzânia"),
(626,"tl","tls","Timor-Leste"),
(768,"tg","tgo","Togo"),
(776,"to","ton","Tonga"),
(780,"tt","tto","Trinidad e Tobago"),
(788,"tn","tun","Tunísia"),
(795,"tm","tkm","Turcomenistão"),
(792,"tr","tur","Turquia"),
(798,"tv","tuv","Tuvalu"),
(804,"ua","ukr","Ucrânia"),
(800,"ug","uga","Uganda"),
(858,"uy","ury","Uruguai"),
(860,"uz","uzb","Uzbequistão"),
(548,"vu","vut","Vanuatu"),
(862,"ve","ven","Venezuela"),
(704,"vn","vnm","Vietname"),
(894,"zm","zmb","Zâmbia"),
(716,"zw","zwe","Zimbábue")