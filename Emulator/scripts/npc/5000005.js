var status = -1;

function start() {
    action (1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1 || mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    }
    if (status == 0) {
�� = "#fUI/UIToolTip/Item/Equip/Star/Star#"
var chat ="";
�� = "#fUI/UIToolTip/Item/Equip/Star/Star#"
        chat += "#fn������� Extrabold##fs16##fs16#"+��+"#r���ÿ¶��λ����ý���#k"+��+"#l";
        chat += "\r\n#b#L24##i1672003#�ȵ����#l\r\n\r\n#r#L42##i1142744# �Ŀ�����#k#l\r\n";
        chat += "\r\n#b#L11##i2049360# �ֹ�������#l\r\n\r\n#b#L12##i2433854# ĳ������#l\r\n\r\n#b#L13##i5450011# ������#l\r\n\r\n";
	chat += "#b#L14##i1032200# ������#l\r\n\r\n#b#L15##i1353100# �ֽź���#l\r\n\r\n#b#L16##i1232014# ��������#l\r\n\r\n"
        chat += "#b#L20##i2432360# ���̵�����#l\r\n\r\n#b#L21##i4310088# ȫ������#l\r\n\r\n#b#L22##i5000497# �걳ȯ#l\r\n\r\n";
        chat += "#r#L25##i4310058# �������λ���#k#l";
	//choose +="\r\n#L10##b#i2430242# ���̵� ����"; 
        if (cm.getPlayer().hasGmLevel(10)){
        choose += "";
}
        cm.sendSimple(chat);

    } else if (status == 1) {
        var s = selection;
        cm.dispose();
        if (s == 0) {
            cm.enterCS();
}else if  (selection == 12) {
          cm.EnterCS();
          cm.dispose();
        } else if (selection == 11) {
          cm.dispose();
          cm.openShop (9001050);
        } else if (selection == 13) {
          cm.dispose();
          cm.openNpc (9072201);
        } else if (selection == 14) {
          cm.dispose();
          cm.openNpc (1540436);
        } else if (selection == 15) {
          cm.dispose();
          cm.openNpc(9000143);
        } else if (selection == 16) {
          cm.dispose();
          cm.openShop(10062);
        } else if (selection == 17) {
          cm.dispose();
          cm.openShop (1540302);
        } else if (selection == 18) {
          cm.dispose();
          cm.openShop(1540312);
        } else if (selection == 19) {
          cm.dispose();
          cm.openShop(9201000);
     } else if (selection == 25) {
          cm.dispose();
          cm.openShop(2012036);
	} else if (selection == 20) {
	  cm.dispose();
          cm.openNpc(1103002);
	} else if (selection ==21) {
	  cm.dispose();
          cm.openShop(9000386);
	} else if (selection == 22) {
	  cm.dispose();
          cm.openNpc(1040001);
	} else if (selection == 23) {
	  cm.dispose();
          cm.openNpc(11000);
	} else if (selection == 24) {
	  cm.dispose();
          cm.openNpc(9010033);
  } else if (selection == 42) {
          cm.dispose();
          cm.openNpc (9001003);
        }
    }
}
        
