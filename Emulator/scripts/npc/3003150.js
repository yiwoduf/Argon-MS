var status = -1;
���� = "#fUI/GuildMark.img/Mark/Pattern/00004001/1#"
���� = "#fUI/GuildMark.img/Mark/Pattern/00004001/11#"
���� = "#fUI/GuildMark.img/Mark/Pattern/00004001/8#"
���� = "#fUI/GuildMark.img/Mark/Pattern/00004001/13#"
��ȸ = "#fUI/GuildMark.img/Mark/Pattern/00004001/15#"

importPackage(Packages.constants);

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
	var chat = " #fn������� Extrabold##d[#h #]#k : "+ServerConstants.serverName+"���� ������ �����غ���?\r\n  �Ʒ��� ���û����� �ϳ��� �����.\r\n";
	chat += "#L1#"+����+"#r  ���� vs ���̾��� �����?\r\n";
	chat += "#L2#"+����+"#b  ����ã��#k�� �÷��� �ϰھ�.\r\n";
	chat += "#L3#"+����+"#d  ��Ӹ�������#k�� ������ �����ϰھ�.\r\n";
	chat += "#L4#"+��ȸ+"#Cgray#  ����������#k ������ �����ϰھ�.\r\n";
	chat += "#L5#"+����+"#d  �Ŀ�����Ʈ#k�� ������ �����ϰھ�.\r\n";
	cm.sendSimpleS(chat,2);

     } else if (status == 1) {

	if (selection == 1) {
	cm.dispose();
	cm.openNpc(1540850);

    } else if (selection == 2) {
	cm.dispose();
	cm.openNpc(9000194);
    } else if (selection == 3) {
	cm.dispose();
	cm.openNpc(3003246);

    } else if (selection == 4) {
	cm.dispose();
	cm.openNpc(9000019);

    } else if (selection == 5) {
	cm.dispose();
	cm.openNpc(9250000);

			}
		}
	}
}