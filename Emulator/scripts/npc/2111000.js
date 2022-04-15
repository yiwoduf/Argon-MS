
/* 이 엔피시는 아침맵 전용 엔피시 입니다. */

importPackage(Packages.launch.world);
importPackage(Packages.packet.creators);
importPackage(java.util);
importPackage(java.lang);

var status = -1;

function start() {
    status = -1;
    action (1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
        return;
    }
    if (mode == 0 && status == 0) {
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
	if(cm.getPlayer().getMapId() != 234567899) {
	cm.dispose(); return;
	}
	map = cm.getClient().getChannelServer().getMapFactory().getMap(234567899);
	if(map.nightnumber == 0) {
		cm.sendOk("첫날엔 투표를 할 수가 없네..");
		cm.dispose(); return;
	}
		if(cm.getPlayer().isDead) {
			cm.dispose(); return;
		}
			if(cm.getPlayer().isVoting) {
			names = map.names.split(",");
				var text = "처형 시키고 싶은 사람을 선택해 보게나...\r\n";
					for(i=0;i< names.length; i++) {
						text += "#L"+i+"##b"+names[i]+"#k";
					try { 
						if(cm.getClient().getChannelServer().getPlayerStorage().getCharacterByName(names[i]).isDead) {
							text += "[사망]#l\r\n";
						} else {
							text += "#l\r\n";
						}
					} catch(e) {
					}
					}
			} else {
				cm.sendOk("현재는 투표시간이 아니라 투표할 수가 없다네.");
				cm.dispose(); return;
			}
			cm.sendSimple(text);
    } else if(status == 1) {
	sel = selection;
	if(cm.getClient().getChannelServer().getPlayerStorage().getCharacterByName(names[sel]).isDead) {
		cm.sendOk("사망한 사람을 선택할수는 없네."); cm.dispose(); return;
	} else {
		cm.sendYesNo("정말 #b"+names[sel]+"#k 을(를) 선택하겠나? 혹시 무고한 자를 죽음으로 내몰아가는건 아닌지 잘 생각해보게.");
	}
    } else if(status == 2) {
	if(cm.getPlayer().isVoting) {
		cm.getClient().getChannelServer().getPlayerStorage().getCharacterByName(names[sel]).voteamount += 1;
		cm.getPlayer().isVoting = false;
		map.broadcastMessage(MainPacketCreator.serverNotice(5, names[sel]+"님이 한표를 받으셨습니다."));
		cm.sendOk("정상적으로 처리되었네.");
		cm.dispose(); return;
	} else {
		cm.sendOk("자넨 투표권이 없네만..");
		cm.dispose(); return;
	}
    }
}