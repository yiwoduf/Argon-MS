
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
	var chat = "�ȳ�, �� �����÷����� #e#g����ɡ�#n#k�� ����ϰ��־�, ����..������ �غ��ѰǾƳ�.#b";
	chat += "\r\n#g#L0##i3017017#���ڻ���#l #b#L1##i2432290# ������#l #l";
  	chat += "\r\n#b#L4##i5680222# �������#l  #L5##i4009050# ��������#l";
        chat += "\r\n#L16##i5450009#����(â���̿�)#l #b#L7##i1702416#OX�����#l";
	chat += "\r\n#g#L6##i4001716# �޼ұ�ȯ#l #b#L18##i3994856# Ȧ¦����#l";
        chat += "\r\n#d#L15# ��ȭ�� �׸� �Ѵ�.#l";
        

	cm.sendSpirit(chat,true,0);
    } else if (status == 1) {
	if (selection == 0) {
		cm.dispose();
		cm.openNpc(2520014);
	} else if (selection == 1) {
                cm.dispose();
		cm.openNpc(2010007);
		
	} else if (selection == 2) {
		cm.dispose();
		cm.openNpc(2001001);
	} else if (selection == 3) {
		cm.dispose();
		cm.openNpc(3000007);
	} else if (selection == 4) {
                cm.dispose();
		cm.openNpc(1540011);
} else if (selection == 5) {
                cm.dispose();
		cm.openNpc(12101);
	} else if (selection == 6) {
		cm.dispose();
		cm.openNpc(1012112);
        } else if (selection == 7) {
		cm.dispose();
		cm.warp(109020001);
		
	} else if (selection == 8) {
		cm.dispose();
		cm.openNpc(2001001);
	} else if (selection == 9) {
		cm.dispose();
		cm.openNpc(9000095);
	} else if (selection == 10) {
                cm.dispose();
		cm.openNpc(1012009);
        } else if (selection == 11) {
                cm.dispose();
		cm.warp(931000500);
        } else if (selection == 12) {
                cm.dispose();
		cm.openNpc(1012006);
        } else if (selection == 13) {
                cm.dispose();
		cm.openNpc(9000154);

         } else if (selection == 14) {
                cm.dispose();
		cm.openNpc(1101000);

         } else if (selection == 16) {
                cm.dispose();
		cm.openNpc(1101000);

         } else if (selection == 18) {
                cm.dispose();
		cm.openNpc(1002004);
        
	} else if (selection == 15) {
		cm.dispose(); 

	}
    } else if (status == 2) {
	cm.dispose();
	cm.openShop(selection);
    }
}
