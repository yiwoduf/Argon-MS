var status = 0;

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
if (cm.getPlayer().getLevel() >= 100) {
	if (cm.getPlayer().getMapId() == 3000500) {
		var jessica = "#fn나눔고딕 Extrabold#전국에서 입소문난 오아시스 낚시터!\r\n이 곳이 그렇게 월척이 잘 잡히기로 소문이 자자하지..\r\n";
		jessica += "#L0##d낚시에 대한 설명#k\r\n";
		jessica += "#L1##b낚시 용품 구입";
		jessica += "#L2#낚시상점이용.#k\r\n";
		jessica += "#L3##r광장 이동#k";
		cm.sendSimple(jessica);
	} else {
	cm.sendOk("#fn나눔고딕 Extrabold#세월을 낚는 재미란.. 즐겨본자만이 아는법이지..");
	cm.dispose();
	}
} else {
cm.sendOk("#fn나눔고딕 Extrabold##r낚시 이용은 레벨 100 이상만 이용 가능합니다.");
cm.dispose();
}
        } else if (status == 1) {
	if (selection == 0) {
		cm.sendOk("#fn나눔고딕 Extrabold#나에게 낚시 용품을 구입한 후 좋은 자리를 선점하게나..\r\n미끼를 소지 후 의자에 앉아 있으면 낚시가 진행된다네..\r\n만약 물고기를 많이 모아 오면 좋은 것으로 교환해 주겠다네..\r\n그리고 낚시는 귀족 문화여서 낚시의자가 비싸다는점 알아두게나..");
		cm.dispose();

	} else if (selection == 1) {
		var jessica2 = "#fn나눔고딕 Extrabold##b원하시는 품목을 선택 해보게나..#k\r\n#r인벤토리가 꽉차면 못 받을 수 있으니 주의 바란다네..#k\r\n";
		jessica2 += "#L0##i3010432# #r낚시 의자#k #d(500.000.000)#k\r\n";
		cm.sendSimple(jessica2);
	} else if (selection == 3) {
		cm.dispose();
		cm.warp(100000000,0);
                cm.sendOk("#fn나눔고딕 Extrabold##d다음에 또 여유를 즐기러 오시게.. 젊은이..#k");
	} else if (selection == 2) {
		var jessica3 = "#fn나눔고딕 Extrabold##b골라! 골라! 잽싸게 골라버려!#k\r\n#r인벤토리가 꽉차면 못 받을 수 있으니 주의 바란다네..#k\r\n";
		jessica3 += "\r\n-------------------------------------------------------------------------------\r\n";
                jessica3 += "#L1##r[SS]#k #i1142972# #b#t1142972##k#l\r\n            #d올스탯 500 공, 마 50#k #r[ #i4001187# #i4001188# #i4001189# 1000 개 ]#k\r\n";
		jessica3 += "\r\n-------------------------------------------------------------------------------\r\n";
		jessica3 += "#L2##i4310108# #b1개#k #r[ #i4001187# #i4001188# #i4001189# 10 개 ]#k#l\r\n";
		jessica3 += "#L3##i4310108# #b10개#k #r[ #i4001187# #i4001188# #i4001189# 100 개 ]#k#l\r\n";
		jessica3 += "\r\n-------------------------------------------------------------------------------\r\n";
		jessica3 += "#L4##i4033247# #b1개#k #r[ #i4001187# #i4001188# #i4001189# 1 개 ]#k#l\r\n";
		jessica3 += "#L5##i4033247# #b10개#k #r[ #i4001187# #i4001188# #i4001189# 10 개 ]#k#l\r\n";
		jessica3 += "\r\n-------------------------------------------------------------------------------\r\n";
		cm.sendSimple(jessica3);
		}

        } else if (status == 2) {


	if (selection == 0) {
		if (cm.getMeso() >= 500000000) {
		if (cm.canHold(3010432)) {
		cm.gainItem(3010432, 1);
		cm.gainMeso(-500000000);
		cm.sendOk(" #fn나눔고딕 Extrabold##d다음에 또 오게나..#k");
		cm.dispose();
		    } else {
		        cm.sendOk("#fn나눔고딕 Extrabold##r설치칸에 빈 공간이 없습니다.#k");
		        cm.dispose();
		    }
	} else {
		cm.sendOk("#fn나눔고딕 Extrabold##r돈이 부족한 것 같군..#k" );
		cm.dispose();
		}


	} else if (selection == 1) {
		if (cm.haveItem(4001187,1000) && cm.haveItem(4001188,1000) && cm.haveItem(4001189,1000)) {
		if (cm.canHold(1142972)) {
		cm.gainItem(4001187, -1000);
		cm.gainItem(4001188, -1000);
		cm.gainItem(4001189, -1000);
                      cm.gainSponserItem(1142972,'AURORA 낚시꾼', 500,50,1);
		cm.sendOk("#fn나눔고딕 Extrabold##b#t1142949##k 를 교환 하였습니다.\r\n자네야말로 진정한 #d낚시 도사#k 라네..!");
		cm.dispose();
		    } else {
		        cm.sendOk("#fn나눔고딕 Extrabold##r장비칸에 빈 공간이 없습니다.#k");
		        cm.dispose();
		    }
	} else {
		cm.sendOk("#fn나눔고딕 Extrabold##r물고기를 좀 더 잡아오게나..#k" );
		cm.dispose();
}


	} else if (selection == 2) {
		if (cm.haveItem(4001187,10) && cm.haveItem(4001188,10) && cm.haveItem(4001189,10)) {
		if (cm.canHold(4310108)) {
		cm.gainItem(4001187, -10);
		cm.gainItem(4001188, -10);
		cm.gainItem(4001189, -10);
		cm.gainItem(4310108, 1);
		cm.sendOk("#fn나눔고딕 Extrabold##b#t4310108##k 1개를 교환 하였습니다.");
		cm.dispose();
		    } else {
		        cm.sendOk("#fn나눔고딕 Extrabold##r기타창에 빈 공간이 없습니다.#k");
		        cm.dispose();
		    }
	} else {
		cm.sendOk("#fn나눔고딕 Extrabold##r물고기를 좀 더 잡아오게나..#k" );
		cm.dispose(); 
}


	} else if (selection == 3) {
		if (cm.haveItem(4001187,100) && cm.haveItem(4001188,100) && cm.haveItem(4001189,100)) {
		if (cm.canHold(4310108)) {
		cm.gainItem(4001187, -100);
		cm.gainItem(4001188, -100);
		cm.gainItem(4001189, -100);
		cm.gainItem(4310108, 10);
		cm.sendOk("#fn나눔고딕 Extrabold##b#t4310108##k 10개를 교환 하였습니다.");
		cm.dispose();
		    } else {
		        cm.sendOk("#fn나눔고딕 Extrabold##r기타창에 빈 공간이 없습니다.#k");
		        cm.dispose();
		    }
	} else {
		cm.sendOk("#fn나눔고딕 Extrabold##r물고기를 좀 더 잡아오게나..#k" );
		cm.dispose();
}

	} else if (selection == 4) {
		if (cm.haveItem(4001187,1) && cm.haveItem(4001188,1) && cm.haveItem(4001189,1)) {
		if (cm.canHold(4033247)) {
		cm.gainItem(4001187, -1);
		cm.gainItem(4001188, -1);
		cm.gainItem(4001189, -1);
		cm.gainItem(4033247, 1);
		cm.sendOk("#fn나눔고딕 Extrabold##b#t4033247##k 1개를 교환 하였습니다.");
		cm.dispose();
		    } else {
		        cm.sendOk("#fn나눔고딕 Extrabold##r기타창에 빈 공간이 없습니다.#k");
		        cm.dispose();
		    }
	} else {
		cm.sendOk("#fn나눔고딕 Extrabold##r물고기를 좀 더 잡아오게나..#k" );
		cm.dispose();
}

	} else if (selection == 5) {
		if (cm.haveItem(4001187,10) && cm.haveItem(4001188,10) && cm.haveItem(4001189,10)) {
		if (cm.canHold(4033247)) {
		cm.gainItem(4001187, -10);
		cm.gainItem(4001188, -10);
		cm.gainItem(4001189, -10);
		cm.gainItem(4033247, 10);
		cm.sendOk("#fn나눔고딕 Extrabold##b#t4033247##k 10개를 교환 하였습니다.");
		cm.dispose();
		    } else {
		        cm.sendOk("#fn나눔고딕 Extrabold##r기타창에 빈 공간이 없습니다.#k");
		        cm.dispose();
		    }
	} else {
		cm.sendOk("#fn나눔고딕 Extrabold##r물고기를 좀 더 잡아오게나..#k" );
		cm.dispose();
}



			}
		}
	}
}