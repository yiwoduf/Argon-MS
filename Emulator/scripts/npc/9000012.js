/*
�� ��ũ��Ʈ�� ���۱��� FoxDevelopTeam ���� Fox���� �ֽ��ϴ�.
���� : rinus_alt / fox_devel@nate.com / opharks (skype)
*/

var status = -1;

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
	var chat = "�ݰ���. #b�����÷���#k ������ ��� #r���B#k��� �Ѵ�.\r\n";
        chat += "#g#L3##i4001861# ��ٸ� Ÿ��#l";
		chat += "#L4##i2470000# ��ȭ �ý���#l";
		chat += "#L12##i4001101# �γ� ����#l";
        chat += "#L13##i2430029# ��� �̱�#l";
		chat += "\r\n#L11##i1012076# #d[N]#g ���Ǿ� ����#l";
		//chat += "#L20##d[�׽�Ʈ]#g ���� ���̵�#l";
        chat += "#e#r#L14# ��ȭ ������#l";
	cm.sendSpirit(chat,true,0);
    } else if (status == 1) {
     var s = selection;
        cm.dispose();
	if (selection == 0) {
		cm.dispose();
		cm.openNpc(9001014);
		}else if  (selection == 3) {
          cm.dispose();
          cm.openNpc(1002004);
        } else if (selection == 4) {
          cm.dispose();
          cm.openNpc(9300009);
		} else if (selection == 11) {
		  cm.warp(310000004);
		} else if (selection == 12) {
		  cm.dispose();
		  cm.openNpc (9300010);
		} else if (selection == 13) {
          cm.dispose();
          cm.openNpc(9300014);
		} else if (selection == 14) {
          cm.dispose();
		} else if (selection == 20) {
		  cm.dispose();
		  cm.openNpc(9000208);
		}
    }
}
