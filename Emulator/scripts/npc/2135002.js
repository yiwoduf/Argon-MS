importPackage(Packages.constants);

var status = -1;

var howmuch = 30000; // ȯ������Ʈ
var item = 2431838; // �������ڵ� 
var itemqty = 1000; // �����۰���
var job = [122];

function start() {
    status = -1;
    action (1, 0, 0);
}

function action(mode, type, selection) {
  
    if (mode == 1) {
        status++;
    } else {
	cm.dispose();
	return;
    }
    if (status == 0) {
        var chat = "  #fn������� Extrabold#"+ServerConstants.serverName+"�� ���� �ý��� (Reinstatement System) �Դϴ�.\r\n\r\n";
        chat += "---------------------------------------------------------------------------------\r\n\r\n";
        chat += "#r�� ȯ������Ʈ  "+howmuch+" ��, #v"+item+"# #z"+item+"# �� "+itemqty+" �� �ʿ��մϴ�.#k\r\n";
        chat += "#b�� #h0# ���� ȯ������Ʈ�� "+cm.getPlayer().getGP()+" �� �Դϴ�.#k\r\n\r\n";
        chat += "---------------------------------------------------------------------------------\r\n";
        chat += "#L0##d ���� ��ũ�ȶ������ ������ �����ϰڽ��ϴ�.#k#l\r\n\r\n";
        chat += "---------------------------------------------------------------------------------\r\n";
        cm.sendSimple(chat);

    } else if (status == 1) {
        if (cm.getPlayer().getGP() < howmuch || "+cm.getItemQuantity(item)+" < itemqty) {
            cm.sendOk("#fn������� Extrabold#* ������ �ƽ����� �����߽��ϴ�.\r\n#r�� ���� #h0# ���� #v"+item+"# #z2431838#�� "+cm.itemQuantity(4310064)+" ���� �������Դϴ�.#k\r\n#b�� ���� #h0# ���� ȯ������Ʈ�� "+cm.getGP()+" ����Ʈ �Դϴ�.");
            cm.dispose();
            return;
        }

        var it = cm.getPlayer().getSkills().keySet().iterator();
        var resetskill = [];
        var i = 0;
        while (it.hasNext()) {
            var lskill = it.next();
            if (lskill.getId() >= 80000000) {
                continue;
            }
            resetskill[i] = lskill.getId();
            i++;
        }

        for (var j = 0; j < resetskill.length; j ++) {
            cm.getPlayer().changeSkillLevel(resetskill[j], 0, 0);
        }
        cm.haveItem(2431838, 500);
        cm.resetStats(4, 4, 4, 4);
        cm.changeJob(job[selection]);
        cm.getPlayer().gainGP(-howmuch);
        cm.gainItem(item, -itemqty);
        cm.sendOk("#fn������� Extrabold##r�� ������ ���������� �Ϸ�Ǿ����ϴ�.#k\r\n#b�� @��ų�����ͷ� ��ų�� ��� �������ּ���.#k");
        cm.dispose();
        } else {
        cm.sendOk("#fn������� Extrabold#��ᰡ �����մϴ�.");
        cm.dispose();

	}
}