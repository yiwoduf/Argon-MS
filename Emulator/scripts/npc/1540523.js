var status = -1;

function start() {
    status = -1;
    action (1, 0, 0);
}

function action(mode, type, selection) {
    
    howmuch = 30000 // ȯ������Ʈ
    item = 2431838; // �������ڵ� 
    itemqty = 1000; // �����۰���
    job = [13100, 5112];
  
    if (mode == 1) {
        status++;
    } else {
	cm.dispose();
	return;
    }
    if (status == 0) {
       cm.sendSimple("ȯ���� �ŵ��Ͽ� #b������ ��#k�� ���� �ڿ��� Ư���� �������� ������ �ϰ� �� ����...\r\n\r\n#L0# ��ũ��(#bȯ��3��#k,#b���̳�����1000��#k)#l\r\n#L1# ������((#bȯ��3��#k,#b���̳�����1000��#k)")
    } else if (status == 1) {
       if (cm.getPlayer().getGP() < howmuch || cm.getItemQuantity(item) < itemqty) {
           cm.sendOk("������ �ϱ� ���� ����Ʈ�� �������� �����ϳ�..");
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
        cm.resetStats(4, 4, 4, 4);
        cm.changeJob(job[selection]);
        cm.getPlayer().gainGP(-howmuch);
        cm.gainItem(item,-itemqty);
        cm.sendOk("������ �Ϸ�Ǿ��ٳ�.\r\n#b@��ų������#k�� ��ų�� �������ϰԳ�.");
        cm.dispose();
    }
}