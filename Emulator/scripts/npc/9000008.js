var status = 0;
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode === 1 && type !== 1) {
        status++;
    } else {
        if (type === 1 && mode === 1) {
            status++;
        } else if (type === 1 && mode === 0) {
            status++;
        } else {
            cm.dispose();
            return;
        }
    }
    if (status === 0) {
        cm.sendSimple("#b�ȳ��ϼ��� ����Ʈ  #r���, ����������#r �� �ð��ִ�#l\r\n #b���ǽ�#b �Դϴ�#l\r\n #d�����������̶� ���δٸ� ��� 1VS1���� ������ ���廡�� ������� �¸��մϴ�#l\r\n #r���� #i1112260# ���� 1000 ���� 800#r #l\r\n  #r���� ! �ٸ���尡 ������������ �����ִ� ������ ���ѱ�ϴ�#r #l\r\n  #r���� ! ���� �� 10������ ������ ���� ���׽��ϴ� 10���ٱ����� �ʿ��� �����ø�˴ϴ�#d #l\r\n #fn����# #L0##g����������#g��û�ϱ�#l\r\n");
    } else if (status === 1) {
        if (cm.getPlayer().getParty() === null)
            cm.sendOk("#r��Ƽ�� ������ּ���.");
        else if (!cm.isLeader())
            cm.sendOk("������ ��ȭ �����մϴ�.");
        else if (cm.getPlayer().getParty().getMembers().size() !== 1)
            cm.sendOk("#r3���� �𿩾� �մϴ�.");
        else if (!cm.allMembersHere())
            cm.sendOk("#r��� �� �ʿ� �𿩾��մϴ�,");
        else if (cm.getPlayer().getClient().getChannel() !== 0)
            cm.sendOk("#r1ä�θ� �����մϴ�.");
        else {
            guildid = cm.getPlayer().getGuildId();
            h = cm.getC().getChannelServer().getPartyMembers(cm.getParty()).iterator();
            while (h.hasNext()) {
                if (h.next().getGuildId() !== guildid) {
                    cm.sendOk("#r���� �� ���ƾߵ�.");
                    cm.dispose();
                    return;
                }
            }
            if (Packages.launch.Start.guildpvp.size() === 0) {
                cm.allPartyWarp(980000100, true);
                cm.sendOk("#r�������� ���� �ٸ���尡 �����Ҷ����� ��ٷ��ּ���.");
            } else {
                if (cm.getPlayer().getClient().getChannelServer().getMapFactory().getMap(980000100).getCharacters().size() === 0) {
                    f = cm.getPlayer().getClient().getChannelServer().getMapFactory().getMap(980000100).getCharacters().iterator();
                    if (f.hasNext()) {
                        b = f.next();
                        b.warp(100000000);
                    }
                    cm.allPartyWarp(980000100, true);
                    cm.sendOk("#r�������� ���� �ٸ���尡 �����Ҷ����� ��ٷ��ּ���.");
                } else {
                    
                    cm.allPartyWarp(980000100, true);
                    var b = new Array();
                    for (var i = 0; i < cm.getPlayer().getMap().getCharacters().size(); i++) {
                        b.push(cm.getPlayer().getMap().getCharacters().get(i));
                    }
                    cm.warp(940020000);
                    for (var i in b) {
                        if (b[i].getParty().getLeader().getId() === b[i].getId())
                
                        b[i].changeMap(cm.getPlayer().getMap(), cm.getPlayer().getMap().getPortal(0));
                    }
                    cm.spawnMob(9500007, 2159, 29);
                    Packages.launch.Start.fucking.clear();
                    Packages.launch.Start.guildpvp.clear();
                }
            }
        }
        cm.dispose();
    }
}