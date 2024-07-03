
var status = -1;var k = "#fNpc/9000000/stand/0#";
var k1 = "#fNpc/9000000/stand/0#";
function start() {
    status = -1;
    action (1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
	cm.dispose();
	return;
    }
    if (status == 0) {
	var chat = "안녕 나는상점시스템이다 #b"+ cm.getPlayer().getName() + "#k  재미있는 하루보내라 ㅋ#r";
	chat += "\r\n#g#L0##i2049360# 주문서상점#l #b#L1##i4033866# 캐샵접속#l #g#L2##i2432669# 모든상점#l";
	chat += "\r\n#b#L3##i1442268# 고렙상점#l    #r#L4##i1353100# 최신보조#l  #g#L5##i1302152# 여제상점#l";
        chat += "\r\n#r#L6##i1532124# 11주년상점#l    #b#L7##i1442226# 10주년상점#l    #g#L8##i1112141# 캐시반지#l";
        chat += "\r\n#r#L9##i2433992# 라이딩상점#l    #b#L10##i4310088# 홍보상점#l  #b#L11##i4160046# 펫교환#l";
        chat += "\r\n#b#L12##i1162008# 건의상점#l    #g#L13##i4310034# 안드상점#l  #L14# 대화를 그만 한다.#l";  
        cm.sendSpirit(chat,true,0);
      } else if (status == 1) {
        if (selection == 1) {
          cm.EnterCS();
          cm.dispose();
        } else if (selection == 0) {
          cm.dispose();
          cm.openShop (9001050);
        } else if (selection == 1) {
          cm.dispose();
          cm.openNpc (9310009);
        } else if (selection == 2) {
          cm.dispose();
          cm.openNpc (9072201);
        } else if (selection == 3) {
          cm.dispose();
          cm.openNpc (1540436);
        } else if (selection == 4) {
          cm.dispose();
          cm.openNpc(9000143);
        } else if (selection == 5) {
          cm.dispose();
          cm.openShop(10062);
        } else if (selection == 6) {
          cm.dispose();
          cm.openShop (1540302);
        } else if (selection ==7) {
          cm.dispose();
          cm.openShop(1540312);
        } else if (selection ==8) {
          cm.dispose();
          cm.openShop(9201000);
	} else if (selection == 9) {
	  cm.dispose();
          cm.openNpc(1103002);
	} else if (selection == 10) {
	  cm.dispose();
          cm.openShop(9000386);
	} else if (selection == 11) {
	  cm.dispose();
          cm.openNpc(1040001);
	} else if (selection == 12) {
	  cm.dispose();
          cm.openNpc(11000);
	} else if (selection == 13) {
	  cm.dispose();
          cm.openNpc(9010033);
	} else if (selection == 14) {
	  cm.dispose();
      }
    } else if (status == 2) {
	cm.dispose();
	cm.openShop(selection);
    }
}
