var status;
function start() {
    status = -1;
    action(1, 1, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        cm.dispose();
        return;
    }
    if (status == 0) {
        cm.sendYesNo("#e<���츦 �ع�����ּ���!>#n\r\n\r\n#bStage.1 #fUI/UIWindow2.img/MobGage/Mob/8240097# �̺��� ����    \r\nStage.2 #fUI/UIWindow2.img/MobGage/Mob/8240098# ��� ����     \r\nStage.3 #fUI/UIWindow2.img/MobGage/Mob/8240099# ������ ����\r\n\r\n#k#e<ȹ�������>#n#k\r\n\r\n#b#z4033076# (6~22��)");
    } else if (status == 1) {
        if (cm.getPlayer().getParty() != null) {
            if (cm.getPlayerCount(350060160) > 1 || cm.getPlayerCount(350060180) > 1 || cm.getPlayerCount(350060200) > 1) {
                cm.sendOk("���� ���쿡 ���� ���� ��Ƽ�� �ֽ��ϴ�.");
                cm.dispose();
            } else {
                cm.resetMap(350060160);
                cm.resetMap(350060180);
                cm.resetMap(350060200);
                em = cm.getEventManager("Swoo");
                eim = em.readyInstance();
                eim.setProperty("Stage", "0");
                eim.setProperty("nextWarp", "false");
                eim.setProperty("Global_MinPerson", cm.getParty().getMembers().size());
                eim.registerParty(cm.getParty(), cm.getMap());
                cm.dispose();
            }
        } else {
            cm.sendOk("��Ƽ�� ����� �ֽñ� �ٶ��ϴ�.");
            cm.dispose();
        }
    }
}