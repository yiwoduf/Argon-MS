importPackage(Packages.constants);
importPackage(Packages.client.items);

var status = -1;

var ȯ�� = 20000; // ȯ������Ʈ
var ������ = 2431838; // �������ڵ�
var ���� = 5000; // ����
var ���� = 13100; // �����ڵ�

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
        var chat = "  #fn������� Extrabold#"+ServerConstants.serverName+"�� ���� �ý��� (Reinstatement System) �Դϴ�.\r\n\r\n";
        chat += "---------------------------------------------------------------------------------\r\n\r\n";
        chat += "#r�� ȯ������Ʈ  "+ȯ��+" ��, #v"+������+"# #z"+������+"# �� "+����+" �� �ʿ��մϴ�.#k\r\n";
        chat += "#b�� #h0# ���� ȯ������Ʈ�� "+cm.getPlayer().getGP()+" �� �Դϴ�.#k\r\n\r\n";
        chat += "---------------------------------------------------------------------------------\r\n";
        chat += "#L0##d ���� ��ũ������ ������ �����ϰڽ��ϴ�.#k#l\r\n\r\n";
        chat += "---------------------------------------------------------------------------------\r\n";
        cm.sendSimple(chat);

     } else if (status == 1) {
        if (cm.getPlayer().getGP() >= ȯ��) {
	  if (cm.haveItem(������, ����)) {
	  cm.getPlayer().gainGP(-ȯ��);
          cm.gainItem(������, -����);
          cm.changeJob(����);
	  cm.sendOk("#fn������� Extrabold##b* �����̼��������� �Ϸ��Ͽ����ϴ�.");
	  cm.dispose();
	  } else {
	  cm.sendOk("#fn������� Extrabold##r* ��ᰡ �����Ͽ� �����Ͽ����ϴ�.");
	  cm.dispose();

				}
			}
		}
	}
}
