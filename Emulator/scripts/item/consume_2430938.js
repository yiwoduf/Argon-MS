/*
������ : ���(vmfhvlfqhwlak@nate.com)
������ : Ÿ��(time_amd@nate.com)
*/


var status = -1;

function start() {
 action(1, 0, 0);
}

function action(mode, type, selection) {
 if (mode == 1) {
  status++;
 } else {
  status--;
  cm.dispose();
 }
 if (status == 0) {
  cm.sendYesNo("#b#z2430938##k �� ������ ����Ͻðڽ��ϱ�?");
 } else if (status == 1) {
cm.gainItem(2430938,-1);
cm.teachSkill(80001148,1,1);
cm.sendOk("���̵���ų�� ���������� ���� �Ǿ����ϴ�."); // ���� ����Ʈ��
cm.dispose();
}
}