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
 cm.sendGetText("������ �˰� ���� ĳ������ �̸��� �Է��� �ּ���.\r\n#r(���� : ���� �̸� �Է��ϸ� �ƹ� â�� �� ����)"); 
 } else if (status == 1) {
 name = cm.getText();
 var con = MYSQL.getConnection().prepareStatement("SELECT * FROM characters WHERE name = ?");
 con.setString(1,name);
 var eq = con.executeQuery();
 eq.next();
 var string = new StringBuilder();
 accountid = eq.getInt("accountid");
 string.append("#e������ȣ : #n "+accountid+"\r\n")
 .append("\r\n#e������ȣ : #n "+eq.getInt("id")+"")
 .append("\r\n#e�г��� : #n").append(eq.getString("name"))
 .append("\r\n#e���� : #n").append(Integer(eq.getInt("level")))
 .append("\r\n#e�޼� : #n").append(Integer(eq.getInt("meso"))).append(" (��)")
 .append("\r\n#L9999##r��� ����#l");

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
 .append("#e�α��� ���� : #n"+(dq.getInt("loggedin") == 1 ? "�α��� ����" :
 dq.getInt("loggedin") == 2 ? "���� ������" : "�α׾ƿ� ����")+"\r\n\r\n")
 .append("#e#b- �޸��� �ֽñ� �ٶ��ϴ� -");
 cm.sendOk("#r��� ����#k\r\n\r\n"+string.toString());
 cm.dispose();
}
    }
}
}