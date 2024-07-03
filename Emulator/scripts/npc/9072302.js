/*
 @Author 현실도피
 */

importPackage(java.sql);
importPackage(java.lang);
importPackage(Packages.database);
importPackage(Packages.launch.world);
importPackage(Packages.packet.creators);

var status = 0;
var con = MYSQL.getConnection();

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode != 1) {
        cm.dispose();
        return;
    } else
        status++;
    if (status == 0) {
        if (cm.getPlayer().isGM() == false) {
            cm.sendYesNo("안녕하세요? " + "#r" + cm.getPlayer().getName() + "#k" + "님 저는 자꾸 팅기는 맵에 갖치는 유저들을 구원하기 위해 생겨난 엔피시입니다.");
        } else {
            cm.sendYesNo("안녕하세요? " + "#r" + cm.getPlayer().getName() + "#k" + "님 저는 자꾸 팅기는 맵에 갖치는 유저들을 구원하기 위해 생겨난 엔피시입니다.");
            cm.dispose();
        }
    } else if (status == 1) {
        cm.sendGetText("이동 시킬 유저의 닉네임을 입력해주세요");
    } else if (status == 2) {
        name = cm.getText();
        checkChar(name);
    } else if (status >= 3 && status < 5) {
        switch (status) {
            case 3:
                changeMap(10000, name, "입력한 유저가 있는맵을 입력하신대 장소로 업데이트 시켰습니다.", "[알림] 팅맵에 갇힌 캐릭터를 구조 하였습니다");
                break;
        }
    }
}

function checkChar(name) {
    var ps = con.prepareStatement("SELECT * FROM characters WHERE name = ?");
    ps.setString(1, name);
    var rs = ps.executeQuery();
    var i = 0;
    while (rs.next()) {
        i++;
    }
    if (i != 0) {
        cm.sendYesNo("입력하신 유저를 찾는데 성공하였습니다! 이유저를 구원하시겠습니까?");
    } else {
        cm.sendOk("입력하신 유저는 존재하지 않는 캐릭터 입니다.");
        cm.dispose();
    }
}

function changeMap(mapid, name, chat, notice) {
    var ps = con.prepareStatement("UPDATE characters SET map = ? WHERE name = ?");
    ps.setInt(1, mapid);
    ps.setString(2, name);
    ps.executeUpdate();
    ps.close();
    cm.sendOk(chat);
    WorldBroadcasting.broadcast(MainPacketCreator.serverNotice(6, notice));
    cm.dispose();
}