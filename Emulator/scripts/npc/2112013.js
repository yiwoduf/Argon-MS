var status = -1;

function action(mode, type, selection) {
    var em = cm.getEventManager("Juliet");
    if (em == null) {
        cm.dispose();
        return;
    }
    if (!cm.canHold(4001131, 1)) {
        cm.sendOk("#fn������� Extrabold##r��Ÿâ�� ������ ��ĭ �ʿ��մϴ�.#k");
        cm.dispose();
        return;
    }
   /*if (cm.getPlayer().getMapId() == 926110203) { //just first stage
        var npc = cm.getPlayer().getMap().getNPCByOid(cm.getObjectId());
        if (npc.getPosition().distanceSq(cm.getPlayer().getPosition()) > 5000) {
            cm.sendOk("#fn������� Extrabold#�����ϱ⿡�� �ʹ� �ָ� �ִ�.");
            cm.dispose();
            return;
        }
        if (em.getProperty("stage5") == null || em.getProperty("stage5").equals("0")) {

            if (cm.getPlayer().hasGmLevel(6) && false) { // debug
                cm.getMap().setReactorState(cm.getPlayer().getPlayer().getId());
                cm.mapMessage(6, cm.getPlayer().getName() + " ���� ����ġ�� ������ Ư���� ��Ż�� ��Ÿ����.");
                cm.gainPartyExpPQ(10000, "rnj", 70);
                cm.clearEffect();
                em.setProperty("stage5", "1");
                cm.dispose();
                return;
            }
            } else if (em.getProperty("stage5_" + cm.getObjectId()).equals("2")) {
                cm.getMap().setReactorState(cm.getPlayer().getPlayer().getId());
                cm.mapMessage(6, cm.getPlayer().getName() + " ���� ����ġ�� ������ Ư���� ��Ż�� ��Ÿ����.");
                cm.gainPartyExpPQ(10000, "rnj", 70);
                cm.clearEffect();
                em.setProperty("stage5", "1");
            } else if (em.getProperty("stage5_" + cm.getObjectId()).equals("1")) {
                cm.sendOk("#fn������� Extrabold#�̹� ������ ���̴�.");
}
}*/

    if (cm.getPlayer().getMapId() == 926110000) { //just first stage
        var npc = cm.getPlayer().getMap().getNPCByOid(cm.getObjectId());
        if (npc.getPosition().distanceSq(cm.getPlayer().getPosition()) > 5000) {
            cm.sendOk("#fn������� Extrabold#�����ϱ⿡�� �ʹ� �ָ� �ִ�.");
            cm.dispose();
            return;
        }
        if (em.getProperty("stage1") == null || em.getProperty("stage1").equals("0")) {

            if (cm.getPlayer().hasGmLevel(6) && true){ // debug
                cm.getMap().setReactorState(cm.getPlayer().getClient());
                cm.mapMessage(6, cm.getPlayer().getName() + " ���� ����ġ�� ������ Ư���� ��Ż�� ��Ÿ����.");
                cm.gainPartyExpPQ(10000, "rnj", 70);
                cm.clearEffect();
                em.setProperty("stage1", "1");
                cm.dispose();
                return;
            }

            if (em.getProperty("stage1_" + cm.getObjectId()) == null) {
                em.setProperty("stage1_" + cm.getObjectId(), "1");
                var rand = Math.random();
                if (rand < 0.2) {
                    cm.sendOk("#fn������� Extrabold#����ġ�� ȹ�������� �ƹ��͵� ã���� ���ߴ�.");
                    cm.gainExpR(500);
                } else if (rand < 0.5) {
                    cm.sendOk("#fn������� Extrabold#500 �޼Ҹ� �߰��ߴ�.");
                    cm.gainMeso(500);
                } else {
                    cm.sendOk("#fn������� Extrabold#�ƹ��͵� ���� �� ����.");
                }
            } else if (em.getProperty("stage1_" + cm.getObjectId()).equals("0")) {
                em.setProperty("stage1_" + cm.getObjectId(), "1");
                var rand = Math.random();
                if (rand < 0.2) {
                    cm.sendOk("����ġ�� ȹ�������� �ƹ��͵� ã���� ���ߴ�.");
                    cm.gainExpR(500);
                } else if (rand < 0.5) {
                    cm.sendOk("#fn������� Extrabold#500 �޼Ҹ� �߰��ߴ�.");
                    cm.gainMeso(500);
                } else {
                    cm.sendOk("#fn������� Extrabold#�ƹ��͵� ���� �� ����.");
                }
            } else if (em.getProperty("stage1_" + cm.getObjectId()).equals("1")) {
                cm.sendOk("#fn������� Extrabold#�̹� ������ ���̴�.");
            } else if (em.getProperty("stage1_" + cm.getObjectId()).equals("2")) {
                cm.getMap().setReactorState(cm.getPlayer().getClient());
                cm.mapMessage(6, cm.getPlayer().getName() + "���� ����ġ�� ������ Ư���� ��Ż�� ��Ÿ����.");
                cm.gainPartyExpPQ(10000, "rnj", 70);
                cm.clearEffect();
                em.setProperty("stage1", "1");
            } else if (em.getProperty("stage1_" + cm.getObjectId()).equals("3")) {
                cm.gainItem(4001130, 1);
                cm.sendOk("#fn������� Extrabold#���� ������ �߰��ߴ�.");
                em.setProperty("stage1_" + cm.getObjectId(), "1");
            }
        } else {
            if (em.getProperty("stage1_" + cm.getObjectId()) != null && em.getProperty("stage1_" + cm.getObjectId()).equals("3")) {
                cm.gainItem(4001130, 1);
                cm.sendOk("#fn������� Extrabold#���� ������ �߰��ߴ�.");
                em.setProperty("stage1_" + cm.getObjectId(), "1");
            } else {
                cm.sendOk("#fn������� Extrabold#�̹� ���� ���������� ���� ��Ż�� �����ִ�.");
            }
        }
    }
    cm.dispose();
}