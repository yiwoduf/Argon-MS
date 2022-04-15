/*
 
  최성우
  sqlstyle...

*/

importPackage(java.lang);
importPackage(Packages.handling.world);
importPackage(Packages.packet.creators);

var status = 0;
var beauty = 0;
var facenew;
var colors;
var hairnew;
var haircolor;
var skin = Array(0, 1, 2, 3, 4, 9, 10, 11, 12, 13);
var mface = Array(20000,20001,20002,20003,20004,20005,20006,20007,20008,20009,20010,20011,20012,20013,20014,20015,20016,20017,20018,20019,20020,20021,20022,20024,20025,20027,20028,20029,20030,20031,20032,20036,20037,20040,20043,20044,20045,20046,20047,20048,20049,20050,20053,20055,20056,20057,20058,20059,20060,20061,20062,20063,20064,20065,20066,20067,20068,20069);
var mhair = Array(30000,30020,30030,30040,30050,30060,30100,30110,30120,30130,30140,30150,30160,30170,30180,30190,30200,30210,30220,30230,30240,30250,30260,30270,30280,30290,30300,30310,30320,30330,30340,30350,30360,30370,30400,30410,30420,30440,30450,30460,30470,30480,30490,30510,30520,30530,30540,30560,30570,30590,30610,30620,30630,30640,30650,30660,30670,30680,30700,30710,30730,30760,30770,30790,30800,30810,30820,30830,30840,30850,30860,30870,30880,30910,30930,30940,30950,33030,33060,33070,33080,33090,33110,33120,33130,33150,33170,33180,33190,33210,33220,33250,33260,33270,33280,33310,33330,33350,33360,33370,33380,33390,33400,33410,33430,33440,33450,33460,33480,33500,33510,33520,33530,33550,33580,33590,33600,33610,33620,33630,33640,33660,33670,33680,33690,33700,33710,33720,33730,33740,33750,33760,33770,33780,33790,33800,33810,33820,33830,33930,33940,33950,33960);
var fface = Array(21000,21001,21002,21003,21004,21005,21006,21007,21008,21009,21010,21011,21012,21013,21014,21015,21016,21017,21018,21019,21020,21021,21023,21024,21026,21027,21028,21029,21030,21031,21033,21035,21036,21038,21041,21042,21043,21044,21045,21046,21047,21048,21052,21053,21054,21055,21056,21057,21058,21059,21060,21061,21062,21063,21064);
var fhair = Array(31000,31010,31020,31030,31040,31050,31060,31070,31080,31090,31100,31110,31120,31130,31140,31150,31160,31170,31180,31190,31200,31210,31220,31230,31240,31250,31260,31270,31280,31290,31300,31310,31320,31330,31340,31350,31400,31410,31420,31440,31450,31460,31470,31480,31490,31510,31520,31530,31540,31550,31560,31590,31610,31620,31630,31640,31650,31670,31680,31690,31700,31710,31720,31740,31750,31780,31790,31800,31810,31820,31840,31850,31860,31880,31890,31910,31920,31930,31940,31950,31990,34040,34070,34080,34090,34100,34110,34120,34130,34140,34150,34160,34170,34180,34190,34210,34220,34230,34240,34250,34260,34270,34310,34320,34330,34340,34360,34370,34380,34400,34410,34420,34430,34440,34450,34470,34480,34490,34510,34540,34560,34590,34600,34610,34620,34630,34640,34660,34670,34680,34690,34700,34710,34720,34730,34740,34750,34760,34770,34780,34790,34800,34810,34820,34830,34840,34850,34860,34870);
var select = -1;
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
		var chat = "#i4310129##t4310129#이 20개가 필요합니다 1마리당\r\n";
		chat += "\r\n#r#e[펫 목록]#k#n";
		chat += "\r\n#L0##i5000068##t5000068#를 선택합니다.";
		chat += "\r\n#L1##i5000072##t5000072#를 선택합니다.";
		chat += "\r\n#L2##i5000083##t5000083#를 선택합니다.";
		chat += "\r\n#L3##i5000084##t5000084#를 선택합니다.";
		chat += "\r\n#L4##i5000089##t5000089#를 선택합니다";
		chat += "\r\n#L5##i5000090##t5000090#를 선택합니다.";
		chat += "\r\n#L6##i5000202##t5000202#를 선택합니다.";
		chat += "\r\n#L7##i5000206##t5000206#를 선택합니다.";
		chat += "\r\n#L8##i5000210##t5000210#를 선택합니다.";
		chat += "\r\n#L9##i5000211##t5000211#를 선택합니다.";
		chat += "\r\n#L10##i5000215##t5000215#를 선택합니다.";
		chat += "\r\n#L11##i5000216##t5000216#를 선택합니다.";
		chat += "\r\n#L12##i5000217##t5000217#를 선택합니다.";
		chat += "\r\n#L13##i5000221##t5000221#를 선택합니다.";
		chat += "\r\n#L14##i5000225##t5000225#를 선택합니다.";
 	        chat += "\r\n#L15##i5000237##t5000237#를 선택합니다.";
		chat += "\r\n#L16##i5000239##t5000239#를 선택합니다.";
		chat += "\r\n#L17##i5000240##t5000240#를 선택합니다.";
		chat += "\r\n#L18##i5000243##t5000243#를 선택합니다.";
		chat += "\r\n#L19##i5000244##t5000244#를 선택합니다.";
		chat += "\r\n#L20##i5000245##t5000245#를 선택합니다.";
		chat += "\r\n#L21##i5000249##t5000249#를 선택합니다.";
 	        chat += "\r\n#L22##i5000250##t5000250#를 선택합니다.";
		chat += "\r\n#L23##i5000251##t5000251#를 선택합니다.";
		chat += "\r\n#L24##i5000256##t5000256#를 선택합니다.";
		chat += "\r\n#L25##i5000257##t5000257#를 선택합니다.";
		chat += "\r\n#L26##i5000258##t5000258#를 선택합니다.";
		chat += "\r\n#L27##i5000261##t5000261#를 선택합니다.";
		chat += "\r\n#L28##i5000271##t5000271#를 선택합니다.";
 	        chat += "\r\n#L29##i5000272##t5000272#를 선택합니다.";
		chat += "\r\n#L30##i5000273##t5000273#를 선택합니다.";
		chat += "\r\n#L31##i5000275##t5000275#를 선택합니다.";
		chat += "\r\n#L32##i5000276##t5000276#를 선택합니다.";
		chat += "\r\n#L33##i5000277##t5000277#를 선택합니다.";
		chat += "\r\n#L34##i5000281##t5000281#를 선택합니다.";
		chat += "\r\n#L35##i5000282##t5000282#를 선택합니다.";
 	        chat += "\r\n#L36##i5000283##t5000283#를 선택합니다.";
		chat += "\r\n#L37##i5000290##t5000290#를 선택합니다.";
		chat += "\r\n#L38##i5000291##t5000291#를 선택합니다.";
		chat += "\r\n#L39##i5000292##t5000292#를 선택합니다.";
		chat += "\r\n#L40##i5000293##t5000293#를 선택합니다.";
		chat += "\r\n#L41##i5000294##t5000294#를 선택합니다.";
		chat += "\r\n#L42##i5000295##t5000295#를 선택합니다.";
 	        chat += "\r\n#L43##i5000296##t5000296#를 선택합니다.";
		chat += "\r\n#L44##i5000297##t5000297#를 선택합니다.";
		chat += "\r\n#L45##i5000298##t5000298#를 선택합니다.";
		chat += "\r\n#L46##i5000309##t5000309#를 선택합니다.";
		chat += "\r\n#L47##i5000310##t5000310#를 선택합니다.";
		chat += "\r\n#L48##i5000311##t5000311#를 선택합니다.";
		chat += "\r\n#L49##i5000316##t5000316#를 선택합니다.";
 	        chat += "\r\n#L50##i5000317##t5000317#를 선택합니다.";
		chat += "\r\n#L51##i5000321##t5000321#를 선택합니다.";
		chat += "\r\n#L52##i5000322##t5000322#를 선택합니다.";
		chat += "\r\n#L53##i5000328##t5000328#를 선택합니다.";
		chat += "\r\n#L54##i5000331##t5000331#를 선택합니다.";
		chat += "\r\n#L55##i5000332##t5000332#를 선택합니다.";
		chat += "\r\n#L56##i5000342##t5000342#를 선택합니다.";
 	        chat += "\r\n#L57##i5000343##t5000343#를 선택합니다.";
		chat += "\r\n#L58##i5000344##t5000344#를 선택합니다.";
		chat += "\r\n#L59##i5000352##t5000352#를 선택합니다.";
		chat += "\r\n#L60##i5000353##t5000353#를 선택합니다.";
		chat += "\r\n#L61##i5000354##t5000354#를 선택합니다.";
		chat += "\r\n#L62##i5000365##t5000365#를 선택합니다.";
 	        chat += "\r\n#L63##i5000367##t5000367#를 선택합니다.";
		chat += "\r\n#L64##i5000375##t5000375#를 선택합니다.";
		chat += "\r\n#L65##i5000376##t5000376#를 선택합니다.";
		chat += "\r\n#L66##i5000377##t5000377#를 선택합니다.";
		chat += "\r\n#L67##i5000381##t5000381#를 선택합니다.";
		chat += "\r\n#L68##i5000383##t5000383#를 선택합니다.";
		chat += "\r\n#L69##i5000385##t5000385#를 선택합니다.";
		chat += "\r\n#L70##i5000386##t5000386#를 선택합니다.";
 	        chat += "\r\n#L71##i5000387##t5000387#를 선택합니다.";
		chat += "\r\n#L72##i5000402##t5000402#를 선택합니다.";
		chat += "\r\n#L73##i5000403##t5000403#를 선택합니다.";
		chat += "\r\n#L74##i5000404##t5000404#를 선택합니다.";
		chat += "\r\n#L75##i5000405##t5000405#를 선택합니다.";
		chat += "\r\n#L76##i5000406##t5000406#를 선택합니다.";
		chat += "\r\n#L77##i5000407##t5000407#를 선택합니다.";
 	        chat += "\r\n#L78##i5001003##t5001003#를 선택합니다.";
		chat += "\r\n#L79##i5001004##t5001004#를 선택합니다.";
		chat += "\r\n#L80##i5001005##t5001005#를 선택합니다.";
		chat += "\r\n#L81##i5001006##t5001006#를 선택합니다.";
		chat += "\r\n#L82##i5001007##t5001007#를 선택합니다.";
		chat += "\r\n#L83##i5001008##t5001008#를 선택합니다.";
		chat += "\r\n#L84##i5001009##t5001009#를 선택합니다.";
 	        chat += "\r\n#L85##i5001010##t5001010#를 선택합니다.";
		chat += "\r\n#L86##i5001011##t5001011#를 선택합니다.";
		cm.sendSimple(chat);

	} else if (selection == 0) {
		if (cm.haveItem(4310129, 20)) {
		cm.gainPets(5000068);
		cm.gainItem(4310129, -20);
		cm.sendOk("축하드립니다.친구가 당신을 선택하였군요.");
		cm.dispose();
	} else {
		cm.sendOk("최소한 친구를 같이 할 능력은 되어야하지 않겠습니까?");
		cm.dispose();
	}
	} else if (selection == 1) {
		if (cm.haveItem(4310129, 20)) {
		cm.gainPets(5000072);
		cm.gainItem(4310129, -20);
		cm.sendOk("축하드립니다.친구가 당신을 선택하였군요.");
		cm.dispose();
	} else {
		ccm.sendOk("최소한 친구를 같이 할 능력은 되어야하지 않겠습니까?");
		cm.dispose();
	}
	} else if (selection == 2) {
		if (cm.haveItem(4310129, 20)) {
		cm.gainPets(5000083);
		cm.gainItem(4310129, -20);
		cm.sendOk("축하드립니다.친구가 당신을 선택하였군요.");
		cm.dispose();
	} else {
		ccm.sendOk("최소한 친구를 같이 할 능력은 되어야하지 않겠습니까?");
		cm.dispose();
	}
	} else if (selection == 3) {
		if (cm.haveItem(4310129, 20)) {
		cm.gainPets(5000089);
		cm.gainItem(4310129, -20);
		cm.sendOk("축하드립니다.친구가 당신을 선택하였군요.");
		cm.dispose();
	} else {
		ccm.sendOk("최소한 친구를 같이 할 능력은 되어야하지 않겠습니까?");
		cm.dispose();
	}
	} else if (selection == 4) {
		if (cm.haveItem(4310129, 20)) {
		cm.gainPets(5000090);
		cm.gainItem(4310129, -20);
		cm.sendOk("축하드립니다.친구가 당신을 선택하였군요.");
		cm.dispose();
	} else {
		ccm.sendOk("최소한 친구를 같이 할 능력은 되어야하지 않겠습니까?");
		cm.dispose();
	}
	} else if (selection == 5) {
	        if (cm.haveItem(4310129, 20)) {
		cm.gainPets(5000171);
		cm.gainItem(4310129, -20);
		cm.sendOk("축하드립니다.친구가 당신을 선택하였군요.");
		cm.dispose();
	} else {
		ccm.sendOk("최소한 친구를 같이 할 능력은 되어야하지 않겠습니까?");
		cm.dispose();
	}
	} else if (selection == 6) {
		if (cm.haveItem(4310129, 20)) {
		cm.gainPets(5000202);
		cm.gainItem(4310129, -20);
		cm.sendOk("축하드립니다.친구가 당신을 선택하였군요.");
		cm.dispose();
	} else {
		ccm.sendOk("최소한 친구를 같이 할 능력은 되어야하지 않겠습니까?");
		cm.dispose();
	}
	} else if (selection == 7) {
		if (cm.haveItem(4310129, 20)) {
		cm.gainPets(5000206);
		cm.gainItem(4310129, -20);
		cm.sendOk("축하드립니다.친구가 당신을 선택하였군요.");
		cm.dispose();
	} else {
		ccm.sendOk("최소한 친구를 같이 할 능력은 되어야하지 않겠습니까?");
		cm.dispose();
	}
	} else if (selection == 8) {
		if (cm.haveItem(4310129, 20)) {
		cm.gainPets(5000210);
		cm.gainItem(4310129, -20);
		cm.sendOk("축하드립니다.친구가 당신을 선택하였군요.");
		cm.dispose();
	} else {
		ccm.sendOk("최소한 친구를 같이 할 능력은 되어야하지 않겠습니까?");
		cm.dispose();
	}
	} else if (selection == 9) {
		if (cm.haveItem(4310129, 20)) {
		cm.gainPets(5000211);
		cm.gainItem(4310129, -20);
		cm.sendOk("축하드립니다.친구가 당신을 선택하였군요.");
		cm.dispose();
	} else {
		ccm.sendOk("최소한 친구를 같이 할 능력은 되어야하지 않겠습니까?");
		cm.dispose();
	}
	} else if (selection == 10) {
		if (cm.haveItem(4310129, 20)) {
		cm.gainPets(5000215);
		cm.gainItem(4310129, -20);
		cm.sendOk("축하드립니다.친구가 당신을 선택하였군요.");
		cm.dispose();
	} else {
		ccm.sendOk("최소한 친구를 같이 할 능력은 되어야하지 않겠습니까?");
		cm.dispose();
	}
	} else if (selection == 11) {
		if (cm.haveItem(4310129, 20)) {
		cm.gainPets(5000216);
		cm.gainItem(4310129, -20);
		cm.sendOk("축하드립니다.친구가 당신을 선택하였군요.");
		cm.dispose();
	} else {
		ccm.sendOk("최소한 친구를 같이 할 능력은 되어야하지 않겠습니까?");
		cm.dispose();
	}
	} else if (selection == 12) {
		if (cm.haveItem(4310129, 20)) {
		cm.gainPets(5000217);
		cm.gainItem(4310129, -20);
		cm.sendOk("축하드립니다.친구가 당신을 선택하였군요.");
		cm.dispose();
	} else {
		ccm.sendOk("최소한 친구를 같이 할 능력은 되어야하지 않겠습니까?");
		cm.dispose();
	}
	} else if (selection == 13) {
		if (cm.haveItem(4310129, 20)) {
		cm.gainPets(5000221);
		cm.gainItem(4310129, -20);
		cm.sendOk("축하드립니다.친구가 당신을 선택하였군요.");
		cm.dispose();
	} else {
		ccm.sendOk("최소한 친구를 같이 할 능력은 되어야하지 않겠습니까?");
		cm.dispose();
	}
	} else if (selection == 14) {
		if (cm.haveItem(4310129, 20)) {
		cm.gainPets(5000225);
		cm.gainItem(4310129, -20);
		cm.sendOk("축하드립니다.친구가 당신을 선택하였군요.");
		cm.dispose();
	} else {
		ccm.sendOk("최소한 친구를 같이 할 능력은 되어야하지 않겠습니까?");
		cm.dispose();
	}
	} else if (selection == 15) {
		if (cm.haveItem(4310129, 20)) {
		cm.gainPets(5000237);
		cm.gainItem(4310129, -20);
		cm.sendOk("축하드립니다.친구가 당신을 선택하였군요.");
		cm.dispose();
	} else {
		ccm.sendOk("최소한 친구를 같이 할 능력은 되어야하지 않겠습니까?");
		cm.dispose();
	}
	} else if (selection == 16) {
		if (cm.haveItem(4310129, 20)) {
		cm.gainPets(5000239);
		cm.gainItem(4310129, -20);
		cm.sendOk("축하드립니다.친구가 당신을 선택하였군요.");
		cm.dispose();
	} else {
		ccm.sendOk("최소한 친구를 같이 할 능력은 되어야하지 않겠습니까?");
		cm.dispose();
	}
	} else if (selection == 17) {
		if (cm.haveItem(4310129, 20)) {
		cm.gainPets(5000240);
		cm.gainItem(4310129, -20);
		cm.sendOk("축하드립니다.친구가 당신을 선택하였군요.");
		cm.dispose();
	} else {
		ccm.sendOk("최소한 친구를 같이 할 능력은 되어야하지 않겠습니까?");
		cm.dispose();
	}
	} else if (selection == 18) {
		if (cm.haveItem(4310129, 20)) {
		cm.gainPets(5000243);
		cm.gainItem(4310129, -20);
		cm.sendOk("축하드립니다.친구가 당신을 선택하였군요.");
		cm.dispose();
	} else {
		ccm.sendOk("최소한 친구를 같이 할 능력은 되어야하지 않겠습니까?");
		cm.dispose();
	}
	} else if (selection == 19) {
		if (cm.haveItem(4310129, 20)) {
		cm.gainPets(5000244);
		cm.gainItem(4310129, -20);
		cm.sendOk("축하드립니다.친구가 당신을 선택하였군요.");
		cm.dispose();
	} else {
		ccm.sendOk("최소한 친구를 같이 할 능력은 되어야하지 않겠습니까?");
		cm.dispose();
	}
	} else if (selection == 20) {
		if (cm.haveItem(4310129, 20)) {
		cm.gainPets(5000245);
		cm.gainItem(4310129, -20);
		cm.sendOk("축하드립니다.친구가 당신을 선택하였군요.");
		cm.dispose();
	} else {
		ccm.sendOk("최소한 친구를 같이 할 능력은 되어야하지 않겠습니까?");
		cm.dispose();
	}
	} else if (selection == 21) {
		if (cm.haveItem(4310129, 20)) {
		cm.gainPets(5000249);
		cm.gainItem(4310129, -20);
		cm.sendOk("축하드립니다.친구가 당신을 선택하였군요.");
		cm.dispose();
	} else {
		ccm.sendOk("최소한 친구를 같이 할 능력은 되어야하지 않겠습니까?");
		cm.dispose();
	}
	} else if (selection == 22) {
		if (cm.haveItem(4310129, 20)) {
		cm.gainPets(5000250);
		cm.gainItem(4310129, -20);
		cm.sendOk("축하드립니다.친구가 당신을 선택하였군요.");
		cm.dispose();
	} else {
		ccm.sendOk("최소한 친구를 같이 할 능력은 되어야하지 않겠습니까?");
		cm.dispose();
	}
	} else if (selection == 23) {
		if (cm.haveItem(4310129, 20)) {
		cm.gainPets(5000251);
		cm.gainItem(4310129, -20);
		cm.sendOk("축하드립니다.친구가 당신을 선택하였군요.");
		cm.dispose();
	} else {
		ccm.sendOk("최소한 친구를 같이 할 능력은 되어야하지 않겠습니까?");
		cm.dispose();
	}
	} else if (selection == 24) {
		if (cm.haveItem(4310129, 20)) {
		cm.gainPets(5000256);
		cm.gainItem(4310129, -20);
		cm.sendOk("축하드립니다.친구가 당신을 선택하였군요.");
		cm.dispose();
	} else {
		ccm.sendOk("최소한 친구를 같이 할 능력은 되어야하지 않겠습니까?");
		cm.dispose();
	}
	} else if (selection == 25) {
		if (cm.haveItem(4310129, 20)) {
		cm.gainPets(5000257);
		cm.gainItem(4310129, -20);
		cm.sendOk("축하드립니다.친구가 당신을 선택하였군요.");
		cm.dispose();
	} else {
		ccm.sendOk("최소한 친구를 같이 할 능력은 되어야하지 않겠습니까?");
		cm.dispose();
	}
	} else if (selection == 26) {
		if (cm.haveItem(4310129, 20)) {
		cm.gainPets(5000258);
		cm.gainItem(4310129, -20);
		cm.sendOk("축하드립니다.친구가 당신을 선택하였군요.");
		cm.dispose();
	} else {
		ccm.sendOk("최소한 친구를 같이 할 능력은 되어야하지 않겠습니까?");
		cm.dispose();
	}
	} else if (selection == 27) {
		if (cm.haveItem(4310129, 20)) {
		cm.gainPets(5000261);
		cm.gainItem(4310129, -20);
		cm.sendOk("축하드립니다.친구가 당신을 선택하였군요.");
		cm.dispose();
	} else {
		ccm.sendOk("최소한 친구를 같이 할 능력은 되어야하지 않겠습니까?");
		cm.dispose();
	}
	} else if (selection == 28) {
		if (cm.haveItem(4310129, 20)) {
		cm.gainPets(5000271);
		cm.gainItem(4310129, -20);
		cm.sendOk("축하드립니다.친구가 당신을 선택하였군요.");
		cm.dispose();
	} else {
		ccm.sendOk("최소한 친구를 같이 할 능력은 되어야하지 않겠습니까?");
		cm.dispose();
	}
	} else if (selection == 29) {
		if (cm.haveItem(4310129, 20)) {
		cm.gainPets(5000272);
		cm.gainItem(4310129, -20);
		cm.sendOk("축하드립니다.친구가 당신을 선택하였군요.");
		cm.dispose();
	} else {
		ccm.sendOk("최소한 친구를 같이 할 능력은 되어야하지 않겠습니까?");
		cm.dispose();
	}
	} else if (selection == 30) {
		if (cm.haveItem(4310129, 20)) {
		cm.gainPets(5000273);
		cm.gainItem(4310129, -20);
		cm.sendOk("축하드립니다.친구가 당신을 선택하였군요.");
		cm.dispose();
	} else {
		ccm.sendOk("최소한 친구를 같이 할 능력은 되어야하지 않겠습니까?");
		cm.dispose();
	}
	} else if (selection == 31) {
		if (cm.haveItem(4310129, 20)) {
		cm.gainPets(5000275);
		cm.gainItem(4310129, -20);
		cm.sendOk("축하드립니다.친구가 당신을 선택하였군요.");
		cm.dispose();
	} else {
		ccm.sendOk("최소한 친구를 같이 할 능력은 되어야하지 않겠습니까?");
		cm.dispose();
	}
	} else if (selection == 32) {
		if (cm.haveItem(4310129, 20)) {
		cm.gainPets(5000276);
		cm.gainItem(4310129, -20);
		cm.sendOk("축하드립니다.친구가 당신을 선택하였군요.");
		cm.dispose();
	} else {
		ccm.sendOk("최소한 친구를 같이 할 능력은 되어야하지 않겠습니까?");
		cm.dispose();
	}
	} else if (selection == 33) {
		if (cm.haveItem(4310129, 20)) {
		cm.gainPets(5000277);
		cm.gainItem(4310129, -20);
		cm.sendOk("축하드립니다.친구가 당신을 선택하였군요.");
		cm.dispose();
	} else {
		ccm.sendOk("최소한 친구를 같이 할 능력은 되어야하지 않겠습니까?");
		cm.dispose();
	}
	} else if (selection == 34) {
		if (cm.haveItem(4310129, 20)) {
		cm.gainPets(5000281);
		cm.gainItem(4310129, -20);
		cm.sendOk("축하드립니다.친구가 당신을 선택하였군요.");
		cm.dispose();
	} else {
		ccm.sendOk("최소한 친구를 같이 할 능력은 되어야하지 않겠습니까?");
		cm.dispose();
	}
	} else if (selection == 35) {
		if (cm.haveItem(4310129, 20)) {
		cm.gainPets(5000282);
		cm.gainItem(4310129, -20);
		cm.sendOk("축하드립니다.친구가 당신을 선택하였군요.");
		cm.dispose();
	} else {
		ccm.sendOk("최소한 친구를 같이 할 능력은 되어야하지 않겠습니까?");
		cm.dispose();
	}
	} else if (selection == 36) {
		if (cm.haveItem(4310129, 20)) {
		cm.gainPets(5000283);
		cm.gainItem(4310129, -20);
		cm.sendOk("축하드립니다.친구가 당신을 선택하였군요.");
		cm.dispose();
	} else {
		ccm.sendOk("최소한 친구를 같이 할 능력은 되어야하지 않겠습니까?");
		cm.dispose();
	}
	} else if (selection == 37) {
		if (cm.haveItem(4310129, 20)) {
		cm.gainPets(5000290);
		cm.gainItem(4310129, -20);
		cm.sendOk("축하드립니다.친구가 당신을 선택하였군요.");
		cm.dispose();
	} else {
		ccm.sendOk("최소한 친구를 같이 할 능력은 되어야하지 않겠습니까?");
		cm.dispose();
	}
	} else if (selection == 38) {
		if (cm.haveItem(4310129, 20)) {
		cm.gainPets(5000291);
		cm.gainItem(4310129, -20);
		cm.sendOk("축하드립니다.친구가 당신을 선택하였군요.");
		cm.dispose();
	} else {
		ccm.sendOk("최소한 친구를 같이 할 능력은 되어야하지 않겠습니까?");
		cm.dispose();
	}
	} else if (selection == 39) {
		if (cm.haveItem(4310129, 20)) {
		cm.gainPets(5000292);
		cm.gainItem(4310129, -20);
		cm.sendOk("축하드립니다.친구가 당신을 선택하였군요.");
		cm.dispose();
	} else {
		ccm.sendOk("최소한 친구를 같이 할 능력은 되어야하지 않겠습니까?");
		cm.dispose();
	}
	} else if (selection == 40) {
		if (cm.haveItem(4310129, 20)) {
		cm.gainPets(5000293);
		cm.gainItem(4310129, -20);
		cm.sendOk("축하드립니다.친구가 당신을 선택하였군요.");
		cm.dispose();
	} else {
		ccm.sendOk("최소한 친구를 같이 할 능력은 되어야하지 않겠습니까?");
		cm.dispose();
	}
	} else if (selection == 41) {
		if (cm.haveItem(4310129, 20)) {
		cm.gainPets(5000294);
		cm.gainItem(4310129, -20);
		cm.sendOk("축하드립니다.친구가 당신을 선택하였군요.");
		cm.dispose();
	} else {
		ccm.sendOk("최소한 친구를 같이 할 능력은 되어야하지 않겠습니까?");
		cm.dispose();
	}
	} else if (selection == 42) {
		if (cm.haveItem(4310129, 20)) {
		cm.gainPets(5000295);
		cm.gainItem(4310129, -20);
		cm.sendOk("축하드립니다.친구가 당신을 선택하였군요.");
		cm.dispose();
	} else {
		ccm.sendOk("최소한 친구를 같이 할 능력은 되어야하지 않겠습니까?");
		cm.dispose();
	}
	} else if (selection == 43) {
		if (cm.haveItem(4310129, 20)) {
		cm.gainPets(5000296);
		cm.gainItem(4310129, -20);
		cm.sendOk("축하드립니다.친구가 당신을 선택하였군요.");
		cm.dispose();
	} else {
		ccm.sendOk("최소한 친구를 같이 할 능력은 되어야하지 않겠습니까?");
		cm.dispose();
	}
	} else if (selection == 44) {
		if (cm.haveItem(4310129, 20)) {
		cm.gainPets(5000297);
		cm.gainItem(4310129, -20);
		cm.sendOk("축하드립니다.친구가 당신을 선택하였군요.");
		cm.dispose();
	} else {
		ccm.sendOk("최소한 친구를 같이 할 능력은 되어야하지 않겠습니까?");
		cm.dispose();
	}
	} else if (selection == 45) {
		if (cm.haveItem(4310129, 20)) {
		cm.gainPets(5000298);
		cm.gainItem(4310129, -20);
		cm.sendOk("축하드립니다.친구가 당신을 선택하였군요.");
		cm.dispose();
	} else {
		ccm.sendOk("최소한 친구를 같이 할 능력은 되어야하지 않겠습니까?");
		cm.dispose();
	}
	} else if (selection == 46) {
		if (cm.haveItem(4310129, 20)) {
		cm.gainPets(5000309);
		cm.gainItem(4310129, -20);
		cm.sendOk("축하드립니다.친구가 당신을 선택하였군요.");
		cm.dispose();
	} else {
		ccm.sendOk("최소한 친구를 같이 할 능력은 되어야하지 않겠습니까?");
		cm.dispose();
	}
	} else if (selection == 44) {
		if (cm.haveItem(4310129, 20)) {
		cm.gainPets(5001009);
		cm.gainItem(4310129, -20);
		cm.sendOk("축하드립니다.친구가 당신을 선택하였군요.");
		cm.dispose();
	} else {
		ccm.sendOk("최소한 친구를 같이 할 능력은 되어야하지 않겠습니까?");
		cm.dispose();
	}
	} else if (selection == 47) {
		if (cm.haveItem(4310129, 20)) {
		cm.gainPets(5000310);
		cm.gainItem(4310129, -20);
		cm.sendOk("축하드립니다.친구가 당신을 선택하였군요.");
		cm.dispose();
	} else {
		ccm.sendOk("최소한 친구를 같이 할 능력은 되어야하지 않겠습니까?");
		cm.dispose();
	}
	} else if (selection == 48) {
		if (cm.haveItem(4310129, 20)) {
		cm.gainPets(5000311);
		cm.gainItem(4310129, -20);
		cm.sendOk("축하드립니다.친구가 당신을 선택하였군요.");
		cm.dispose();
	} else {
		ccm.sendOk("최소한 친구를 같이 할 능력은 되어야하지 않겠습니까?");
		cm.dispose();
	}
	} else if (selection == 49) {
		if (cm.haveItem(4310129, 20)) {
		cm.gainPets(5000316);
		cm.gainItem(4310129, -20);
		cm.sendOk("축하드립니다.친구가 당신을 선택하였군요.");
		cm.dispose();
	} else {
		ccm.sendOk("최소한 친구를 같이 할 능력은 되어야하지 않겠습니까?");
		cm.dispose();
	}
	} else if (selection == 50) {
		if (cm.haveItem(4310129, 20)) {
		cm.gainPets(5000317);
		cm.gainItem(4310129, -20);
		cm.sendOk("축하드립니다.친구가 당신을 선택하였군요.");
		cm.dispose();
	} else {
		ccm.sendOk("최소한 친구를 같이 할 능력은 되어야하지 않겠습니까?");
		cm.dispose();
	}
	} else if (selection == 51) {
		if (cm.haveItem(4310129, 20)) {
		cm.gainPets(5000321);
		cm.gainItem(4310129, -20);
		cm.sendOk("축하드립니다.친구가 당신을 선택하였군요.");
		cm.dispose();
	} else {
		ccm.sendOk("최소한 친구를 같이 할 능력은 되어야하지 않겠습니까?");
		cm.dispose();
	}
	} else if (selection == 52) {
		if (cm.haveItem(4310129, 20)) {
		cm.gainPets(5000322);
		cm.gainItem(4310129, -20);
		cm.sendOk("축하드립니다.친구가 당신을 선택하였군요.");
		cm.dispose();
	} else {
		ccm.sendOk("최소한 친구를 같이 할 능력은 되어야하지 않겠습니까?");
		cm.dispose();
	}
	} else if (selection == 53) {
		if (cm.haveItem(4310129, 20)) {
		cm.gainPets(5000328);
		cm.gainItem(4310129, -20);
		cm.sendOk("축하드립니다.친구가 당신을 선택하였군요.");
		cm.dispose();
	} else {
		ccm.sendOk("최소한 친구를 같이 할 능력은 되어야하지 않겠습니까?");
		cm.dispose();
	}
	} else if (selection == 54) {
		if (cm.haveItem(4310129, 20)) {
		cm.gainPets(5000331);
		cm.gainItem(4310129, -20);
		cm.sendOk("축하드립니다.친구가 당신을 선택하였군요.");
		cm.dispose();
	} else {
		ccm.sendOk("최소한 친구를 같이 할 능력은 되어야하지 않겠습니까?");
		cm.dispose();
	}
	} else if (selection == 55) {
		if (cm.haveItem(4310129, 20)) {
		cm.gainPets(5000332);
		cm.gainItem(4310129, -20);
		cm.sendOk("축하드립니다.친구가 당신을 선택하였군요.");
		cm.dispose();
	} else {
		ccm.sendOk("최소한 친구를 같이 할 능력은 되어야하지 않겠습니까?");
		cm.dispose();
	}
	} else if (selection == 56) {
		if (cm.haveItem(4310129, 20)) {
		cm.gainPets(5000342);
		cm.gainItem(4310129, -20);
		cm.sendOk("축하드립니다.친구가 당신을 선택하였군요.");
		cm.dispose();
	} else {
		ccm.sendOk("최소한 친구를 같이 할 능력은 되어야하지 않겠습니까?");
		cm.dispose();
	}
	} else if (selection == 57) {
		if (cm.haveItem(4310129, 20)) {
		cm.gainPets(5000343);
		cm.gainItem(4310129, -20);
		cm.sendOk("축하드립니다.친구가 당신을 선택하였군요.");
		cm.dispose();
	} else {
		ccm.sendOk("최소한 친구를 같이 할 능력은 되어야하지 않겠습니까?");
		cm.dispose();
	}
	} else if (selection == 58) {
		if (cm.haveItem(4310129, 20)) {
		cm.gainPets(5000344);
		cm.gainItem(4310129, -20);
		cm.sendOk("축하드립니다.친구가 당신을 선택하였군요.");
		cm.dispose();
	} else {
		ccm.sendOk("최소한 친구를 같이 할 능력은 되어야하지 않겠습니까?");
		cm.dispose();
	}
	} else if (selection == 59) {
		if (cm.haveItem(4310129, 20)) {
		cm.gainPets(5000352);
		cm.gainItem(4310129, -20);
		cm.sendOk("축하드립니다.친구가 당신을 선택하였군요.");
		cm.dispose();
	} else {
		cm.sendOk("최소한 친구를 같이 할 능력은 되어야하지 않겠습니까?");
		cm.dispose();
	}
	} else if (selection == 60) {
		if (cm.haveItem(4310129, 20)) {
		cm.gainPets(5000353);
		cm.gainItem(4310129, -20);
		cm.sendOk("축하드립니다.친구가 당신을 선택하였군요.");
		cm.dispose();
	} else {
		cm.sendOk("최소한 친구를 같이 할 능력은 되어야하지 않겠습니까?");
		cm.dispose();
	}
	} else if (selection == 61) {
                if (cm.haveItem(4310129, 20)) {
		cm.gainPets(5000354);
		cm.gainItem(4310129, -20);
		cm.sendOk("축하드립니다.친구가 당신을 선택하였군요.");
		cm.dispose();
	} else {
		ccm.sendOk("최소한 친구를 같이 할 능력은 되어야하지 않겠습니까?");
		cm.dispose();
	}
	} else if (selection == 62) {
		if (cm.haveItem(4310129, 20)) {
		cm.gainPets(5000365);
		cm.gainItem(4310129, -20);
		cm.sendOk("축하드립니다.친구가 당신을 선택하였군요.");
		cm.dispose();
	} else {
		ccm.sendOk("최소한 친구를 같이 할 능력은 되어야하지 않겠습니까?");
		cm.dispose();
	}
	} else if (selection == 63) {
		if (cm.haveItem(4310129, 20)) {
		cm.gainPets(5000367);
		cm.gainItem(4310129, -20);
		cm.sendOk("축하드립니다.친구가 당신을 선택하였군요.");
		cm.dispose();
	} else {
		cm.sendOk("최소한 친구를 같이 할 능력은 되어야하지 않겠습니까?");
		cm.dispose();
	}
	} else if (selection == 64) {
		if (cm.haveItem(4310129, 20)) {
		cm.gainPets(5000375);
		cm.gainItem(4310129, -20);
		cm.sendOk("축하드립니다.친구가 당신을 선택하였군요.");
		cm.dispose();
	} else {
		cm.sendOk("최소한 친구를 같이 할 능력은 되어야하지 않겠습니까?");
		cm.dispose();
	}
	} else if (selection == 65) {
		if (cm.haveItem(4310129, 20)) {
		cm.gainPets(5000376);
		cm.gainItem(4310129, -20);
		cm.sendOk("축하드립니다.친구가 당신을 선택하였군요.");
		cm.dispose();
	} else {
		cm.sendOk("최소한 친구를 같이 할 능력은 되어야하지 않겠습니까?");
		cm.dispose();
	}
	} else if (selection == 66) {
                if   (cm.haveItem(4310129 , 20)) {
		cm.gainPets(5000377);
		cm.gainItem(4310129 , -20); 
                cm.sendOk("축하드립니다.친구가 당신을 선택하였군요.");
                cm.dispose();
        } else {
                cm.sendOk("최소한 친구를 같이 할 능력은 되어야하지 않겠습니까?");
        }
	} else if (selection == 67) {
		if (cm.haveItem(4310129, 20)) {
		cm.gainPets(5000381);
		cm.gainItem(4310129, -20);
		cm.sendOk("축하드립니다.친구가 당신을 선택하였군요.");
		cm.dispose();
	} else {
		ccm.sendOk("최소한 친구를 같이 할 능력은 되어야하지 않겠습니까?");
		cm.dispose();
	}
	} else if (selection == 68) {
		if (cm.haveItem(4310129, 20)) {
		cm.gainPets(5000383);
		cm.gainItem(4310129, -20);
		cm.sendOk("축하드립니다.친구가 당신을 선택하였군요.");
		cm.dispose();
	} else {
		ccm.sendOk("최소한 친구를 같이 할 능력은 되어야하지 않겠습니까?");
		cm.dispose();
	}
	} else if (selection == 69) {
		if (cm.haveItem(4310129, 20)) {
		cm.gainPets(5000385);
		cm.gainItem(4310129, -20);
		cm.sendOk("축하드립니다.친구가 당신을 선택하였군요.");
		cm.dispose();
	} else {
		cm.sendOk("최소한 친구를 같이 할 능력은 되어야하지 않겠습니까?");
		cm.dispose();
	}
	} else if (selection == 70) {
		if (cm.haveItem(4310129, 20)) {
		cm.gainPets(5000386);
		cm.gainItem(4310129, -20);
		cm.sendOk("축하드립니다.친구가 당신을 선택하였군요.");
		cm.dispose();
	} else {
		cm.sendOk("최소한 친구를 같이 할 능력은 되어야하지 않겠습니까?");
		cm.dispose();
	}
	} else if (selection == 71) {
		if (cm.haveItem(4310129, 20)) {
		cm.gainPets(5000387);
		cm.gainItem(4310129, -20);
		cm.sendOk("축하드립니다.친구가 당신을 선택하였군요.");
		cm.dispose();
	} else {
		ccm.sendOk("최소한 친구를 같이 할 능력은 되어야하지 않겠습니까?");
		cm.dispose();
	}
	} else if (selection == 72) {
		if (cm.haveItem(4310129, 20)) {
		cm.gainPets(5000402);
		cm.gainItem(4310129, -20);
		cm.sendOk("축하드립니다.친구가 당신을 선택하였군요.");
		cm.dispose();
	} else {
		ccm.sendOk("최소한 친구를 같이 할 능력은 되어야하지 않겠습니까?");
		cm.dispose();
	}
	} else if (selection == 73) {
		if (cm.haveItem(4310129, 20)) {
		cm.gainPets(5000403);
		cm.gainItem(4310129, -20);
		cm.sendOk("축하드립니다.친구가 당신을 선택하였군요.");
		cm.dispose();
	} else {
		ccm.sendOk("최소한 친구를 같이 할 능력은 되어야하지 않겠습니까?");
		cm.dispose();
	}
	} else if (selection == 74) {
		if (cm.haveItem(4310129, 20)) {
		cm.gainPets(5000404);
		cm.gainItem(4310129, -20);
		cm.sendOk("축하드립니다.친구가 당신을 선택하였군요.");
		cm.dispose();
	} else {
		ccm.sendOk("최소한 친구를 같이 할 능력은 되어야하지 않겠습니까?");
		cm.dispose();
	}
	} else if (selection == 75) {
		if (cm.haveItem(4310129, 20)) {
		cm.gainPets(5000405);
		cm.gainItem(4310129, -20);
		cm.sendOk("축하드립니다.친구가 당신을 선택하였군요.");
		cm.dispose();
	} else {
		ccm.sendOk("최소한 친구를 같이 할 능력은 되어야하지 않겠습니까?");
		cm.dispose();
	}
	} else if (selection == 76) {
		if (cm.haveItem(4310129, 20)) {
		cm.gainPets(5000406);
		cm.gainItem(4310129, -20);
		cm.sendOk("축하드립니다.친구가 당신을 선택하였군요.");
		cm.dispose();
	} else {
		ccm.sendOk("최소한 친구를 같이 할 능력은 되어야하지 않겠습니까?");
		cm.dispose();
	}
	} else if (selection == 77) {
		if (cm.haveItem(4310129, 20)) {
		cm.gainPets(5000407);
		cm.gainItem(4310129, -20);
		cm.sendOk("축하드립니다.친구가 당신을 선택하였군요.");
		cm.dispose();
	} else {
		cm.sendOk("최소한 친구를 같이 할 능력은 되어야하지 않겠습니까?");
		cm.dispose();
	}
	} else if (selection == 78) {
		if (cm.haveItem(4310129, 20)) {
		cm.gainPets(5001003);
		cm.gainItem(4310129, -20);
		cm.sendOk("축하드립니다.친구가 당신을 선택하였군요.");
		cm.dispose();
	} else {
		cm.sendOk("최소한 친구를 같이 할 능력은 되어야하지 않겠습니까?");
		cm.dispose();
	}
	} else if (selection == 79) {
		if (cm.haveItem(4310129, 20)) {
		cm.gainPets(5001004);
		cm.gainItem(4310129, -20);
		cm.sendOk("축하드립니다.친구가 당신을 선택하였군요.");
		cm.dispose();
	} else {
		cm.sendOk("최소한 친구를 같이 할 능력은 되어야하지 않겠습니까?");
		cm.dispose();
	}
	} else if (selection == 80) {
		if (cm.haveItem(4310129, 20)) {
		cm.gainPets(5001005);
		cm.gainItem(4310129, -20);
		cm.sendOk("축하드립니다.친구가 당신을 선택하였군요.");
		cm.dispose();
	} else {
		cm.sendOk("최소한 친구를 같이 할 능력은 되어야하지 않겠습니까?");
		cm.dispose();
	}
	} else if (selection == 81) {
		if (cm.haveItem(4310129, 20)) {
		cm.gainPets(5001006);
		cm.gainItem(4310129, -20);
		cm.sendOk("축하드립니다.친구가 당신을 선택하였군요.");
		cm.dispose();
	} else {
		ccm.sendOk("최소한 친구를 같이 할 능력은 되어야하지 않겠습니까?");
		cm.dispose();
	}
	} else if (selection == 82) {
		if (cm.haveItem(4310129, 20)) {
		cm.gainPets(5001007);
		cm.gainItem(4310129, -20);
		cm.sendOk("축하드립니다.친구가 당신을 선택하였군요.");
		cm.dispose();
	} else {
		cm.sendOk("최소한 친구를 같이 할 능력은 되어야하지 않겠습니까?");
		cm.dispose();
	}
	} else if (selection == 83) {
		if (cm.haveItem(4310129, 20)) {
		cm.gainPets(5001008);
		cm.gainItem(4310129, -20);
		cm.sendOk("축하드립니다.친구가 당신을 선택하였군요.");
		cm.dispose();
	} else {
		ccm.sendOk("최소한 친구를 같이 할 능력은 되어야하지 않겠습니까?");
		cm.dispose();
	}
	} else if (selection == 84) {
		if (cm.haveItem(4310129, 20)) {
		cm.gainPets(5001009);
		cm.gainItem(4310129, -20);
		cm.sendOk("축하드립니다.친구가 당신을 선택하였군요.");
		cm.dispose();
	} else {
		cm.sendOk("최소한 친구를 같이 할 능력은 되어야하지 않겠습니까?");
		cm.dispose();
	}
	} else if (selection == 85) {
		if (cm.haveItem(4310129, 20)) {
		cm.gainPets(5001010);
		cm.gainItem(4310129, -20);
		cm.sendOk("축하드립니다.친구가 당신을 선택하였군요.");
		cm.dispose();
	} else {
		cm.sendOk("최소한 친구를 같이 할 능력은 되어야하지 않겠습니까?");
		cm.dispose();
	}
	} else if (selection == 86) {
		if (cm.haveItem(4310129, 20)) {
		cm.gainPets(5001011);
		cm.gainItem(4310129, -20);
		cm.sendOk("축하드립니다.친구가 당신을 선택하였군요.");
		cm.dispose();
	} else {
		ccm.sendOk("최소한 친구를 같이 할 능력은 되어야하지 않겠습니까?");
		cm.dispose();
	}

   }
 }
}
