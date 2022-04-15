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
        cm.sendSimple("#b안녕하세요 스마트  #r길드, 반지대항전#r 을 맡고있는#l\r\n #b엔피시#b 입니다#l\r\n #d반지대항전이란 서로다른 길원 1VS1으로 월묘를 가장빨리 잡는팀이 승리합니다#l\r\n #r보상 #i1112260# 올텟 1000 공마 800#r #l\r\n  #r주의 ! 다른길드가 월묘를잡으면 갖고있던 반지를 빼앗깁니다#r #l\r\n  #r주의 ! 월묘 피 10조를다 깎으면 몹이 안죽습니다 10조다깎으면 맵에서 나오시면됩니다#d #l\r\n #fn돋움# #L0##g반지대항전#g신청하기#l\r\n");
    } else if (status === 1) {
        if (cm.getPlayer().getParty() === null)
            cm.sendOk("#r파티를 만들어주세요.");
        else if (!cm.isLeader())
            cm.sendOk("리더만 대화 가능합니다.");
        else if (cm.getPlayer().getParty().getMembers().size() !== 1)
            cm.sendOk("#r3명이 모여야 합니다.");
        else if (!cm.allMembersHere())
            cm.sendOk("#r모두 이 맵에 모여야합니다,");
        else if (cm.getPlayer().getClient().getChannel() !== 0)
            cm.sendOk("#r1채널만 가능합니다.");
        else {
            guildid = cm.getPlayer().getGuildId();
            h = cm.getC().getChannelServer().getPartyMembers(cm.getParty()).iterator();
            while (h.hasNext()) {
                if (h.next().getGuildId() !== guildid) {
                    cm.sendOk("#r길드는 다 같아야됨.");
                    cm.dispose();
                    return;
                }
            }
            if (Packages.launch.Start.guildpvp.size() === 0) {
                cm.allPartyWarp(980000100, true);
                cm.sendOk("#r대기방으로 입장 다른길드가 입장할때까지 기다려주세요.");
            } else {
                if (cm.getPlayer().getClient().getChannelServer().getMapFactory().getMap(980000100).getCharacters().size() === 0) {
                    f = cm.getPlayer().getClient().getChannelServer().getMapFactory().getMap(980000100).getCharacters().iterator();
                    if (f.hasNext()) {
                        b = f.next();
                        b.warp(100000000);
                    }
                    cm.allPartyWarp(980000100, true);
                    cm.sendOk("#r대기방으로 입장 다른길드가 입장할때까지 기다려주세요.");
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