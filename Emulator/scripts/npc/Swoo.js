var status;
function start() {
    status = -1;
    action(1, 1, 0);
}

function action(mode, type, selection) {

    datecheck = true, 1540446;
    levelcheck = true, 1540446;
    pcount = true, 1540446;

    setting = [["HardSwoo", [350060170, 350060190, 350060210]], ["Swoo", [350060160, 350060180, 350060200]]]

    if (mode == 1) {
        status++;
    } else {
        cm.dispose();
        return;
    }
    if (status == 0) {
        cm.sendSpirit("���츦 �����߸��� ���� ����� �ھ�� �̵��ұ�?\r\n"
                + "#L0#����� �ھ�(�ϵ���)�� �̵��Ѵ�.(���� 190�̻�)\r\n"
                + "#L1#����� �ھ�(�븻���)�� �̵��Ѵ�.(���� 190�̻�)\r\n"
                + "#L2#�̵����� �ʴ´�.", true, 1540446)
    } else if (status == 1) {
        if (selection != 2) {
            if (cm.getPlayer().getParty() == null) {
                cm.sendSpirit("1���̻��� ��Ƽ�� ������ �����մϴ�.", false, 1540446);
                cm.dispose();
            } else if (!cm.isLeader) {
                cm.sendSpirit("��Ƽ�常 ������ ��û�Ͻ� �� �ֽ��ϴ�.", false, 1540446);
                cm.dispose();
            } else {
                for (i = 0; i < cm.getPartyMembers().size(); i++) {
                    target = cm.getClient().getChannelServer().getPlayerStorage().getCharacterByName(cm.getPlayer().getParty().getMembers().get(i).getName())
                    if (target.getDateKey(setting[selection][0]) == null) {
                        target.setDateKey(setting[selection][0], 3);
                    }
                    if (target.getDateKey(setting[selection][0]) <= 0) {
                        datecheck = false
                    }
                    if (target.getLevel() < 190) {
                        levelcheck = false
                    }
                }
                if (!datecheck) {
                    cm.sendSpirit("���� �̹� ���츦 3�� �����Ͻ� ��Ƽ���� �ֽ��ϴ�.", false, 1540446);
                    cm.dispose();
                    return;
                } else if (!levelcheck) {
                    cm.sendSpirit("���츦 �����ϱ� ���� ������ ������ ��Ƽ���� �ֽ��ϴ�.", false, 1540446);
                    cm.dispose();
                } else {
                    for (i = 0; i < setting[selection][1].length; i++) {
                        if (cm.getPlayerCount(setting[selection][1][i]) >= 1) {
                            pcount = false
                        } else {
                            cm.resetMap(setting[selection][1][i]);
                        }
                    }
                    if (!pcount) {
                        cm.sendSpirit("�������� �̹� ���쿡 �����ϰ� �ֽ��ϴ�.", false, 1540446);
                        cm.dispose();
                    } else {
                        for (i = 0; i < cm.getPartyMembers().size(); i++) {
                            target = cm.getClient().getChannelServer().getPlayerStorage().getCharacterByName(cm.getPlayer().getParty().getMembers().get(i).getName())
                            target.setDateKey(setting[selection][0], target.getDateKey(setting[selection][0]) - 1);
                        }
                        em = cm.getEventManager(setting[selection][0]);
                        eim = em.readyInstance();
                        eim.setProperty("Stage", "0");
                        eim.setProperty("nextWarp", "false");
                        eim.setProperty("Global_MinPerson", cm.getParty().getMembers().size());
                        eim.registerParty(cm.getParty(), cm.getMap());
                        cm.dispose();
                    }
                }
            }
        } else {
            cm.dispose();
        }
    }
}