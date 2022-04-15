importPackage(java.util);
importPackage(java.lang);
importPackage(Packages.database);
importPackage(java.sql);
/*


    엔피시아이디 : 

    엔피시 이름 : 

    엔피시가 있는 맵 :  :  ()

    엔피시 설명 : MISSINGNO


*/
 
var status = -1;
 
var time = new Date();
var day = time.getDay();
 
switch(day){
    case 0:
        var d = "성장의 일";
        var item = [5076000, 5076000, 5076000, 5076000, 5076000, 5076000, 5076000, 5076000, 5076000, 5076000, 5076000, 5076000, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 4310070, 2049360, 2049360, 2049360, 5062009, 5062009, 5062009, 5062009, 5062009, 5062009, 5062009, 5062009, 5062009, 5062009, 5062009, 5062009, 5062009, 5062009, 5062009, 5062009, 5062009, 5062009, 5062009, 5062009, 5062009, 5062009, 5062009, 5062009, 5062009, 5062009, 5062009, 5062009, 5062009, 5062009, 5062010, 5062010, 5062010, 5062010, 5062010, 5062010, 5062010, 5062010, 5062010, 5062010, 5062010, 5062010, 5062010, 5062010, 5062010, 5062010, 5062010, 5062010, 5062010, 5062010, 5062010, 5062010, 5062010, 5062010, 5062010, 5062010, 5062010, 5062010, 5062010, 5062010]; //지급될 아이템 코드
        break;
    case 1:
        var d = "창조의 월";
        var item = [4001715, 4001715, 5062009, 5062009, 5062009, 5062009, 5062009, 5062009, 5062010, 5062010, 5062010, 5062010, 5062010, 5062010, 5062010, 5062010, 5062010, 5062010, 5062010, 5062010, 5062010, 5062010, 5062010, 5062010, 5062010, 5062010, 5062010, 5062010, 5062010, 5062010];
        break;
    case 2:
        var d = "강화의 화";
        var item = [4001780, 4033248, 4033248, 4001715];
        break;
    case 3:
        var d = "성향의 수";
        var item = [2049360, 2049360, 2049360, 2049360, 2049360, 4001715, 4001715];
        break;
    case 4:
        var d = "명예의 목";
        var item = [2450054,  2450054, 5076000, 5076000, 5076000, 5076000, 5076000, 5076000, 5076000, 5076000, 5076000, 5076000, 5076000, 5076000, 5076000, 4001715];
        break;
    case 5:
        var d = "황금의 금";
        var item = [5076000, 5076000, 5076000, 5076000, 5076000, 5076000, 5076000, 5076000, 5076000, 5076000, 5076000, 5076000, 5076000, 5076000, 5076000, 5062009, 5062009, 5062009, 5062009, 5062009, 5062009, 5062009, 5062009, 5062009, 5062009, 5062009, 5062009, 5062009, 5062009, 5062009, 5062009, 5062009, 5062009, 5062009, 5062009, 5062009, 5062009, 5062009, 5062009, 5062009, 5062009, 5062009, 5062009, 5062009, 5062009, 5062010, 5062010, 5062010, 5062010, 5062010, 5062010, 5062010, 5062010, 5062010, 5062010, 5062010, 5062010, 5062010, 5062010, 5062010, 5062010, 5062010, 5062010, 5062010, 5062010, 5062010, 5062010, 5062010, 5062010, 5062010, 5062010, 5062010, 5062010, 5062010, 5062010];
        break;
    case 6:
        var d = "축제의 토";
        var item = [4310020, 4310020, 4310020, 4310020, 4310020, 4310020, 4310020, 4310020, 4310020, 4310020, 4310020, 4310020, 4310020, 4310020, 4310020, 4310020, 4310020, 4310020, 4310020, 4310020, 4310020, 4310020, 4310020, 4310020, 4310020, 4310020, 4310020, 4310020, 4310020, 4310020, 5062009, 5062009, 5062009, 5062009, 5062009, 5062009, 5062009, 5062009, 5062009, 5062009, 5062010, 5062010, 5062010, 5062010, 5062010, 5062010, 5062010, 5062010, 5062010, 5062010, 5062010, 5062010, 5062010, 5062010, 5062010, 5062010, 5062010, 5062010, 5062010, 5062010, 5062010, 5062010];
        break;
    default:
}
 
function start() {
    status = -1;
    action (1, 0, 0);
}
 
function action(mode, type, selection) {
 
    if (mode == -1) {
        cm.dispose();
        return;
    }
    if (mode == 0) {
        status --;
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    }
 
    if (status == 0) {
        var text = "#b에이플러스#k을 재밋게 즐기고 계신가요?\r\n"
		text += "오늘은 #r"+d+"요일#k이랍니다.\r\n\r\n"
		
		/*if (cm.getPlayer().getKeyValue("등급") == null) {
			cm.getPlayer().setKeyValue("등급", "일반");
		}
		text += "당신의 등급은 #r#e" +cm.getPlayer().getKeyValue("등급")+ "#n#k 등급입니다.#k#l\r\n\r\n"
		*/
		
		text += "#L9#나의 등급을 확인한다.#l\r\n"
        text += "#L0##r"+d+"요일#k, 출석체크를 한다.#l"
		
        if (cm.getPlayer().getGMLevel() >= 6) {
            text += "\r\n\r\n\r\n"
            text += "#Cgray##e<GM 전용 디버그 메세지>#n#k\r\n#b"
            text += "#L1##h0# 캐릭터의 출석체크를 초기화한다.#l"
        }
        cm.sendSimple(text);
    } else if (status == 1) {
        var check = ""
        if (selection == 0) {
            check += "#b"+d+"요일#k의 출석체크를 하시겠습니까?\r\n"
            check += "오늘의 보상은 다음과 같습니다.\r\n\r\n#b"
            for (i = 0; i < item.length; i++) {
                check += "#i"+item[i]+"# #z"+item[i]+"#\r\n"
            }
            cm.sendYesNo(check);
			
			
		} else if (selection == 9) {
			if (cm.getPlayer().getKeyValue("등급") == null) {
			cm.getPlayer().setKeyValue("등급", "일반");
			}
			cm.sendOk("당신의 등급은 #r#e" +cm.getPlayer().getKeyValue("등급")+ "#n#k 등급입니다.#k#l\r\n\r\n");
			cm.dispose();
			
        } else if (selection == 1) {
		delCheck();
            check += "#b"+d+"요일#k의 출석체크가 초기화되었습니다."
            cm.sendOk(check);
            cm.dispose();
            return;
        }
    } else if (status == 2) {
        var fin = ""
	if (getWeekly_Check() != day) {
		setWeekly_Check(day);
		if (getReturnAttend() == 7) {
			cm.gainItem(2450116, 2);
		} else if (getReturnAttend() == 14) {
			cm.gainItem(2430027, 2);
		} else if (getReturnAttend() == 21) {
			cm.gainItem(2434981, 2);
		} else if (getReturnAttend() == 30) {
			cm.gainItem(4001715, 20);
		}
            for (i = 0; i < item.length; i++) {
                cm.gainItem(item[i], 1);
            }
            fin += "#b"+d+"요일#k의 출석을 완료했습니다.\r\n\r\n"
            fin += "#fUI/UIWindow.img/QuestIcon/4/0#\r\n#b"
            for (i = 0; i < item.length; i++) {
                fin += "#i"+item[i]+"# #z"+item[i]+"#\r\n"
            }
        } else {
            fin += "#b#h0##k님은 이미 #b"+d+"요일#k의 출석을 완료했습니다.\r\n"
            fin += "내일 다시 찾아와 주세요."
        }
        cm.sendOk(fin);
        cm.dispose();
        return;
    }
}

function delCheck() {
	var con = MYSQL.getConnection();
	var del = con.prepareStatement("DELETE FROM attendcheck WHERE accid = "+cm.getClient().getAccID());
		del.executeUpdate();
		del.close();
		con.close();
}

function setWeekly_Check(a) {
	var con = MYSQL.getConnection();
	if(getWeekly_Check() != null) {
		var update = con.prepareStatement("UPDATE attendcheck SET weekly_check = ?, returnattend = ? WHERE accid = "+cm.getClient().getAccID());
		update.setInt(1, a);
		update.setInt(2, -(-getReturnAttend() - 1));
		update.executeUpdate();
		update.close();
	} else {
		var insert = con.prepareStatement("INSERT INTO attendcheck(accid, weekly_check, returnattend) VALUES(?, ?, ?)");
		insert.setInt(1, cm.getClient().getAccID());
		insert.setInt(2, a);
		insert.setInt(3, 1);
		insert.executeUpdate();
		insert.close();
	}
	con.close();
	
}
function getWeekly_Check() {
	var weekly = null;
	var con = MYSQL.getConnection();
	var ps = con.prepareStatement("SELECT * FROM attendcheck WHERE accid = "+cm.getClient().getAccID());
	var rs = ps.executeQuery();
		if(rs.next()) {
			weekly = rs.getInt("weekly_check");
		}
		con.close();
		ps.close();
		rs.close();
	return weekly;
}

function getReturnAttend() {
	var weekly = 0;
	var con = MYSQL.getConnection();
	var ps = con.prepareStatement("SELECT * FROM attendcheck WHERE accid = "+cm.getClient().getAccID());
	var rs = ps.executeQuery();
		if(rs.next()) {
			weekly = rs.getInt("returnattend");
		}
		con.close();
		ps.close();
		rs.close();
	return weekly;
}

//[출처] 출석체크 (@USFM - 메이플스토리 공식 카페) |작성자 jusir_

// [출처] 출석체크  (@USFM - 메이플스토리 공식 카페) |작성자 jusir_



