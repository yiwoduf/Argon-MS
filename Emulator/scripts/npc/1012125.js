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
	var chat = "�˻�ĳ�ÿ��ǽ� #b"+ cm.getPlayer().getName() + "#k  ��������#r";
	chat += "\r\n#r#L1##i2433017# �Ŀ��˻�ĳ��#l";
	chat += "\r\n#b#L2##i4310038# ���ΰ˻�ĳ��#l #r#L3##d ��ȭ�׸��ϱ� #k#l";
        cm.sendSpirit(chat,true,0);
      } else if (status == 1) {
        if (selection == 1) {
          cm.dispose();
          cm.openNpc(1094000);
        } else if (selection == 0) {
          cm.dispose();
          cm.openNpc (2081010);
      } else if (selection == 2) {
          cm.dispose();
          cm.openNpc (1012107);
        } else if (selection == 3) {
          cm.dispose();
      }
    } else if (status == 2) {
	cm.dispose();
	cm.openShop(selection);
    }
}
