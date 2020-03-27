$(document).ready(function() {
	console.log("document ready");

	states = ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'];
	
	districts = ['--Select--', 'Alappuzha', 'Ernakulam', 'Idukki', 'Kannur', 'Kasaragod', 'Kollam', 'Kottayam', 'Kozhikode', 'Malappuram', 'Palakkad', 'Pathanamthitta', 'Thiruvananthapuram', 'Thrissur', 'Wayanad'];
	
	districtMap = {
		"Alappuzha" : ['Arookutty', 'Chennam Pallippuram', 'Panavally', 'Perumbalam', 'Thycattussery', 'Aroor', 'Ezhupunna', 'Kuthiathode', 'Kodamthuruth', 'Thuravoor', 'Pattanakkad', 'Vayalar', 'Kadakkarapally', 'Kanjikkuzhy', 'Cherthala South', 'Thanneermukkam', 'Mararikkulam North', 'Aryad', 'Mannanchery', 'Mararikkulam South', 'Muhamma', 'Ambalappuzha South', 'Ambalappuzha North', 'Punnapra South', 'Punnapra North', 'Purakkad', 'Edathua', 'Kainakary', 'Champakkulam', 'Thakazhy', 'Thalavady', 'Nedumudi', 'Kavalam', 'Pulincunnu', 'Neelamperoor', 'Muttar', 'Ramankary', 'Veliyanad', 'Ala', 'Cheriyanad', 'Thiruvanvandoor', 'Pandanad', 'Puliyur', 'Budhannur', 'Mulakkuzha', 'Venmony', 'Karthikapally', 'Karuvatta', 'Kumarapuram', 'Cheruthana', 'Thrikkunnappuzha', 'Pallippad', 'Veeyapuram', 'Chennithala Thripperuthura', 'Chettikulangara', 'Thazhakkara', 'Mavelikkara Thekkekkara', 'Mannar', 'Chunakkara', 'Nooranad', 'Palamel', 'Bharanikkavu', 'Mavelikkara -Thamarakkulam', 'Vallikunnam', 'Aarattupuzha', 'Kandalloor', 'Krishnapuram', 'Chingoli', 'Cheppad', 'Devikulangara', 'Pathiyoor', 'Muthukulam', 'Alappuzha', 'Chengannur', 'Cherthala', 'Kayamkulam', 'Mavelikara', 'Harippad'],
		"Ernakulam" : ['Aikkaranadu', 'Alengadu', 'Amballur', 'Arakuzha', 'Asamannur', 'Avoli', 'Ayavana', 'Ayyampuzha', 'Chellanam', 'Chendamangalam', 'Chengamanad', 'Cheranallur', 'Chittattukara', 'Choornnikkara', 'Chottanikkara', 'Edakkattuvayal', 'Edathala', 'Edavanakkadu', 'Elamkunnappuzha', 'Elanji', 'Ezhikkara', 'Kadamakkudi', 'Kadungalloor', 'Kalady', 'Kalloorkadu', 'Kanjoor', 'Karukutty', 'Karumaloor', 'Kavalangad', 'Keerambara', 'Keezhmadu', 'Kizhakkambalam', 'Kottappadi', 'Kottuvalli', 'Kumbalam', 'Kumbalangi', 'Kunnathunadu', 'Kunnukara', 'Kuttambuzha', 'Kuvappady', 'Kuzhuppilli', 'Malayattoor -Neeleswaram', 'Maneed', 'Manjalloor', 'Manjapra', 'Marady', 'Mazhuvannur', 'Mookkannur', 'Mudakkuzha', 'Mulanthuruthi', 'Mulavukadu', 'Narayambalam', 'Nedumbassery', 'Nellikkuzhi', 'Njarakkal', 'Okkal', 'Paingottur', 'Palakkuzha', 'Pallarimangalam', 'Pallippuram', 'Pambakkuda', 'Parakadavu', 'Payipra', 'Pindimana', 'Poothrikka', 'Pothanikadu', 'Puthenvelikkara', 'Ramamangalam', 'Rayamangalam', 'Sreemoola Nagaram', 'Thirumaradi', 'Thiruvaniyoor', 'Thuravur', 'Udayamperoor', 'Vadakkekkara', 'Vadavukodu- Puthankurisu', 'Valakom', 'Varappetti', 'Varappuzha', 'Vazhakkulam', 'Vengola', 'Vengoor'],
		"Idukki" : ['Adimaly', 'Alakkode', 'Arakkuklam', 'Ayyappancoil', 'Bysonvalley', 'Chakkupallam', 'Chinnakkanal', 'Devikulam', 'Edavetty', 'Edamalakkudy', 'Elappara', 'Erattayar', 'Idukki-Kanjikuzhi', 'Kamakshi', 'Kanchiyar', 'Kanthalloor', 'Karimannoor', 'Karimkunnam', 'Karunapuram', 'Kodikkulam', 'Kokkayar', 'Konnathady', 'Kudayathoor', 'Kumali', 'Kumaramangalam', 'Manakkad', 'Mankulam', 'Marayoor', 'Mariyapuram', 'Munnar', 'Muttom', 'Nedumkandom', 'Pallivasal', 'Pampadumpara', 'Peerumedu', 'Peruvanthanam', 'Purappuzha', 'Rajakkad', 'Rajakumari', 'Santhanpara', 'Senapathy', 'Udumbanchola', 'Udumbannoor', 'Upputhara', 'Vandanmedu', 'Vandipperiyar', 'Vannappuram', 'Vathikkudy', 'Vattavada', 'Vazhathoppu', 'Vellathooval', 'Velliyamattom'],
		"Kannur" : ['PAYYANNUR', 'KALLIASSERI', 'THALIPARAMBA', 'IRIKKUR', 'KANNUR', 'EDAKKAD', 'THALASSERY', 'KUTHUPARAMBA', 'PANOOR', 'IRITTY', 'PERAVOOR', 'KOOTHUPARAMBU', 'MATTANNUR', 'PAYYANNUR', 'THALASSERY', 'THALIPARAMBA', 'ANTHOOR', 'PANOOR', 'IRITTY', 'SREE KANDAPURAM'],
		"Kasaragod" : ['Ajanur', 'Madikai', 'Pallikere', 'PullurPeriya', 'Udma', 'Bedadka', 'Belloor', 'Delampady', 'Karadka', 'Kumbadaje', 'Kuttikol', 'Muliyar', 'Badiadka', 'Chemnad', 'Chengala', 'Kumbla', 'Madhur', 'MogralPuthur', 'Enmakaje', 'Mangalpady', 'Manjeshwar', 'Meenja', 'Paivalike', 'Puthige', 'Vorkady', 'Cheruvathur', 'Kayyur Cheemeni', 'Padne', 'Pilicode', 'Trikaripur', 'Valiyaparamba', 'Balal', 'East Eleri', 'Kallar', 'Kinanoor – Karinthalam', 'KodomBelur', 'Panathady', 'WestEleri Grama Panchayat'],
		"kollam" : ['Kulathupuzha', 'Eroor', 'Alayamon', 'Anchal', 'Ariencavu', 'Edamulakkal', 'Karavaloor', 'Thenmala', 'Chithara', 'Kadakkal', 'Chadayamangalam', 'Ittiva', 'Elamadu', 'Nilamel', 'Velinallur', 'Kummil', 'Thekkumbhagom', 'Chavara', 'Panmana', 'Thevalkkara', 'Neendakara', 'Perinad', 'Kundara', 'Kizhakkekallada', 'Panayam', 'Perayam', 'Mundrothuruthu', 'Thrikkadavur', 'Thrikkaruva', 'Poothakkulam', 'Kalluvathukkal', 'Chathannur', 'Adichanallur', 'Chirakkara', 'Veliyam', 'Pooyappally', 'Kareepra', 'Ezhukone', 'Neduvathoor', 'Mayyanad', 'Thrikkovilvattom', 'Elampalloor', 'Kottamkara', 'Nedumpana', 'Oachira', 'Kulasekharapuram', 'Thazhava', 'Clappana', 'Alappad', 'Thodiyoor', 'Vilakkudy', 'Thalavoor', 'Piravanthoor', 'Pathanapuram', 'Pattazhi', 'Pattazhi Vadakkekkara', 'Poruvazhy', 'Sasthamcotta', 'Sooranadu North', 'Sooranadu South', 'West Kallada', 'Kunnathor', 'Mynagappally', 'Vettikkavala', 'Melila', 'Mylam', 'Kulakkada', 'Pavithreswaram', 'Ummannur', 'Paravoor', 'Punalur', 'Karunagappally', 'Kottarakkara Municipality'],
		"Kottayam" : ['Thalanadu', 'Thalappalam', 'Thidanadu', 'Thekkoy', 'Poonjar', 'Poonjar Thekkekkara', 'Melukavu', 'Monnilavu', 'Athirampuzha', 'Arpookkara', 'Aymanam', 'Kumarakom', 'Thiruvarppu', 'Neendoor', 'Kaduthuruthy', 'Kallara', 'Thalayolapparambu', 'Njeezhoor', 'Mulakkulam', 'Velloor', 'Erumely', 'Kanjirappally', 'Koottickal', 'Koruthodu', 'Parathodu', 'Manimala', 'Mundakkayam', 'Kadanadu', 'Karoor', 'Kozhuvanal', 'Bharananganam', 'Meenachil', 'Mutholy', 'Thrikkodithanam', 'Paippadu', 'Madappally', 'Vakathanam', 'Vazhappally', 'Name of the Panchayat', 'Ayarkunnam', 'Kurichy', 'Panachicadu', 'Puthuppally', 'Vijayapuram', 'Akalakkunnam', 'Elikkulam', 'Kooroppada', 'Pallickathodu', 'Pampady', 'Meenadom', 'Kidangoor', 'Manarcadu', 'Uzhavoor', 'Marangattupally', 'Kadaplamattom', 'Kanakkary', 'Kuravilangadu', 'Manjoor', 'Ramapuram', 'Veliyanoor', 'Udayanapuram', 'Chempu', 'T.V. Puram', 'Thalayazham', 'Maravanthuruthu', 'Vechoor', 'Kangazha', 'Chirakkadavu', 'Nedumkunnam', 'Vazhoor', 'Vellavoor', 'Kottayam', 'Changanacherry', 'Vaikom', 'Pala', 'Erattupetta', 'Ettumanoor'],
		"Kozhikode" : ['Azhiyur', 'Chorode', 'Eramala', 'Onchiyam', 'Chekkiad', 'Edacherry', 'Puramery', 'Thuneri', 'Valayam', 'Vanimel', 'Kunnummal', 'Nadapuram', 'Kayakkodi', 'Kavilumpara', 'Kuttaidy', 'Maruthomkara', 'Velom', 'Narippatta', 'Ayancherry', 'Villiappally', 'Maniyur', 'Thiruvallur', 'Thurayur', 'Keezhariyur', 'Thikkodi', 'Meppayur', 'Cheruvannur', 'Nochad', 'Changaroth', 'kayanna', 'Koothali', 'Perambra', 'Chakkittappara', 'Balusseri', 'Naduvannur', 'Atholi', 'Ulliyeri', 'Kottur', 'Unnikulam', 'Panangad', 'Koorachundu', 'Chemancherry', 'Arikkulam', 'Moodadi', 'Changottukavu', 'Kakkodi', 'Chelannur', 'Kakkur', 'Nanminda', 'Narikkuni', 'Thalakulathur', 'Thiruvampady', 'Koodaranji', 'Kizhakkoth', 'Madavoor', 'Puthuppady', 'Thamarassery', 'Omassery', 'Kattippara', 'Kodiyathur', 'Kuruvattur', 'Mavoor', 'Karasseri', 'Kunnamangalam', 'Chathamangalam', 'Kodencherry', 'Peruvayal', 'Perumanna', 'Kadalundy', 'Olavanna', 'Feroke Muncipality', 'Koduvally Muncipality', 'Koyilandy Muncipality', 'Mukkam Muncipality', 'Payyoli Muncipality', 'Ramanatukara Muncipality', 'Vadakara Muncipality'],
		"Thiruvananthapuram" : ['ANJUTENGU', 'ANDOORKONAM', 'ATHIYANNUR', 'AMBOORI', 'ARUVIKKARA', 'AZHOOR', 'AANADU', 'ARYANCODE', 'ARYANADU', 'EDAVA', 'ELAKAMON', 'UZHAMALAKKAL', 'OTTASEKHARAMANGALAM', 'OTTOOR', 'KADAKAVOOR', 'KADINAMKULAM', 'KARIMKULAM', 'KARUVARAM', 'KARUMKULAM', 'KALLARA', 'KALLIYOOR', 'KALLIKADU', 'KANJIRAMKULAM', 'KATTAKADA', 'KARODU', 'KILIMANOOR', 'KIZHUVILOM', 'KUNNATHUKAL', 'KUTTICHAL', 'KULATHOOR', 'KOLLAYIL', 'KOTTUKAL', 'CHURAYINKEEZHU', 'CHENKAL', 'CHEMMARUTHY', 'CHERYNNIYOOR', 'THIRUPURAM', 'THOLICODE', 'NAGAROOR', 'NANNIYODE', 'NAVAIKULAM', 'NELLANADU', 'PANAVOOR', 'PALLIKKAL', 'PALLICHAL', 'PAZHAYAKUNNUMAL', 'PANGODE', 'PARASALA', 'PULLAMPARA', 'PULIMAATHU', 'POOVACHAL', 'POOVAR', 'PERINGAMMALA', 'PERUMKADAVILA', 'POTHENCODE', 'BALARAMAPURAM', 'MANGALAPURAM', 'MADAVOOR', 'MANAMBOOR', 'MALAYINKEEZHU', 'MANICKAL', 'MAARANALLOOR', 'MUDAKKAL', 'VAKKOM', 'VAMANAPURAM', 'VITHURA', 'VILAPPIL', 'VILAVOORKAL', 'VENGANNOOR', 'VETTOOR', 'VEMBHAYAM', 'VELLANADU', 'VELLARADA', 'ATTINGAL', 'NEDUMANGADU', 'NEYYATTINKARA', 'VARKALA', 'THIRUVANANTHAPURAM']
	}

	pan_or_mun = ['ANJUTENGU', 'ANDOORKONAM', 'ATHIYANNUR', 'AMBOORI', 'ARUVIKKARA', 'AZHOOR', 'AANADU', 'ARYANCODE', 'ARYANADU', 'EDAVA', 'ELAKAMON', 'UZHAMALAKKAL', 'OTTASEKHARAMANGALAM', 'OTTOOR', 'KADAKAVOOR', 'KADINAMKULAM', 'KARIMKULAM', 'KARUVARAM', 'KARUMKULAM', 'KALLARA', 'KALLIYOOR', 'KALLIKADU', 'KANJIRAMKULAM', 'KATTAKADA', 'KARODU', 'KILIMANOOR', 'KIZHUVILOM', 'KUNNATHUKAL', 'KUTTICHAL', 'KULATHOOR', 'KOLLAYIL', 'KOTTUKAL', 'CHURAYINKEEZHU', 'CHENKAL', 'CHEMMARUTHY', 'CHERYNNIYOOR', 'THIRUPURAM', 'THOLICODE', 'NAGAROOR', 'NANNIYODE', 'NAVAIKULAM', 'NELLANADU', 'PANAVOOR', 'PALLIKKAL', 'PALLICHAL', 'PAZHAYAKUNNUMAL', 'PANGODE', 'PARASALA', 'PULLAMPARA', 'PULIMAATHU', 'POOVACHAL', 'POOVAR', 'PERINGAMMALA', 'PERUMKADAVILA', 'POTHENCODE', 'BALARAMAPURAM', 'MANGALAPURAM', 'MADAVOOR', 'MANAMBOOR', 'MALAYINKEEZHU', 'MANICKAL', 'MAARANALLOOR', 'MUDAKKAL', 'VAKKOM', 'VAMANAPURAM', 'VITHURA', 'VILAPPIL', 'VILAVOORKAL', 'VENGANNOOR', 'VETTOOR', 'VEMBHAYAM', 'VELLANADU', 'VELLARADA', 'ATTINGAL', 'NEDUMANGADU', 'NEYYATTINKARA', 'VARKALA', 'THIRUVANANTHAPURAM'];

	/*states.forEach(state => {
		$("#state").append(new Option(state, state));
	});*/

	districts.forEach(d => {
		$("#district").append(new Option(d, d));
	});

	$("#district")
	.change(function() {
		var dist = $("#district").val();

		$("#panchayat").empty();

		$("#panchayat").append("--Select--");

		districtMap[dist].forEach(x => {
			$("#panchayat").append(new Option(x.toUpperCase(), x.toUpperCase()));
		});
	});
});