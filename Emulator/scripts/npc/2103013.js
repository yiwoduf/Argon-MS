importPackage(java.lang);
importPackage(Packages.launch.world);
importPackage(Packages.packet.creators);
importPackage(Packages.tools);
var status = -1;
var mob = [9305504, 9305504, 9305504, 9305504, 9305401, 9305401, 9305401, 9305410, 9305410, 9305410, 9305408, 9305402, 9305402, 9305402, 9305406, 9305406, 9305406, 2600118, 2600118]
var mcount = [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 25, 25, 25, 25, 25, 25, 25, 2]
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var stage = 0;
    if (mode == -1) {
        cm.dispose();
        return;
    }
    if (mode == 0) {
        status--;
    }
    if (mode == 1) {
        status++;
    }

    if (status == 0) {
        if (cm.getPlayer().getMapId() == 926010000) {
            cm.sendSimple("���� ��Ʈ���� �Ƕ�̵带 ��Ű�� �ξ�Ʈ��� �ϳ�.\r\n\r\n#L0##b#e �Ƕ�̵�� ����");
        } else {
            cm.warp(926010000);
            cm.dispose();
        }
    } else if (status == 1) {
        if (selection == 0) {
            if (cm.getPlayer().getParty() == null) {
                cm.sendOk("��Ƽ�� �����Ͻ� �� ���� ��û�� �ϰԳ�");
                cm.dispose();
            } else if (!cm.isLeader()) {
                cm.sendOk("��Ƽ�常 ���� ��û�� �Ͻ� �� �ֽ��ϴ�.");
                cm.dispose();
            } else if (!cm.allMembersHere()) {
                cm.sendOk("��Ƽ�� ������ �� ���� �� �־�� �մϴ�.");
                cm.dispose();
            } else if (cm.getPlayerCount(926010300) > 0) {
                cm.sendOk("�̹� �ٸ� ��Ƽ�� �Ƕ�̵忡 �����ϰ� �ֽ��ϴ�");
                cm.dispose();
            } else {
                chr = cm.getPlayer();
                cm.getPlayer().getClient().getChannelServer().getMapFactory().getMap(926010300).killAllMonsters(false);
                var count = 0;
                cm.allPartyWarp(926010300, false);
                if (count == 0) {
                    cm.getPlayer().send(UIPacket.showInfo("�Ƕ�̵忡 �����ϼ̽��ϴ�."));
                    Thread.sleep(1000);
                }
                Thread.sleep(2000);
                cm.showEffect(true, "Gstar/start");
                Thread.sleep(700);
                var schedule = Timer.EtcTimer.getInstance().register(function () {
                    if (chr != cm.getPlayer() || cm.getPlayer().getMapId() != 926010300) {
                        cm.getPlayer().getClient().getChannelServer().getMapFactory().getMap(926010300).killAllMonsters(false);
                        cm.dispose();
                        return;
                    }
                    var infocount = 0;
                    if (count < mcount[stage] && stage <= 19) {
                        if (stage != 19) {
                            cm.spawnMob(mob[stage], 983, 157)
                        }
                        cm.spawnMob(mob[stage], 983, -23)
                        if (stage != 19) {
                            cm.spawnMob(mob[stage], 983, -203)
                        }
                        cm.spawnMob(mob[stage], 983, -383)
                        count++;
                    }
                    if (stage >= 19) {
                        cm.allPartyWarp(926010300, false);
                        cm.getPlayer().send(UIPacket.showInfo("��� ���̺긦 �����ϼ̽��ϴ�."));
                        cm.sendOk("���ĿϷ�~");
                        schedule.cancel(true);
                    }
                    if (cm.getMonsterCount(cm.getPlayer().getMapId()) == 0 && infocount == 0 && stage < 19) {
                        cm.getPlayer().send(UIPacket.showInfo("���̺긦 �����ϼ̽��ϴ�. ���� ���̺긦 �غ��� �ּ���."));
                        count = 0;
                        infocount++;
                        stage++;
                        Thread.sleep(2000);
                        cm.showEffect(true, "Gstar/start");
                        cm.getPlayer().dropMessage(5, "" + stage + "�ܰ� ������ �����մϴ�.");
                        Thread.sleep(1000);
                    }
                    if (cm.getPlayer().getParty() == null) {
                        cm.warp(926010000);
                    }
                }, 1000);

                cm.dispose();
            }
        } else if (selection == 1) {
        }
    }
}
