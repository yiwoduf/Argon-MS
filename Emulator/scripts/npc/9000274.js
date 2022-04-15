/*
     @Author 현실도피(kjun3753@nate.com)
*/

importPackage(java.util);
importPackage(java.lang);

var time = new Date();
var day = time.getDay();

/*
var d = day == 0 ? "일요일 " : 
    day == 1 ? "월요일 " :
    day == 2 ? "화요일 " :
    day == 3 ? "수요일 " :
    day == 4 ? "목요일 " :
    day == 5 ? "금요일 " : "토요일 ";
*/

var year = time.getFullYear();
var month = time.getMonth() + 1;
var date = time.getDate();
var hour = time.getHours();
var min = time.getMinutes();
var sec = time.getSeconds();
var 출첵아이템 = 4033247;

var today = year+"년 "+month+"월 "+date+"일 "+hour+"시 "+min+"분 "+sec+"초";

function start() {
    status = -1;
    action(1,0,0);
}

function action(mode,type,selection) {
    if (mode != 1) {
        cm.dispose();
        return;
    } else
        status++;
    if (status == 0) {
        if (cm.getPlayer().getKeyValue("Check_Point") == null) {
            cm.getPlayer().setKeyValue("Check_Point","0");
        }
        if (cm.getPlayer().getKeyValue("Apink") == null) {
            cm.getPlayer().setKeyValue("Apink","0");
        }
        var chat = "#b메이플스토리#k에 오신것을 환영합니다.\r\n";
        chat += "\r\n#b#h ##k 님의 출석 포인트 : " + "#r" + cm.getPlayer().getKeyValue("Check_Point") + "#k";
        if (cm.getPlayer().getKeyValue("Check_Date") != null) {
            chat += "\r\n#b#h ##k 님의 출석 현황 : " + "#r" + cm.getPlayer().getKeyValue("Check_Date") + "#k";
        }
        chat += "\r\n#b#h ##k 님의 출석수 : " + "#r" + cm.getPlayer().getKeyValue("Apink") + "#k";
        if (cm.getPlayer().getKeyValue("Check_Time") != null) {
            if (getTime() > 0) {
                chat += "\r\n#b#h ##k 님은 아직 출석 체크가 불가능 합니다.";
            } else {
                chat += "\r\n#b#h ##k 님은 현재 출석 체크가 가능 합니다."
            }
        }
        chat += "\r\n#b#L0#출석 체크를 한다.";
        cm.sendSimple(chat); 
    } else if (status == 1) {
        if (cm.getPlayer().getKeyValue("Check_Time") != null) {
            var time = getTime();
            var sec = time % 60;
            var total = (time - sec);
            var min = (total / 60) % 60;
            var hour = Math.floor((total - (sec + min)) / 3600);
            hour = hour % 24;
            sec = Math.floor(sec);
            var expiration = hour+"시간 "+min+"분 "+sec+"초";
            if (time > 0) { 
                cm.sendOk("출석 체크는 하루에 한번만 가능합니다.\r\n#r남은 시간 : " + expiration + "#k");
                cm.dispose();
            } else {
                cm.sendYesNo("정말로 출석체크를 하시겠습니까?");
            }
        } else {
            cm.getPlayer().setKeyValue("Check_Time",(Long.parseLong(System.currentTimeMillis() + 1000 * 60 * 60 * 24)));
            cm.getPlayer().setKeyValue("Check_Date",today);
            cm.getPlayer().setKeyValue("Apink","1");
            cm.getPlayer().setKeyValue("Check_Point",(Integer.parseInt(cm.getPlayer().getKeyValue("Check_Point")) + 30) + "");
	    cm.getPlayer().gainItem(출첵아이템,1);
            cm.sendOk("#b" + today + "#k\r\n출석 체크가 완료되었습니다.\r\n" + "#b#h ##k 님은 이번이 첫번쨰 출석 체크 이시군요 ! 출석체크가 처음일 경우 특별히 #b30포인트#k를 나눠 드리고 있답니다.");
            cm.dispose();
        }
    } else if (status == 2) { 
        cm.getPlayer().setKeyValue("Check_Time",(Long.parseLong(System.currentTimeMillis() + 1000 * 60 * 60 * 24)));
        cm.getPlayer().setKeyValue("Check_Date",today);
        cm.getPlayer().setKeyValue("Apink",(Integer.parseInt(cm.getPlayer().getKeyValue("Apink")) + 1) + "");
        cm.getPlayer().setKeyValue("Check_Point",(Integer.parseInt(cm.getPlayer().getKeyValue("Check_Point")) + 10) + ""); 
        cm.sendOk("#b" + today + "#k\r\n출석 체크가 완료되었습니다. #r(포인트 + 10)#k");
        cm.dispose();
    }
}

function getTime() {
    var time = cm.getPlayer().getKeyValue("Check_Time");
    time -= System.currentTimeMillis(); // 저장된 시간에서 현재시간을 빼준다
    time /= 1000; // 현재시간을 뺴준 값에서 또 1000(1초)로 나눠준다 
    return time; // time을 반환한다.
}