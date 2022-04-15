var status = -1;

function action(mode, type, selection) {
    if (mode == 1 && type != 1) {
        status++;
    } else {
        if (type == 1 && mode == 1) {
            status++;
            selection = 1;
        } else if (type == 1 && mode == 0) {
            status++;
            selection = 0;
        } else {
            cm.dispose();
            return;
        }
    }
    mapid = cm.getPlayer().getMapId()
    switch (mapid) {
        case 926100203:
            {
                var em = cm.getEventManager("Romeo");
                if (em.getProperty("stage").equals("1") && em.getProperty("stage5").equals("0")) {
                   
                    em.setProperty("stage", "2");
                    cm.mapMessage(6, "#fn������� Extrabold#�������� �߾�Ÿ��� �����.");
                }
                cm.dispose();
                break;
            }
        case 926110203:
            {
                var em = cm.getEventManager("Juliet");
                if (em.getProperty("stage").equals("1") && em.getProperty("stage5").equals("0")) {
                    
                    em.setProperty("stage", "2");
                    cm.mapMessage(6, "#fn������� Extrabold#�������� �߾�Ÿ��� �����.");
                }
                cm.dispose();
                break;
            }
        case 926100401:
        case 926110401:
            {
                var em = cm.getEventManager(mapid == 926100401 ? "Romeo" : "Juliet");
                var eim = cm.getPlayer().getEventInstance();
                if (em.getProperty("summoned") == null || em.getProperty("summoned").equals("0")) {
                    if (em.getProperty("stage").equals("2")) {
                        if (status == 0) {
                            cm.sendSimple("#fn������� Extrabold#ŪŪŪ.. �̰͵� ������. �� ������ ������� �Ǳ⿡ �� ����. �������� �����ϰԳ�. �ڳ׵��̾� ���� �ְ��� �����а� ���ݼ��� ���յǴ� ���� ���� �Ŵϱ� ���̾�!!\r\n#b #L0#�����! ��Ŷ����� ����Ƽ�ƴ� ���� �Ϻ� �����̿���!!#l\r\n #L1#�����! ����� �����޵��� �����ְھ��.#l")
                        } else if (status == 1) {
                            if (selection == 0)
                                cm.sendNext("#fn������� Extrabold#�������, �� �˹� �ƴ���! ������� ���� ���� ������ ������� �� �ȶ��� �߰� ���� ����Ǿ� �ָ� �Ǵ°ž�!");
                            else if (selection == 1) {
                                cm.sendNext("#fn������� Extrabold#���� �����޵��� �����ְڴٰ�? �������? ����.. ����� �Ҹ� ������.");
                                cm.mapMessage(6, cm.getPlayer().getName() + " ���� ���濡 �����״� ������ ��鸮�� ����̴�.");
                                em.setProperty("persuade_urete", "1");
                            }
                        } else if (status == 2) {
                            cm.sendNext("#fn������� Extrabold#�� ���� ������� �ȶ��� ���ƶ�! ����! �����˽�Ÿ��!");
                        } else if (status == 3) {
                            mobId = 9300140;
                            var mob = em.getMonster(mobId);
                            eim.registerMonster(mob);
                            em.setProperty("summoned", "1");
                            cm.getPlayer().getMap().removeNpc(cm.getNpc());
                            eim.getMapInstance(mapid).spawnMonsterOnGroundBelow(mob, new java.awt.Point(240, 150));
                            cm.getPlayer().getMap().setSpawns(true);
                            cm.dispose();
                        }
                    } else {
                        mobId = 9300139;
                        var mob = em.getMonster(mobId);
                        eim.registerMonster(mob);
                        em.setProperty("summoned", "1");
                        eim.getMapInstance(mapid).spawnMonsterOnGroundBelow(mob, new java.awt.Point(240, 150));
                        cm.getPlayer().getMap().removeNpc(cm.getNpc());
                        cm.getPlayer().getMap().setSpawns(true);
                        cm.dispose();
                    }
                }
                break;
            }


    }

}
