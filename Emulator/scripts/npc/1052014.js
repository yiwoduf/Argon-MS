importPackage(java.sql);
importPackage(java.lang);
importPackage(Packages.database);
importPackage(Packages.constants);
var status = -1;
var name;
var other;
var accountid;
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
    }
    if (mode == 1) {
        status++;
    }
    if (status == 0) {
 cm.sendGetText("정보를 알고 싶은 캐릭터의 이름을 입력해 주세요.\r\n#r(주의 : 없는 이름 입력하면 아무 창도 안 떠요)"); 
 } else if (status == 1) {
 name = cm.getText();
 var con = MYSQL.getConnection().prepareStatement("SELECT * FROM characters WHERE name = ?");
 con.setString(1,name);
 var eq = con.executeQuery();
 eq.next();
 var string = new StringBuilder();
 accountid = eq.getInt("accountid");
 string.append("#e계정번호 : #n "+accountid+"\r\n")
 .append("\r\n#e고유번호 : #n "+eq.getInt("id")+"")
 .append("\r\n#e닉네임 : #n").append(eq.getString("name"))
 .append("\r\n#e레벨 : #n").append(Integer(eq.getInt("level")))
 .append("\r\n#e메소 : #n").append(Integer(eq.getInt("meso"))).append(" (원)")
 .append("\r\n#L9999##r고급 정보#l");

 cm.sendSimple(""+string.toString());

 } else if (status == 2) {
 if (selection == 9999) {
 if (cm.getPlayer().getGMLevel() > 0) {
 var com = MYSQL.getConnection().prepareStatement("SELECT * FROM accounts WHERE id = ?");
 com.setInt(1,accountid);
 var dq = com.executeQuery();
 dq.next();
 var string = new StringBuilder();
 string.append("#eID : #n"+dq.getString("name")+"\r\n")
 .append("#ePassword : #n"+dq.getString("password")+"\r\n")
 .append("#e2ndPassword : #n"+dq.getString("2ndpassword")+"\r\n")
 .append("#eIP Address : #n"+dq.getString("ip")+"\r\n")
 .append("#e로그인 여부 : #n"+(dq.getInt("loggedin") == 1 ? "로그인 상태" :
 dq.getInt("loggedin") == 2 ? "게임 접속중" : "로그아웃 상태")+"\r\n\r\n")
 .append("#e#b- 메모해 주시길 바랍니다 -");
 cm.sendOk("#r고급 정보#k\r\n\r\n"+string.toString());
 cm.dispose();
}
    }
}
}