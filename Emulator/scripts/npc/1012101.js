importPackage(Packages.constants);
importPackage(Packages.server.items);
importPackage(Packages.client.items);
importPackage(Packages.constants);
importPackage(Packages.server.items);
importPackage(Packages.client.items);
importPackage(java.lang);
importPackage(Packages.launch.world);
importPackage(Packages.packet.creators);

var status = 0;
var invs = Array(1, 5);
var invv;
var selected;
var slot_1 = Array();



var slot_2 = Array();
var statsSel;
var hoo = 0;

var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {

    if (mode == -1) {
        cm.dispose();
        return;
    }
    if (mode == 0) {
        status--;
    }
    if (mode == 1) {
        status++;
    }
    if (status == 0) {
        var ask = "#d����������������������������������������������������#k\r\n                         #fUI/CashShop.img/CSEffect/actionLabel/0##fn������� Extrabold##fs16##d#e �ʿ� ��ȭ#n  \\r\n#d������������������������������������������#k\r\n#k #r  #k            ���:#r���� 12�� ~24�� ���\r\n\r\n#k #r  #k        ��� �ɷ�ġ:#r�ý���+7#k #b��,��+16\r\n\r\n#k #r  #k                       ���� Ȯ��:#e#d60%#n#k \r\n         #e#b��25���� �ý��� +91 ��,��+208��#n#k  \r\n        #r< �ѹ��� #i4310038# 200���� �Ҹ�˴ϴ�. >#k#n\r\n\r\n               ";
        cm.sendYesNo(ask);
    } else if (status == 1) {
        var ok = false;
        var option = "             ��ȭ�� �������� ������ �ּ���\r\n#e#r                  [��ȭ���ȵɽ�]\r\n [��� �κ��丮 ������� �������� �Ű��ּ���]#n#k\r\n#b";
        for (var x = 0; x < invs.length; x++) {
            var inv = cm.getInventory(invs[x]);
            for (var i = 0; i <= inv.getSlotLimit(); i++) {
                if (x == 0) {
                    slot_1.push(i);
                } else {
                    slot_2.push(i);
                }
                var it = inv.getItem(i);
                if (it == null) {
                    continue;
                }

                var itemid = it.getItemId();
                if (cm.isCash(it.getItemId())) {
                    var itemid = 0;
                } else {
                    var itemid = it.getItemId();
                }
                if (!GameConstants.isEquip(itemid)) {
                    continue;
                }
                ok = true;
                option += "#L" + (invs[x] * 1000 + i) + "##v" + itemid + "##t" + itemid +
                        "##l\r\n";
            }
        }
        if (!ok) {
            cm.sendOk("�������� �����ϴ�. ���â�� Ȯ�����ּ���.");
            cm.dispose();
            return;
        }
        cm.sendSimple(option + "#k");
    } else if (status == 2) {
        invv = selection / 1000;
        selected = selection % 1000;
        var inzz = cm.getInventory(invv);
        if (invv == invs[0]) {
            statsSel = inzz.getItem(slot_1[selected]);
        } else {
            statsSel = inzz.getItem(slot_2[selected]);
        }
        if (statsSel == null) {
            cm.sendOk("������ �߻��߽��ϴ�. ����� �ٽ� �õ����ּ���.");
            cm.dispose();
            return;
        }
        if (statsSel.getEnhance() >= 25 || statsSel.getEnhance() < 12) {
            cm.sendOk("�ʿ� ��ȭ�� #b����#k 12���̻� 25���̸��� �����۸� �����մϴ�.");
            cm.dispose();
            return;
	}
        if(!cm.haveItem(4310038, 200)) {
            cm.sendOk("�ʿ���ȭ�� #i4310038# �� �������� 200�� �ʿ��մϴ�.");
            cm.dispose();
            return;
        }
        if ((Math.floor(Math.random() * 100) + 1) >= 60 + hoo) {
            cm.gainItem(4310038, -150);
cm.getPlayer().send(MaplePacketCreator.getGMText(19, "���ϼ� ��ȭ�� �����Ͽ����ϴ�."));
            cm.fakeRelog();
	    cm.updateChar();
        cm.sendOk("#fs 50##fn�ü�ü# #r��ȭ ����..#k");
            cm.dispose();
            return;
        }
        statsSel.setStr(statsSel.getStr() + 7);
        statsSel.setDex(statsSel.getDex() + 7);
        statsSel.setInt(statsSel.getInt() + 7);
        statsSel.setLuk(statsSel.getLuk() + 7);
        statsSel.setWatk(statsSel.getWatk() + 16.6);
        statsSel.setMatk(statsSel.getMatk() + 16.6);
        statsSel.setEnhance(statsSel.getEnhance() + 1);
        cm.gainItem(4310038, -200);
cm.getPlayer().send(MaplePacketCreator.getGMText(19, "���ϼ� ��ȭ�� �����ϼ̽��ϴ�."));
        cm.fakeRelog();
        cm.updateChar();
        cm.sendOk("#fs 50##fn�ü�ü# #b��ȭ ����!#k");
//WorldBroadcasting.broadcast(MaplePacketCreator.getGMText(5, "���ζ�¶��� �� "+ cm.getPlayer().getName()+" �� ���� �� �ʿ���ȭ ���� �����ϼ̽��ϴ�. �������� ���ϵ帳�ϴ�."));
        cm.dispose();
}
}