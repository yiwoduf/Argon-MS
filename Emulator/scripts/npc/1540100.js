var status = -1;
var sel = 0;
var array = [1190000, 1190001, 1190100, 1190101, 1190200, 1190201, 1190300, 1190301, 1190302, 1190400, 1190500, 1190501, 1190502, 1190503, 1190510, 1190511, 1190512, 1190513, 1190514, 1190515, 1190516, 1190517, 1190518, 1190519, 1190520, 1190521, 1190600, 1190601, 1190700, 1190701, 1190800, 1190801, 1190900, 1191000, 1191001];

function action(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
	cm.dispose();
	return;
    }
    if (status == 0) {
	var chat = "���� �̱⸦ ����ϰ��ִ� ���� �̶�� �ؿ�\r\n#L0##b������ ��ǥ 100���� ���� �̱�#l";
	cm.sendSimple(chat);
    } else if (status == 1) {
	if (!cm.haveItem(4310015, 100)) {
		cm.sendOk("������ �̱����ؼ� ������ ��ǥ 100���� �ʿ� �ؿ�.");
		cm.dispose();
		return;
	}
	var itemid = array[Math.floor(Math.random() * array.length)];
	if (!cm.canHold(itemid)) {
		cm.sendOk("�κ��丮�� ��ĭ �̻��� �� ������ �ʿ��ؿ�");
		cm.dispose();
		return;
	}
	cm.gainItem(itemid, 1);
	cm.gainItem(4310015, -100);
	cm.sendOk("���� ����� ���� �̱⿡�� [#b#z" + itemid + "##k] �� ���Ծ");
	cm.dispose();
    }
}