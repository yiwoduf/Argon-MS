importPackage(Packages.constants);
importPackage(Packages.packet.creators);
var status = 0;
var invs = Array(1, 5);
var invv;
var selected;
var slot_1 = Array();
/*

어스에서 리 아 님 (ria__adm) 이 올림
제작자는 블라인드 임
출처 지우면 큰일남

*/



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
    if (cm.haveItem(4310058,1)) {
            var ask = "#r#e초월강화#n#k 를 맡고있는 골드리치 입니다.\r\n\r\n#r#e초월강화#n#k #b는 #e12성 이상#n부터 가능하며 #e최대 25성까지#n 올리실수 있습니다.#d#e [강화 성공률: 40%이하]#n#k\r\n\r\n#g#e[1회 강화시] 올스텟증가: 6~12, 공/마증가: 4~8#k#n\r\n\r\n #b 비용은 #e#r#z2049360# 15장#n#k #b입니다. \r\n#v4310058#이랑 같이 강화 하시려면 예를 입력해주시고 아닐시 아무거나 입력해주세요 \r\n(사용시 #r#e성공률 100%#n#k#b + #e추가스텟#n + 소모놀장강 #e10개#n 감소)#k";
        cm.sendGetText(ask);
     } else {
       var ask = "#r#e초월강화#n#k 를 맡고있는 골드리치 입니다.\r\n\r\n#r#e초월강화#n#k #b는 #e12성 이상#n부터 가능하며 #e최대 25성까지#n 올리실수 있습니다.#d#e [강화 성공률: 40%이하]#n#k\r\n\r\n#g#e[1회 강화시] 올스텟증가: 6~12, 공/마증가: 4~8#k#n\r\n\r\n #b 비용은 #e#r#z2049360# 15장#n#k #b입니다. \r\n\r\n  #r#e초월강화#n#k#b를 원하신다면 다음을 누르세요.\r\n#k#r[AD]100%강화성공? 후원상점에서 매그너스코인을 구매하세요!\r\n[AD]스텟증가를 원하세요? 매그너스코인을 사용하세요!#k";
        cm.sendNext(ask);
        cm.setGetText("ㄴㄴ");
      }
    } else if (status == 1) {
      if (cm.getText().equals("예")) {
      hoo = 50;
      } 
        
        var ok = false;
        var option = "초월강화할 아이템을 선택해 주세요\r\n#b";
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
                option += "#L" + (invs[x] * 1000 + i) + "##v" + itemid + "##l";
            }
        }
        if (!ok) {
            cm.sendOk("아이템이 없네요. 혹시 착용하고 계신건 아닌가요?");
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
            cm.sendOk("에러입니다. 다시 시도해주세요.");
            cm.dispose();
            return;
        }
        if (statsSel.getEnhance() >= 25 || statsSel.getEnhance() < 0) {
            cm.sendOk("초월 강화를 할 수 없습니다.");
            cm.dispose();
            return;
        }
        if (!cm.haveItem(2049360,15)) {
            cm.sendOk("#e#r#z2049360##k#n가 부족합니다.");
            cm.dispose();
            return;
        }
           if (hoo == 50) {
            cm.gainItem(4310058,-1);
            cm.gainItem(2049360,15);
        }
        if ((Math.floor(Math.random() * 100) + 1) >= 50 + hoo) {
          //  cm.fakeRelog();
         //   cm.updateChar();
            cm.sendOk("#fUI/UIWindow2.img/aswanResult/resultWindow/resultImage/fail#");
        cm.gainItem(2049360,-15);
            cm.dispose();
            return;
        }
        var als = Array (6,7,8,9,10,10,11,12);
	      var atk = Array (4,5,6,7,7,8);
	      var alst = Math.floor(Math.random() * als.length);
	      var amtk = Math.floor(Math.random() * atk.length);
        statsSel.setStr(statsSel.getStr() + als[alst] + hoo / 10);
        statsSel.setDex(statsSel.getDex() + als[alst] + hoo / 10);
        statsSel.setInt(statsSel.getInt() + als[alst] + hoo / 10);
        statsSel.setLuk(statsSel.getLuk() + als[alst] + hoo / 10);
        statsSel.setWatk(statsSel.getWatk() + atk[amtk]+ hoo / 25);
        statsSel.setMatk(statsSel.getMatk() + atk[amtk]+ hoo / 25);
        statsSel.setEnhance(statsSel.getEnhance() + 1);
        cm.getPlayer().send(MainPacketCreator.updateEquipSlot(statsSel));
        cm.sendOk("#fUI/UIWindow2.img/aswanResult/resultWindow/resultImage/victory#");
        cm.gainItem(2049360,-5);
        cm.dispose();
    }
}






