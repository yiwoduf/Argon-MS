/*
�� ��ũ��Ʈ�� ���۱��� FoxDevelopTeam ���� Fox���� �ֽ��ϴ�.
���� : rinus_alt / fox_devel@nate.com / opharks (skype)
*/

importPackage(Packages.client);
importPackage(Packages.constants);

var status = 0;
var select = -1;

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
			//cm.showWZEffect("UI/SoulUI.img/DungeonEffect/start", 1);
			var raid = "#r#e[������ : �������̵�]\r\n";
			raid += "#n#k�־�� �ð� ��, ��� ������ ����� �������Դϴ�.\r\n\r\n"
			raid += "#e[���̵� ����]\r\n"
			raid += "#L1##fUI/UIToolTip/Item/Equip/Star/Star0##l"
			raid += "#L2##fUI/UIToolTip/Item/Equip/Star/Star##fUI/UIToolTip/Item/Equip/Star/Star##l"
			raid += "#L3##fUI/UIToolTip/Item/Equip/Star/Star##fUI/UIToolTip/Item/Equip/Star/Star##fUI/UIToolTip/Item/Equip/Star/Star##l"
			raid += "#L4##fUI/UIToolTip/Item/Equip/Star/Star1##fUI/UIToolTip/Item/Equip/Star/Star1##fUI/UIToolTip/Item/Equip/Star/Star1##fUI/UIToolTip/Item/Equip/Star/Star1##l"
			cm.sendSimple(raid);
		} else if (status == 1) {
			var easy = "#r#e[�������̵� : ";
			if (selection == 1) {
				easy += "����]#k#n\r\n"
				easy += "#fUI/UIToolTip/Item/Equip/Star/Star0#(����) ���̵��� �����Ͻðڽ��ϱ�?\r\n"
				easy += "�������̵�� #r���̵��� ������� 1�� 3ȸ#k�� ���ѵ˴ϴ�.\r\n"
				easy += "#L1##b�����Ѵ�"
				easy += "#L99#���������ʴ´�"
			} else if (selection == 2) {
				easy += "���]#k#n\r\n"
				easy += "#fUI/UIToolTip/Item/Equip/Star/Star##fUI/UIToolTip/Item/Equip/Star/Star#(����) ���̵��� �����Ͻðڽ��ϱ�?\r\n"
				easy += "�������̵�� #r���̵��� ������� 1�� 3ȸ#k�� ���ѵ˴ϴ�.\r\n"
				easy += "#L2##b�����Ѵ�"
				easy += "#L99#���������ʴ´�"
			} else if (selection == 3){
				easy += "�ϵ�]#k#n\r\n"
				easy += "#fUI/UIToolTip/Item/Equip/Star/Star##fUI/UIToolTip/Item/Equip/Star/Star##fUI/UIToolTip/Item/Equip/Star/Star#(�����) ���̵��� �����Ͻðڽ��ϱ�?\r\n"
				easy += "�������̵�� #r���̵��� ������� 1�� 3ȸ#k�� ���ѵ˴ϴ�.\r\n"
				easy += "#L3##b�����Ѵ�"
				easy += "#L99#���������ʴ´�"
			} else if (selection == 4) {
				easy += "����Ʈ�޾�]#k#n\r\n"
				easy += "#fUI/UIToolTip/Item/Equip/Star/Star1##fUI/UIToolTip/Item/Equip/Star/Star1##fUI/UIToolTip/Item/Equip/Star/Star1##fUI/UIToolTip/Item/Equip/Star/Star1#(�ſ� �����) ���̵��� �����Ͻðڽ��ϱ�?\r\n"
				easy += "�������̵�� #r���̵��� ������� 1�� 3ȸ#k�� ���ѵ˴ϴ�.\r\n"
				easy += "#L4##b�����Ѵ�"
				easy += "#L99#���������ʴ´�"
			}
				cm.sendSimple(easy);
		} else if (status == 2) {
			if (selection == 1) {
				cm.dispose();
			} else if (selection == 2) {
				cm.dispose();
			} else if (selection == 3) {
				cm.dispose();
			} else if (selection == 4) {
				cm.dispose();
			} else if (selection == 99) {
				cm.dispose();
			}
		}
	}
}