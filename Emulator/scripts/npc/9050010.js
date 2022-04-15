/*
 * @Author ���̷���(v_ir_us@nate.com)
 * SystemSQL - MYSQL �� �ٲٽð�, sendHint �������� cm.sendOk�� �������ּ���.
 */
importPackage(Packages.database);
importPackage(java.sql);
importPackage(java.lang);
importPackage(Packages.packet.creators);

var time = new Date();
var year = time.getFullYear();
var month = time.getMonth();
var date = time.getDate();
if (month < 10) {    month = "0"+month;}
if (date < 10) {    date = "0"+date;}
var today = year+"�� "+month+"�� "+date+"��";
        
function start() {
    createAccount();
    status = -1;
    cm.sendSimple("���ε� �����Դϴ�. ������ �Ͻðڽ��ϱ�?.\r\n#r(#h #���� �����ܾ� : #d"+getAccount(cm.getPlayer().getName(),1)+"#r �޼�)\r\n#b#L1#�Ա� #L2#��� #L3#�۱� #L4#���� #L10#���� #e#r#L5#�ʱ�ȭ");
}

function action(mode,type,selection) {
    if (mode == 1) {
        status++;
    }
    if (mode == -1 || mode == 0) {
        cm.dispose();
        return;
    }
    if (status == 0) {
        if (selection == 1) {
            cm.sendGetNumber("�Ա��� �׼��� �Է����ּ���. (�� �� �Ա� �ִ� �׼� - 20��)",1,1,2000000000);
        } else if (selection == 2) {
            cm.sendGetNumber("����� �׼��� �Է����ּ���. (�� �� ��� �ִ� �׼� - 20��)",1,1,2000000000);
        } else if (selection == 3) {
            cm.sendGetText("�������� �����ðڽ��ϱ�?\r\n#r(���� : ���࿡ �ش� �̸��� ���� �ÿ��� �۱��� �Ұ����մϴ�.)");
        } else if (selection == 4) {
            getHistory();
        } else if (selection == 5) {
            cm.sendYesNo("���� �ʱ�ȭ�ϰڽ��ϱ�? ��� �����Ͻ÷��� ���� �����ּ���.");
        } else if (selection == 10) {
            var time = getAccount(cm.getPlayer().getName(),3);
            time = time > 0 ? System.currentTimeMillis() - time : 0;
            time /= 1000;
            var sec = time % 60; // ��
	var total = (time - sec); // �ʷ� ȯ�� �� ���¿��� �� ���� ��
	var min = (total / 60) % 60; // ��
	var hour = Math.floor((total - (sec + min)) / 3600); // �ð�
	hour = hour % 24;
        hour = hour == -1 ? 0 : hour;
	var day = Math.floor(time / (60 * 60 * 24));
        sec = Math.floor(sec);
            if (time == 0) {
                sendHint("���� �Աݽ� �ð��� ��ϵ˴ϴ�.",250,20);
                cm.dispose();
            } else {
                var text = "#h #���� ���� �Ա� �ð� : #b"+day+"�� "+hour+"�ð� "+min+"�� "+sec+"��\r\n#k";
                text += "���ڴ� #r5��, 7��, 11��, 15��, 30��#k �������� ������ �� ������, �Ⱓ�� ����� �þ�� �絵 Ŀ���ϴ�. �׷���, �� �� �����ø� �ٽ� �Ա��� �ϼžߵǴ�, �� �� �������ֽñ� �ٶ��ϴ�.\r\n";
                text += "#b#L99#���ڸ� �ް� �ͽ��ϴ�.\r\n";
                text += "#b#L100#â�� �ݰڽ��ϴ�.";
                cm.sendSimple(text);
            }
            interest = day;
        }
        selected = selection;
    } else if (status == 1) {
        if (selected == 1) {
            money = selection;
            if (cm.getMeso() >= money) {
                cm.sendYesNo("���� #b"+money+" �޼�#k�� �Ա��Ͻðڽ��ϱ�?");
            } else {
                cm.sendOk("�����Ͻ� �޼Һ��� ���� �׼��� �Է��ϼ̽��ϴ�.\r\n�ٽ� �� �� �Է����ּ���.");
                cm.dispose();
            }
        } else if (selected == 2) {
            money = selection;
            if (getAccount(cm.getPlayer().getName(),1) >= money) {
                cm.sendYesNo("���� #b"+money+" �޼�#k�� ����Ͻðڽ��ϱ�?");
            } else {
                cm.sendOk("�����Ͻ� �ܾ׺��� ���� �׼��� �Է��ϼ̽��ϴ�.\r\n�ٽ� �� �� �Է����ּ���.");
                cm.dispose();
            }
        } else if (selected == 3) {
            name = cm.getText();
            checkName(name);
        } else if (selected == 5) {
            var del = MYSQL.getConnection().prepareStatement("DELETE FROM banksystem WHERE name = ?");
            del.setString(1,cm.getPlayer().getName());
            del.executeUpdate();
            sendHint("���� ������ �����Ǿ����ϴ�.",275,20);
            cm.dispose();
        } else if (selected == 10) {
            if (selection == 100) {
                cm.dispose();
            } else if (selection == 99) {
                if (interest < 5) {
                    sendHint("�Ա��� �Ͻ��� 5���� ������ �ʾҽ��ϴ�.",250,20);
                    cm.dispose();
                } else {
                     var benefit = interest == 5 && interest == 6 ? 0.05 :
                            interest >= 7 && interest < 11 ? 0.10 :
                            interest >= 11 && interest < 15 ? 0.15 :
                            interest >= 15 && interest < 30 ? 0.25 :
                            interest >= 30 ? 0.35 : 0; 
                    cm.sendYesNo("���� #h #���� ���� �ܾ��� #b"+getAccount(cm.getPlayer().getName(),1)+" �޼�#k�̸�, �߰� ���ڷ�#r"+getAccount(cm.getPlayer().getName(),1) * benefit+" ("+benefit+"%) �޼�#k�� �ް� �˴ϴ�. ������ �ð� ����� �ʱ�ȭ�Ǵ� �������ּ���. ���ڸ� �����ðڽ��ϱ�?");
                }
                updateMeso = getAccount(cm.getPlayer().getName(),1) * benefit;
            }
        }
    } else if (status == 2) {
        if (selected == 1) {
            updateAccount(cm.getPlayer().getName(),money,today,System.currentTimeMillis(),1);
        } else if (selected == 2) {
            updateAccount(cm.getPlayer().getName(),money,today,0,2);
        } else if (selected == 3) {
            send = selection;
            if (getAccount(cm.getPlayer().getName(),1) >= send) {
                cm.sendYesNo("���� #d"+name+"#k�Կ��� #b"+send+" �޼�#k�� �����ðڽ��ϱ�?");
            } else {
                sendHint("�����Ͻ� �ܾ׺��� ���� �׼��� �Է��ϼ̽��ϴ�.\r\n�ٽ� �� �� �Է����ּ���.",300,30);
            }
        } else if (selected == 10) {
            updateAccount(cm.getPlayer().getName(),updateMeso,today,0,4);
        }
    } else if (status == 3) {
        updateAccount(name,send,today,0,3);
    }
}

function updateAccount(name,money,date,time,mode) {
    if (mode == 1) {
    var ps = MYSQL.getConnection().prepareStatement("SELECT * FROM banksystem WHERE name = ?");
    ps.setString(1,name);
    var rs = ps.executeQuery();
    rs.next();
    if (rs.getLong("time") == 0) {
    var sel = "UPDATE banksystem SET money = ?, date = ?, time = ?, try = ? WHERE name = ?";
    var upd = MYSQL.getConnection().prepareStatement(sel);
    upd.setLong(1,getAccount(name,1) + money);
    upd.setString(2,rs.getString("date")+"/"+date+":"+money+":(�Ա�)");
    upd.setLong(3,time);
    upd.setInt(4,getAccount(name,2) + 1);
    upd.setString(5,name);
    upd.executeUpdate();
    cm.gainMeso(-money);
    sendHint("���������� �Ա��Ͽ����ϴ�.",250,20);
    cm.dispose();
    } else {
        var sel = "UPDATE banksystem SET money = ?, date = ?, try = ? WHERE name = ?";
    var upd = MYSQL.getConnection().prepareStatement(sel);
    upd.setLong(1,getAccount(name,1) + money);
    upd.setString(2,rs.getString("date")+"/"+date+":"+money+":(�Ա�)");
    upd.setInt(3,getAccount(name,2) + 1);
    upd.setString(4,name);
    upd.executeUpdate();
    cm.gainMeso(-money);
    sendHint("���������� �Ա��Ͽ����ϴ�.",250,20);
    cm.dispose();
    }
} else if (mode == 2) {
    var ps = MYSQL.getConnection().prepareStatement("SELECT * FROM banksystem WHERE name = ?");
    ps.setString(1,name);
    var rs = ps.executeQuery();
    rs.next();
    var get = MYSQL.getConnection().prepareStatement("UPDATE banksystem SET money = ?, date = ?, try = ? WHERE name = ?");
    get.setLong(1,getAccount(name,1) - money);
    get.setString(2,rs.getString("date")+"/"+date+":"+money+":(���)");
    get.setInt(3,getAccount(name,2) + 1);
    get.setString(4,name);
    get.executeUpdate();
    cm.gainMeso(money);
    sendHint("���������� ����Ͽ����ϴ�.",250,20);
    cm.dispose();
} else if (mode == 3) {
    var ps = MYSQL.getConnection().prepareStatement("SELECT * FROM banksystem WHERE name = ?");
    ps.setString(1,name);
    var rs = ps.executeQuery();
    rs.next();
    var send = MYSQL.getConnection().prepareStatement("UPDATE banksystem SET money = ?, date = ?, try = ? WHERE name = ?");
    send.setLong(1,getAccount(name,1) + money);
    send.setString(2,rs.getString("date")+"/"+date+":"+money+":(����)");
    send.setInt(3,getAccount(name,2) + 1);
    send.setString(4,name);
    send.executeUpdate();
    
    var pse = MYSQL.getConnection().prepareStatement("SELECT * FROM banksystem WHERE name = ?");
    pse.setString(1,cm.getPlayer().getName());
    var rse = pse.executeQuery();
    rse.next();
    var mine = MYSQL.getConnection().prepareStatement("UPDATE bankSystem SET money = ?, date = ?, try = ? WHERE name = ?");
    mine.setLong(1,getAccount(cm.getPlayer().getName(),1) - money);
    mine.setString(2,rse.getString("date")+"/"+date+":"+money+":(�۱�)");
    mine.setInt(3,getAccount(cm.getPlayer().getName(),2) + 1);
    mine.setString(4,cm.getPlayer().getName());
    mine.executeUpdate();
    sendHint("���������� �۱��Ͽ����ϴ�. (To. "+name+")",275,20);
    cm.dispose();
} else if (mode == 4) {
    var pse = MYSQL.getConnection().prepareStatement("SELECT * FROM banksystem WHERE name = ?");
    pse.setString(1,cm.getPlayer().getName());
    var rse = pse.executeQuery();
    rse.next();
    var mine = MYSQL.getConnection().prepareStatement("UPDATE bankSystem SET money = ?, date = ?, time = ?, try = ? WHERE name = ?");
    mine.setLong(1,getAccount(name,1) + money);
    mine.setString(2,rse.getString("date")+"/"+date+":"+money+":(����)")
    mine.setLong(3,time);
    mine.setInt(4,getAccount(name,2) + 1);
    mine.setString(5,name);
    mine.executeUpdate();
    sendHint("���������� ���ڸ� �޾ҽ��ϴ�. ("+money+" �޼�)\r\n�ð� ����� �ʱ�ȭ�˴ϴ�.",300,30);
    cm.dispose();
}
}

function getAccount(name, mode) {
    var account = 0;
    var sel = "SELECT * FROM banksystem WHERE name = ?";
    var ps = MYSQL.getConnection().prepareStatement(sel);
    ps.setString(1,name);
    var rs = ps.executeQuery();
    rs.next();
    if (mode == 1) {
    account = rs.getLong("money");
} else if (mode == 2) {
    account = rs.getInt("try");
} else if (mode == 3) {
    account = rs.getLong("time");
}
return account;
}

function createAccount() {
    var ps = MYSQL.getConnection().prepareStatement("SELECT * FROM banksystem WHERE name = ?");
    ps.setString(1,cm.getPlayer().getName());
    var rs = ps.executeQuery();
    var isExist = false;
    while (rs.next()) {
        isExist = true;
        continue;
    }
    if (!isExist) {
        var ins = MYSQL.getConnection().prepareStatement("INSERT INTO banksystem(name,money,date,time,try) VALUES(?,?,?,?,?)");
        ins.setString(1,cm.getPlayer().getName());
        ins.setLong(2,0);
        ins.setString(3,today);
        ins.setLong(4,0);
        ins.setInt(5,0);
        ins.executeUpdate();
    }
}

function checkName(name) {
    if (name == cm.getPlayer().getName()) {
        sendHint("�ڽſ��Դ� ���� �� �����ϴ�.",250,20);
        cm.dispose();
        return;
    }
    var ps = MYSQL.getConnection().prepareStatement("SELECT * FROM banksystem WHERE name = ?");
    ps.setString(1,name);
    var rs = ps.executeQuery();
    var isExist = false;
    while (rs.next()) {
        isExist = true;
    }
    if (isExist) {
        cm.sendGetNumber("�󸶸� �����ðڽ��ϱ�? (�ִ� 20�� �޼� ����)\r\n#r(���� : �۱��� �ϸ� �׸�ŭ �ڽ��� �����ܰ��� �����˴ϴ�.)",1,1,2000000000);
    } else {
        sendHint("ĳ���͸� ã�� �� �����ϴ�.",250,20);
        cm.dispose();
    }
}

function sendHint(message,x,y) {
    return cm.getPlayer().getClient().getSession().write(MainPacketCreator.sendHint(message,x,y));
}

function getHistory() {
    var ps = MYSQL.getConnection().prepareStatement("SELECT * FROM banksystem WHERE name = ?");
    ps.setString(1,cm.getPlayer().getName());
    var rs = ps.executeQuery();
    var string = new StringBuilder();
    rs.next();
    date = rs.getString("date").split("/");
    string.append("���� ������ : #n#r").append(date[0]).append("#k\r\n\r\n");
    string.append("#e[��ȣ]        [��¥]            [�޼�]        [��/���]#n\r\n")
        for (var i = 1; i < getAccount(cm.getPlayer().getName(),2) + 1; i++) {
            var test = date[i].split(":");
            var money = test[1];
	var len = money.length();
        var zero = "";
        for (var ze = 0; ze < (11 - len); ze++) {
            zero += "#Cgray#0";
        }
        if (test[2] == "(�۱�)") {
            money = zero+"#r"+money+"";
        } else if (test[2] == "(���)") {
            money = zero+"#d"+money+"";
        } else {
        money = zero+"#b"+money+"";
    }
        string.append("  #b(").append(Integer(i)).append(")#k     ").append(test[0]).append("     "+money).append("         #r"+test[2]+"\r\n");
    }
    cm.sendOk(string.toString());
    cm.dispose();
}