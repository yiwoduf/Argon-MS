


/*
 
 ���� �¶��� �ҽ� ���� ��ũ��Ʈ �Դϴ�.
 
 ���� : Ƽ��
 
 ���ǽþ��̵� : 
 
 ���ǽ� �̸� :
 
 ���ǽð� �ִ� �� : ���ʼ�ž
 
 ���ǽ� ���� : 
 
 
 */


var status = -1;
var map = 300030310;
var exit = 300030300;
importPackage(java.util);
importPackage(Packages.tools);
importPackage(Packages.server.quest);
importPackage(java.awt);
importPackage(java.lang);
importPackage(Packages.tools.RandomStream);
importPackage(Packages.packet.creators);
importPackage(Packages.server.life);

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1 || mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    }

    if (status == 0) {
        cm.sendSimple("���� ���Դϴ�! �ű׳ʽ��� ���� ���� ���� �츮�μ��� ����� ������ �����մϴ�!\r\n#b#L0#�ű׳ʽ� (�븻 / ���� : 160�̻�)#l \r\n\r\n#b#L1#�ű׳ʽ� (�ϵ� / ���� : 160�̻�)#l#k")
    } else if (status == 1) {
        if (selection == 0) {
            if (cm.getPlayer().getParty() != null) {
                if (!cm.allMembersHere()) {
                    cm.getPlayer().message(5, "��Ƽ���� ��� ���־�� ������ �� �ֽ��ϴ�.");
                }
                if (!cm.isLeader()) {
                    cm.getPlayer().message(5, "��Ƽ���� ������ �� �ֽ��ϴ�.");
                }
                if (cm.getPlayerCount(401060100) != 0) {
                    cm.sendOk("�̹� �ȿ� �������ֽ��ϴ�.");
                    cm.dispose();
                }
                cm.getPlayer().setKeyValue2("BossData5", count + 1);
		cm.resetMap(401060100);
                cm.warpParty(401060100);
                cm.scheduleTimeMoveMap(401060100, 401060100, 3600, true);
                cm.getPlayer().getMap().spawnMonsterOnGroundMaple(Packages.server.life.MapleLifeProvider.getMonster(8880000), new java.awt.Point(2886, -1347));

                cm.mapMessage(6, "[�˸�] ���� ���̵� Ÿ�Ӿƿ��Ŵ��� - �ű׳ʽ� (�븻) - �۵��Ǿ����ϴ�. ����� ���ϴ�!");

                cm.mapMessage(5, "[���] ���� ���̵尡 ���۵Ǿ� ���� ä�ο� ���� ���� ��Ÿ���� ���۵˴ϴ�.");
            } else {
                if (cm.getPlayerCount(401060100) != 0) {
                    cm.sendOk("�̹� �ȿ� �������ֽ��ϴ�.");
                    cm.dispose();
                }
                cm.allExpSetTimeValueCurrent("Meg_BattleStartTime");
		cm.resetMap(401060100);
                cm.warp(401060100);

                cm.scheduleTimeMoveMap(401060100, 401060100, 3600, true);
                cm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeProvider.getMonster(8880000), new java.awt.Point(2886, -1347));

                cm.mapMessage(6, "[�˸�] ���� ���̵� Ÿ�Ӿƿ��Ŵ��� - �ű׳ʽ� (�븻) - �۵��Ǿ����ϴ�. ����� ���ϴ�!");

                cm.mapMessage(5, "[���] ���� ���̵尡 ���۵Ǿ� ���� ä�ο� ���� ���� ��Ÿ���� ���۵˴ϴ�.");
            }
            cm.dispose();
        } else {
            cm.dispose();
        }
        if (selection == 1) {
            if (cm.getPlayer().getParty() != null) {
                if (!cm.allMembersHere()) {
                    cm.getPlayer().message(5, "��Ƽ���� ��� ���־�� ������ �� �ֽ��ϴ�.");
                }
                if (!cm.isLeader()) {
                    cm.getPlayer().message(5, "��Ƽ���� ������ �� �ֽ��ϴ�.");
                }
                if (cm.getPlayerCount(401060200) != 0) {
                    cm.sendOk("�̹� �ȿ� �������ֽ��ϴ�.");
                    cm.dispose();
                }
                cm.allExpSetTimeValueCurrent("Meg1_BattleStartTime");
		cm.resetMap(401060200);
                cm.warpParty(401060200);
                cm.scheduleTimeMoveMap(401060200, 401060200, 3600, true);
                cm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeProvider.getMonster(8880002), new java.awt.Point(2886, -1347));

                cm.mapMessage(6, "[�˸�] ���� ���̵� Ÿ�Ӿƿ��Ŵ��� - �ű׳ʽ� (�ϵ�) - �۵��Ǿ����ϴ�. ����� ���ϴ�!");

                cm.mapMessage(5, "[���] ���� ���̵尡 ���۵Ǿ� ���� ä�ο� ���� ���� ��Ÿ���� ���۵˴ϴ�.");
            } else {
                if (cm.getPlayerCount(401060200) != 0) {
                    cm.sendOk("�̹� �ȿ� �������ֽ��ϴ�.");
                    cm.dispose();
                }
                cm.allExpSetTimeValueCurrent("Meg1_BattleStartTime");
		cm.resetMap(401060200);
                cm.warp(401060200);
                cm.scheduleTimeMoveMap(401060200, 401060200, 3600, true);
                cm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeProvider.getMonster(8880002), new java.awt.Point(2886, -1347));


                cm.mapMessage(6, "[�˸�] ���� ���̵� Ÿ�Ӿƿ��Ŵ��� - �ű׳ʽ� (�ϵ�) - �۵��Ǿ����ϴ�. ����� ���ϴ�!");

                cm.mapMessage(5, "[���] ���� ���̵尡 ���۵Ǿ� ���� ä�ο� ���� ���� ��Ÿ���� ���۵˴ϴ�.");
            }
            cm.dispose();
        } else {
            cm.dispose();
        }
    }
}


