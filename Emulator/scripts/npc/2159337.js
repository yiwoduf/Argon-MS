var status;

var ������ = 209000001;
var �������� = 9303154;

var �븻�� = 209000002;
var �븻���� = 9303153;

var �ϵ�� = 209000003;
var �ϵ庸�� = 8880120;

var ��� = 209000004;
var �ﺸ�� = 9300864;

function start() {
	status = -1;
	action(1, 0, 0);
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
		var chat = "#e����� ���Ͻô� #r����#k�� ������ �ֽʽÿ�#n\r\n\r\n";
		chat += "#L0##d���� ���̵�#l#k#n\r\n";
		chat += "#L1##b�븻 ���̵�#l#k#n\r\n";
		chat += "#L2##r�ϵ� ���̵�#l#k#n\r\n";
		chat += "#L3##e#r�� ���̵�#l#k#n";
		cm.sendSimple(chat);
	} else if (status == 1) {
		if (cm.getParty() != null) {
			if (selection == 0) {
				cm.resetMap(������);
				cm.warp(������);
				cm.spawnMob(��������, cm.getPlayer().getPosition().getX(), cm.getPlayer().getPosition().getY());
				cm.sendOk("#e������ ���ϴ�.#n");
				cm.dispose();
			} else if (selection == 1) {
				cm.resetMap(�븻��);
				cm.warp(�븻��);
				cm.spawnMob(�븻����, cm.getPlayer().getPosition().getX(), cm.getPlayer().getPosition().getY());
				cm.sendOk("#e������ ���ϴ�.#n");
				cm.dispose();
			} else if (selection == 2) {
				cm.resetMap(�ϵ��);
				cm.warp(�ϵ��);
				cm.spawnMob(�ϵ庸��, cm.getPlayer().getPosition().getX(), cm.getPlayer().getPosition().getY());
				cm.sendOk("#e������ ���ϴ�.#n");
				cm.dispose();
			} else if (selection == 3) {
				cm.resetMap(���);
				cm.warp(���);
				cm.spawnMob(�ﺸ��, cm.getPlayer().getPosition().getX(), cm.getPlayer().getPosition().getY());
				cm.sendOk("#e������ ���ϴ�.#n");
				cm.dispose();
			}
		} else {
			cm.sendOk("#e��Ƽ�� �����ϴ�.#n");
			cm.dispose();
		}
	}
}
