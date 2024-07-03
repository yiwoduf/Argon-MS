별 = "#fUI/FarmUI.img/objectStatus/star/whole#";
별흰 = "#fUI/GuildMark.img/Mark/Pattern/00004001/10#"

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
	var chat = "                #fn나눔고딕 Extrabold##fs17#"+별+" "+ServerConstants.serverName+" 홍보 상점 "+별+"\r\n#fs10##Cgray#                                  원하시는 메뉴를 선택해주세요.#k\r\n\r\n#fs13#                  #b#h0##k 님#k 의 #b홍보 포인트#k : #r"+cm.getH2C()+" P#k#fs11#\r\n\r\n"; 
	chat += "                   #b홍보 포인트#k 획득 방법은 #r접속기#k 를 참고하세요.\r\n\r\n";
	chat += "#fs12#-------------------------------------------------------------------------------\r\n";
        chat += "   "+별흰+"  #fs15##b홍보 포인트#k [#r1000 P#k] 로 구매 가능한 아이템\r\n";
	chat += "#fs12#-------------------------------------------------------------------------------\r\n";
        chat += "#L20##i3994247#  #b#z3994247##k #r30 개#k #d(설치 1 칸 필수)#k#l\r\n\r\n";
	chat += "#L1##i2470003#  #b#z2470003##k #r1 개#k #d(소비 1 칸 필수)#k#l\r\n\r\n";
	chat += "#fs12#-------------------------------------------------------------------------------\r\n";
        chat += "   "+별흰+"  #fs15##b홍보 포인트#k [#r2000 P#k] 로 구매 가능한 아이템\r\n";
	chat += "#fs12#-------------------------------------------------------------------------------\r\n";
	chat += "#L2##i2432127#  #b#z2432127##k #r1 개#k #d(소비 1 칸 필수)#k#l\r\n#L100#        #r▶#k #b#z2432127##k 에서는 어떤 아이템이 나오나요?#l\r\n\r\n     ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─\r\n";
	chat += "#L3##i2435226#  #b#z2435226##k #r1 개#k #d(소비 1 칸 필수)#k#l\r\n#L200#        #r▶#k #b#z2435226##k 에서는 어떤 아이템이 나오나요?#l\r\n\r\n     ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─\r\n";
	chat += "#L4##i2470007#  #b#z2470007##k #r1 개#k #d(소비 1 칸 필수)#k#l\r\n\r\n";
	chat += "#fs12#-------------------------------------------------------------------------------\r\n";
        chat += "   "+별흰+"  #fs15##b홍보 포인트#k [#r4000 P#k] 로 구매 가능한 아이템\r\n";
	chat += "#fs12#-------------------------------------------------------------------------------\r\n";
	chat += "#L5##i1182058#  #b홍보왕 훈장#k #r올스탯 1 천 / 공, 마 1 천#k #d(장비 1 칸 필수)#k#l\r\n\r\n     ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─\r\n";
	chat += "#L6##i2470010#  #b#z2470010##k #r1 개#k #d(소비 1 칸 필수)#k#l\r\n\r\n     ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─\r\n";
	chat += "#L7##i4320000#  #b추가 데미지#k #r+ 5 억#k#l\r\n\r\n";
	chat += "#fs12#-------------------------------------------------------------------------------\r\n";
        chat += "   "+별흰+"  #fs15##b홍보 포인트#k [#r25000 P#k] 로 구매 가능한 아이템\r\n";
	chat += "#fs12#-------------------------------------------------------------------------------\r\n";
	chat += "#L8##i4320000#  #b추가 데미지 타격 횟수#k #r+ 3타#k#l\r\n";
        cm.sendSimple(chat);
	}
         if (selection == 20) {
		if (cm.getH2C() >= 1000) {
		    if (cm.canHold(3994247)) {
			cm.gainH2C(-1000);
			cm.gainItem(3994247, 30);
		        cm.sendOk("#fn나눔고딕 Extrabold##b홍보 포인트#k 로 #i3994247# #r30 개#k 를 구입 하셨습니다.");
			cm.dispose();
		    } else {
		        cm.sendOk("#fn나눔고딕 Extrabold##r소비 칸에 빈 공간이 없습니다.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn나눔고딕 Extrabold##b홍보 포인트#k 가 부족합니다.");
		    cm.dispose();
                }
	} else if (selection == 1) {
		if (cm.getH2C() >= 1000) {
		    if (cm.canHold(2470003)) {
			cm.gainH2C(-1000);
			cm.gainItem(2470003, 1);
		        cm.sendOk("#fn나눔고딕 Extrabold##b홍보 포인트#k 로 #i2470003# #r1 개#k 를 구입 하셨습니다.");
			cm.dispose();
		    } else {
		        cm.sendOk("#fn나눔고딕 Extrabold##r소비 칸에 빈 공간이 없습니다.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn나눔고딕 Extrabold##b홍보 포인트#k 가 부족합니다.");
		    cm.dispose();
		}
	} else if (selection == 2) {
		if (cm.getH2C() >= 2000) {
		    if (cm.canHold(2432127)) {
			cm.gainH2C(-2000);
			cm.gainItem(2432127, 1);
		        cm.sendOk("#fn나눔고딕 Extrabold##b홍보 포인트#k 로 #i2432127# #r1 개#k 를 구입 하셨습니다.");
			cm.dispose();
		    } else {
		        cm.sendOk("#fn나눔고딕 Extrabold##r소비 칸에 빈 공간이 없습니다.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn나눔고딕 Extrabold##b홍보 포인트#k 가 부족합니다.");
		    cm.dispose();
		}

	} else if (selection == 3) {
		if (cm.getH2C() >= 2000) {
		    if (cm.canHold(2435226)) {
			cm.gainH2C(-2000);
			cm.gainItem(2435226, 1);
		        cm.sendOk("#fn나눔고딕 Extrabold##b홍보 포인트#k 로 #i2435226# #r1 개#k 를 구입 하셨습니다.");
			cm.dispose();
		    } else {
		        cm.sendOk("#fn나눔고딕 Extrabold##r소비 칸에 빈 공간이 없습니다.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn나눔고딕 Extrabold##b홍보 포인트#k 가 부족합니다.");
		    cm.dispose();
		}

	} else if (selection == 4) {
		if (cm.getH2C() >= 2000) {
		    if (cm.canHold(2470007)) {
			cm.gainH2C(-2000);
			cm.gainItem(2470007, 1);
		        cm.sendOk("#fn나눔고딕 Extrabold##b홍보 포인트#k 로 #i2470007# #r1 개#k 를 구입 하셨습니다.");
			cm.dispose();
		    } else {
		        cm.sendOk("#fn나눔고딕 Extrabold##r소비 칸에 빈 공간이 없습니다.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn나눔고딕 Extrabold##b홍보 포인트#k 가 부족합니다.");
		    cm.dispose();
		}

	} else if (selection == 5) {
		if (cm.getH2C() >= 4000) {
		    if (cm.canHold(1182058)) {
			cm.gainH2C(-4000);
			cm.setAllStat(1182058,1000,1000,0);
		        cm.sendOk("#fn나눔고딕 Extrabold##b홍보 포인트#k 로 #i1182058# #r1 개#k 를 구입 하셨습니다.");
			cm.dispose();
		    } else {
		        cm.sendOk("#fn나눔고딕 Extrabold##r장비 칸에 빈 공간이 없습니다.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn나눔고딕 Extrabold##b홍보 포인트#k 가 부족합니다.");
		    cm.dispose();
		}

	} else if (selection == 6) {
		if (cm.getH2C() >= 4000) {
		    if (cm.canHold(2470010)) {
			cm.gainH2C(-4000);
			cm.gainItem(2470010, 1);
		        cm.sendOk("#fn나눔고딕 Extrabold##b홍보 포인트#k 로 #i2470010# #r1 개#k 를 구입 하셨습니다.");
			cm.dispose();
		    } else {
		        cm.sendOk("#fn나눔고딕 Extrabold##r소비 칸에 빈 공간이 없습니다.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn나눔고딕 Extrabold##b홍보 포인트#k 가 부족합니다.");
		    cm.dispose();
		}


	} else if (selection == 7) {
		if (cm.getH2C() >= 4000) {
			cm.gainH2C(-4000);
			cm.getPlayer().gainAddDamagein(500000000,true);
                        cm.sendOk("#fn나눔고딕 Extrabold##b홍보 포인트#k 로 #b추가 데미지#k #r+ 5 억#k 을 구입 하셨습니다.\r\n\r\n#d* 나의 추가 데미지 합계 : "+cm.getPlayer().getAddDamage()+"#k");
			cm.dispose();
		} else {
		    cm.sendOk("#fn나눔고딕 Extrabold##b홍보 포인트#k 가 부족합니다.");
		    cm.dispose();
		}


	} else if (selection == 8) {
		if (cm.getH2C() >= 25000) {
			cm.gainH2C(-25000);
			cm.getPlayer().gainAddDamageSin(3,true,"홍보");
                        cm.sendOk("#fn나눔고딕 Extrabold##b홍보 포인트#k 로 #b추가 데미지 타격 횟수#k #r+ 3 타#k 를 구입 하셨습니다.\r\n\r\n#d* 나의 추가 데미지 타격 횟수 : "+cm.getPlayer().getAddDamageS()+" 타#k");
			cm.dispose();
		} else {
		    cm.sendOk("#fn나눔고딕 Extrabold##b홍보 포인트#k 가 부족합니다.");
		    cm.dispose();
		}

	} else if (selection == 100) {
	cm.sendOk("#fn나눔고딕 Extrabold##fs15##r[▶]#k #d랜덤 1 종 획득#k#fs12#\r\n\r\n#i2028048# #b게임 메소#k #r4 ~ 20 억#k\r\n#i4310175# #bM 코인#k #r200 ~ 500 개#k\r\n#i2430218# #b#z2430218##k #r5 ~ 15 개#k\r\n#i2049153# #b#z2049153##k #r2 ~ 8 장#k\r\n#i2048717# #b#z2048717##k #r2 ~ 8 개#k\r\n#i2049360# #b#z2049360##k #r2 ~ 8 장#k\r\n#i3994592# #b초월 포인트#k #r100 ~ 150 P#k\r\n#i2046991# #b#z2046991##k #r1 ~ 2 장#k\r\n#i2047814# #b#z2047814##k #r1 ~ 2 장#k\r\n#i2046992# #b#z2046992##k #r1 ~ 2 장#k\r\n#i4001869# #b#z4001869##k #r1 ~ 2 개#k");
	cm.dispose();
	} else if (selection == 200) {
	cm.sendOk("#fn나눔고딕 Extrabold##fs15##r[▶]#k #d랜덤 1 종 획득#k#fs12#\r\n\r\n#i2049373# #b#z2049373##k #r1 장#k\r\n#i2049370# #b#z2049370##k #r1 장#k\r\n#i2049372# #b#z2049372##k #r1 장#k\r\n#i2049371# #b#z2049371##k #r1 장#k\r\n#i2049376# #b#z2049376##k #r1 장#k");
	cm.dispose();
	}
}
}