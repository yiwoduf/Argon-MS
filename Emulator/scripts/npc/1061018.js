/*

 * �ܹ����ǽ� �ڵ����� ��ũ��Ʈ�� ���� ������� ��ũ��Ʈ �Դϴ�.

 * (Pure Online Development Source Script)

�޸������� �� ���� ����� �����ϴ�.

���ǽþ��̵� : 9000174

���ǽ� �̸� : ��������

���ǽð� �ִ� �� :

���ǽ� ���� : ��ȥ������

QS2 += "\r\n#fUI/UIWindow2.img/MapleStyle/RewardPopup/backgrnd2#\r\n"

 */

var status = 0;
importPackage(Packages.server);
importPackage(Packages.constants);
importPackage(java.util);
importPackage(Packages.tools);
importPackage(Packages.server.quest);
importPackage(java.awt);
importPackage(java.lang);
importPackage(Packages.client.inventory);
importPackage(Packages.client.skills);
importPackage(Packages.server.items);
importPackage(Packages.client.items);
importPackage(Packages.client);
importPackage(Packages.tools.RandomStream);

var selected = 0;
var check = 0;
var sel = 0;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 0) {
			//if (mode == 0 && status == 0) {
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			var str = "������� ���մϴ�. �ΰ��̶� ������ ���Ѱܺ��� \r\n�ڽ��� ������� �ȴٰ�. ��������ʽ��ϱ�?\r\n�� ���� ���⿡ ������ ����Ͱ��ƿ�.#b\r\n";
			str += "\r\n#fUI/UIWindow2.img/UtilDlgEx/list1#\r\n"

			   str += "#L81#���谡Ÿ��Ʋ�� ȹ���ϰ�ͽ��ϴ�.#l\r\n";
			str += "#L84#�ñ׳ʽ�Ÿ��Ʋ�� ȹ���ϰ�ͽ��ϴ�.#l\r\n";
			str += "#L85#����Ÿ��Ʋ�� ȹ���ϰ�ͽ��ϴ�.#l\r\n\r\n";
			cm.sendSimple(str);
		} else if (status == 1) {
			if (selection == 82) {
				var QS7 = "�������� ���Ÿ� �������Ű���?";
				QS7 += "\r\n������ ��Ŵٸ� ���ϰ� �ŷ��� ���������Ƿ���?\r\n"
				if (cm.haveItem(4000659, 1) && cm.haveItem(4033311, 1) && cm.haveItem(4033312, 1) && cm.haveItem(4033302, 1) && cm.haveItem(4033303, 1) && cm.haveItem(4033304, 1)) {
					QS7 += "\r\n #fUI/UIWindow2.img/UtilDlgEx/list3##k"
					QS7 += "\r\n�������� ���Ÿ� ������ �����Ű�����.\r\n"
					QS7 += "�̷��� ���� �������� ���Ŵ� ó�����°Ͱ��ƿ�!\r\n"
				} else {
					QS7 += "\r\n #fUI/UIWindow2.img/UtilDlgEx/list1##k\r\n"
				}
				QS7 += "#k\#r#L60##b#v4000659#1��#k,#b#v4033311#1��#k,#b#v4033312#1��#k\r\n,#b#v4033302#1��#k,#b#v4033303#1��#k,#b#v4033304#1��#k\r\n #r(���� : ��Į�� ���������� )#k#l\r\n"
				cm.sendSimple(QS7);
			} else if (selection == 81) {
				var QS4 = "\r\n����� �ڿ� ���谡 Ÿ��Ʋ�� ������ �ƴ°�?";
				QS4 += "\r\n�װ��� �ٷ� �����ΰ� �����޴¿���. �ٷ� �ڽ��� ������\r\nȤ�� �����ϰ� �����Ű���?\r\n";
				QS4 += "\r\n #fUI/UIWindow2.img/UtilDlgEx/list1#"
				//QS4 += "\r\n\r\n#v1142009##v1142010##v1142011##fUI/UIWindow2.img/Title/main/icon1# #v1142012##v1142013##v3700148#"
				//QS4 += "\r\n\r\nŸ��Ʋ�� ȹ���Ͻø� �پ��� ������ ����˴ϴ�."
				//QS4 += "\r\n�ڽ� �����ΰ� ������������ �������ּ���. \r\n���� �ű�� �����帱�Կ�.\r\n[�����ݺ�����Ʈ�Դϴ�.]";
				QS4 += "\r\n #k\#L210# #v1142009# ����\r\n#l\r\n"
				QS4 += "\r\n #l\n ���̵� : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2#]#n#l"
				QS4 += "\r\n\r\n����迭�� �ְ��� Ÿ��Ʋ�Դϴ�.\r\n�̰��� ȹ�����ڴ� ����迭���� �����̵˴ϴ�.\r\n[�����ݺ�����Ʈ�Դϴ�.]";
				QS4 += "\r\n #k\#L211# #v1142010# ����\r\n"
				QS4 += "\r\n#l\r\n ���̵� : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2#]#n#l"
				QS4 += "\r\n\r\n������迭�� �ְ��� Ÿ��Ʋ�Դϴ�.\r\n�̰��� ȹ�����ڴ� ������迭���� �����̵˴ϴ�.\r\n[�����ݺ�����Ʈ�Դϴ�.]";
				QS4 += "\r\n #k\#L212# #v1142011# �������� �ε�\r\n"
				QS4 += "\r\n#l\r\n ���̵� : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2#]#n#l"
				QS4 += "\r\n\r\n�ü��迭�� �ְ��� Ÿ��Ʋ�Դϴ�.\r\n�̰��� ȹ�����ڴ� �ü��迭���� �����̵˴ϴ�.\r\n[�����ݺ�����Ʈ�Դϴ�.]";
				QS4 += "\r\n #k\#L213# #v1142012# �������� ����\r\n"
				QS4 += "\r\n#l\r\n ���̵� : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2#]#n#l"
				QS4 += "\r\n\r\n�����迭�� �ְ��� Ÿ��Ʋ�Դϴ�.\r\n�̰��� ȹ�����ڴ� �����迭���� �����̵˴ϴ�.\r\n[�����ݺ�����Ʈ�Դϴ�.]";
				QS4 += "\r\n #k\#L214# #v1142013# ������\r\n"
				QS4 += "\r\n#l\r\n ���̵� : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2#]#n#l"
				QS4 += "\r\n\r\n�����迭�� �ְ��� Ÿ��Ʋ�Դϴ�.\r\n�̰��� ȹ�����ڴ� �����迭���� �����̵˴ϴ�.\r\n[�����ݺ�����Ʈ�Դϴ�.]";
				//QS4 += "\r\n #k\#L215# #v3700148# ���丮 all �Ϸ���\r\n#l"
				//QS4 += "\r\n#l\r\n ���̵� : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2#]#n#l"
				//QS4 += "\r\n\r\n���丮����Ʈ �� Ŭ���� Ÿ��Ʋ�Դϴ�\r\n�̰���  ���丮����Ʈ �� Ŭ���� ��ǥ�Դϴ�\r\n[��������Ʈ�Դϴ�.]";
				cm.sendSimple(QS4);
			} else if (selection == 84) {
				var QS8 = "����� �ڿ� �ñ׳ʽ� Ÿ��Ʋ�� ������ �ƴ°�?";
				QS8 += "\r\n�ٷ� ������ �����޴°��� �ٷ� �״��� ������\r\n�غ�� �Ǿ��°�?\r\n";
				QS8 += "\r\n #fUI/UIWindow2.img/UtilDlgEx/list1#"
				//QS8 += "\r\n\r\n #fUI/UIWindow2.img/Title/main/icon1# [Ÿ��Ʋ�� ȹ���Ͻø� �پ��� ������ ����˴ϴ�.]"
				//QS8 += "\r\n\r\n�����϶� ������ �������� ���� \r\n���� ������ �װ����� �����ָ�\r\n[�����ݺ�����Ʈ�Դϴ�.]";
				QS8 += "\r\n #k\#L300# #v1142597# �ñ׳ʽ��� ���� ��\r\n#l\r\n"
				QS8 += "\r\n #l\n ���̵� : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2#]#n#l"
				QS8 += "\r\n\r\n�ñ׳ʽ��� �ְ��� Ÿ��Ʋ�Դϴ�.\r\n�̰��� ȹ�����ڴ� �ñ׳ʽ����� ������ �ް� �˴ϴ�.\r\n[�����ݺ�����Ʈ�Դϴ�.]";

				QS8 += "\r\n #k\#L301# #v1142403# ������ ���� ���\r\n#l\r\n"
				QS8 += "\r\n #l\n ���̵� : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2#]#n#l"
				QS8 += "\r\n\r\n�������� �ְ��� Ÿ��Ʋ�Դϴ�.\r\n�̰��� ȹ�����ڴ� ���� ��簡 �˴ϴ�.\r\n[�����ݺ�����Ʈ�Դϴ�.]";
				cm.sendSimple(QS8);
			} else if (selection == 85) {
				var QS9 = "����� �ڿ� ����Ÿ��Ʋ�� ������ �ƴ°�?";
				QS9 += "\r\n�ٷ� ������ �����޴°��� �ٷ� �״��� ������\r\n�غ�� �Ǿ��°�?\r\n";
				QS9 += "\r\n #fUI/UIWindow2.img/UtilDlgEx/list1#"
				//QS9 += "\r\n\r\n #fUI/UIWindow2.img/Title/main/icon1# [Ÿ��Ʋ�� ȹ���Ͻø� �پ��� ������ ����˴ϴ�.]"
				//QS9 += "\r\n\r\n�����϶� ������ �������� ���� \r\n���� ������ �װ����� �����ָ�\r\n[�����ݺ�����Ʈ�Դϴ�.]";
				QS9 += "\r\n #k\#L400# #v1142379# ���� ����\r\n#l\r\n"
				QS9 += "\r\n #l\n ���̵� : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2#]#n#l"
				QS9 += "\r\n\r\n���ҵ��� �ְ��� Ÿ��Ʋ�Դϴ�.\r\n�̰��� ȹ�����ڴ� ���ҵ� �߿��� ���� ������ �˴ϴ�.\r\n[�����ݺ�����Ʈ�Դϴ�.]";
				QS9 += "\r\n #k\#L401# #v1142158# ������ �İ���\r\n#l\r\n"
				QS9 += "\r\n #l\n ���̵� : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2#]#n#l"
				QS9 += "\r\n\r\n���ݵ��� �ְ��� Ÿ��Ʋ�Դϴ�.\r\n�̰��� ȹ�����ڴ� ���ݵ� �߿��� �İ��ڰ� �˴ϴ�.\r\n[�����ݺ�����Ʈ�Դϴ�.]";
				QS9 += "\r\n #k\#L402# #v1142483# ����� ������\r\n#l\r\n"
				QS9 += "\r\n #l\n ���̵� : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2#]#n#l"
				QS9 += "\r\n\r\n��̳ʽ����� �ְ��� Ÿ��Ʋ�Դϴ�.\r\n�̰��� ȹ�����ڴ� ��̳ʽ��� �߿��� ������ �˴ϴ�.\r\n[�����ݺ�����Ʈ�Դϴ�.]";
				QS9 += "\r\n #k\#L403# #v1142488# ���ǿ� ������ ��\r\n#l\r\n"
				QS9 += "\r\n #l\n ���̵� : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2#]#n#l"
				QS9 += "\r\n\r\nī�������� �ְ��� Ÿ��Ʋ�Դϴ�.\r\n�̰��� ȹ�����ڴ� ī������ �߿��� ������ �˴ϴ�.\r\n[�����ݺ�����Ʈ�Դϴ�.]";

				QS9 += "\r\n #k\#L404# #v1142499# ���۽�Ÿ��\r\n#l\r\n"
				QS9 += "\r\n #l\n ���̵� : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2#]#n#l"
				QS9 += "\r\n\r\n�����������͵��� �ְ��� Ÿ��Ʋ�Դϴ�.\r\n�̰��� ȹ�����ڴ� �����������͵� �߿��� ���۽�Ÿ�� �˴ϴ�.\r\n[�����ݺ�����Ʈ�Դϴ�.]";
				QS9 += "\r\n #k\#L405# #v1142345# ������ ȭ��\r\n#l\r\n"
				QS9 += "\r\n #l\n ���̵� : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2#]#n#l"
				QS9 += "\r\n\r\n������� �ְ��� Ÿ��Ʋ�Դϴ�.\r\n�̰��� ȹ�����ڴ� ����� �߿��� ������ �˴ϴ�.\r\n[�����ݺ�����Ʈ�Դϴ�.]";
				QS9 += "\r\n #k\#L406# #v1142340# ������ ��\r\n#l\r\n"
				QS9 += "\r\n #l\n ���̵� : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2#]#n#l"
				QS9 += "\r\n\r\n�޸����������� �ְ��� Ÿ��Ʋ�Դϴ�.\r\n�̰��� ȹ�����ڴ� �޸��������� �߿��� ������ �˴ϴ�.\r\n[�����ݺ�����Ʈ�Դϴ�.]";
				QS9 += "\r\n #k\#L407# #v1142133# ���� �ƶ�\r\n#l\r\n"
				QS9 += "\r\n #l\n ���̵� : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2#]#n#l"
				QS9 += "\r\n\r\n�ƶ����� �ְ��� Ÿ��Ʋ�Դϴ�.\r\n�̰��� ȹ�����ڴ� �ƶ��� �߿��� ������ �˴ϴ�.\r\n[�����ݺ�����Ʈ�Դϴ�.]";
				cm.sendSimple(QS9);
			} else if (selection == 79) {
				var QS2 = "���󿡴� �پ��� �������� ���������� ��¥�� �����ϴ�..#b\r\n";
				QS2 += "\r\n #fUI/UIWindow2.img/UtilDlgEx/list1##k"
				QS2 += "\r\n ������ �����Ͻðڽ��ϱ�? �ŷ��� �پ��մϴ�.\r\n Ư���� �ʿ��Ѱ����� �����ֵ����ص帮����.#b\r\n"
				//QS2 += "\r\n#fUI/UIWindow2.img/EvolvingSystem/BtStart/normal/0#\r\n"
				QS2 += "#k\#r#L1##b#v4000171#500��#k�� ��ƿ��ڽ��ϴ�.(���� : #v1152009# )#l"
				QS2 += "\r\n #k\#r#L5##b#v4000458#300��#k�� ��ƿ��ڽ��ϴ�.(���� : #v1112594# )#l"
				QS2 += "\r\n #k\#r#L3##b#v4000440#550��#k�� ��ƿ��ڽ��ϴ�.(���� : #v1032101# )#l"
				QS2 += "\r\n #k\#r#L4##b#v4000180#,#v4000181#550��#k�� ��ƿ��ڽ��ϴ�.(���� : #v1022123# )#l"
				QS2 += "\r\n #k\#r#L2##b#v4000364#,#v4000365#550��#k�� ��ƿ��ڽ��ϴ�.(���� : #v1122118# )#l\r\n"
				if (cm.haveItem(4000171, 500)) {
					QS2 += "\r\n\r\n #fUI/UIWindow2.img/UtilDlgEx/list3##k"
					QS2 += "#k\r\n#L20##r#b#v4000171#500��#k�� ��ƿԽ��ϴ�.#l\r\n#l\r\n #e�� #n#v1152009#�������� ����Ʈ�� �����ϰڽ��ϴ�.#l";
				}
				if (cm.haveItem(4000458, 300)) {
					QS2 += "\r\n #fUI/UIWindow2.img/UtilDlgEx/list3##k"
					QS2 += "#k\r\n#L16##r#b#v4000458#300��#k�� ��ƿԽ��ϴ�.#l\r\n#l\r\n #e�� #n#v1112594#�������� ����Ʈ�� �����ϰڽ��ϴ�.#l";
				}
				if (cm.haveItem(4000440, 550)) {
					QS2 += "\r\n #fUI/UIWindow2.img/UtilDlgEx/list3##k"
					QS2 += "#k\r\n#L18##r#b#v4000440#550��#k�� ��ƿԽ��ϴ�.#l\r\n#l\r\n #e�� #n#v1032101#�������� ����Ʈ�� �����ϰڽ��ϴ�.#l";
				}
				if (cm.haveItem(4000180, 550) && cm.haveItem(4000181, 550)) {
					QS2 += "\r\n #fUI/UIWindow2.img/UtilDlgEx/list3##k"
					QS2 += "#k\r\n#L17##r#b#v4000180#550��,#v4000181#550��#k�� ��ƿԽ��ϴ�.#l\r\n#l\r\n #e�� #n#v1022123#�������� ����Ʈ�� �����ϰڽ��ϴ�.#l";
				}
				if (cm.haveItem(4000364, 550) && cm.haveItem(4000365, 550)) {
					QS2 += "\r\n #fUI/UIWindow2.img/UtilDlgEx/list3##k"
					QS2 += "#k\r\n#L19##r#b#v4000364#550��,#v4000365#550��#k�� ��ƿԽ��ϴ�.#l\r\n#l\r\n #e�� #n#v1122118#�������� ����Ʈ�� �����ϰڽ��ϴ�.#l";
				}
				cm.sendSimple(QS2);
			}
		} else if (status == 2) {
			if (selection == 210) {
				if (cm.haveItem(4000653, 550)) {
					if (!cm.haveItem(1142009, 1)) {
						if (cm.canHold(1142009)) {
							cm.gainSponserItem(1142009, "���� Īȣ", 10, 10, 4);
							//cm.Ư�������۷����帮(1142009);
							cm.gainItem(4000653, -550);
							cm.sendOk("Īȣ�� �����ص�Ƚ��ϴ�.\r\n�ش� Īȣ�� �ֹ����� #r5��#k ����� �� �ֽ��ϴ�");
						} else {
							cm.sendOk("�˼������� �κ��丮 ������ ������� ������ �� ���׿�. �κ��丮 ������ ����ּ���.\r\n�Ǵ� �̹� �������Դϴ�.");
						}
					} else {
						cm.sendOk("�̹� �ش� Īȣ�� �������Դϴ�.");
					}
				} else {
					cm.sendOk("����Ʈ������ : #v4000653# \r\n����Ʈ�������� 550���� ��ƿ��°��� ���������̿���.");
				}
				cm.dispose();
			} else if (selection == 211) {
				if (cm.haveItem(4000650, 550)) {
					if (!cm.haveItem(1142010, 1)) {
						if (cm.canHold(1142010)) {
							cm.gainSponserItem(1142010, "���� Īȣ", 10, 10, 4);
							cm.gainItem(4000650, -550);
							cm.sendOk("Īȣ�� �����ص�Ƚ��ϴ�.\r\n�ش� Īȣ�� �ֹ����� #r5��#k ����� �� �ֽ��ϴ�");
						} else {
							cm.sendOk("�˼������� �κ��丮 ������ ������� ������ �� ���׿�. �κ��丮 ������ ����ּ���.\r\n�Ǵ� �̹� �������Դϴ�.");
						}
					} else {
						cm.sendOk("�̹� �ش� Īȣ�� �������Դϴ�.");
					}
				} else {
					cm.sendOk("����Ʈ������ : #v4000650# \r\n����Ʈ�������� 550���� ��ƿ��°��� ���������̿���.");
				}
				cm.dispose();
			} else if (selection == 212) {
				if (cm.haveItem(4000652, 550)) {
					if (!cm.haveItem(1142011, 1)) {
						if (cm.canHold(1142011)) {
							cm.gainSponserItem(1142011, "���� Īȣ", 10, 10, 4);
							cm.gainItem(4000652, -550);
							cm.sendOk("Īȣ�� �����ص�Ƚ��ϴ�.\r\n�ش� Īȣ�� �ֹ����� #r5��#k ����� �� �ֽ��ϴ�");
						} else {
							cm.sendOk("�˼������� �κ��丮 ������ ������� ������ �� ���׿�. �κ��丮 ������ ����ּ���.\r\n�Ǵ� �̹� �������Դϴ�.");
						}
					} else {
						cm.sendOk("�̹� �ش� Īȣ�� �������Դϴ�.");
					}
				} else {
					cm.sendOk("����Ʈ������ : #v4000652# \r\n����Ʈ�������� 550���� ��ƿ��°��� ���������̿���.");
				}
				cm.dispose();
			} else if (selection == 213) {
				if (cm.haveItem(4000649, 550)) {
					if (!cm.haveItem(1142012, 1)) {
						if (cm.canHold(1142012)) {
							cm.gainSponserItem(1142012, "���� Īȣ", 10, 10, 4);
							cm.gainItem(4000649, -550);
							cm.sendOk("Īȣ�� �����ص�Ƚ��ϴ�.\r\n�ش� Īȣ�� �ֹ����� #r5��#k ����� �� �ֽ��ϴ�");
						} else {
							cm.sendOk("�˼������� �κ��丮 ������ ������� ������ �� ���׿�. �κ��丮 ������ ����ּ���.\r\n�Ǵ� �̹� �������Դϴ�.");
						}
					} else {
						cm.sendOk("�̹� �ش� Īȣ�� �������Դϴ�.");
					}
				} else {
					cm.sendOk("����Ʈ������ : #v4000649# \r\n����Ʈ�������� 550���� ��ƿ��°��� ���������̿���.");
				}
				cm.dispose();
			} else if (selection == 214) {
				if (cm.haveItem(4000651, 550)) {
					if (!cm.haveItem(1142013, 1)) {
						if (cm.canHold(1142013)) {
							cm.gainSponserItem(1142013, "���� Īȣ", 10, 10, 4);
							cm.gainItem(4000651, -550);
							cm.sendOk("Īȣ�� �����ص�Ƚ��ϴ�.\r\n�ش� Īȣ�� �ֹ����� #r5��#k ����� �� �ֽ��ϴ�");
						} else {
							cm.sendOk("�˼������� �κ��丮 ������ ������� ������ �� ���׿�. �κ��丮 ������ ����ּ���.\r\n�Ǵ� �̹� �������Դϴ�.");
						}
					} else {
						cm.sendOk("�̹� �ش� Īȣ�� �������Դϴ�.");
					}
				} else {
					cm.sendOk("����Ʈ������ : #v4000651# \r\n����Ʈ�������� 550���� ��ƿ��°��� ���������̿���.");
				}
				cm.dispose();
			}
			/* else if (selection == 215) {
			if (cm.getQuestStatus(31229) == 2 && cm.getQuestStatus(3872) == 2 && cm.getQuestStatus(31328) == 2 && cm.getQuestStatus(3782) == 2 && cm.getQuestStatus(31259) == 2 && cm.getQuestStatus(31352) == 2 && cm.getPlayer().getKeyValue("QUEST7") == null) {
			cm.gainhorong(3700148);
			cm.getPlayer().setKeyValue("QUEST7", "1");
			cm.dispose();
			} else {
			cm.sendOk("��� ���丮����Ʈ�� �Ϸ������ʾҾ�!");
			cm.dispose();
			}
			}*/
			else if (selection == 300) {
				if (cm.haveItem(4000654, 550)) {
					if (!cm.haveItem(1142597, 1)) {
						if (cm.canHold(1142597)) {
							cm.gainSponserItem(1142597, "���� Īȣ", 10, 10, 4);
							cm.gainItem(4000654, -550);
							cm.sendOk("Īȣ�� �����ص�Ƚ��ϴ�.\r\n�ش� Īȣ�� �ֹ����� #r5��#k ����� �� �ֽ��ϴ�");
						} else {
							cm.sendOk("�˼������� �κ��丮 ������ ������� ������ �� ���׿�. �κ��丮 ������ ����ּ���.\r\n�Ǵ� �̹� �������Դϴ�.");
						}
					} else {
						cm.sendOk("�̹� �ش� Īȣ�� �������Դϴ�.");
					}
				} else {
					cm.sendOk("����Ʈ������ : #v4000654# \r\n����Ʈ�������� 550���� ��ƿ��°��� ���������̿���.");
				}
			} else if (selection == 301) {
				if (cm.haveItem(4000654, 550)) {
					if (!cm.haveItem(1142403, 1)) {
						if (cm.canHold(1142403)) {
							cm.gainSponserItem(1142403, "���� Īȣ", 10, 10, 4);
							cm.gainItem(4000654, -550);
							cm.sendOk("Īȣ�� �����ص�Ƚ��ϴ�.\r\n�ش� Īȣ�� �ֹ����� #r5��#k ����� �� �ֽ��ϴ�");
						} else {
							cm.sendOk("�˼������� �κ��丮 ������ ������� ������ �� ���׿�. �κ��丮 ������ ����ּ���.\r\n�Ǵ� �̹� �������Դϴ�.");
						}
					} else {
						cm.sendOk("�̹� �ش� Īȣ�� �������Դϴ�.");
					}
				} else {
					cm.sendOk("����Ʈ������ : #v4000654# \r\n����Ʈ�������� 550���� ��ƿ��°��� ���������̿���.");
				}
			} else if (selection == 400) {
				if (cm.haveItem(4000654, 550)) {
					if (!cm.haveItem(1142379, 1)) {
						if (cm.canHold(1142379)) {
							cm.gainSponserItem(1142379, "���� Īȣ", 10, 10, 4);
							cm.gainItem(4000654, -550);
							cm.sendOk("Īȣ�� �����ص�Ƚ��ϴ�.\r\n�ش� Īȣ�� �ֹ����� #r5��#k ����� �� �ֽ��ϴ�");
						} else {
							cm.sendOk("�˼������� �κ��丮 ������ ������� ������ �� ���׿�. �κ��丮 ������ ����ּ���.\r\n�Ǵ� �̹� �������Դϴ�.");
						}
					} else {
						cm.sendOk("�̹� �ش� Īȣ�� �������Դϴ�.");
					}
				} else {
					cm.sendOk("����Ʈ������ : #v4000654# \r\n����Ʈ�������� 550���� ��ƿ��°��� ���������̿���.");
				}
			} else if (selection == 401) {
				if (cm.haveItem(4000654, 550)) {
					if (!cm.haveItem(1142158, 1)) {
						if (cm.canHold(1142158)) {
							cm.gainSponserItem(1142158, "���� Īȣ", 10, 10, 4);
							cm.gainItem(4000654, -550);
							cm.sendOk("Īȣ�� �����ص�Ƚ��ϴ�.\r\n�ش� Īȣ�� �ֹ����� #r5��#k ����� �� �ֽ��ϴ�");
						} else {
							cm.sendOk("�˼������� �κ��丮 ������ ������� ������ �� ���׿�. �κ��丮 ������ ����ּ���.\r\n�Ǵ� �̹� �������Դϴ�.");
						}
					} else {
						cm.sendOk("�̹� �ش� Īȣ�� �������Դϴ�.");
					}
				} else {
					cm.sendOk("����Ʈ������ : #v4000654# \r\n����Ʈ�������� 550���� ��ƿ��°��� ���������̿���.");
				}

			} else if (selection == 402) {
				if (cm.haveItem(4000654, 550)) {
					if (!cm.haveItem(1142483, 1)) {
						if (cm.canHold(1142483)) {
							cm.gainSponserItem(1142483, "���� Īȣ", 10, 10, 4);
							cm.gainItem(4000654, -550);
							cm.sendOk("Īȣ�� �����ص�Ƚ��ϴ�.\r\n�ش� Īȣ�� �ֹ����� #r5��#k ����� �� �ֽ��ϴ�");
						} else {
							cm.sendOk("�˼������� �κ��丮 ������ ������� ������ �� ���׿�. �κ��丮 ������ ����ּ���.\r\n�Ǵ� �̹� �������Դϴ�.");
						}
					} else {
						cm.sendOk("�̹� �ش� Īȣ�� �������Դϴ�.");
					}
				} else {
					cm.sendOk("����Ʈ������ : #v4000654# \r\n����Ʈ�������� 550���� ��ƿ��°��� ���������̿���.");
				}

			} else if (selection == 403) {
				if (cm.haveItem(4000654, 550)) {
					if (!cm.haveItem(1142488, 1)) {
						if (cm.canHold(1142488)) {
							cm.gainSponserItem(1142488, "���� Īȣ", 10, 10, 4);
							cm.gainItem(4000654, -550);
							cm.sendOk("Īȣ�� �����ص�Ƚ��ϴ�.\r\n�ش� Īȣ�� �ֹ����� #r5��#k ����� �� �ֽ��ϴ�");
						} else {
							cm.sendOk("�˼������� �κ��丮 ������ ������� ������ �� ���׿�. �κ��丮 ������ ����ּ���.\r\n�Ǵ� �̹� �������Դϴ�.");
						}
					} else {
						cm.sendOk("�̹� �ش� Īȣ�� �������Դϴ�.");
					}
				} else {
					cm.sendOk("����Ʈ������ : #v4000654# \r\n����Ʈ�������� 550���� ��ƿ��°��� ���������̿���.");
				}
			} else if (selection == 404) {
				if (cm.haveItem(4000654, 550)) {
					if (!cm.haveItem(1142499, 1)) {
						if (cm.canHold(1142499)) {
							cm.gainSponserItem(1142499, "���� Īȣ", 10, 10, 4);
							cm.gainItem(4000654, -550);
							cm.sendOk("Īȣ�� �����ص�Ƚ��ϴ�.\r\n�ش� Īȣ�� �ֹ����� #r5��#k ����� �� �ֽ��ϴ�");
						} else {
							cm.sendOk("�˼������� �κ��丮 ������ ������� ������ �� ���׿�. �κ��丮 ������ ����ּ���.\r\n�Ǵ� �̹� �������Դϴ�.");
						}
					} else {
						cm.sendOk("�̹� �ش� Īȣ�� �������Դϴ�.");
					}
				} else {
					cm.sendOk("����Ʈ������ : #v4000654# \r\n����Ʈ�������� 550���� ��ƿ��°��� ���������̿���.");
				}
			} else if (selection == 405) {
				if (cm.haveItem(4000654, 550)) {
					if (!cm.haveItem(1142345, 1)) {
						if (cm.canHold(1142345)) {
							cm.gainSponserItem(1142345, "���� Īȣ", 10, 10, 4);
							cm.gainItem(4000654, -550);
							cm.sendOk("Īȣ�� �����ص�Ƚ��ϴ�.\r\n�ش� Īȣ�� �ֹ����� #r5��#k ����� �� �ֽ��ϴ�");
						} else {
							cm.sendOk("�˼������� �κ��丮 ������ ������� ������ �� ���׿�. �κ��丮 ������ ����ּ���.\r\n�Ǵ� �̹� �������Դϴ�.");
						}
					} else {
						cm.sendOk("�̹� �ش� Īȣ�� �������Դϴ�.");
					}
				} else {
					cm.sendOk("����Ʈ������ : #v4000654# \r\n����Ʈ�������� 550���� ��ƿ��°��� ���������̿���.");
				}
			} else if (selection == 406) {
				if (cm.haveItem(4000654, 550)) {
					if (!cm.haveItem(114234, 1)) {
						if (cm.canHold(114234)) {
							cm.gainSponserItem(114234, "���� Īȣ", 10, 10, 4);
							cm.gainItem(4000654, -550);
							cm.sendOk("Īȣ�� �����ص�Ƚ��ϴ�.\r\n�ش� Īȣ�� �ֹ����� #r5��#k ����� �� �ֽ��ϴ�");
						} else {
							cm.sendOk("�˼������� �κ��丮 ������ ������� ������ �� ���׿�. �κ��丮 ������ ����ּ���.\r\n�Ǵ� �̹� �������Դϴ�.");
						}
					} else {
						cm.sendOk("�̹� �ش� Īȣ�� �������Դϴ�.");
					}
				} else {
					cm.sendOk("����Ʈ������ : #v4000654# \r\n����Ʈ�������� 550���� ��ƿ��°��� ���������̿���.");
				}
			} else if (selection == 407) {
				if (cm.haveItem(4000654, 550)) {
					if (!cm.haveItem(1142133, 1)) {
						if (cm.canHold(1142133)) {
							cm.gainSponserItem(1142133, "���� Īȣ", 10, 10, 4);
							cm.gainItem(4000654, -550);
							cm.sendOk("Īȣ�� �����ص�Ƚ��ϴ�.\r\n�ش� Īȣ�� �ֹ����� #r5��#k ����� �� �ֽ��ϴ�");
						} else {
							cm.sendOk("�˼������� �κ��丮 ������ ������� ������ �� ���׿�. �κ��丮 ������ ����ּ���.\r\n�Ǵ� �̹� �������Դϴ�.");
						}
					} else {
						cm.sendOk("�̹� �ش� Īȣ�� �������Դϴ�.");
					}
				} else {
					cm.sendOk("����Ʈ������ : #v4000654# \r\n����Ʈ�������� 550���� ��ƿ��°��� ���������̿���.");
				}
			} else if (selection == 1) {
				//cm.warp(222010200);
				cm.sendOk("����Ʈ�� �ʿ��� ��Ḧ ��ƿ��ñ� �ٶ��ϴ�.");
				cm.dispose();
			} else if (selection == 2) {
				//cm.warp(261020400);
				cm.sendOk("����Ʈ�� �ʿ��� ��Ḧ ��ƿ��ñ� �ٶ��ϴ�.");
				cm.dispose();
			} else if (selection == 3) {
				//cm.warp(300010400);
				cm.sendOk("����Ʈ�� �ʿ��� ��Ḧ ��ƿ��ñ� �ٶ��ϴ�.");
				cm.dispose();
			} else if (selection == 4) {
				//cm.warp(230040400);
				cm.sendOk("����Ʈ�� �ʿ��� ��Ḧ ��ƿ��ñ� �ٶ��ϴ�.");
				cm.dispose();
			} else if (selection == 5) {
				//cm.warp(270030500);
				cm.sendOk("����Ʈ�� �ʿ��� ��Ḧ ��ƿ��ñ� �ٶ��ϴ�.");
				cm.dispose();
			} else if (selection == 20) {
				if (cm.haveItem(4000171, 500)) {
					if (cm.canHold(1152009)) {
						cm.gainItem(1152009, 1, true); //��ũ ȣ���� ����
						cm.gainItem(4000171, -500);
						cm.sendOk("���Ͻô� ������ �����Ű���?");
					} else {
						cm.sendOk("�˼������� �κ��丮 ������ ������� ������ �� ���׿�. �κ��丮 ������ ����ּ���.");
					}
				} else {
					cm.sendOk("#b#v 4000171##k ���� ��ᰡ �����ؿ�");
				}
				cm.dispose();
			} else if (selection == 19) {
				if (cm.haveItem(4000364, 550) && cm.haveItem(4000365, 550)) {
					if (cm.canHold(1122118)) {
						cm.gainItem(1122118, 1, true); //������ ����� ��ǥ
						cm.gainItem(4000364, -550);
						cm.gainItem(4000365, -550);
						cm.sendOk("���Ͻô� ������ �����Ű���?");
					} else {
						cm.sendOk("�˼������� �κ��丮 ������ ������� ������ �� ���׿�. �κ��丮 ������ ����ּ���.");
					}
				} else {
					cm.sendOk("#b#v 4000364# #v 4000365##k ���� ��ᰡ �����ؿ�");
				}
				cm.dispose();
			} else if (selection == 60) {
				if (cm.haveItem(4033302, 1) && cm.haveItem(4033303, 1) && cm.haveItem(4033304, 1) && cm.haveItem(4033311, 1) && cm.haveItem(4033312, 1) && cm.haveItem(4000659, 1)) {
					var scroll = new Array(1482169, 1532099, 1522095, 1492180, 1302276, 1472215, 1452206, 1462194, 1442224, 1432168, 1422141, 1412136, 1402197, 1382209, 1372178, 1362091, 1342083, 1332226, 1322204, 1312154, 1242063, 1212065, 1222060, 1232058, 1242062);
					var itemid = scroll[Math.floor(Math.random() * scroll.length)];
					if (cm.canHold(scroll)) {
						cm.gainItem(itemid, 1, true);
						cm.gainItem(4033302, -1);
						cm.gainItem(4033303, -1);
						cm.gainItem(4033304, -1);
						cm.gainItem(4033311, -1);
						cm.gainItem(4033312, -1);
						cm.gainItem(4000659, -1);
						cm.sendOk("���Ͻô� ������ �����Ű���?");
					} else {
						cm.sendOk("�˼������� �κ��丮 ������ ������� ������ �� ���׿�. �κ��丮 ������ ����ּ���.");
					}
				} else {
					cm.sendOk("��ᰡ �����մϴ�.");
				}
				cm.dispose();
			} else if (selection == 18) {
				if (cm.haveItem(4000440, 550)) {
					if (cm.canHold(1032101)) {
						cm.gainItem(1032101, 1, true); //���ν� ���׾� �̾
						cm.gainItem(4000440, -550);
						cm.sendOk("���Ͻô� ������ �����Ű���?");
					} else {
						cm.sendOk("�˼������� �κ��丮 ������ ������� ������ �� ���׿�. �κ��丮 ������ ����ּ���.");
					}
				} else {
					cm.sendOk("#b#v 4000440##k ���� ��ᰡ �����ؿ�");
				}
				cm.dispose();
			} else if (selection == 17) {
				if (cm.haveItem(4000180, 550) && cm.haveItem(4000181, 550)) {
					if (cm.canHold(1022123)) {
						//cm.gainhorong(1022123);
						cm.gainItem(1022123, 1, true); //��Ÿ�� ���Ȱ�
						cm.gainItem(4000180, -550);
						cm.gainItem(4000181, -550);
						cm.sendOk("���Ͻô� ������ �����Ű���?");
					} else {
						cm.sendOk("�˼������� �κ��丮 ������ ������� ������ �� ���׿�. �κ��丮 ������ ����ּ���.");
					}
				} else {
					cm.sendOk("#b#v 4000180# #v 4000181##k ���� ��ᰡ �����ؿ�");
				}
				cm.dispose();
			} else if (selection == 16) {
				if (cm.haveItem(4000458, 300)) {
					if (cm.canHold(1112594)) {
						cm.gainItem(1112594, 1); //���� ������ ����
						cm.gainItem(4000458, -300);
						cm.sendOk("���Ͻô� ������ �����Ű���?");
					} else {
						cm.sendOk("�˼������� �κ��丮 ������ ������� ������ �� ���׿�. �κ��丮 ������ ����ּ���.");
					}
				} else {
					cm.sendOk("#b#v 4000458##k ���� ��ᰡ �����ؿ�");
				}
				cm.dispose();
			}
		}
	}
}

