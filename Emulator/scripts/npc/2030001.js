var list1 = [1004120,1004167,1003910,1004029,1004180,1004164,1000082,1001103,1004502,1004403,1000070,1001093,1004027,1004028,1004279,1003998,1003945,1004158,1004442,1004441,1004467,1002414,1004513,1003878,1004527,1004458,1004460,1004459,1004450]; // 모자
var list2 = [1052671,1052762,1052892,1052845,1052909,1052912,1052536]; // 한벌옷
var list3 = [1042238,1042341,1042290,1042315,1042260,1042275,1042313,1042235,1042269]; // 상의
var list4 = [1062185,1062183,1062216,1062151]; // 하의
var list5_1 = [1102729,1102695,1102621,1102669,1102703,1102858,1102758,1102849,1102700,1102644,1102709,1102725,1102815,1102748,1102699]; // 망토
var list6 = [1702619,1702521,1702487,1702608,1702477,1702519,1702540,1702561,1702607,1702426,1702456,1702454,1702420,1702436,1702340,1702555,1702625,1702616]; // 무기
var list7 = [1012489,1012468,1012384,1012427,1012428,1012429,1012430,1012431,1012432,1012433,1012434,1012435,1012436]; // 한정판 얼굴장식
var list8 = [1022196,1022177,1022188,1022229,1022223]; // 안경
var weapons = [1702291,1702361,1702365,1702364,1702155,1702196,1702211,1702400,1702366,1702398,1702416,1702397,1702424,1702444,1702443,1702340,1702466,1702453,1702457,1702464,1702473,1702470,1702476,1702458,1702486,1702487,1702488,1702485,1702497,1702455,1702405,1702469]; // 업그레이드 무기
var seraphim = [1702180,1702188,1702313,1702314,1702315,1702316]; // 업그레이드 세라핌
var listname = ["","모자","한벌옷","상의","하의","망토","무기","얼굴장식","안경","호이포이무지개 세트","파티 다이어리 세트","프로포즈 세트","버블버블 소풍 세트","마스터 포니 세트","엘사 세트","꽃도령 세트","꽃아씨/늘푸른 사또 세트","인형의 집/핑크엔젤 세트","엘리자베스/나폴레옹 세트","샤오슈 토끼 세트","식목일 세트","서큐버스 세트#r(여)#b","아기양 잠옷 세트","오후의 홍차 세트","제논틱 세트","골프 세트","금방울 세트","샐리맨더 세트#r(여)#b","메이플 야구 세트","시원한 바다 세트","슈퍼스타 세트","신의 아이 세트","퍼펙트 하프물범 세트","아이스 썸머 세트","꼬꼬닭 세트","메이드/버클러 세트","마스터 페어리 세트","폭신폭신 구름양 세트","오데트/오딜 네로 세트#r(여)#b","그레이/핑크 네로 세트","초코퐁듀 세트","어둠의 소악마 세트","암염의 속죄자 세트","이국적인 축제 세트","은월 세트","Blavy 엔젤/소울베어 세트","마스터 포니 세트","쇼퍼홀릭 세트","키네시스 세트","업그레이드 무기","업그레이드 세라핌"]
        
var seclist = [1112135,1112141,1112142,1112144,1112146,1112148,1112150,1112238,1112252,1112253,1112256,1112258,1112259,1112262];
var badge = [1182006,1182011,1182023,1182067,1182064,1182069];
var caps = [1004029,1003492,1003493,1003494,1003495,1003496,1003131,1003132,1003133,1003846,1003847,1003860,1003873,1003874,1003875,1003876,1003877,1003878,1004034,1003542,1003543,1003544,1003545,1003546,1003547,1004026,1004027,1004028,1003807,1003954,1003901];
var accessory_1 = [1022223,1022188,1022174,1022177,1022187,1022196];
var accessory_2 = [1012450,1012374,1012415,1012379,1012176,1012388,1012384];
var coats = [1042292,1042238,1042240,1042265,1042260,1042287,1042267,1042268,1042269,1042271,1042272,1042278,1042285,1042286,1042290,1042279,1042280,1042281,1042282]; // 1042287 / 1042285 커트(?)
var pants = [1062174,1062185,1062171,1062172,1062174,1062176,1062179];
var longcoats = [1050316,1051387,1052671,1050215,1051262,1052618,1052619];
var capes = [1102546,1102547,1102548,1102376,1102377,1102378,1102307,1102308,1102309,1102466,1102572,1102624,1102630,1102450,1102451,1102643,1102511,1102629,1102615,1102625];
var seclistname = ["","명찰 반지 아이템","말풍선 반지 아이템","뱃지 아이템","업그레이드 모자","업그레이드 악세서리","업그레이드 상의","업그레이드 하의","업그레이드 한벌옷","업그레이드 망토"];
var time = "#fUI/UIToolTip/Item/Equip/Star/Star#"

function start() {
	 status = -1;
   	mile = "(가격 : #Cgray#1000#r + ＠#Cgray#후원포인트#k)\r\n";
	showInfo();
}

function action(mode,type,selection) {
	if (mode == 1) {
	status++;
	}
	if (mode == 0 || mode == -1) {
	cm.dispose();
	return;
}
	if (status == 0) {
	selected = selection;
	if (selected == 999999) {
	showSecondShop();
    } else if (selected == 19) {
        cm.sendGetNumber("메소로 환전을 원하시는 후원포인트를 입력해주세요.\r\n#r※ 1 후원포인트#k = #b20000 메소#k",1,0,cm.getPlayer().getRC());
	} else if (selected == 1738){
	showExplanation();
	} else {
	itemid = selection;
        if (cm.getPlayer().getRC() >= 1000) {
            cm.sendYesNo("#b#i"+itemid+"# #z"+itemid+"# #r 1개#k를 #Cgray##e1000#n#r + @#k#e후원포인트#n에 구매하시겠습니까?");
        } else {
            cm.sendOk("후원포인트가 부족합니다.");
            cm.dispose();
        }
	cost = 1000;
}
	} else if (status == 1) {
	if (selected == 999999) {
	cost = capes.toString().search(selection) % 8 == 0 ? 1000 : badge.toString().search(selection) % 8 == 0 ? 1000 : 500;
	itemid = selection;
        if (cm.getPlayer().getRC() >= cost) {
            cm.sendYesNo("#b#i"+itemid+"# #z"+itemid+"# #r 1개#k를 #Cgray##e"+cost+"#n#r + @#k#e후원포인트#n에 구매하시겠습니까?");
        } else {
            cm.sendOk("후원포인트가 부족합니다.");
            cm.dispose();
        }
    } else if (selected == 19) {
        meso = selection;
        cm.sendYesNo("환전을 원하시는 후원포인트가 #b"+meso+" 후원포인트 맞습니까?\r\n#k환전 후 #r"+meso*200000+ "메소#k를 얻으실 수 있습니다.");
        meso *= 200000;
	} else {
        cm.sendGetNumber("\r\n#e선택 아이템#n : #i"+itemid+"# #z"+itemid+"#\r\n#e아이템 가격#n : #b#e"+cost+"#n 후원포인트#k\r\n\r\n#r※ 100 후원포인트#k = #b올스텟 ＋6#k\r\n",1,1,cm.getPlayer().getRC() - cost);
}
	} else if (status == 2) {
	if (selected == 999999) {
	cm.sendGetNumber("\r\n#e선택 아이템#n : #i"+itemid+"# #z"+itemid+"#\r\n#e아이템 가격#n : #b#e"+cost+"#n 후원포인트#k\r\n\r\n#r※ 100 후원포인트#k = #b올스텟 ＋6#k\r\n",1,1,cm.getPlayer().getRC()  - cost);
        } else if (selected == 19) {
            if (cm.getMeso() + meso > 9999999999) {
                sendHint("메소가 너무 많습니다.",200,20);
                cm.dipsose();
            } else {
                cm.gainMeso(meso);
                cm.loseRC(meso / 200000);
                sendHint("후원포인트를 메소로 환전하셨습니다.",250,20);
                cm.dispose();
            }
        } else {
	if (selection % 100 != 0) {
	sendHint("정해진 후원포인트의 단위에 맞추어 적어주세요.\r\n#r※ 100 후원포인트#k = #b올스텟 ＋6#k",270,30);
	cm.dispose();
	} else {
	cost += selection;
	allstat = selection/100 * 6;
	allstatprice = selection;
	cm.sendGetNumber("\r\n#e선택 아이템#n : #i"+itemid+"# #z"+itemid+"#\r\n#e아이템 가격#n : #b#e"+cost+"#n 후원포인트#k\r\n\r\n#e#Cgray#※ "+allstatprice+" 후원포인트 = 올스텟 ＋"+allstat+" #k#n\r\n#r※ 100 후원포인트#k = #b공격력/마력 ＋3#k",1,1,cm.getPlayer().getRC()  - cost);
}
}
	} else if (status == 3) {
	if (selected == 999999) {
	if (selection % 100 != 0) {
	sendHint("정해진 후원포인트의 단위에 맞추어 적어주세요.\r\n#r※ 100 후원포인트#k = #b올스텟 ＋6#k",270,30);
	cm.dispose();
	} else {
	cost += selection;
	allstat = selection/100 * 6;
	allstatprice = selection;
	cm.sendGetNumber("\r\n#e선택 아이템#n : #i"+itemid+"# #z"+itemid+"#\r\n#e아이템 가격#n : #b#e"+cost+"#n 후원포인트#k\r\n\r\n#e#Cgray#※ "+allstatprice+" 후원포인트 = 올스텟 ＋"+allstat+" #k#n\r\n#r※ 100 후원포인트#k = #b공격력/마력 ＋3#k",1,1,cm.getPlayer().getRC()  - cost);
}
	} else {
	if (selection % 100 != 0) {
	sendHint("정해진 후원포인트의 단위에 맞추어 적어주세요.\r\n#r※ 100 후원포인트#k = #b공격력/마력 ＋3#k",270,30);
	cm.dispose();
	} else {
	cost += selection;
	atk = selection/100 * 3;
	atkprice = selection;
	cm.sendYesNo("#e선택 아이템#n : #i"+itemid+"# #z"+itemid+"#\r\n#e아이템 가격#n : #b#e"+cost+"#n 후원포인트\r\n\r\n#e#Cgray#※ "+allstatprice+" 후원포인트 = #r올스텟 ＋"+allstat+" #Cgray##n\r\n#e#Cgray#※ "+atkprice+" 후원포인트 = #r공격력/마력 ＋"+atk+" #k#n\r\n\r\n※ 이 아이템을 제작 하시겠습니까?");
}
}
	} else if (status == 4) {
	if (selected == 999999) {
	if (selection % 500 != 0) {
	sendHint("정해진 후원포인트의 단위에 맞추어 적어주세요.\r\n#r※ 100 후원포인트#k = #b공격력/마력 ＋3#k",270,30);
	cm.dispose();
	} else {
	cost += selection;
	atk = selection/100 * 3;
	atkprice = selection;
	cm.sendYesNo("#e선택 아이템#n : #i"+itemid+"# #z"+itemid+"#\r\n#e아이템 가격#n : #b#e"+cost+"#n 후원포인트\r\n\r\n#e#Cgray#※ "+allstatprice+" 후원포인트 = #r올스텟 ＋"+allstat+" #Cgray##n\r\n#e#Cgray#※ "+atkprice+" 후원포인트 = #r공격력/마력 ＋"+atk+" #k#n\r\n\r\n※ 이 아이템을 제작 하시겠습니까?");
	}
	} else {
	makeSponserItem(itemid,allstat,atk);
	finish(cost,itemid);
}
        } else if (status == 5) {
         makeSponserItem(itemid,allstat,atk);
        finish(cost,itemid);
}
}

function finish(cost,itemid) {
	if (cm.getRC() >= cost) {
    cm.sendOk("#b"+cost+" 후원포인트#k를 사용하여 #b#i"+itemid+"# #z"+itemid+"##k을(를) 제작하였습니다.");
	cm.playerMessage(cost+" 후원포인트를 사용하여 "+Packages.server.items.ItemInformation.getInstance().getName(itemid)+"을(를) 제작하였습니다.");
	cm.loseRC(cost);
	cm.dispose();
	} else {
	cm.sendOk("후원포인트가 부족합니다.");
}
}

function makeSponserItem(itemid,allstat,atk) {
	var ii = Packages.server.items.ItemInformation.getInstance();
	var item = ii.getEquipById(itemid);
	item.setStr(allstat);
	item.setDex(allstat);
	item.setInt(allstat);
	item.setLuk(allstat);
	item.setWatk(atk);
	item.setMatk(atk);
	item.setOwner("[후원아이템]");
	Packages.server.items.InventoryManipulator.addFromDrop(cm.getC(),item,false);
}
        
function sendHint(message,x,y) {
	return cm.getPlayer().getClient().getSession().write(Packages.packet.creators.MaplePacketCreator.sendHint(message,x,y));
}

function showInfo() {
    var text = "#e#r< 후원포인트 샵 >#n#k\r\n";
	text += "　◆ #b#h #님의 보유 후원포인트 : #e#r"+cm.getRC()+"#n#k\r\n";
	text += "　◆ 아이템 추가 문의는 관리자에게 문의해주세요.\r\n";
	//text += "#L1738#후원 문의 하는법#l#n\r\n\r\n";
	//text += "#L999999##e#r"+time+"『다른 후원아이템 보기』"+time+" (500원 이상 아이템)#k\r\n\r\n#l";
        //text += "#e#b[특수 교환 아이템]#k#n\r\n#L19##i2028048# 메소로 교환하기 (1:200000)#l\r\n\r\n\r\n";
        text += showItemList(1,0,list1,list1.length,true);        text += showItemList(2,0,list2,list2.length,true);        text += showItemList(3,0,list3,list3.length,true);        text += showItemList(4,0,list4,list4.length,true);
        text += showItemList(5,0,list5_1,list5_1.length,true);       
        text += showItemList(6,0,list6,list6.length,true);        
        text += showItemList(7,0,list7,list7.length,true);
        text += showItemList(8,0,list8,list8.length,true);                    
	cm.sendSimple(text);
}

function showSecondShop() {
	var i;
	var info = "(가격 : #Cgray#500~1000#r + ＠#Cgray#후원포인트#k)\r\n";
	var text = "#d이전 페이지로 돌아가려면 ESC를 눌러주세요.#k\r\n\r\n";
	text += "#e#b["+seclistname[1]+"]#k#n " + info;
	for (i = 0; i < 7; text += "#L"+seclist[i]+"##i"+seclist[i]+"##l",i++);
	text += "\r\n\r\n\r\n#e#b["+seclistname[2]+"]#k#n " + info;	
	for (i = 7; i < 14; text += "#L"+seclist[i]+"##i"+seclist[i]+"##l",i++);
	text += "\r\n\r\n\r\n#e#b["+seclistname[3]+"]#k#n " + info;	
	for (i = 0; i < badge.length; text += "#L"+badge[i]+"##i"+badge[i]+"##l",i++);
	text += "\r\n\r\n\r\n#e#b["+seclistname[4]+"]#k#n " + info;	
	for (i = 0; i < 6; text += "#L"+caps[i]+"##i"+caps[i]+"##l",i++);	text += "\r\n";
	for (i = 6; i < 12; text += "#L"+caps[i]+"##i"+caps[i]+"##l",i++);	text += "\r\n";
	for (i = 12; i < 18; text += "#L"+caps[i]+"##i"+caps[i]+"##l",i++);	text += "\r\n";
	for (i = 18; i < 25; text += "#L"+caps[i]+"##i"+caps[i]+"##l",i++);	text += "\r\n";
	for (i = 25; i < 31; text += "#L"+caps[i]+"##i"+caps[i]+"##l",i++);
	text += "\r\n\r\n\r\n#e#b["+seclistname[5]+"]#k#n " + info;	
	for (i = 0; i < accessory_1.length; text += "#L"+accessory_1[i]+"##i"+accessory_1[i]+"##l",i++);	text += "\r\n";
	for (i = 0; i < accessory_2.length; text += "#L"+accessory_2[i]+"##i"+accessory_2[i]+"##l",i++);
	text += "\r\n\r\n\r\n#e#b["+seclistname[6]+"]#k#n " + info;
	for (i = 0; i < 6; text += "#L"+coats[i]+"##i"+coats[i]+"##l",i++);	text += "\r\n";
	for (i = 6; i < 13; text += "#L"+coats[i]+"##i"+coats[i]+"##l",i++);	text += "\r\n";
	for (i = 13; i < 19; text += "#L"+coats[i]+"##i"+coats[i]+"##l",i++);	text += "\r\n";
	text += "\r\n\r\n\r\n#e#b["+seclistname[7]+"]#k#n " + info;
	for (i = 0; i < pants.length; text += "#L"+pants[i]+"##i"+pants[i]+"##l",i++);
	text += "\r\n\r\n\r\n#e#b["+seclistname[8]+"]#k#n " + info;
	for (i = 0; i < longcoats.length; text += "#L"+longcoats[i]+"##i"+longcoats[i]+"##l",i++);
	text += "\r\n\r\n\r\n#e#b["+seclistname[9]+"]#k#n " + info;
	for (i = 0; i < 6; text += "#L"+capes[i]+"##i"+capes[i]+"##l",i++);	text += "\r\n";
	for (i = 6; i < 12; text += "#L"+capes[i]+"##i"+capes[i]+"##l",i++);	text += "\r\n";
	for (i = 12; i < 18; text += "#L"+capes[i]+"##i"+capes[i]+"##l",i++);	text += "\r\n";
	for (i = 18; i < 20; text += "#L"+capes[i]+"##i"+capes[i]+"##l",i++);	text += "\r\n";
	cm.sendSimple(text);
}

function showExplanation() {
	cm.sendOk("#e< 후원 문의 안내 >#n\r\n\r\n① 네이트온#e(seuu_online@nate.com)#n 친구추가 후 대화\r\n\r\n② 카카오톡#e(스우온라인)#n 친구추가 후 대화\r\n\r\n#k꼭 위에 명시된 방법으로만 #r후원문의#k 부탁드립니다!#k");
	    cm.dispose();
}

function showItemList2(num,arr,mode) {
    var text = "#e#b["+listname[num]+"]#k#n " + mile;
	var num = mode == 1 ? 2 : 3;
    for (var i = 0; i < num; text += "#L"+arr[i]+"##i"+arr[i]+"##l",i++);
    text += "　 ";
    for (var ii = num; ii < 6; text += "#L"+arr[ii]+"##i"+arr[ii]+"##l",ii++);
    text += "\r\n\r\n\r\n";
    return text;
}

function showItemList(num,b,arr,length,showname) {
    var text = "";
    if (showname) {
    text += "#e#b["+listname[num]+"]#k#n " + mile;
    }
    for (var i = b; i < length; text += "#L"+arr[i]+"##i"+arr[i]+"##l",i++);
    text += "\r\n\r\n\r\n";
    return text;
} /*에임*/