/*
 * Mady By Spirit(Spiritcube)
 */
var items = new Array(new Array(1190100,1,100), new Array(1190101,1,100), new Array(1190300,1,100), new Array(1190301,1,100), new Array(1190302,1,100), new Array(1190400,1,100));

function start() {
 var txt = "� ������ �����Ͻðڽ��ϱ�?  (����1000����)\r\n";
 for (var i = 0; i < items.length; i++) {
 txt += "#L"+i+"# #i"+items[i][0]+"# #z"+items[i][0]+"# (x "+items[i][1]+")\r\n";
 }
 cm.sendSimple(txt);
}

function action(m,t,s) {
 meso = items[s][2] * 100000;
 if (cm.getMeso() >= meso) {
 cm.gainMeso(-meso);
 cm.gainItem(items[s][0], items[s][1]);
 cm.sendOk("���������� �����Ͽ����ϴ�.");
 } else {
 cm.sendOk("�޼Ұ� �����մϴ�.\r\n#b(������ ���� : "+meso+")");
 }
 cm.dispose();
}