importPackage(java.lang);
importPackage(Packages.handling.world);
importPackage(Packages.packet.creators);


var points;
var status = -1;
var sel;
var level;


var arr = new Array(new Array(4001126,1000,1000), new Array(4001126,1000,1000));

/* 시작 */
function startQuest(event) {
    if (cm.getParty() != null) {
        if (cm.getDisconnected(event) != null && cm.getPartyMembers().size() >= 1) {
            cm.getDisconnected(event).registerPlayer(cm.getPlayer());
        } else if (cm.isLeader()) {
            var q = cm.getEventManager(event);
            if (q == null) {
                cm.sendOk("고객님 많이 당황하셨죠? 저도 보스레이드가 안돼서 많이 당황했답니다. 관리자에게 문의주세요.");
            } else {
                q.startInstance(cm.getParty(), cm.getMap());
            }
        } else {
            cm.sendOk("고객님 많이 당황하셨죠? 저도 고객님이 파티장이 아니여서 많이 당황했답니다. 파티장을 통해 말을 걸어주세요.");
        }
    } else {
        cm.sendOk("고객님 많이 당황하셨죠? 저도 고객님의 파티가 2인 이상이 아니여서 많이 당황했답니다. 파티원 수를 2명 이상으로 해주세요.");
    }
}

function start() {

    var level = cm.getPlayer().getLevel();
    var record = cm.getQuestRecord(150001);
    points = record.getCustomData() == null ? "0" : record.getCustomData();
    var easy = 0;
    var normal = 0;
    var hard = 0;
    var lunatic = 0;
    var admin = 0;
    var st = "즐거움이 가득한~♬ #e#b팡플 보스 레이드#k#n입니다~\r\n";
    //st += "#L6##b#e보스 포인트 상점#k을 이용한다,#n#l\r\n";
    st += "\r\n#l";
    if (points >= easy) {
        st += "#L0##b<보스레이드 : 이지 모드>#k에 참여한다.#l\r\n";
    }
    if (points >= normal) {
        st += "#L1##b<보스레이드 : 노멀 모드>#k에 참여한다.#l\r\n";
    }
    if (points >= hard) {
        st += "#L2##b<보스레이드 : 하드 모드>#k에 참여한다.#l\r\n";
    }
    if (points >= lunatic) {
        st += "#L3##b<보스레이드 : 지옥 모드>#k에 참여한다.\r\n";
    }
    if (cm.getPlayer().hasGmLevel(6)){
    	if (points >= admin) {
      	  	st += "\r\n#L9##r<보스레이드 : 관리자 모드>#k에 참여한다.\r\n";
    	}
    }
    cm.sendSimple(st);
}

function trade(item, quantity, point) {
    var record = cm.getQuestRecord(150001);
    var intPoints = parseInt(points);
    if (intPoints >= point) {
        if (cm.canHold(item)) {
            intPoints -= point;
            record.setCustomData("" + intPoints + "");
            cm.gainItem(item, quantity);
            cm.sendOk("#i" + item + "# #b#e#z" + item + "##k을(를) 구매하셨습니다.\r\n#Cgray#아이템 구입 후 남으신 BP는 #r" + points + "#k점 #Cgray#입니다.");
            if (item == 2431411 || item == 2431412 || item == 2431413) {
                WorldBroadcasting.broadcast(MainPacketCreator.getGMText(1, "보스레이드 : " + cm.getPlayer().getName() + "님이 보스레이드 상점에서 선택 타일런트 아이템 교환권을 구매하였습니다."));
            }
            if (item == 2432069) {
                WorldBroadcasting.broadcast(MainPacketCreator.getGMText(1, "보스레이드 : " + cm.getPlayer().getName() + "님이 보스레이드 상점에서 랜덤 타일런트 방어구 교환권을 구매하였습니다."));
            }
            if (item == 2431938) {
                WorldBroadcasting.broadcast(MainPacketCreator.getGMText(1, "보스레이드 : " + cm.getPlayer().getName() + "님이 보스레이드 상점에서 랜덤 파프니르 무기 교환권을 구매하였습니다."));
            }

        } else {
            cm.sendOk("인벤토리에 빈 공간이 없습니다.")
        }
    } else {
        cm.sendOk("포인트가 부족합니다.");
    }
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        status--;
        cm.dispose();
    }
    if (status == 0) {
        var name = cm.getPlayer().getName();

        if (selection == 0) {
            startQuest("BQ_EZ");
            if (cm.getParty() != null) {
                WorldBroadcasting.broadcast(MainPacketCreator.getGMText(24, "보스레이드 : " + name + "님의 원정대가 <보스레이드 : 이지 모드>를 시작합니다."));
            }
            cm.dispose();
        } else if (selection == 1) {
            cm.dispose();
            startQuest("BQ_MR");
            if (cm.getParty() != null) {
                WorldBroadcasting.broadcast(MainPacketCreator.getGMText(24, "보스레이드 : " + name + "님의 원정대가 <보스레이드 : 노멀 모드>를 시작합니다."));
            }
        } else if (selection == 2) {            
            startQuest("BQ_HD");
            if (cm.getParty() != null) {
                WorldBroadcasting.broadcast(MainPacketCreator.getGMText(24, "보스레이드 : " + name + "님의 원정대가 <보스레이드 : 하드 모드>를 시작합니다."));
            }
            cm.dispose();
        } else if (selection == 3) {
            startQuest("BossQuest_Nightmare"); //90
            if (cm.getParty() != null) {
                WorldBroadcasting.broadcast(MainPacketCreator.getGMText(24, "보스레이드 : " + name + "님의 원정대가 <보스레이드 : 지옥 모드>를 시작합니다."));
            }
        } else if (selection == 9) {
            cm.dispose();
            startQuest("BossQuest_Admin");
            if (cm.getParty() != null) {
                WorldBroadcasting.broadcast(MainPacketCreator.getGMText(24, "보스레이드 : " + name + "님의 원정대가 <보스레이드 : 관리자 모드>를 시작합니다."));
            }
        } else if (selection == 7) {
            cm.dispose();
            startQuest("BQ_GM");
            if (cm.getParty() != null) {
                WorldBroadcasting.broadcast(MainPacketCreator.getGMText(24, "보스레이드 : " + name + "님의 원정대가 <보스레이드 : 관리자 모드>를 시작합니다."));
            }
            cm.dispose();
        } else if (selection == 6) {
            var txt = "보스포인트로 게임 이용에 필요한 아이템을 구매할 수 있습니다.\r\n현재 #h #님은 #b" + points + "점#k의 보스포인트를 가지고 있습니다.\r\n5보스포인트 -> 1마일리지로환전 (최소3000)카페에신청\r\n\r\n";
            for (var i = 0; i < arr.length; i++) {
                txt += "#b#L" + i + "##i" + arr[i][0] + "# #z" + arr[i][0] + "# " + arr[i][1] + "개#k [" + arr[i][2] + "점]\r\n";
            }
            cm.sendSimple(txt);
        }
    } else if (status == 1) {
        trade(arr[selection][0], arr[selection][1], arr[selection][2]);
        cm.dispose();
    }
}