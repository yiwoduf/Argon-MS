


/*

	* �ܹ����ǽ� �ڵ����� ��ũ��Ʈ�� ���� ������� ��ũ��Ʈ �Դϴ�.

	* (Guardian Project Development Source Script)

	���� �� ���� ����� �����ϴ�.

	���ǽþ��̵� : 1064001

	���ǽ� �̸� : �ǹ��� �ҳ�

	���ǽð� �ִ� �� : ��Ÿ�� : �������� (105200200)

	���ǽ� ���� : MISSINGNO


*/


var status = -1;
function start() {
    status = -1;
    action (1, 0, 0);
}
partypass = 0
h = 0;
check = "ī���� �ǿ���";//������
level = 200//�䱸����
var map = 105200610;//���ڵ�
var hp = "4860 ��";
var hp1 = "1620 ��";
var hp2 = "1620 ��";
var hp3 = "1620 ��";

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
    if (status == -1) {
        cm.dispose();
    }

   if (status == 0) {
    if (cm.getPlayer().getMapId() == 105200200) {
        cm.sendSimple("#fn������� Extrabold##fs13##d"+check+"#k �� �����ϱ� ���� �̵� �Ͻðڽ��ϱ�?\r\n#rLv."+level+"#k ���� ������ �����մϴ�.\r\n\r\n#dü��#k : #r"+hp1+"#k + #r"+hp2+"#k + #r"+hp3+"#k = #r"+hp+"#k\r\n\r\n#fs11##L1##b"+check+" �� �����ϱ� ���� �̵��Ѵ�.");
    } else {
   cm.dispose();
}
     } 
        if (selection == 1) {
        if (cm.getPlayer().getParty() == null) {
            cm.sendOk("#fn������� Extrabold##r��Ƽ�� �������� �ʽ��ϴ�.#k");
            cm.dispose();
        } else if (!cm.isLeader()) {
            cm.sendOk("#fn������� Extrabold##r��Ƽ���� �ƴմϴ�.#k")
            cm.dispose();
        } else if (cm.getPlayerCount(map) > 0) {
            cm.sendOk("#fn������� Extrabold#�̹� �������� #d"+check+"#k �� �����ϰ� �ֽ��ϴ�.\r\n#b�ٸ� ä���� �̿��� �ּ���.#k");
            cm.dispose();
        }
        if (partypass == 0) {
            �� = "#fn������� Extrabold#��Ƽ�� �� #b"
            for (i = 0; i < cm.getPartyMembers().size(); i++) {
                if (cm.getPlayer().getParty().getMembers().get(i).getLevel() < level){
                    partypass = 1;
                    h++
                    �� += cm.getPlayer().getParty().getMembers().get(i).getName()
                    if (h != cm.getPartyMembers().size()) {
                        if (!h == i) {
                            �� += ", "
                        }
                    }
                }
            }
            �� += "#fn������� Extrabold##k ����\r\n������ �������� �ʾƼ� �Ұ��� �մϴ�.\r\n\r\n#rLv."+level+"#k ���� ������ �����մϴ�."
            if (partypass == 1) {
                cm.sendOk(��);
                cm.dispose();
            } else {
          cm.warpParty(map);
	  cm.dispose();
    }
}
}
}