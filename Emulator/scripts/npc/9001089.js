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
		var jessica = "#fn������� Extrabold#�������� �Լҹ��� ���ƽý� ������!\r\n�� ���� �׷��� ��ô�� �� ������� �ҹ��� ��������..\r\n";
		jessica += "#L0##d���ÿ� ���� ����#k\r\n";
		jessica += "#L1##b���� ��ǰ ����";
		jessica += "#L2#���û����̿�.#k\r\n";
		jessica += "#L3##r���� �̵�#k";
		cm.sendSimple(jessica);
	} else {
	cm.sendOk("#fn������� Extrabold#������ ���� ��̶�.. ��ܺ��ڸ��� �ƴ¹�����..");
	cm.dispose();
	}
} else {
cm.sendOk("#fn������� Extrabold##r���� �̿��� ���� 100 �̻� �̿� �����մϴ�.");
cm.dispose();
}
        } else if (status == 1) {
	if (selection == 0) {
		cm.sendOk("#fn������� Extrabold#������ ���� ��ǰ�� ������ �� ���� �ڸ��� �����ϰԳ�..\r\n�̳��� ���� �� ���ڿ� �ɾ� ������ ���ð� ����ȴٳ�..\r\n���� ����⸦ ���� ��� ���� ���� ������ ��ȯ�� �ְڴٳ�..\r\n�׸��� ���ô� ���� ��ȭ���� �������ڰ� ��δٴ��� �˾ƵΰԳ�..");
		cm.dispose();

	} else if (selection == 1) {
		var jessica2 = "#fn������� Extrabold##b���Ͻô� ǰ���� ���� �غ��Գ�..#k\r\n#r�κ��丮�� ������ �� ���� �� ������ ���� �ٶ��ٳ�..#k\r\n";
		jessica2 += "#L0##i3010432# #r���� ����#k #d(500.000.000)#k\r\n";
		cm.sendSimple(jessica2);
	} else if (selection == 3) {
		cm.dispose();
		cm.warp(100000000,0);
                cm.sendOk("#fn������� Extrabold##d������ �� ������ ��ⷯ ���ð�.. ������..#k");
	} else if (selection == 2) {
		var jessica3 = "#fn������� Extrabold##b���! ���! ��ΰ� ������!#k\r\n#r�κ��丮�� ������ �� ���� �� ������ ���� �ٶ��ٳ�..#k\r\n";
		jessica3 += "\r\n-------------------------------------------------------------------------------\r\n";
                jessica3 += "#L1##r[SS]#k #i1142972# #b#t1142972##k#l\r\n            #d�ý��� 500 ��, �� 50#k #r[ #i4001187# #i4001188# #i4001189# 1000 �� ]#k\r\n";
		jessica3 += "\r\n-------------------------------------------------------------------------------\r\n";
		jessica3 += "#L2##i4310108# #b1��#k #r[ #i4001187# #i4001188# #i4001189# 10 �� ]#k#l\r\n";
		jessica3 += "#L3##i4310108# #b10��#k #r[ #i4001187# #i4001188# #i4001189# 100 �� ]#k#l\r\n";
		jessica3 += "\r\n-------------------------------------------------------------------------------\r\n";
		jessica3 += "#L4##i4033247# #b1��#k #r[ #i4001187# #i4001188# #i4001189# 1 �� ]#k#l\r\n";
		jessica3 += "#L5##i4033247# #b10��#k #r[ #i4001187# #i4001188# #i4001189# 10 �� ]#k#l\r\n";
		jessica3 += "\r\n-------------------------------------------------------------------------------\r\n";
		cm.sendSimple(jessica3);
		}

        } else if (status == 2) {


	if (selection == 0) {
		if (cm.getMeso() >= 500000000) {
		if (cm.canHold(3010432)) {
		cm.gainItem(3010432, 1);
		cm.gainMeso(-500000000);
		cm.sendOk(" #fn������� Extrabold##d������ �� ���Գ�..#k");
		cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r��ġĭ�� �� ������ �����ϴ�.#k");
		        cm.dispose();
		    }
	} else {
		cm.sendOk("#fn������� Extrabold##r���� ������ �� ����..#k" );
		cm.dispose();
		}


	} else if (selection == 1) {
		if (cm.haveItem(4001187,1000) && cm.haveItem(4001188,1000) && cm.haveItem(4001189,1000)) {
		if (cm.canHold(1142972)) {
		cm.gainItem(4001187, -1000);
		cm.gainItem(4001188, -1000);
		cm.gainItem(4001189, -1000);
                      cm.gainSponserItem(1142972,'AURORA ���ò�', 500,50,1);
		cm.sendOk("#fn������� Extrabold##b#t1142949##k �� ��ȯ �Ͽ����ϴ�.\r\n�ڳ׾߸��� ������ #d���� ����#k ���..!");
		cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r���ĭ�� �� ������ �����ϴ�.#k");
		        cm.dispose();
		    }
	} else {
		cm.sendOk("#fn������� Extrabold##r����⸦ �� �� ��ƿ��Գ�..#k" );
		cm.dispose();
}


	} else if (selection == 2) {
		if (cm.haveItem(4001187,10) && cm.haveItem(4001188,10) && cm.haveItem(4001189,10)) {
		if (cm.canHold(4310108)) {
		cm.gainItem(4001187, -10);
		cm.gainItem(4001188, -10);
		cm.gainItem(4001189, -10);
		cm.gainItem(4310108, 1);
		cm.sendOk("#fn������� Extrabold##b#t4310108##k 1���� ��ȯ �Ͽ����ϴ�.");
		cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r��Ÿâ�� �� ������ �����ϴ�.#k");
		        cm.dispose();
		    }
	} else {
		cm.sendOk("#fn������� Extrabold##r����⸦ �� �� ��ƿ��Գ�..#k" );
		cm.dispose(); 
}


	} else if (selection == 3) {
		if (cm.haveItem(4001187,100) && cm.haveItem(4001188,100) && cm.haveItem(4001189,100)) {
		if (cm.canHold(4310108)) {
		cm.gainItem(4001187, -100);
		cm.gainItem(4001188, -100);
		cm.gainItem(4001189, -100);
		cm.gainItem(4310108, 10);
		cm.sendOk("#fn������� Extrabold##b#t4310108##k 10���� ��ȯ �Ͽ����ϴ�.");
		cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r��Ÿâ�� �� ������ �����ϴ�.#k");
		        cm.dispose();
		    }
	} else {
		cm.sendOk("#fn������� Extrabold##r����⸦ �� �� ��ƿ��Գ�..#k" );
		cm.dispose();
}

	} else if (selection == 4) {
		if (cm.haveItem(4001187,1) && cm.haveItem(4001188,1) && cm.haveItem(4001189,1)) {
		if (cm.canHold(4033247)) {
		cm.gainItem(4001187, -1);
		cm.gainItem(4001188, -1);
		cm.gainItem(4001189, -1);
		cm.gainItem(4033247, 1);
		cm.sendOk("#fn������� Extrabold##b#t4033247##k 1���� ��ȯ �Ͽ����ϴ�.");
		cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r��Ÿâ�� �� ������ �����ϴ�.#k");
		        cm.dispose();
		    }
	} else {
		cm.sendOk("#fn������� Extrabold##r����⸦ �� �� ��ƿ��Գ�..#k" );
		cm.dispose();
}

	} else if (selection == 5) {
		if (cm.haveItem(4001187,10) && cm.haveItem(4001188,10) && cm.haveItem(4001189,10)) {
		if (cm.canHold(4033247)) {
		cm.gainItem(4001187, -10);
		cm.gainItem(4001188, -10);
		cm.gainItem(4001189, -10);
		cm.gainItem(4033247, 10);
		cm.sendOk("#fn������� Extrabold##b#t4033247##k 10���� ��ȯ �Ͽ����ϴ�.");
		cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r��Ÿâ�� �� ������ �����ϴ�.#k");
		        cm.dispose();
		    }
	} else {
		cm.sendOk("#fn������� Extrabold##r����⸦ �� �� ��ƿ��Գ�..#k" );
		cm.dispose();
}



			}
		}
	}
}