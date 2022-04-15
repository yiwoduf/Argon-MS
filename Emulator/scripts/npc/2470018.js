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
        var ask = "#b──────────────────────────#k\r\n                         #fUI/CashShop.img/CSEffect/specialLabel/0##fn나눔고딕 Extrabold##fs16##b#e 극한 강화#n  \\r\n#b─────────────────────#k\r\n#k #r  #k            대상:#r놀장 25성 ~29성 장비\r\n\r\n#k #r  #k     상승 능력치:#r올스텟+150#k #b공,마+100\r\n\r\n#k #r  #k                       성공 확률:#e#d15%#n#k \r\n        #e#b★30성시 올스텟 +750 공,마+500★#n#k  \r\n        #r< 한번에 #i4310038# 100개가 소모됩니다. >#k#n\r\n\r\n               ";
        cm.sendYesNo(ask);
    } else if (status == 1) {
        var ok = false;
        var option = "             강화할 아이템을 선택해 주세요\r\n#e#r                  [강화가안될시]\r\n [장비 인벤토리 상단으로 아이템을 옮겨주세요]#n#k\r\n#b";
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
            cm.sendOk("아이템이 없습니다. 장비창을 확인해주세요.");
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
            cm.sendOk("오류가 발생했습니다. 잠시후 다시 시도해주세요.");
            cm.dispose();
            return;
        }
        if (statsSel.getEnhance() >= 30 || statsSel.getEnhance() < 25) {
            cm.sendOk("극한 강화는 #b놀작#k 25성이상 30성미만의 아이템만 가능합니다.");
            cm.dispose();
            return;
	}
        if(!cm.haveItem(4310038, 100)) {
            cm.sendOk("극한강화는 #i4310038# 이 아이템이 100개 필요합니다.");
            cm.dispose();
            return;
        }
        if ((Math.floor(Math.random() * 100) + 1) >= 10 + hoo) {
            cm.gainItem(4310038, -100);
cm.getPlayer().send(MaplePacketCreator.getGMText(19, "[메이플스토리] 강화에 실패하였습니다."));
            cm.fakeRelog();
	    cm.updateChar();
        cm.sendOk("#fs 50##fn궁서체# #r강화 실패..#k");
            cm.dispose();
            return;
        }
        statsSel.setStr(statsSel.getStr() + 150);
        statsSel.setDex(statsSel.getDex() + 150);
        statsSel.setInt(statsSel.getInt() + 150);
        statsSel.setLuk(statsSel.getLuk() + 150);
        statsSel.setWatk(statsSel.getWatk() + 100.6);
        statsSel.setMatk(statsSel.getMatk() + 100.6);
        statsSel.setEnhance(statsSel.getEnhance() + 1);
        cm.gainItem(4310038, -100);
cm.getPlayer().send(MaplePacketCreator.getGMText(19, "[메이플스토리] 강화에 성공하셨습니다."));
        cm.fakeRelog();
        cm.updateChar();
        cm.sendOk("#fs 50##fn궁서체# #b강화 성공!#k");
WorldBroadcasting.broadcast(MaplePacketCreator.getGMText(5, "라스트스토리 『 "+ cm.getPlayer().getName()+" 』 님이 【 극한강화 】를 성공하셨습니다. 진심으로 축하드립니다."));
        cm.dispose();
}
}