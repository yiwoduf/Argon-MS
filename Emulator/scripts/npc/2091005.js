var itemcode = Array(0, 0, 2022857);

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
            cm.sendSimple("#fn������� EXtrabold# ������� ������ �߿Դٴ� �����. ������ �����δ� ���� ������? � ��� ������ ���ھ�?\r\n#r[������� ��� �ð� : " + cm.getPlayer().MulungTimeString(cm.c.getPlayer().MulungTime()) + " ]#k#b\r\n#L1# ȸ��, ���� ȿ���� �ް� �;�.\r\n#L2# ��� �����غ���.\r\n#L3# ������ �����ھ�#k");
        } else if (status == 1) {
            if (selection == 1) {
                //cm.sendUITalk("#0# HP 50% ȸ�� #1# HP 100% ȸ�� #2# MaxHP + 10000 (���ӽð� : 10��) #3# ���ݷ�/���� + 30 (���ӽð� : 10��) #4# ���ݷ�/���� + 60 (���ӽð� : 10��) #5# ����/�������� + 2500 (���ӽð� : 10��) #6# ����/�������� + 4000 (���ӽð� : 10��) #7# ����ġ/ȸ��ġ + 2000 (���ӽð� : 10��) #8# �̵��ӵ�/������ MAX (���ӽð� : 10��) #9# ���ݼӵ� +1 (���ӽð� : 10��)");
            } else if (selection == 2) {
	  if (cm.isMulung(cm.getPlayer().getMapId())) {
	      cm.changeMap(cm.c.getPlayer().getMapId() + 100);
                    cm.c.getPlayer().getMap().mulungStageStart(cm.c.getPlayer());
                    cm.dispose();
	  } else {	      
	      cm.dispose();
	  }
            } else if (selection == 3) {
                cm.changeMap(925020001);
                cm.dispose();
            }
        } else if (status == 2) {
            cm.sendYesNo("#i" + itemcode[selection] + "# #t" + itemcode[selection] + "#�� ����ϰھ�? �ϳ��� �޽� ������������ �� ���� �ۿ� ������ �� ������ �����ϰ� �����϶�!");
        } else if (status == 3) {
            cm.dispose();
        }
    }
}