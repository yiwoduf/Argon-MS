importPackage(java.lang);
importPackage(Packages.handling.world);
importPackage(Packages.packet.creators);


var points;
var status = -1;
var sel;
var level;


var arr = new Array(new Array(4001126,1000,1000), new Array(4001126,1000,1000));

/* ���� */
function startQuest(event) {
    if (cm.getParty() != null) {
        if (cm.getDisconnected(event) != null && cm.getPartyMembers().size() >= 1) {
            cm.getDisconnected(event).registerPlayer(cm.getPlayer());
        } else if (cm.isLeader()) {
            var q = cm.getEventManager(event);
            if (q == null) {
                cm.sendOk("���� ���� ��Ȳ�ϼ���? ���� �������̵尡 �ȵż� ���� ��Ȳ�ߴ�ϴ�. �����ڿ��� �����ּ���.");
            } else {
                q.startInstance(cm.getParty(), cm.getMap());
            }
        } else {
            cm.sendOk("���� ���� ��Ȳ�ϼ���? ���� ������ ��Ƽ���� �ƴϿ��� ���� ��Ȳ�ߴ�ϴ�. ��Ƽ���� ���� ���� �ɾ��ּ���.");
        }
    } else {
        cm.sendOk("���� ���� ��Ȳ�ϼ���? ���� ������ ��Ƽ�� 2�� �̻��� �ƴϿ��� ���� ��Ȳ�ߴ�ϴ�. ��Ƽ�� ���� 2�� �̻����� ���ּ���.");
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
    var st = "��ſ��� ������~�� #e#b���� ���� ���̵�#k#n�Դϴ�~\r\n";
    //st += "#L6##b#e���� ����Ʈ ����#k�� �̿��Ѵ�,#n#l\r\n";
    st += "\r\n#l";
    if (points >= easy) {
        st += "#L0##b<�������̵� : ���� ���>#k�� �����Ѵ�.#l\r\n";
    }
    if (points >= normal) {
        st += "#L1##b<�������̵� : ��� ���>#k�� �����Ѵ�.#l\r\n";
    }
    if (points >= hard) {
        st += "#L2##b<�������̵� : �ϵ� ���>#k�� �����Ѵ�.#l\r\n";
    }
    if (points >= lunatic) {
        st += "#L3##b<�������̵� : ���� ���>#k�� �����Ѵ�.\r\n";
    }
    if (cm.getPlayer().hasGmLevel(6)){
    	if (points >= admin) {
      	  	st += "\r\n#L9##r<�������̵� : ������ ���>#k�� �����Ѵ�.\r\n";
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
            cm.sendOk("#i" + item + "# #b#e#z" + item + "##k��(��) �����ϼ̽��ϴ�.\r\n#Cgray#������ ���� �� ������ BP�� #r" + points + "#k�� #Cgray#�Դϴ�.");
            if (item == 2431411 || item == 2431412 || item == 2431413) {
                WorldBroadcasting.broadcast(MainPacketCreator.getGMText(1, "�������̵� : " + cm.getPlayer().getName() + "���� �������̵� �������� ���� Ÿ�Ϸ�Ʈ ������ ��ȯ���� �����Ͽ����ϴ�."));
            }
            if (item == 2432069) {
                WorldBroadcasting.broadcast(MainPacketCreator.getGMText(1, "�������̵� : " + cm.getPlayer().getName() + "���� �������̵� �������� ���� Ÿ�Ϸ�Ʈ �� ��ȯ���� �����Ͽ����ϴ�."));
            }
            if (item == 2431938) {
                WorldBroadcasting.broadcast(MainPacketCreator.getGMText(1, "�������̵� : " + cm.getPlayer().getName() + "���� �������̵� �������� ���� �����ϸ� ���� ��ȯ���� �����Ͽ����ϴ�."));
            }

        } else {
            cm.sendOk("�κ��丮�� �� ������ �����ϴ�.")
        }
    } else {
        cm.sendOk("����Ʈ�� �����մϴ�.");
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
                WorldBroadcasting.broadcast(MainPacketCreator.getGMText(24, "�������̵� : " + name + "���� �����밡 <�������̵� : ���� ���>�� �����մϴ�."));
            }
            cm.dispose();
        } else if (selection == 1) {
            cm.dispose();
            startQuest("BQ_MR");
            if (cm.getParty() != null) {
                WorldBroadcasting.broadcast(MainPacketCreator.getGMText(24, "�������̵� : " + name + "���� �����밡 <�������̵� : ��� ���>�� �����մϴ�."));
            }
        } else if (selection == 2) {            
            startQuest("BQ_HD");
            if (cm.getParty() != null) {
                WorldBroadcasting.broadcast(MainPacketCreator.getGMText(24, "�������̵� : " + name + "���� �����밡 <�������̵� : �ϵ� ���>�� �����մϴ�."));
            }
            cm.dispose();
        } else if (selection == 3) {
            startQuest("BossQuest_Nightmare"); //90
            if (cm.getParty() != null) {
                WorldBroadcasting.broadcast(MainPacketCreator.getGMText(24, "�������̵� : " + name + "���� �����밡 <�������̵� : ���� ���>�� �����մϴ�."));
            }
        } else if (selection == 9) {
            cm.dispose();
            startQuest("BossQuest_Admin");
            if (cm.getParty() != null) {
                WorldBroadcasting.broadcast(MainPacketCreator.getGMText(24, "�������̵� : " + name + "���� �����밡 <�������̵� : ������ ���>�� �����մϴ�."));
            }
        } else if (selection == 7) {
            cm.dispose();
            startQuest("BQ_GM");
            if (cm.getParty() != null) {
                WorldBroadcasting.broadcast(MainPacketCreator.getGMText(24, "�������̵� : " + name + "���� �����밡 <�������̵� : ������ ���>�� �����մϴ�."));
            }
            cm.dispose();
        } else if (selection == 6) {
            var txt = "��������Ʈ�� ���� �̿뿡 �ʿ��� �������� ������ �� �ֽ��ϴ�.\r\n���� #h #���� #b" + points + "��#k�� ��������Ʈ�� ������ �ֽ��ϴ�.\r\n5��������Ʈ -> 1���ϸ�����ȯ�� (�ּ�3000)ī�信��û\r\n\r\n";
            for (var i = 0; i < arr.length; i++) {
                txt += "#b#L" + i + "##i" + arr[i][0] + "# #z" + arr[i][0] + "# " + arr[i][1] + "��#k [" + arr[i][2] + "��]\r\n";
            }
            cm.sendSimple(txt);
        }
    } else if (status == 1) {
        trade(arr[selection][0], arr[selection][1], arr[selection][2]);
        cm.dispose();
    }
}