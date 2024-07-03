별파 = "#fUI/GuildMark.img/Mark/Pattern/00004001/11#"
별노 = "#fUI/GuildMark.img/Mark/Pattern/00004001/3#"
별흰 = "#fUI/GuildMark.img/Mark/Pattern/00004001/15#"
별갈 = "#fUI/GuildMark.img/Mark/Pattern/00004001/5#"
별빨 = "#fUI/GuildMark.img/Mark/Pattern/00004001/1#"
별검 = "#fUI/GuildMark.img/Mark/Pattern/00004001/16#"
별보 = "#fUI/GuildMark.img/Mark/Pattern/00004001/13#"
별 = "#fUI/FarmUI.img/objectStatus/star/whole#";
S = "#fUI/CashShop.img/CSEffect/today/0#"

importPackage(Packages.constants);

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
		var chat1 = ""
		chat1 += "                   #b후원 포인트#k 획득 방법은 #r접속기#k 를 참고하세요.\r\n\r\n";
		chat1 += "                    #L9999##fs13#"+별검+" 후원 기타 상점 입장하기 "+별검+"#l\r\n"
		chat1 += "               #L9998##fs13#"+별보+" #d후원 훈장 상점 입장하기#k "+별보+"#l\r\n"
		cm.sendSimple(chat1);
		} if (selection == 9999) {
		var a = "           #fn나눔고딕 Extrabold#"+별+" #fs17#"+ServerConstants.serverName+" 후원 기타 상점 "+별+"\r\n#fs10##Cgray#                                 원하시는 아이템을 골라 주세요.#k\r\n";
		a += "#fs15#\r\n───────────────────────\r\n                            <  기 타 관 련  >\r\n───────────────────────#fs11#\r\n";
		a += "#L1000#"+별파+"  #i2432127# #b#z2432127##k #d(소비 1 칸 필수)#k 교환#l\r\n       #L5##r▶#k #b#z2432127##k 에서는 어떤 아이템이 나오나요?#l\r\n\r\n#fs11#             교환 하려면 #b후원 포인트#k #r5000 P#k 가 필요 합니다.\r\n";
		a += "#L2000#"+별파+"  #i2435226# #b#z2435226##k #d(소비 1 칸 필수)#k 교환#l\r\n       #L6##r▶#k #b#z2435226##k 에서는 어떤 아이템이 나오나요?#l\r\n\r\n#fs11#             교환 하려면 #b후원 포인트#k #r5000 P#k 가 필요 합니다.\r\n";
		a += "#L3#"+별파+"  #i2470010# #b#z2470010##k #d(소비 1 칸 필수)#k 교환#l\r\n\r\n#fs11#             교환 하려면 #b후원 포인트#k #r10000 P#k 가 필요 합니다.\r\n";
		a += "#L4#"+별파+"  #b캐릭터 닉네임#k 을 원하는 #b닉네임으로 변경#k 문의#k#l\r\n\r\n#fs11#             교환 하려면 #b후원 포인트#k #r? P#k 가 필요 합니다.\r\n";
                a += "#L50#"+별파+"  #b캐릭터 직업#k 을 원하는 #b직업으로 변경#k 문의#k#l\r\n\r\n#fs11#             교환 하려면 #b후원 포인트#k #r25000 P#k 가 필요 합니다.\r\n";
		a += "#fs15#\r\n───────────────────────\r\n                            <  추 뎀 관 련  >\r\n───────────────────────#fs11#\r\n";
		a += "#L100#"+별파+"  #b추가데미지 타격 횟수#k #r+ 6 타#k 를 교환 하겠습니다.#l\r\n\r\n#fs11#             교환 하려면 #b후원 포인트#k #r100000 P#k 가 필요 합니다.\r\n";
		a += "#L101#"+별파+"  #b추가 데미지#k #r+ 5 억#k 을 교환 하겠습니다.#l\r\n\r\n#fs11#             교환 하려면 #b후원 포인트#k #r10000 P#k 가 필요 합니다.\r\n";
		a += "#L102#"+별파+"  #b추가 데미지#k #r+ 10 억#k 을 교환 하겠습니다.#l\r\n\r\n#fs11#             교환 하려면 #b후원 포인트#k #r20000 P#k 가 필요 합니다.\r\n";
		a += "#L103#"+별파+"  #b추가 데미지#k #r+ 15 억#k 을 교환 하겠습니다.#l\r\n\r\n#fs11#             교환 하려면 #b후원 포인트#k #r30000 P#k 가 필요 합니다.\r\n";
		a += "#L104#"+별파+"  #b추가 데미지#k #r+ 20 억#k 을 교환 하겠습니다.#l\r\n\r\n#fs11#             교환 하려면 #b후원 포인트#k #r40000 P#k 가 필요 합니다.\r\n";
		a += "#L105#"+별파+"  #b추가 데미지#k #r+ 25 억#k 을 교환 하겠습니다.#l\r\n\r\n#fs11#             교환 하려면 #b후원 포인트#k #r50000 P#k 가 필요 합니다.\r\n";
		cm.sendSimple(a);
		} else if (selection == 9998) {
		var b = "           #fn나눔고딕 Extrabold#"+별+"#fs17# "+ServerConstants.serverName+" 후원 훈장 상점 "+별+"\r\n#fs10##Cgray#                                원하시는 훈장 체계를 골라 주세요.#k#fs12#\r\n\r\n  #r후원 훈장#k 은 업그레이드시 #b후원 포인트#k 로 #d재교환#k 이 가능합니다.\r\n                   문의는 직접 #b운영팀#k 측에 #d개인 문의#k 바랍니다.#fs15#\r\n\r\n───────────────────────\r\n                            <  훈 장 관 련  >\r\n───────────────────────#fs11#\r\n";

		b += "#L9996#"+S+"  #b올스탯#k 집중형 훈장 (#rSTR,DEX,INT.LUK#k 집중)#l\r\n";
		b += "#L9997#"+S+"  #b공, 마#k 집중형 훈장 (#r공격력, 마력#k 집중)#l\r\n";
		cm.sendSimple(b);
		} else if (selection == 9996) {
		var cc = "           #fn나눔고딕 Extrabold#"+별+"#fs17# "+ServerConstants.serverName+" 후원 장비 상점 "+별+"\r\n#fs10##Cgray#                                원하시는 아이템을 골라 주세요.#k#fs12#\r\n\r\n  #r후원 훈장#k 은 업그레이드시 #b후원 포인트#k 로 #d재교환#k 이 가능합니다.\r\n                   문의는 직접 #b운영팀#k 측에 #d개인 문의#k 바랍니다.#fs15#\r\n\r\n───────────────────────\r\n                            <  훈 장 관 련  >\r\n───────────────────────#fs11#\r\n";
		cc += "#L22#"+별갈+"  #i1142137# #b후원 훈장 : C 등급#k #d올스탯 1000 / 공, 마 100#k#l\r\n\r\n#fs11#             교환 하려면 #b후원 포인트#k #r100000 P#k 가 필요 합니다.\r\n";
		cc += "#L23#"+별갈+"  #i1142137# #b후원 훈장 : C 등급#k #d올스탯 3000 / 공, 마 300#k#l\r\n\r\n#fs11#             교환 하려면 #b후원 포인트#k #r300000 P#k 가 필요 합니다.\r\n";
		cc += "#L24#"+별갈+"  #i1142137# #b후원 훈장 : C 등급#k #d올스탯 5000 / 공, 마 500#k#l\r\n\r\n#fs11#             교환 하려면 #b후원 포인트#k #r500000 P#k 가 필요 합니다.\r\n\r\n";
		cc += "#L25#"+별흰+"  #i1142138# #b후원 훈장 : B 등급#k #d올스탯 6000 / 공, 마 600#k#l\r\n\r\n#fs11#             교환 하려면 #b후원 포인트#k #r600000 P#k 가 필요 합니다.\r\n";
		cc += "#L26#"+별흰+"  #i1142138# #b후원 훈장 : B 등급#k #d올스탯 8000 / 공, 마 800#k#l\r\n\r\n#fs11#             교환 하려면 #b후원 포인트#k #r800000 P#k 가 필요 합니다.\r\n";
		cc += "#L27#"+별흰+"  #i1142138# #b후원 훈장 : B 등급#k #d올스탯 10000 / 공, 마 1000#k#l\r\n\r\n#fs11#             교환 하려면 #b후원 포인트#k #r1000000 P#k 가 필요 합니다.\r\n\r\n";
		cc += "#L28#"+별노+"  #i1142139# #b후원 훈장 : A 등급#k #d올스탯 11000 / 공, 마 1100#k#l\r\n\r\n#fs11#             교환 하려면 #b후원 포인트#k #r1100000 P#k 가 필요 합니다.\r\n";
		cc += "#L29#"+별노+"  #i1142139# #b후원 훈장 : A 등급#k #d올스탯 13000 / 공, 마 1300#k#l\r\n\r\n#fs11#             교환 하려면 #b후원 포인트#k #r1300000 P#k 가 필요 합니다.\r\n";
		cc += "#L30#"+별노+"  #i1142139# #b후원 훈장 : A 등급#k #d올스탯 15000 / 공, 마 1500#k#l\r\n\r\n#fs11#             교환 하려면 #b후원 포인트#k #r1500000 P#k 가 필요 합니다.\r\n\r\n";
		cm.sendSimple(cc);
		} else if (selection == 9997) {
		var c = "           #fn나눔고딕 Extrabold#"+별+"#fs17# "+ServerConstants.serverName+" 후원 장비 상점 "+별+"\r\n#fs10##Cgray#                                원하시는 아이템을 골라 주세요.#k#fs12#\r\n\r\n  #r후원 훈장#k 은 업그레이드시 #b후원 포인트#k 로 #d재교환#k 이 가능합니다.\r\n                   문의는 직접 #b운영팀#k 측에 #d개인 문의#k 바랍니다.#fs15#\r\n\r\n───────────────────────\r\n                            <  훈 장 관 련  >\r\n───────────────────────#fs11#\r\n";
		c += "#L10#"+별갈+"  #i1142137# #b후원 훈장 : C 등급#k #d올스탯 100 / 공, 마 1000#k#l\r\n\r\n#fs11#             교환 하려면 #b후원 포인트#k #r100000 P#k 가 필요 합니다.\r\n";
		c += "#L11#"+별갈+"  #i1142137# #b후원 훈장 : C 등급#k #d올스탯 300 / 공, 마 3000#k#l\r\n\r\n#fs11#             교환 하려면 #b후원 포인트#k #r300000 P#k 가 필요 합니다.\r\n";
		c += "#L12#"+별갈+"  #i1142137# #b후원 훈장 : C 등급#k #d올스탯 500 / 공, 마 5000#k#l\r\n\r\n#fs11#             교환 하려면 #b후원 포인트#k #r500000 P#k 가 필요 합니다.\r\n\r\n";
		c += "#L13#"+별흰+"  #i1142138# #b후원 훈장 : B 등급#k #d올스탯 600 / 공, 마 6000#k#l\r\n\r\n#fs11#             교환 하려면 #b후원 포인트#k #r600000 P#k 가 필요 합니다.\r\n";
		c += "#L14#"+별흰+"  #i1142138# #b후원 훈장 : B 등급#k #d올스탯 800 / 공, 마 8000#k#l\r\n\r\n#fs11#             교환 하려면 #b후원 포인트#k #r800000 P#k 가 필요 합니다.\r\n";
		c += "#L15#"+별흰+"  #i1142138# #b후원 훈장 : B 등급#k #d올스탯 1000 / 공, 마 10000#k#l\r\n\r\n#fs11#             교환 하려면 #b후원 포인트#k #r1000000 P#k 가 필요 합니다.\r\n\r\n";
		c += "#L16#"+별노+"  #i1142139# #b후원 훈장 : A 등급#k #d올스탯 1100 / 공, 마 11000#k#l\r\n\r\n#fs11#             교환 하려면 #b후원 포인트#k #r1100000 P#k 가 필요 합니다.\r\n";
		c += "#L17#"+별노+"  #i1142139# #b후원 훈장 : A 등급#k #d올스탯 1300 / 공, 마 13000#k#l\r\n\r\n#fs11#             교환 하려면 #b후원 포인트#k #r1300000 P#k 가 필요 합니다.\r\n";
		c += "#L18#"+별노+"  #i1142139# #b후원 훈장 : A 등급#k #d올스탯 1500 / 공, 마 15000#k#l\r\n\r\n#fs11#             교환 하려면 #b후원 포인트#k #r1500000 P#k 가 필요 합니다.\r\n\r\n";

		cm.sendSimple(c);
		} else if (selection == 1000) {
		if (cm.getHC() >= 5000) {
		    if (cm.canHold(2432127)) {
			cm.gainHC(-5000);
			cm.gainItem(2432127, 1);
		        cm.sendOk("#fn나눔고딕 Extrabold##b후원 포인트#k 로 #i2432127# #r1 개#k 를 구입 하셨습니다.");
			cm.dispose();
		    } else {
		        cm.sendOk("#fn나눔고딕 Extrabold##r소비 칸에 빈 공간이 없습니다.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn나눔고딕 Extrabold##b후원 포인트#k 가 부족합니다.");
		    cm.dispose();
		}
		} else if (selection == 2000) {
		if (cm.getHC() >= 5000) {
		    if (cm.canHold(2435226)) {
			cm.gainHC(-5000);
			cm.gainItem(2435226, 1);
		        cm.sendOk("#fn나눔고딕 Extrabold##b후원 포인트#k 로 #i2435226# #r1 개#k 를 구입 하셨습니다.");
			cm.dispose();
		    } else {
		        cm.sendOk("#fn나눔고딕 Extrabold##r소비 칸에 빈 공간이 없습니다.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn나눔고딕 Extrabold##b후원 포인트#k 가 부족합니다.");
		    cm.dispose();
		}

		} else if (selection == 3) {
		if (cm.getHC() >= 10000) {
		    if (cm.canHold(2470010)) {
			cm.gainHC(-10000);
			cm.gainItem(2470010, 1);
		        cm.sendOk("#fn나눔고딕 Extrabold##b후원 포인트#k 로 #i2470010# #r1 개#k 를 구입 하셨습니다.");
			cm.dispose();
		    } else {
		        cm.sendOk("#fn나눔고딕 Extrabold##r소비 칸에 빈 공간이 없습니다.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn나눔고딕 Extrabold##b후원 포인트#k 가 부족합니다.");
		    cm.dispose();
		}

		} else if (selection == 4) {
                        cm.sendOk("#fn나눔고딕 Extrabold##b캐릭터 닉네임을 변경하는 기능 입니다.\r\n일부 특수문자 포함이 가능합니다.#k\r\n\r\n#d해당 문의는 운영자 에게 직접 개인 문의 바랍니다.#k");
			cm.dispose();          
		} else if (selection == 50) {
                        cm.sendOk("#fn나눔고딕 Extrabold##b캐릭터 직업을 변경하는 기능 입니다.\r\n일부 직업은 제한 될 수 있습니다.#k\r\n\r\n#d해당 문의는 운영자 에게 직접 개인 문의 바랍니다.#k");
			cm.dispose();
		} else if (selection == 5) {
                        cm.sendOk("#fn나눔고딕 Extrabold##fs15##r[▶]#k #d랜덤 1 종 획득#k#fs12#\r\n\r\n#i2028048# #b게임 메소#k #r4 ~ 20 억#k\r\n#i4310088# #bRED 코인#k #r10 ~ 100 개#k\r\n#i4310175# #bM 코인#k #r200 ~ 500 개#k\r\n#i2430218# #b#z2430218##k #r5 ~ 15 개#k\r\n#i2049153# #b#z2049153##k #r2 ~ 8 장#k\r\n#i2048717# #b#z2048717##k #r2 ~ 8 개#k\r\n#i2049360# #b#z2049360##k #r2 ~ 8 장#k\r\n#i3994592# #b초월 포인트#k #r100 ~ 150 P#k\r\n#i2046991# #b#z2046991##k #r1 ~ 2 장#k\r\n#i2047814# #b#z2047814##k #r1 ~ 2 장#k\r\n#i2046992# #b#z2046992##k #r1 ~ 2 장#k\r\n#i4001869# #b#z4001869##k #r1 ~ 2 개#k");
			cm.dispose();
		} else if (selection == 6) {
                        cm.sendOk("#fn나눔고딕 Extrabold##fs15##r[▶]#k #d랜덤 1 종 획득#k#fs12#\r\n\r\n#i2049373# #b#z2049373##k #r1 장#k\r\n#i2049370# #b#z2049370##k #r1 장#k\r\n#i2049372# #b#z2049372##k #r1 장#k\r\n#i2049371# #b#z2049371##k #r1 장#k\r\n#i2049376# #b#z2049376##k #r1 장#k");
			cm.dispose();
 
		} else if (selection == 10) {
		if (cm.getHC() >= 100000) {
		    if (cm.canHold(1142137)) {
			cm.gainHC(-100000);
			cm.setAllStat(1142137,100,1000,0);
		        cm.sendOk("#fn나눔고딕 Extrabold##b후원 포인트#k 로 #i1142137# 를 구입 하셨습니다.");
			cm.dispose();
		    } else {
		        cm.sendOk("#fn나눔고딕 Extrabold##r장비 칸에 빈 공간이 없습니다.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn나눔고딕 Extrabold##b후원 포인트#k 가 부족합니다.");
		    cm.dispose();
		}
		} else if (selection == 11) {
		if (cm.getHC() >= 300000) {
		    if (cm.canHold(1142137)) {
			cm.gainHC(-300000);
			cm.setAllStat(1142137,300,3000,0);
		        cm.sendOk("#fn나눔고딕 Extrabold##b후원 포인트#k 로 #i1142137# 를 구입 하셨습니다.");
			cm.dispose();
		    } else {
		        cm.sendOk("#fn나눔고딕 Extrabold##r장비 칸에 빈 공간이 없습니다.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn나눔고딕 Extrabold##b후원 포인트#k 가 부족합니다.");
		    cm.dispose();
		}
		} else if (selection == 12) {
		if (cm.getHC() >= 500000) {
		    if (cm.canHold(1142137)) {
			cm.gainHC(-500000);
			cm.setAllStat(1142137,500,5000,0);
		        cm.sendOk("#fn나눔고딕 Extrabold##b후원 포인트#k 로 #i1142137# 를 구입 하셨습니다.");
			cm.dispose();
		    } else {
		        cm.sendOk("#fn나눔고딕 Extrabold##r장비 칸에 빈 공간이 없습니다.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn나눔고딕 Extrabold##b후원 포인트#k 가 부족합니다.");
		    cm.dispose();
		}
		} else if (selection == 13) {
		if (cm.getHC() >= 600000) {
		    if (cm.canHold(1142138)) {
			cm.gainHC(-600000);
			cm.setAllStat(1142138,600,6000,0);
		        cm.sendOk("#fn나눔고딕 Extrabold##b후원 포인트#k 로 #i1142138# 를 구입 하셨습니다.");
			cm.dispose();
		    } else {
		        cm.sendOk("#fn나눔고딕 Extrabold##r장비 칸에 빈 공간이 없습니다.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn나눔고딕 Extrabold##b후원 포인트#k 가 부족합니다.");
		    cm.dispose();
		}
		} else if (selection == 14) {
		if (cm.getHC() >= 800000) {
		    if (cm.canHold(1142138)) {
			cm.gainHC(-800000);
			cm.setAllStat(1142138,800,8000,0);
		        cm.sendOk("#fn나눔고딕 Extrabold##b후원 포인트#k 로 #i1142138# 를 구입 하셨습니다.");
			cm.dispose();
		    } else {
		        cm.sendOk("#fn나눔고딕 Extrabold##r장비 칸에 빈 공간이 없습니다.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn나눔고딕 Extrabold##b후원 포인트#k 가 부족합니다.");
		    cm.dispose();
		}
		} else if (selection == 15) {
		if (cm.getHC() >= 1000000) {
		    if (cm.canHold(1142138)) {
			cm.gainHC(-1000000);
			cm.setAllStat(1142138,1000,10000,0);
		        cm.sendOk("#fn나눔고딕 Extrabold##b후원 포인트#k 로 #i1142138# 를 구입 하셨습니다.");
			cm.dispose();
		    } else {
		        cm.sendOk("#fn나눔고딕 Extrabold##r장비 칸에 빈 공간이 없습니다.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn나눔고딕 Extrabold##b후원 포인트#k 가 부족합니다.");
		    cm.dispose();
		}
		} else if (selection == 16) {
		if (cm.getHC() >= 1100000) {
		    if (cm.canHold(1142139)) {
			cm.gainHC(-1100000);
			cm.setAllStat(1142139,1100,11000,0);
			cm.getPlayer().sethadm(1);
		        cm.sendOk("#fn나눔고딕 Extrabold##b후원 포인트#k 로 #i1142139# 를 구입 하셨습니다.");
			cm.dispose();
		    } else {
		        cm.sendOk("#fn나눔고딕 Extrabold##r장비 칸에 빈 공간이 없습니다.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn나눔고딕 Extrabold##b후원 포인트#k 가 부족합니다.");
		    cm.dispose();
		}
		} else if (selection == 17) {
		if (cm.getHC() >= 1300000) {
		    if (cm.canHold(1142139)) {
			cm.gainHC(-1300000);
			cm.setAllStat(1142139,1300,13000,0);
			cm.getPlayer().sethadm(1);
		        cm.sendOk("#fn나눔고딕 Extrabold##b후원 포인트#k 로 #i1142139# 를 구입 하셨습니다.");
			cm.dispose();
		    } else {
		        cm.sendOk("#fn나눔고딕 Extrabold##r장비 칸에 빈 공간이 없습니다.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn나눔고딕 Extrabold##b후원 포인트#k 가 부족합니다.");
		    cm.dispose();
		}
		} else if (selection == 18) {
		if (cm.getHC() >= 1500000) {
		    if (cm.canHold(1142139)) {
			cm.gainHC(-1500000);
			cm.setAllStat(1142139,1500,15000,0);
			cm.getPlayer().sethadm(1);
		        cm.sendOk("#fn나눔고딕 Extrabold##b후원 포인트#k 로 #i1142139# 를 구입 하셨습니다.");
			cm.dispose();
		    } else {
		        cm.sendOk("#fn나눔고딕 Extrabold##r장비 칸에 빈 공간이 없습니다.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn나눔고딕 Extrabold##b후원 포인트#k 가 부족합니다.");
		    cm.dispose();
		}

		} else if (selection == 22) {
		if (cm.getHC() >= 100000) {
		    if (cm.canHold(1142137)) {
			cm.gainHC(-100000);
			cm.setAllStat(1142137,1000,100,0);
		        cm.sendOk("#fn나눔고딕 Extrabold##b후원 포인트#k 로 #i1142137# 를 구입 하셨습니다.");
			cm.dispose();
		    } else {
		        cm.sendOk("#fn나눔고딕 Extrabold##r장비 칸에 빈 공간이 없습니다.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn나눔고딕 Extrabold##b후원 포인트#k 가 부족합니다.");
		    cm.dispose();
		}
		} else if (selection == 23) {
		if (cm.getHC() >= 300000) {
		    if (cm.canHold(1142137)) {
			cm.gainHC(-300000);
			cm.setAllStat(1142137,3000,300,0);
		        cm.sendOk("#fn나눔고딕 Extrabold##b후원 포인트#k 로 #i1142137# 를 구입 하셨습니다.");
			cm.dispose();
		    } else {
		        cm.sendOk("#fn나눔고딕 Extrabold##r장비 칸에 빈 공간이 없습니다.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn나눔고딕 Extrabold##b후원 포인트#k 가 부족합니다.");
		    cm.dispose();
		}
		} else if (selection == 24) {
		if (cm.getHC() >= 500000) {
		    if (cm.canHold(1142137)) {
			cm.gainHC(-500000);
			cm.setAllStat(1142137,5000,500,0);
		        cm.sendOk("#fn나눔고딕 Extrabold##b후원 포인트#k 로 #i1142137# 를 구입 하셨습니다.");
			cm.dispose();
		    } else {
		        cm.sendOk("#fn나눔고딕 Extrabold##r장비 칸에 빈 공간이 없습니다.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn나눔고딕 Extrabold##b후원 포인트#k 가 부족합니다.");
		    cm.dispose();
		}
		} else if (selection == 25) {
		if (cm.getHC() >= 600000) {
		    if (cm.canHold(1142138)) {
			cm.gainHC(-600000);
			cm.setAllStat(1142138,6000,600,0);
		        cm.sendOk("#fn나눔고딕 Extrabold##b후원 포인트#k 로 #i1142138# 를 구입 하셨습니다.");
			cm.dispose();
		    } else {
		        cm.sendOk("#fn나눔고딕 Extrabold##r장비 칸에 빈 공간이 없습니다.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn나눔고딕 Extrabold##b후원 포인트#k 가 부족합니다.");
		    cm.dispose();
		}
		} else if (selection == 26) {
		if (cm.getHC() >= 800000) {
		    if (cm.canHold(1142138)) {
			cm.gainHC(-800000);
			cm.setAllStat(1142138,8000,800,0);
		        cm.sendOk("#fn나눔고딕 Extrabold##b후원 포인트#k 로 #i1142138# 를 구입 하셨습니다.");
			cm.dispose();
		    } else {
		        cm.sendOk("#fn나눔고딕 Extrabold##r장비 칸에 빈 공간이 없습니다.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn나눔고딕 Extrabold##b후원 포인트#k 가 부족합니다.");
		    cm.dispose();
		}
		} else if (selection == 27) {
		if (cm.getHC() >= 1000000) {
		    if (cm.canHold(1142138)) {
			cm.gainHC(-1000000);
			cm.setAllStat(1142138,10000,1000,0);
		        cm.sendOk("#fn나눔고딕 Extrabold##b후원 포인트#k 로 #i1142138# 를 구입 하셨습니다.");
			cm.dispose();
		    } else {
		        cm.sendOk("#fn나눔고딕 Extrabold##r장비 칸에 빈 공간이 없습니다.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn나눔고딕 Extrabold##b후원 포인트#k 가 부족합니다.");
		    cm.dispose();
		}
		} else if (selection == 28) {
		if (cm.getHC() >= 1100000) {
		    if (cm.canHold(1142139)) {
			cm.gainHC(-1100000);
			cm.setAllStat(1142139,11000,1100,0);
			cm.getPlayer().sethadm(1);
		        cm.sendOk("#fn나눔고딕 Extrabold##b후원 포인트#k 로 #i1142139# 를 구입 하셨습니다.");
			cm.dispose();
		    } else {
		        cm.sendOk("#fn나눔고딕 Extrabold##r장비 칸에 빈 공간이 없습니다.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn나눔고딕 Extrabold##b후원 포인트#k 가 부족합니다.");
		    cm.dispose();
		}
		} else if (selection == 29) {
		if (cm.getHC() >= 1300000) {
		    if (cm.canHold(1142139)) {
			cm.gainHC(-1300000);
			cm.setAllStat(1142139,13000,1300,0);
			cm.getPlayer().sethadm(1);
		        cm.sendOk("#fn나눔고딕 Extrabold##b후원 포인트#k 로 #i1142139# 를 구입 하셨습니다.");
			cm.dispose();
		    } else {
		        cm.sendOk("#fn나눔고딕 Extrabold##r장비 칸에 빈 공간이 없습니다.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn나눔고딕 Extrabold##b후원 포인트#k 가 부족합니다.");
		    cm.dispose();
		}
		} else if (selection == 30) {
		if (cm.getHC() >= 1500000) {
		    if (cm.canHold(1142139)) {
			cm.gainHC(-1500000);
			cm.setAllStat(1142139,15000,1500,0);
			cm.getPlayer().sethadm(1);
		        cm.sendOk("#fn나눔고딕 Extrabold##b후원 포인트#k 로 #i1142139# 를 구입 하셨습니다.");
			cm.dispose();
		    } else {
		        cm.sendOk("#fn나눔고딕 Extrabold##r장비 칸에 빈 공간이 없습니다.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn나눔고딕 Extrabold##b후원 포인트#k 가 부족합니다.");
		    cm.dispose();
		}

		} else if (selection == 100) {

		if (cm.getHC() >= 100000) { 
			cm.gainHC(-100000);
                        cm.getPlayer().gainAddDamageSin(6,true,"후원");
                        cm.sendOk("#fn나눔고딕 Extrabold##b후원 포인트#k 로 다음을 구입 하셨습니다.\r\n\r\n#b추가 데미지 타격 횟수 : + 6 타#k\r\n#d* 나의 추가 데미지 타격 횟수 : "+cm.getPlayer().getAddDamageS()+" 타#k");
			cm.dispose();
		} else {
		    cm.sendOk("#fn나눔고딕 Extrabold##b후원 포인트#k 가 부족합니다.");
		    cm.dispose();
                }

		} else if (selection == 101) {

		if (cm.getHC() >= 10000) { 
			cm.gainHC(-10000);
                        cm.getPlayer().gainAddDamagein(500000000,true);
                        cm.sendOk("#fn나눔고딕 Extrabold##b후원 포인트#k 로 다음을 구입 하셨습니다.\r\n\r\n#b추가 데미지 : + 5 억#k\r\n#d* 나의 추가 데미지 합계 : "+cm.getPlayer().getAddDamage()+"#k");
			cm.dispose();
		} else {
		    cm.sendOk("#fn나눔고딕 Extrabold##b후원 포인트#k 가 부족합니다.");
		    cm.dispose();
                }

		} else if (selection == 102) {

		if (cm.getHC() >= 20000) { 
			cm.gainHC(-20000);
                        cm.getPlayer().gainAddDamagein(1000000000,true);
                        cm.sendOk("#fn나눔고딕 Extrabold##b후원 포인트#k 로 다음을 구입 하셨습니다.\r\n\r\n#b추가 데미지 : + 10 억#k\r\n#d* 나의 추가 데미지 합계 : "+cm.getPlayer().getAddDamage()+"#k");
			cm.dispose();
		} else {
		    cm.sendOk("#fn나눔고딕 Extrabold##b후원 포인트#k 가 부족합니다.");
		    cm.dispose();
                }

		} else if (selection == 103) {

		if (cm.getHC() >= 30000) { 
			cm.gainHC(-30000);
                        cm.getPlayer().gainAddDamagein(1500000000,true);
                        cm.sendOk("#fn나눔고딕 Extrabold##b후원 포인트#k 로 다음을 구입 하셨습니다.\r\n\r\n#b추가 데미지 : + 15 억#k\r\n#d* 나의 추가 데미지 합계 : "+cm.getPlayer().getAddDamage()+"#k");
			cm.dispose();
		} else {
		    cm.sendOk("#fn나눔고딕 Extrabold##b후원 포인트#k 가 부족합니다.");
		    cm.dispose();
                }

		} else if (selection == 104) {

		if (cm.getHC() >= 40000) { 
			cm.gainHC(-40000);
                        cm.getPlayer().gainAddDamagein(2000000000,true);
                        cm.sendOk("#fn나눔고딕 Extrabold##b후원 포인트#k 로 다음을 구입 하셨습니다.\r\n\r\n#b추가 데미지 : + 20 억#k\r\n#d* 나의 추가 데미지 합계 : "+cm.getPlayer().getAddDamage()+"#k");
			cm.dispose();
		} else {
		    cm.sendOk("#fn나눔고딕 Extrabold##b후원 포인트#k 가 부족합니다.");
		    cm.dispose();
                }

		} else if (selection == 105) {

		if (cm.getHC() >= 50000) { 
			cm.gainHC(-50000);
                        cm.getPlayer().gainAddDamagein(2500000000,true);
                        cm.sendOk("#fn나눔고딕 Extrabold##b후원 포인트#k 로 다음을 구입 하셨습니다.\r\n\r\n#b추가 데미지 : + 25 억#k\r\n#d* 나의 추가 데미지 합계 : "+cm.getPlayer().getAddDamage()+"#k");
			cm.dispose();
		} else {
		    cm.sendOk("#fn나눔고딕 Extrabold##b후원 포인트#k 가 부족합니다.");
		    cm.dispose();
                }

		}
	}
}