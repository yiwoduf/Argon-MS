var status = 0;
var s = 0;
var allstat = 0;
var damage = 0;
var cost = 0;
var itemid = 0;
var damageprice = 0;
var allstatprice = 0;
function start() {
  status = -1;
  text = "#e<후원포인트 샵>\r\n";
  text += "#n◆   현재 #b#h ##k님의 후원포인트 : #r" + cm.getRC() +"#k원\r\n";
  text += "#d#L0#프리미엄 검색 캐쉬 이용하기 (500 + a 포인트)#k#l\r\n";
  text += "\r\n    #Cgray##fs11#추가 아이템 옵션을 붙인 검색 캐쉬 시스템#fs12##k\r\n";
  text += "#d#L1#후원포인트를 동전으로 환전하기#l\r\n"
  text += "\r\n    #Cgray##fs11#500 포인트 = 1 후원코인 (500:1)#fs12##k\r\n";
  //text += "#d#L2#후원포인트를 메소로 환전하기#l\r\n"
  cm.sendSimple(text);
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
    s = selection;
    if (selection == 0) {
      cm.sendGetText("검색 하실 아이템 이름을 입력 해 주세요.");
    } else if (selection == 1) {
     cm.sendGetNumber("교환하실 동전의 개수를 입력 해 주세요.\r\n#Cgray##fs11#동전 1개당 500 후원포인트", 0, 0, 1000);
    } /*else if (selection == 2) {
      cm.sendGetText("원하시는 금액을 입력 해 주세요.");
    }
    */
  } else if (status == 1) {
   if (s == 0) {
     cm.SearchItem(cm.getText());
    } else if (s == 1) {
      num = selection;
      n = num * 500;
      if (cm.getRC() >= n) {
        cm.gainRC(-n);
        cm.gainItem(4001126, num);
       cm.sendOk("교환이 완료되었습니다.\r\n인벤토리를 확인 해 주세요.");
        cm.dispose();
      } else {
        cm.sendOk("후원포인트가 부족합니다.");
        cm.dispose();
        return;
      }
    }/* else if (s == 2) {
    }*/
  } else if (status == 2) {
    itemid = selection;
    cost += 500;
    if (cm.canHold(selection)) {
      cm.sendGetNumber("#e선택 아이템#n : #i"+itemid+"# #z"+itemid+"#\r\n#e아이템 가격#n : #b#e"+cost+"#n포인트#k\r\n\r\n#e#r※ 100 포인트#k = #b올스탯 ＋6#k\r\n#Cgray##n#fs11#사용하실 포인트를 입력 해 주세요.", 0, 0, 9999999);
    } else {
      cm.sendOk("인벤토리에 남은 공간이 없는 것 같습니다.");
      cm.dispose();
      return;
    }
  } else if (status == 3) {
    if (selection % 100 != 0) {
      cm.sendOk("100 포인트 단위에 맞춰서 입력 해 주세요.");
      cm.dispose();
      return;
    } else {
      cost += selection;
      allstatprice = selection;
      allstat = selection / 100 * 6;
      cm.sendGetNumber("#e선택 아이템#n : #i"+itemid+"# #z"+itemid+"#\r\n#e아이템 가격#n : #b#e"+cost+"#n포인트#k\r\n\r\n#e#Cgray#※ "+allstatprice+" 포인트 = 올스탯 +"+allstat+"\r\n#r※ 100 포인트#k = #b공마 ＋50#k\r\n#n#Cgray##fs11#사용하실 포인트를 입력 해 주세요.",0,0,cm.getRC());
    }
  } else if (status == 4) {
    if (selection % 100 != 0) {
      cm.sendOk("100 포인트 단위에 맞춰서 입력 해 주세요.");
      cm.dispose();
      return;
    } else {
      cost += selection;
      damageprice = selection;
      damage = selection / 100 * 50;
      cm.sendYesNo("#e선택 아이템#n : #i"+itemid+"# #z"+itemid+"#\r\n#e아이템 가격#n : #b#e"+cost+"#n포인트#k\r\n\r\n#e올스탯#n : +"+allstat+"\r\n#e공마#n : +"+damage+"\r\n\r\n아이템을 구매하시겠습니까?");
    }
  } else if (status == 5) {
    if (cm.getRC() >= cost) {
      cm.gainRC(-cost);
      cm.gainSponserItem(itemid, "[후원아이템]", allstat, damage, 0);
      cm.sendOk("선택된 아이템으로 교환되었습니다.\r\n인벤토리를 확인 해 주세요.");
      cm.dispose();
      return;
    } else {
      cm.sendOk("후원 포인트가 부족합니다.\r\n\r\n#e 현재 내후원포인트#n : "+cm.getRC()+"\r\n#e 아이템 가격 #n : #r"+cost);
      cm.dispose();
      return;
    }
  }
}