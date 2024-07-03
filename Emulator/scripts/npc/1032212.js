/* 마피아 맵 전용 엔피시 입니다. */
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
	if(cm.getPlayer().getMapId() != 234567896) {
	cm.dispose(); return;
	}
	map = cm.getClient().getChannelServer().getMapFactory().getMap(234567899);
	names = map.names.split(",");
		if(cm.getPlayer().isDead) {
			cm.dispose(); return;
		}
			if(cm.getPlayer().isMapiaVote) {
					for(a=0;a<names;a++) {
					 try {
						if(cm.getClient().getChannelServer().getPlayerStorage().getCharacterByName(names[a]).getmapiavote == 1) {
						cm.sendOk("이미 팀원이 지목을하여 더이상 지목하실 수 없습니다."); cm.dispose(); return;
						}
					}catch(e){					
					}
					}
				var text = "암살하고 싶은 사람을 선택 해 주세요.\r\n";
					for(i=0;i< names.length; i++) {
					try {
						if(cm.getClient().getChannelServer().getPlayerStorage().getCharacterByName(names[i]).mapiajob != "마피아") {
							text += "#L"+i+"##b"+names[i]+"#k";
						}
						if(cm.getClient().getChannelServer().getPlayerStorage().getCharacterByName(names[i]).isDead) {
							text += "[사망]#l\r\n";
						} else {
							text += "#l\r\n";
						}
					}catch(e){
						text += "";
					}
					}
			} else {
				cm.sendOk("이미 지목을 하셔서 지목하실 수 없습니다.");
				cm.dispose(); return;
			}
			cm.sendSimple(text);
    } else if(status == 1) {
	sel = selection;
	if(cm.getClient().getChannelServer().getPlayerStorage().getCharacterByName(names[sel]).isDead) {
		cm.sendOk("사망한 사람은 지목할 수 없습니다."); cm.dispose(); return;
	} else {
		cm.sendYesNo("정말 #b"+names[sel]+"#k님 을(를) 지목하시겠습니까? 한번 지목하시면 나머지 팀원들도 지목할 수 없습니다.");
	}
    } else if(status == 2) {
	if(cm.getPlayer().isMapiaVote) {
		cm.getClient().getChannelServer().getPlayerStorage().getCharacterByName(names[sel]).getmapiavote = 1;
		cm.getPlayer().isMapiaVote = false;
		map.broadcastMessage(MainPacketCreator.serverNotice(5, cm.getPlayer().getName()+"님이 "+names[sel]+"님을 지목하셨습니다."));
		cm.sendOk("지목을 완료하였습니다.");
		cm.dispose(); return;
	} else {
		cm.sendOk("당신은 지목하실 수 없습니다.");
		cm.dispose(); return;
	}
    }
}