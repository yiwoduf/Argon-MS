���� = "#fUI/GuildMark.img/Mark/Pattern/00004001/11#"
���� = "#fUI/GuildMark.img/Mark/Pattern/00004001/3#"
���� = "#fUI/GuildMark.img/Mark/Pattern/00004001/15#"
���� = "#fUI/GuildMark.img/Mark/Pattern/00004001/5#"
���� = "#fUI/GuildMark.img/Mark/Pattern/00004001/1#"
���� = "#fUI/GuildMark.img/Mark/Pattern/00004001/16#"
���� = "#fUI/GuildMark.img/Mark/Pattern/00004001/13#"
�� = "#fUI/FarmUI.img/objectStatus/star/whole#";
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
		chat1 += "                   #b�Ŀ� ����Ʈ#k ȹ�� ����� #r���ӱ�#k �� �����ϼ���.\r\n\r\n";
		chat1 += "                    #L9999##fs13#"+����+" �Ŀ� ��Ÿ ���� �����ϱ� "+����+"#l\r\n"
		chat1 += "               #L9998##fs13#"+����+" #d�Ŀ� ���� ���� �����ϱ�#k "+����+"#l\r\n"
		cm.sendSimple(chat1);
		} if (selection == 9999) {
		var a = "           #fn������� Extrabold#"+��+" #fs17#"+ServerConstants.serverName+" �Ŀ� ��Ÿ ���� "+��+"\r\n#fs10##Cgray#                                 ���Ͻô� �������� ��� �ּ���.#k\r\n";
		a += "#fs15#\r\n����������������������������������������������\r\n                            <  �� Ÿ �� ��  >\r\n����������������������������������������������#fs11#\r\n";
		a += "#L1000#"+����+"  #i2432127# #b#z2432127##k #d(�Һ� 1 ĭ �ʼ�)#k ��ȯ#l\r\n       #L5##r��#k #b#z2432127##k ������ � �������� ��������?#l\r\n\r\n#fs11#             ��ȯ �Ϸ��� #b�Ŀ� ����Ʈ#k #r5000 P#k �� �ʿ� �մϴ�.\r\n";
		a += "#L2000#"+����+"  #i2435226# #b#z2435226##k #d(�Һ� 1 ĭ �ʼ�)#k ��ȯ#l\r\n       #L6##r��#k #b#z2435226##k ������ � �������� ��������?#l\r\n\r\n#fs11#             ��ȯ �Ϸ��� #b�Ŀ� ����Ʈ#k #r5000 P#k �� �ʿ� �մϴ�.\r\n";
		a += "#L3#"+����+"  #i2470010# #b#z2470010##k #d(�Һ� 1 ĭ �ʼ�)#k ��ȯ#l\r\n\r\n#fs11#             ��ȯ �Ϸ��� #b�Ŀ� ����Ʈ#k #r10000 P#k �� �ʿ� �մϴ�.\r\n";
		a += "#L4#"+����+"  #bĳ���� �г���#k �� ���ϴ� #b�г������� ����#k ����#k#l\r\n\r\n#fs11#             ��ȯ �Ϸ��� #b�Ŀ� ����Ʈ#k #r? P#k �� �ʿ� �մϴ�.\r\n";
                a += "#L50#"+����+"  #bĳ���� ����#k �� ���ϴ� #b�������� ����#k ����#k#l\r\n\r\n#fs11#             ��ȯ �Ϸ��� #b�Ŀ� ����Ʈ#k #r25000 P#k �� �ʿ� �մϴ�.\r\n";
		a += "#fs15#\r\n����������������������������������������������\r\n                            <  �� �� �� ��  >\r\n����������������������������������������������#fs11#\r\n";
		a += "#L100#"+����+"  #b�߰������� Ÿ�� Ƚ��#k #r+ 6 Ÿ#k �� ��ȯ �ϰڽ��ϴ�.#l\r\n\r\n#fs11#             ��ȯ �Ϸ��� #b�Ŀ� ����Ʈ#k #r100000 P#k �� �ʿ� �մϴ�.\r\n";
		a += "#L101#"+����+"  #b�߰� ������#k #r+ 5 ��#k �� ��ȯ �ϰڽ��ϴ�.#l\r\n\r\n#fs11#             ��ȯ �Ϸ��� #b�Ŀ� ����Ʈ#k #r10000 P#k �� �ʿ� �մϴ�.\r\n";
		a += "#L102#"+����+"  #b�߰� ������#k #r+ 10 ��#k �� ��ȯ �ϰڽ��ϴ�.#l\r\n\r\n#fs11#             ��ȯ �Ϸ��� #b�Ŀ� ����Ʈ#k #r20000 P#k �� �ʿ� �մϴ�.\r\n";
		a += "#L103#"+����+"  #b�߰� ������#k #r+ 15 ��#k �� ��ȯ �ϰڽ��ϴ�.#l\r\n\r\n#fs11#             ��ȯ �Ϸ��� #b�Ŀ� ����Ʈ#k #r30000 P#k �� �ʿ� �մϴ�.\r\n";
		a += "#L104#"+����+"  #b�߰� ������#k #r+ 20 ��#k �� ��ȯ �ϰڽ��ϴ�.#l\r\n\r\n#fs11#             ��ȯ �Ϸ��� #b�Ŀ� ����Ʈ#k #r40000 P#k �� �ʿ� �մϴ�.\r\n";
		a += "#L105#"+����+"  #b�߰� ������#k #r+ 25 ��#k �� ��ȯ �ϰڽ��ϴ�.#l\r\n\r\n#fs11#             ��ȯ �Ϸ��� #b�Ŀ� ����Ʈ#k #r50000 P#k �� �ʿ� �մϴ�.\r\n";
		cm.sendSimple(a);
		} else if (selection == 9998) {
		var b = "           #fn������� Extrabold#"+��+"#fs17# "+ServerConstants.serverName+" �Ŀ� ���� ���� "+��+"\r\n#fs10##Cgray#                                ���Ͻô� ���� ü�踦 ��� �ּ���.#k#fs12#\r\n\r\n  #r�Ŀ� ����#k �� ���׷��̵�� #b�Ŀ� ����Ʈ#k �� #d�米ȯ#k �� �����մϴ�.\r\n                   ���Ǵ� ���� #b���#k ���� #d���� ����#k �ٶ��ϴ�.#fs15#\r\n\r\n����������������������������������������������\r\n                            <  �� �� �� ��  >\r\n����������������������������������������������#fs11#\r\n";

		b += "#L9996#"+S+"  #b�ý���#k ������ ���� (#rSTR,DEX,INT.LUK#k ����)#l\r\n";
		b += "#L9997#"+S+"  #b��, ��#k ������ ���� (#r���ݷ�, ����#k ����)#l\r\n";
		cm.sendSimple(b);
		} else if (selection == 9996) {
		var cc = "           #fn������� Extrabold#"+��+"#fs17# "+ServerConstants.serverName+" �Ŀ� ��� ���� "+��+"\r\n#fs10##Cgray#                                ���Ͻô� �������� ��� �ּ���.#k#fs12#\r\n\r\n  #r�Ŀ� ����#k �� ���׷��̵�� #b�Ŀ� ����Ʈ#k �� #d�米ȯ#k �� �����մϴ�.\r\n                   ���Ǵ� ���� #b���#k ���� #d���� ����#k �ٶ��ϴ�.#fs15#\r\n\r\n����������������������������������������������\r\n                            <  �� �� �� ��  >\r\n����������������������������������������������#fs11#\r\n";
		cc += "#L22#"+����+"  #i1142137# #b�Ŀ� ���� : C ���#k #d�ý��� 1000 / ��, �� 100#k#l\r\n\r\n#fs11#             ��ȯ �Ϸ��� #b�Ŀ� ����Ʈ#k #r100000 P#k �� �ʿ� �մϴ�.\r\n";
		cc += "#L23#"+����+"  #i1142137# #b�Ŀ� ���� : C ���#k #d�ý��� 3000 / ��, �� 300#k#l\r\n\r\n#fs11#             ��ȯ �Ϸ��� #b�Ŀ� ����Ʈ#k #r300000 P#k �� �ʿ� �մϴ�.\r\n";
		cc += "#L24#"+����+"  #i1142137# #b�Ŀ� ���� : C ���#k #d�ý��� 5000 / ��, �� 500#k#l\r\n\r\n#fs11#             ��ȯ �Ϸ��� #b�Ŀ� ����Ʈ#k #r500000 P#k �� �ʿ� �մϴ�.\r\n\r\n";
		cc += "#L25#"+����+"  #i1142138# #b�Ŀ� ���� : B ���#k #d�ý��� 6000 / ��, �� 600#k#l\r\n\r\n#fs11#             ��ȯ �Ϸ��� #b�Ŀ� ����Ʈ#k #r600000 P#k �� �ʿ� �մϴ�.\r\n";
		cc += "#L26#"+����+"  #i1142138# #b�Ŀ� ���� : B ���#k #d�ý��� 8000 / ��, �� 800#k#l\r\n\r\n#fs11#             ��ȯ �Ϸ��� #b�Ŀ� ����Ʈ#k #r800000 P#k �� �ʿ� �մϴ�.\r\n";
		cc += "#L27#"+����+"  #i1142138# #b�Ŀ� ���� : B ���#k #d�ý��� 10000 / ��, �� 1000#k#l\r\n\r\n#fs11#             ��ȯ �Ϸ��� #b�Ŀ� ����Ʈ#k #r1000000 P#k �� �ʿ� �մϴ�.\r\n\r\n";
		cc += "#L28#"+����+"  #i1142139# #b�Ŀ� ���� : A ���#k #d�ý��� 11000 / ��, �� 1100#k#l\r\n\r\n#fs11#             ��ȯ �Ϸ��� #b�Ŀ� ����Ʈ#k #r1100000 P#k �� �ʿ� �մϴ�.\r\n";
		cc += "#L29#"+����+"  #i1142139# #b�Ŀ� ���� : A ���#k #d�ý��� 13000 / ��, �� 1300#k#l\r\n\r\n#fs11#             ��ȯ �Ϸ��� #b�Ŀ� ����Ʈ#k #r1300000 P#k �� �ʿ� �մϴ�.\r\n";
		cc += "#L30#"+����+"  #i1142139# #b�Ŀ� ���� : A ���#k #d�ý��� 15000 / ��, �� 1500#k#l\r\n\r\n#fs11#             ��ȯ �Ϸ��� #b�Ŀ� ����Ʈ#k #r1500000 P#k �� �ʿ� �մϴ�.\r\n\r\n";
		cm.sendSimple(cc);
		} else if (selection == 9997) {
		var c = "           #fn������� Extrabold#"+��+"#fs17# "+ServerConstants.serverName+" �Ŀ� ��� ���� "+��+"\r\n#fs10##Cgray#                                ���Ͻô� �������� ��� �ּ���.#k#fs12#\r\n\r\n  #r�Ŀ� ����#k �� ���׷��̵�� #b�Ŀ� ����Ʈ#k �� #d�米ȯ#k �� �����մϴ�.\r\n                   ���Ǵ� ���� #b���#k ���� #d���� ����#k �ٶ��ϴ�.#fs15#\r\n\r\n����������������������������������������������\r\n                            <  �� �� �� ��  >\r\n����������������������������������������������#fs11#\r\n";
		c += "#L10#"+����+"  #i1142137# #b�Ŀ� ���� : C ���#k #d�ý��� 100 / ��, �� 1000#k#l\r\n\r\n#fs11#             ��ȯ �Ϸ��� #b�Ŀ� ����Ʈ#k #r100000 P#k �� �ʿ� �մϴ�.\r\n";
		c += "#L11#"+����+"  #i1142137# #b�Ŀ� ���� : C ���#k #d�ý��� 300 / ��, �� 3000#k#l\r\n\r\n#fs11#             ��ȯ �Ϸ��� #b�Ŀ� ����Ʈ#k #r300000 P#k �� �ʿ� �մϴ�.\r\n";
		c += "#L12#"+����+"  #i1142137# #b�Ŀ� ���� : C ���#k #d�ý��� 500 / ��, �� 5000#k#l\r\n\r\n#fs11#             ��ȯ �Ϸ��� #b�Ŀ� ����Ʈ#k #r500000 P#k �� �ʿ� �մϴ�.\r\n\r\n";
		c += "#L13#"+����+"  #i1142138# #b�Ŀ� ���� : B ���#k #d�ý��� 600 / ��, �� 6000#k#l\r\n\r\n#fs11#             ��ȯ �Ϸ��� #b�Ŀ� ����Ʈ#k #r600000 P#k �� �ʿ� �մϴ�.\r\n";
		c += "#L14#"+����+"  #i1142138# #b�Ŀ� ���� : B ���#k #d�ý��� 800 / ��, �� 8000#k#l\r\n\r\n#fs11#             ��ȯ �Ϸ��� #b�Ŀ� ����Ʈ#k #r800000 P#k �� �ʿ� �մϴ�.\r\n";
		c += "#L15#"+����+"  #i1142138# #b�Ŀ� ���� : B ���#k #d�ý��� 1000 / ��, �� 10000#k#l\r\n\r\n#fs11#             ��ȯ �Ϸ��� #b�Ŀ� ����Ʈ#k #r1000000 P#k �� �ʿ� �մϴ�.\r\n\r\n";
		c += "#L16#"+����+"  #i1142139# #b�Ŀ� ���� : A ���#k #d�ý��� 1100 / ��, �� 11000#k#l\r\n\r\n#fs11#             ��ȯ �Ϸ��� #b�Ŀ� ����Ʈ#k #r1100000 P#k �� �ʿ� �մϴ�.\r\n";
		c += "#L17#"+����+"  #i1142139# #b�Ŀ� ���� : A ���#k #d�ý��� 1300 / ��, �� 13000#k#l\r\n\r\n#fs11#             ��ȯ �Ϸ��� #b�Ŀ� ����Ʈ#k #r1300000 P#k �� �ʿ� �մϴ�.\r\n";
		c += "#L18#"+����+"  #i1142139# #b�Ŀ� ���� : A ���#k #d�ý��� 1500 / ��, �� 15000#k#l\r\n\r\n#fs11#             ��ȯ �Ϸ��� #b�Ŀ� ����Ʈ#k #r1500000 P#k �� �ʿ� �մϴ�.\r\n\r\n";

		cm.sendSimple(c);
		} else if (selection == 1000) {
		if (cm.getHC() >= 5000) {
		    if (cm.canHold(2432127)) {
			cm.gainHC(-5000);
			cm.gainItem(2432127, 1);
		        cm.sendOk("#fn������� Extrabold##b�Ŀ� ����Ʈ#k �� #i2432127# #r1 ��#k �� ���� �ϼ̽��ϴ�.");
			cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r�Һ� ĭ�� �� ������ �����ϴ�.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn������� Extrabold##b�Ŀ� ����Ʈ#k �� �����մϴ�.");
		    cm.dispose();
		}
		} else if (selection == 2000) {
		if (cm.getHC() >= 5000) {
		    if (cm.canHold(2435226)) {
			cm.gainHC(-5000);
			cm.gainItem(2435226, 1);
		        cm.sendOk("#fn������� Extrabold##b�Ŀ� ����Ʈ#k �� #i2435226# #r1 ��#k �� ���� �ϼ̽��ϴ�.");
			cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r�Һ� ĭ�� �� ������ �����ϴ�.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn������� Extrabold##b�Ŀ� ����Ʈ#k �� �����մϴ�.");
		    cm.dispose();
		}

		} else if (selection == 3) {
		if (cm.getHC() >= 10000) {
		    if (cm.canHold(2470010)) {
			cm.gainHC(-10000);
			cm.gainItem(2470010, 1);
		        cm.sendOk("#fn������� Extrabold##b�Ŀ� ����Ʈ#k �� #i2470010# #r1 ��#k �� ���� �ϼ̽��ϴ�.");
			cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r�Һ� ĭ�� �� ������ �����ϴ�.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn������� Extrabold##b�Ŀ� ����Ʈ#k �� �����մϴ�.");
		    cm.dispose();
		}

		} else if (selection == 4) {
                        cm.sendOk("#fn������� Extrabold##bĳ���� �г����� �����ϴ� ��� �Դϴ�.\r\n�Ϻ� Ư������ ������ �����մϴ�.#k\r\n\r\n#d�ش� ���Ǵ� ��� ���� ���� ���� ���� �ٶ��ϴ�.#k");
			cm.dispose();          
		} else if (selection == 50) {
                        cm.sendOk("#fn������� Extrabold##bĳ���� ������ �����ϴ� ��� �Դϴ�.\r\n�Ϻ� ������ ���� �� �� �ֽ��ϴ�.#k\r\n\r\n#d�ش� ���Ǵ� ��� ���� ���� ���� ���� �ٶ��ϴ�.#k");
			cm.dispose();
		} else if (selection == 5) {
                        cm.sendOk("#fn������� Extrabold##fs15##r[��]#k #d���� 1 �� ȹ��#k#fs12#\r\n\r\n#i2028048# #b���� �޼�#k #r4 ~ 20 ��#k\r\n#i4310088# #bRED ����#k #r10 ~ 100 ��#k\r\n#i4310175# #bM ����#k #r200 ~ 500 ��#k\r\n#i2430218# #b#z2430218##k #r5 ~ 15 ��#k\r\n#i2049153# #b#z2049153##k #r2 ~ 8 ��#k\r\n#i2048717# #b#z2048717##k #r2 ~ 8 ��#k\r\n#i2049360# #b#z2049360##k #r2 ~ 8 ��#k\r\n#i3994592# #b�ʿ� ����Ʈ#k #r100 ~ 150 P#k\r\n#i2046991# #b#z2046991##k #r1 ~ 2 ��#k\r\n#i2047814# #b#z2047814##k #r1 ~ 2 ��#k\r\n#i2046992# #b#z2046992##k #r1 ~ 2 ��#k\r\n#i4001869# #b#z4001869##k #r1 ~ 2 ��#k");
			cm.dispose();
		} else if (selection == 6) {
                        cm.sendOk("#fn������� Extrabold##fs15##r[��]#k #d���� 1 �� ȹ��#k#fs12#\r\n\r\n#i2049373# #b#z2049373##k #r1 ��#k\r\n#i2049370# #b#z2049370##k #r1 ��#k\r\n#i2049372# #b#z2049372##k #r1 ��#k\r\n#i2049371# #b#z2049371##k #r1 ��#k\r\n#i2049376# #b#z2049376##k #r1 ��#k");
			cm.dispose();
 
		} else if (selection == 10) {
		if (cm.getHC() >= 100000) {
		    if (cm.canHold(1142137)) {
			cm.gainHC(-100000);
			cm.setAllStat(1142137,100,1000,0);
		        cm.sendOk("#fn������� Extrabold##b�Ŀ� ����Ʈ#k �� #i1142137# �� ���� �ϼ̽��ϴ�.");
			cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r��� ĭ�� �� ������ �����ϴ�.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn������� Extrabold##b�Ŀ� ����Ʈ#k �� �����մϴ�.");
		    cm.dispose();
		}
		} else if (selection == 11) {
		if (cm.getHC() >= 300000) {
		    if (cm.canHold(1142137)) {
			cm.gainHC(-300000);
			cm.setAllStat(1142137,300,3000,0);
		        cm.sendOk("#fn������� Extrabold##b�Ŀ� ����Ʈ#k �� #i1142137# �� ���� �ϼ̽��ϴ�.");
			cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r��� ĭ�� �� ������ �����ϴ�.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn������� Extrabold##b�Ŀ� ����Ʈ#k �� �����մϴ�.");
		    cm.dispose();
		}
		} else if (selection == 12) {
		if (cm.getHC() >= 500000) {
		    if (cm.canHold(1142137)) {
			cm.gainHC(-500000);
			cm.setAllStat(1142137,500,5000,0);
		        cm.sendOk("#fn������� Extrabold##b�Ŀ� ����Ʈ#k �� #i1142137# �� ���� �ϼ̽��ϴ�.");
			cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r��� ĭ�� �� ������ �����ϴ�.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn������� Extrabold##b�Ŀ� ����Ʈ#k �� �����մϴ�.");
		    cm.dispose();
		}
		} else if (selection == 13) {
		if (cm.getHC() >= 600000) {
		    if (cm.canHold(1142138)) {
			cm.gainHC(-600000);
			cm.setAllStat(1142138,600,6000,0);
		        cm.sendOk("#fn������� Extrabold##b�Ŀ� ����Ʈ#k �� #i1142138# �� ���� �ϼ̽��ϴ�.");
			cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r��� ĭ�� �� ������ �����ϴ�.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn������� Extrabold##b�Ŀ� ����Ʈ#k �� �����մϴ�.");
		    cm.dispose();
		}
		} else if (selection == 14) {
		if (cm.getHC() >= 800000) {
		    if (cm.canHold(1142138)) {
			cm.gainHC(-800000);
			cm.setAllStat(1142138,800,8000,0);
		        cm.sendOk("#fn������� Extrabold##b�Ŀ� ����Ʈ#k �� #i1142138# �� ���� �ϼ̽��ϴ�.");
			cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r��� ĭ�� �� ������ �����ϴ�.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn������� Extrabold##b�Ŀ� ����Ʈ#k �� �����մϴ�.");
		    cm.dispose();
		}
		} else if (selection == 15) {
		if (cm.getHC() >= 1000000) {
		    if (cm.canHold(1142138)) {
			cm.gainHC(-1000000);
			cm.setAllStat(1142138,1000,10000,0);
		        cm.sendOk("#fn������� Extrabold##b�Ŀ� ����Ʈ#k �� #i1142138# �� ���� �ϼ̽��ϴ�.");
			cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r��� ĭ�� �� ������ �����ϴ�.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn������� Extrabold##b�Ŀ� ����Ʈ#k �� �����մϴ�.");
		    cm.dispose();
		}
		} else if (selection == 16) {
		if (cm.getHC() >= 1100000) {
		    if (cm.canHold(1142139)) {
			cm.gainHC(-1100000);
			cm.setAllStat(1142139,1100,11000,0);
			cm.getPlayer().sethadm(1);
		        cm.sendOk("#fn������� Extrabold##b�Ŀ� ����Ʈ#k �� #i1142139# �� ���� �ϼ̽��ϴ�.");
			cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r��� ĭ�� �� ������ �����ϴ�.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn������� Extrabold##b�Ŀ� ����Ʈ#k �� �����մϴ�.");
		    cm.dispose();
		}
		} else if (selection == 17) {
		if (cm.getHC() >= 1300000) {
		    if (cm.canHold(1142139)) {
			cm.gainHC(-1300000);
			cm.setAllStat(1142139,1300,13000,0);
			cm.getPlayer().sethadm(1);
		        cm.sendOk("#fn������� Extrabold##b�Ŀ� ����Ʈ#k �� #i1142139# �� ���� �ϼ̽��ϴ�.");
			cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r��� ĭ�� �� ������ �����ϴ�.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn������� Extrabold##b�Ŀ� ����Ʈ#k �� �����մϴ�.");
		    cm.dispose();
		}
		} else if (selection == 18) {
		if (cm.getHC() >= 1500000) {
		    if (cm.canHold(1142139)) {
			cm.gainHC(-1500000);
			cm.setAllStat(1142139,1500,15000,0);
			cm.getPlayer().sethadm(1);
		        cm.sendOk("#fn������� Extrabold##b�Ŀ� ����Ʈ#k �� #i1142139# �� ���� �ϼ̽��ϴ�.");
			cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r��� ĭ�� �� ������ �����ϴ�.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn������� Extrabold##b�Ŀ� ����Ʈ#k �� �����մϴ�.");
		    cm.dispose();
		}

		} else if (selection == 22) {
		if (cm.getHC() >= 100000) {
		    if (cm.canHold(1142137)) {
			cm.gainHC(-100000);
			cm.setAllStat(1142137,1000,100,0);
		        cm.sendOk("#fn������� Extrabold##b�Ŀ� ����Ʈ#k �� #i1142137# �� ���� �ϼ̽��ϴ�.");
			cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r��� ĭ�� �� ������ �����ϴ�.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn������� Extrabold##b�Ŀ� ����Ʈ#k �� �����մϴ�.");
		    cm.dispose();
		}
		} else if (selection == 23) {
		if (cm.getHC() >= 300000) {
		    if (cm.canHold(1142137)) {
			cm.gainHC(-300000);
			cm.setAllStat(1142137,3000,300,0);
		        cm.sendOk("#fn������� Extrabold##b�Ŀ� ����Ʈ#k �� #i1142137# �� ���� �ϼ̽��ϴ�.");
			cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r��� ĭ�� �� ������ �����ϴ�.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn������� Extrabold##b�Ŀ� ����Ʈ#k �� �����մϴ�.");
		    cm.dispose();
		}
		} else if (selection == 24) {
		if (cm.getHC() >= 500000) {
		    if (cm.canHold(1142137)) {
			cm.gainHC(-500000);
			cm.setAllStat(1142137,5000,500,0);
		        cm.sendOk("#fn������� Extrabold##b�Ŀ� ����Ʈ#k �� #i1142137# �� ���� �ϼ̽��ϴ�.");
			cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r��� ĭ�� �� ������ �����ϴ�.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn������� Extrabold##b�Ŀ� ����Ʈ#k �� �����մϴ�.");
		    cm.dispose();
		}
		} else if (selection == 25) {
		if (cm.getHC() >= 600000) {
		    if (cm.canHold(1142138)) {
			cm.gainHC(-600000);
			cm.setAllStat(1142138,6000,600,0);
		        cm.sendOk("#fn������� Extrabold##b�Ŀ� ����Ʈ#k �� #i1142138# �� ���� �ϼ̽��ϴ�.");
			cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r��� ĭ�� �� ������ �����ϴ�.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn������� Extrabold##b�Ŀ� ����Ʈ#k �� �����մϴ�.");
		    cm.dispose();
		}
		} else if (selection == 26) {
		if (cm.getHC() >= 800000) {
		    if (cm.canHold(1142138)) {
			cm.gainHC(-800000);
			cm.setAllStat(1142138,8000,800,0);
		        cm.sendOk("#fn������� Extrabold##b�Ŀ� ����Ʈ#k �� #i1142138# �� ���� �ϼ̽��ϴ�.");
			cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r��� ĭ�� �� ������ �����ϴ�.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn������� Extrabold##b�Ŀ� ����Ʈ#k �� �����մϴ�.");
		    cm.dispose();
		}
		} else if (selection == 27) {
		if (cm.getHC() >= 1000000) {
		    if (cm.canHold(1142138)) {
			cm.gainHC(-1000000);
			cm.setAllStat(1142138,10000,1000,0);
		        cm.sendOk("#fn������� Extrabold##b�Ŀ� ����Ʈ#k �� #i1142138# �� ���� �ϼ̽��ϴ�.");
			cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r��� ĭ�� �� ������ �����ϴ�.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn������� Extrabold##b�Ŀ� ����Ʈ#k �� �����մϴ�.");
		    cm.dispose();
		}
		} else if (selection == 28) {
		if (cm.getHC() >= 1100000) {
		    if (cm.canHold(1142139)) {
			cm.gainHC(-1100000);
			cm.setAllStat(1142139,11000,1100,0);
			cm.getPlayer().sethadm(1);
		        cm.sendOk("#fn������� Extrabold##b�Ŀ� ����Ʈ#k �� #i1142139# �� ���� �ϼ̽��ϴ�.");
			cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r��� ĭ�� �� ������ �����ϴ�.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn������� Extrabold##b�Ŀ� ����Ʈ#k �� �����մϴ�.");
		    cm.dispose();
		}
		} else if (selection == 29) {
		if (cm.getHC() >= 1300000) {
		    if (cm.canHold(1142139)) {
			cm.gainHC(-1300000);
			cm.setAllStat(1142139,13000,1300,0);
			cm.getPlayer().sethadm(1);
		        cm.sendOk("#fn������� Extrabold##b�Ŀ� ����Ʈ#k �� #i1142139# �� ���� �ϼ̽��ϴ�.");
			cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r��� ĭ�� �� ������ �����ϴ�.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn������� Extrabold##b�Ŀ� ����Ʈ#k �� �����մϴ�.");
		    cm.dispose();
		}
		} else if (selection == 30) {
		if (cm.getHC() >= 1500000) {
		    if (cm.canHold(1142139)) {
			cm.gainHC(-1500000);
			cm.setAllStat(1142139,15000,1500,0);
			cm.getPlayer().sethadm(1);
		        cm.sendOk("#fn������� Extrabold##b�Ŀ� ����Ʈ#k �� #i1142139# �� ���� �ϼ̽��ϴ�.");
			cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r��� ĭ�� �� ������ �����ϴ�.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn������� Extrabold##b�Ŀ� ����Ʈ#k �� �����մϴ�.");
		    cm.dispose();
		}

		} else if (selection == 100) {

		if (cm.getHC() >= 100000) { 
			cm.gainHC(-100000);
                        cm.getPlayer().gainAddDamageSin(6,true,"�Ŀ�");
                        cm.sendOk("#fn������� Extrabold##b�Ŀ� ����Ʈ#k �� ������ ���� �ϼ̽��ϴ�.\r\n\r\n#b�߰� ������ Ÿ�� Ƚ�� : + 6 Ÿ#k\r\n#d* ���� �߰� ������ Ÿ�� Ƚ�� : "+cm.getPlayer().getAddDamageS()+" Ÿ#k");
			cm.dispose();
		} else {
		    cm.sendOk("#fn������� Extrabold##b�Ŀ� ����Ʈ#k �� �����մϴ�.");
		    cm.dispose();
                }

		} else if (selection == 101) {

		if (cm.getHC() >= 10000) { 
			cm.gainHC(-10000);
                        cm.getPlayer().gainAddDamagein(500000000,true);
                        cm.sendOk("#fn������� Extrabold##b�Ŀ� ����Ʈ#k �� ������ ���� �ϼ̽��ϴ�.\r\n\r\n#b�߰� ������ : + 5 ��#k\r\n#d* ���� �߰� ������ �հ� : "+cm.getPlayer().getAddDamage()+"#k");
			cm.dispose();
		} else {
		    cm.sendOk("#fn������� Extrabold##b�Ŀ� ����Ʈ#k �� �����մϴ�.");
		    cm.dispose();
                }

		} else if (selection == 102) {

		if (cm.getHC() >= 20000) { 
			cm.gainHC(-20000);
                        cm.getPlayer().gainAddDamagein(1000000000,true);
                        cm.sendOk("#fn������� Extrabold##b�Ŀ� ����Ʈ#k �� ������ ���� �ϼ̽��ϴ�.\r\n\r\n#b�߰� ������ : + 10 ��#k\r\n#d* ���� �߰� ������ �հ� : "+cm.getPlayer().getAddDamage()+"#k");
			cm.dispose();
		} else {
		    cm.sendOk("#fn������� Extrabold##b�Ŀ� ����Ʈ#k �� �����մϴ�.");
		    cm.dispose();
                }

		} else if (selection == 103) {

		if (cm.getHC() >= 30000) { 
			cm.gainHC(-30000);
                        cm.getPlayer().gainAddDamagein(1500000000,true);
                        cm.sendOk("#fn������� Extrabold##b�Ŀ� ����Ʈ#k �� ������ ���� �ϼ̽��ϴ�.\r\n\r\n#b�߰� ������ : + 15 ��#k\r\n#d* ���� �߰� ������ �հ� : "+cm.getPlayer().getAddDamage()+"#k");
			cm.dispose();
		} else {
		    cm.sendOk("#fn������� Extrabold##b�Ŀ� ����Ʈ#k �� �����մϴ�.");
		    cm.dispose();
                }

		} else if (selection == 104) {

		if (cm.getHC() >= 40000) { 
			cm.gainHC(-40000);
                        cm.getPlayer().gainAddDamagein(2000000000,true);
                        cm.sendOk("#fn������� Extrabold##b�Ŀ� ����Ʈ#k �� ������ ���� �ϼ̽��ϴ�.\r\n\r\n#b�߰� ������ : + 20 ��#k\r\n#d* ���� �߰� ������ �հ� : "+cm.getPlayer().getAddDamage()+"#k");
			cm.dispose();
		} else {
		    cm.sendOk("#fn������� Extrabold##b�Ŀ� ����Ʈ#k �� �����մϴ�.");
		    cm.dispose();
                }

		} else if (selection == 105) {

		if (cm.getHC() >= 50000) { 
			cm.gainHC(-50000);
                        cm.getPlayer().gainAddDamagein(2500000000,true);
                        cm.sendOk("#fn������� Extrabold##b�Ŀ� ����Ʈ#k �� ������ ���� �ϼ̽��ϴ�.\r\n\r\n#b�߰� ������ : + 25 ��#k\r\n#d* ���� �߰� ������ �հ� : "+cm.getPlayer().getAddDamage()+"#k");
			cm.dispose();
		} else {
		    cm.sendOk("#fn������� Extrabold##b�Ŀ� ����Ʈ#k �� �����մϴ�.");
		    cm.dispose();
                }

		}
	}
}