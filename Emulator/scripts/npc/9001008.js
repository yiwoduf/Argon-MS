�� = "#fUI/FarmUI.img/objectStatus/star/whole#";
���� = "#fUI/GuildMark.img/Mark/Pattern/00004001/10#"

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
	var chat = "                #fn������� Extrabold##fs17#"+��+" "+ServerConstants.serverName+" ȫ�� ���� "+��+"\r\n#fs10##Cgray#                                  ���Ͻô� �޴��� �������ּ���.#k\r\n\r\n#fs13#                  #b#h0##k ��#k �� #bȫ�� ����Ʈ#k : #r"+cm.getH2C()+" P#k#fs11#\r\n\r\n"; 
	chat += "                   #bȫ�� ����Ʈ#k ȹ�� ����� #r���ӱ�#k �� �����ϼ���.\r\n\r\n";
	chat += "#fs12#-------------------------------------------------------------------------------\r\n";
        chat += "   "+����+"  #fs15##bȫ�� ����Ʈ#k [#r1000 P#k] �� ���� ������ ������\r\n";
	chat += "#fs12#-------------------------------------------------------------------------------\r\n";
        chat += "#L20##i3994247#  #b#z3994247##k #r30 ��#k #d(��ġ 1 ĭ �ʼ�)#k#l\r\n\r\n";
	chat += "#L1##i2470003#  #b#z2470003##k #r1 ��#k #d(�Һ� 1 ĭ �ʼ�)#k#l\r\n\r\n";
	chat += "#fs12#-------------------------------------------------------------------------------\r\n";
        chat += "   "+����+"  #fs15##bȫ�� ����Ʈ#k [#r2000 P#k] �� ���� ������ ������\r\n";
	chat += "#fs12#-------------------------------------------------------------------------------\r\n";
	chat += "#L2##i2432127#  #b#z2432127##k #r1 ��#k #d(�Һ� 1 ĭ �ʼ�)#k#l\r\n#L100#        #r��#k #b#z2432127##k ������ � �������� ��������?#l\r\n\r\n     �� �� �� �� �� �� �� �� �� �� �� �� �� �� �� �� �� �� �� �� ��\r\n";
	chat += "#L3##i2435226#  #b#z2435226##k #r1 ��#k #d(�Һ� 1 ĭ �ʼ�)#k#l\r\n#L200#        #r��#k #b#z2435226##k ������ � �������� ��������?#l\r\n\r\n     �� �� �� �� �� �� �� �� �� �� �� �� �� �� �� �� �� �� �� �� ��\r\n";
	chat += "#L4##i2470007#  #b#z2470007##k #r1 ��#k #d(�Һ� 1 ĭ �ʼ�)#k#l\r\n\r\n";
	chat += "#fs12#-------------------------------------------------------------------------------\r\n";
        chat += "   "+����+"  #fs15##bȫ�� ����Ʈ#k [#r4000 P#k] �� ���� ������ ������\r\n";
	chat += "#fs12#-------------------------------------------------------------------------------\r\n";
	chat += "#L5##i1182058#  #bȫ���� ����#k #r�ý��� 1 õ / ��, �� 1 õ#k #d(��� 1 ĭ �ʼ�)#k#l\r\n\r\n     �� �� �� �� �� �� �� �� �� �� �� �� �� �� �� �� �� �� �� �� ��\r\n";
	chat += "#L6##i2470010#  #b#z2470010##k #r1 ��#k #d(�Һ� 1 ĭ �ʼ�)#k#l\r\n\r\n     �� �� �� �� �� �� �� �� �� �� �� �� �� �� �� �� �� �� �� �� ��\r\n";
	chat += "#L7##i4320000#  #b�߰� ������#k #r+ 5 ��#k#l\r\n\r\n";
	chat += "#fs12#-------------------------------------------------------------------------------\r\n";
        chat += "   "+����+"  #fs15##bȫ�� ����Ʈ#k [#r25000 P#k] �� ���� ������ ������\r\n";
	chat += "#fs12#-------------------------------------------------------------------------------\r\n";
	chat += "#L8##i4320000#  #b�߰� ������ Ÿ�� Ƚ��#k #r+ 3Ÿ#k#l\r\n";
        cm.sendSimple(chat);
	}
         if (selection == 20) {
		if (cm.getH2C() >= 1000) {
		    if (cm.canHold(3994247)) {
			cm.gainH2C(-1000);
			cm.gainItem(3994247, 30);
		        cm.sendOk("#fn������� Extrabold##bȫ�� ����Ʈ#k �� #i3994247# #r30 ��#k �� ���� �ϼ̽��ϴ�.");
			cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r�Һ� ĭ�� �� ������ �����ϴ�.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn������� Extrabold##bȫ�� ����Ʈ#k �� �����մϴ�.");
		    cm.dispose();
                }
	} else if (selection == 1) {
		if (cm.getH2C() >= 1000) {
		    if (cm.canHold(2470003)) {
			cm.gainH2C(-1000);
			cm.gainItem(2470003, 1);
		        cm.sendOk("#fn������� Extrabold##bȫ�� ����Ʈ#k �� #i2470003# #r1 ��#k �� ���� �ϼ̽��ϴ�.");
			cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r�Һ� ĭ�� �� ������ �����ϴ�.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn������� Extrabold##bȫ�� ����Ʈ#k �� �����մϴ�.");
		    cm.dispose();
		}
	} else if (selection == 2) {
		if (cm.getH2C() >= 2000) {
		    if (cm.canHold(2432127)) {
			cm.gainH2C(-2000);
			cm.gainItem(2432127, 1);
		        cm.sendOk("#fn������� Extrabold##bȫ�� ����Ʈ#k �� #i2432127# #r1 ��#k �� ���� �ϼ̽��ϴ�.");
			cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r�Һ� ĭ�� �� ������ �����ϴ�.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn������� Extrabold##bȫ�� ����Ʈ#k �� �����մϴ�.");
		    cm.dispose();
		}

	} else if (selection == 3) {
		if (cm.getH2C() >= 2000) {
		    if (cm.canHold(2435226)) {
			cm.gainH2C(-2000);
			cm.gainItem(2435226, 1);
		        cm.sendOk("#fn������� Extrabold##bȫ�� ����Ʈ#k �� #i2435226# #r1 ��#k �� ���� �ϼ̽��ϴ�.");
			cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r�Һ� ĭ�� �� ������ �����ϴ�.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn������� Extrabold##bȫ�� ����Ʈ#k �� �����մϴ�.");
		    cm.dispose();
		}

	} else if (selection == 4) {
		if (cm.getH2C() >= 2000) {
		    if (cm.canHold(2470007)) {
			cm.gainH2C(-2000);
			cm.gainItem(2470007, 1);
		        cm.sendOk("#fn������� Extrabold##bȫ�� ����Ʈ#k �� #i2470007# #r1 ��#k �� ���� �ϼ̽��ϴ�.");
			cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r�Һ� ĭ�� �� ������ �����ϴ�.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn������� Extrabold##bȫ�� ����Ʈ#k �� �����մϴ�.");
		    cm.dispose();
		}

	} else if (selection == 5) {
		if (cm.getH2C() >= 4000) {
		    if (cm.canHold(1182058)) {
			cm.gainH2C(-4000);
			cm.setAllStat(1182058,1000,1000,0);
		        cm.sendOk("#fn������� Extrabold##bȫ�� ����Ʈ#k �� #i1182058# #r1 ��#k �� ���� �ϼ̽��ϴ�.");
			cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r��� ĭ�� �� ������ �����ϴ�.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn������� Extrabold##bȫ�� ����Ʈ#k �� �����մϴ�.");
		    cm.dispose();
		}

	} else if (selection == 6) {
		if (cm.getH2C() >= 4000) {
		    if (cm.canHold(2470010)) {
			cm.gainH2C(-4000);
			cm.gainItem(2470010, 1);
		        cm.sendOk("#fn������� Extrabold##bȫ�� ����Ʈ#k �� #i2470010# #r1 ��#k �� ���� �ϼ̽��ϴ�.");
			cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r�Һ� ĭ�� �� ������ �����ϴ�.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn������� Extrabold##bȫ�� ����Ʈ#k �� �����մϴ�.");
		    cm.dispose();
		}


	} else if (selection == 7) {
		if (cm.getH2C() >= 4000) {
			cm.gainH2C(-4000);
			cm.getPlayer().gainAddDamagein(500000000,true);
                        cm.sendOk("#fn������� Extrabold##bȫ�� ����Ʈ#k �� #b�߰� ������#k #r+ 5 ��#k �� ���� �ϼ̽��ϴ�.\r\n\r\n#d* ���� �߰� ������ �հ� : "+cm.getPlayer().getAddDamage()+"#k");
			cm.dispose();
		} else {
		    cm.sendOk("#fn������� Extrabold##bȫ�� ����Ʈ#k �� �����մϴ�.");
		    cm.dispose();
		}


	} else if (selection == 8) {
		if (cm.getH2C() >= 25000) {
			cm.gainH2C(-25000);
			cm.getPlayer().gainAddDamageSin(3,true,"ȫ��");
                        cm.sendOk("#fn������� Extrabold##bȫ�� ����Ʈ#k �� #b�߰� ������ Ÿ�� Ƚ��#k #r+ 3 Ÿ#k �� ���� �ϼ̽��ϴ�.\r\n\r\n#d* ���� �߰� ������ Ÿ�� Ƚ�� : "+cm.getPlayer().getAddDamageS()+" Ÿ#k");
			cm.dispose();
		} else {
		    cm.sendOk("#fn������� Extrabold##bȫ�� ����Ʈ#k �� �����մϴ�.");
		    cm.dispose();
		}

	} else if (selection == 100) {
	cm.sendOk("#fn������� Extrabold##fs15##r[��]#k #d���� 1 �� ȹ��#k#fs12#\r\n\r\n#i2028048# #b���� �޼�#k #r4 ~ 20 ��#k\r\n#i4310175# #bM ����#k #r200 ~ 500 ��#k\r\n#i2430218# #b#z2430218##k #r5 ~ 15 ��#k\r\n#i2049153# #b#z2049153##k #r2 ~ 8 ��#k\r\n#i2048717# #b#z2048717##k #r2 ~ 8 ��#k\r\n#i2049360# #b#z2049360##k #r2 ~ 8 ��#k\r\n#i3994592# #b�ʿ� ����Ʈ#k #r100 ~ 150 P#k\r\n#i2046991# #b#z2046991##k #r1 ~ 2 ��#k\r\n#i2047814# #b#z2047814##k #r1 ~ 2 ��#k\r\n#i2046992# #b#z2046992##k #r1 ~ 2 ��#k\r\n#i4001869# #b#z4001869##k #r1 ~ 2 ��#k");
	cm.dispose();
	} else if (selection == 200) {
	cm.sendOk("#fn������� Extrabold##fs15##r[��]#k #d���� 1 �� ȹ��#k#fs12#\r\n\r\n#i2049373# #b#z2049373##k #r1 ��#k\r\n#i2049370# #b#z2049370##k #r1 ��#k\r\n#i2049372# #b#z2049372##k #r1 ��#k\r\n#i2049371# #b#z2049371##k #r1 ��#k\r\n#i2049376# #b#z2049376##k #r1 ��#k");
	cm.dispose();
	}
}
}