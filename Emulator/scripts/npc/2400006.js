importPackage(Packages.packet.creators);
importPackage(Packages.client.items);
importPackage(Packages.server.items);
importPackage(Packages.launch.world);
importPackage(Packages.main.world);
importPackage(Packages.database);
importPackage(java.lang);
importPackage(Packages.tools.RandomStream);

/* 0 ���� 1 ������  */

var status = -1;
var startmessage = "";
var endmessage = "";
var logmessage = "";
var st = 0;

function start() {
    status = -1;
    action (1, 0, 0);
}

function action(mode, type, selection) {
/* rottostart(����) end(����) check(����) buyrotto(����)*/
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
       var text = "#e< ������ : �ζǽý��� >#n\r\n�ȳ��ϼ���, ���谡�е� Ȥ�� �ζǿ� ������ �����ʴϱ�? �λ� ������ ���Ͻô� �е�, ���� ������ �������� �����Ͻ� ����� �е� ��� �ζǷ� �λ������� ���������!!\r\n\r\n\r\n#b#L0#�ζ� �����ϱ�\r\n#L1#���� ��������";
	text += "\r\n#L4#��÷���� Ȯ��";
	if (cm.getPlayer().hasGmLevel(6)){
	text += "#l\r\n\r\n#e#r[GM �޴�]#k#n#b";
	text += "\r\n#L2#�ζ� �����ϱ�";
	text += "\r\n#L3#�������� �ζ��̺�Ʈ �����ϱ�";
        }
	cm.sendSimple(text);
    } else if(status == 1) {
       if(selection == 0) {
       cm.sendSimple("�ζǱ��Ÿ� ���ϼ���? � ������� �����Ͻðڽ��ϱ�?\r\n\r\n#b#L0#���� �Է����� ����\r\n#L1#�ڵ� �߱����� ����");
       } else if(selection == 1) {
       rottolog();
       } else if(selection == 2) {
	rottostart();
	} else if(selection == 3) {
	end();
	} else if(selection == 4) {
	��÷����();
	}
    } else if(status == 2) {
	sel = selection;
       if(sel == 0) {
       cm.sendGetText("�� �ϰ���° �ڸ������� �Է��� �ּ���. (���ʽ���ȣ)\r\n�� ex) 1,2,3,4,5,6,7\r\n�� ����,���� ���� �Է����ֽð�, ���Ͱ��� �Է����� ������ ��÷��ȸ�� �ȵ˴ϴ�.");
       } else if(sel == 1) {
	fir = Randomizer.rand(1,50); sec = Randomizer.rand(1,50); thi = Randomizer.rand(1,50);
	fou = Randomizer.rand(1,50); fif = Randomizer.rand(1,50); six = Randomizer.rand(1,50); sev = Randomizer.rand(1,50);
	buyrotto();
       }
    } else if(status == 3) {
	if(sel == 0) {
	sex = cm.getText().split(",");
	fir = sex[0]; sec = sex[1]; thi = sex[2]; fou = sex[3]; fif = sex[4]; six = sex[5]; sev = sex[6];
	buyrotto();
	}
     }
}

function rottostart() { // �ζ� ���� (���)
	var con = MYSQL.getConnection().prepareStatement("SELECT * FROM arotto1 WHERE ���� = 0").executeQuery();
	if(!con.next()) {
	startmessage += "������ �� �����ϴ�.";
	cm.sendOk(startmessage); cm.dispose(); con.close();
	} else {
	var aa = Randomizer.rand(1,50);var bb = Randomizer.rand(1,50);var cc = Randomizer.rand(1,50);
	var dd = Randomizer.rand(1,50);var ee = Randomizer.rand(1,50);var ff = Randomizer.rand(1,50);var gg = Randomizer.rand(1,50);
	var upda = MYSQL.getConnection().prepareStatement("UPDATE arotto1 set ȸ�� = ?,���� = ?, ��÷��ȣ = ? WHERE ���� = 0");
        upda.setInt(1, con.getInt("ȸ��") +1);
        upda.setInt(2, 1);
        upda.setString(3, aa+","+bb+","+cc+","+dd+","+ee+","+ff+","+gg);
	upda.executeUpdate();
	var del = MYSQL.getConnection().prepareStatement("DELETE FROM arotto");
	del.executeUpdate();
	del.close();
	startmessage += (con.getInt("ȸ��")+1)+"ȸ���� ���۵Ǿ����ϴ�. ��÷��ȣ("+aa+","+bb+","+cc+","+dd+","+ee+","+ff+" + ���ʽ� ��ȣ "+gg+")";
	WorldBroadcasting.broadcast(MainPacketCreator.getGMText(12, "[�ζ�] �ζǿ��ǽ� : "+(con.getInt("ȸ��")+1)+"ȸ�� �̺�Ʈ�� ���۵Ǿ����ϴ�."));
	cm.sendOk(startmessage); cm.dispose(); upda.close(); con.close();
        }
}                     // �ζ� �����Լ� ��

function end() {      // �ζ� ���� (���)
	var con = MYSQL.getConnection().prepareStatement("SELECT * FROM arotto1 WHERE ���� = 1").executeQuery();
	if(!con.next()) {
	endmessage += "������ �� �����ϴ�.";
        cm.sendOk(endmessage); cm.dispose(); con.close();
	} else {
        var upda1 = MYSQL.getConnection().prepareStatement("UPDATE arotto set ���� = ? WHERE ������ȣ = ?");
	upda1.setInt(1, 1);
	upda1.setString(2, con.getString("��÷��ȣ"));
        upda1.executeUpdate(); upda1.close();
	var upda = MYSQL.getConnection().prepareStatement("UPDATE arotto1 set ���� = ?, ��÷��ȣ = ? WHERE ���� = 1");
	upda.setInt(1, 0);
        upda.setString(2, 0);
        upda.executeUpdate();
	endmessage += con.getInt("ȸ��")+"ȸ���� �����Ͽ����ϴ�.";
	WorldBroadcasting.broadcast(MainPacketCreator.getGMText(12, "[�ζ�] �ζǿ��ǽ� : "+con.getInt("ȸ��")+"ȸ�� �̺�Ʈ�� ����Ǿ����ϴ�. ��÷ �ǽźе��� ���� ã�ƿ� �ּ���.  ��÷��ȣ : ("+con.getString("��÷��ȣ")+")"));
        cm.sendOk(endmessage); cm.dispose(); upda.close(); con.close();
        }
}		    // �ζ� �����Լ� ��

function check() {      // ���� ���� 

	
}		    // ���� ���� �Լ� ��

function buyrotto() { // �ζ� ���� �Լ� (����) /* ��� �� 0 ��� �� 1 */
	var con = MYSQL.getConnection().prepareStatement("SELECT * FROM arotto WHERE ���̵� = "+cm.getPlayer().getId()).executeQuery();
	if(con.next()) {
	}
	var con = MYSQL.getConnection().prepareStatement("SELECT * FROM arotto1 WHERE ���� = 1").executeQuery();
	if(con.next()) {
	if(cm.getPlayer().getMeso() < 1000000000) {
        cm.sendOk("�ζǸ� ������ 1,000,000,000�޼Ұ� �����մϴ�."); cm.dispose(); con.close();
        }
	st = con.getInt("ȸ��");
	} else {
	cm.getPlayer().dropMessage(1,"����� �ζ� �̺�Ʈ ���� �����̶� �����Ͻ� �� �����ϴ�."); cm.dispose(); con.close(); return; 
	}
	var insert = MYSQL.getConnection().prepareStatement("INSERT INTO arotto(ȸ��,����,������ȣ,�г���,���̵�) VALUES(?,?,?,?,?)");
	insert.setInt(1, st);
        insert.setInt(2, 0);
        insert.setString(3, fir+","+sec+","+thi+","+fou+","+fif+","+six+","+sev);
        insert.setString(4, cm.getPlayer().getName());
        insert.setInt(5, cm.getPlayer().getId());
        insert.executeUpdate();
        insert.close();
		cm.gainMeso(-1000000000);
	cm.sendOk("�����Ͻ� ��ȣ�� Ȯ���� �ּ���.\r\n#e"+fir+"#n + #e"+sec+"#n + #e"+thi+"#n + #e"+fou+"#n + #e"+fif+"#n + #e"+six+"#n #r#e���ʽ���ȣ "+sev);cm.dispose(); return; con.close();
}                     // �ζ� ���� �Լ� ��

function rottolog() { //�ζ� ���ų��� �Լ� (����)
	var i = 1;
	var con = MYSQL.getConnection().prepareStatement("SELECT * FROM arotto WHERE ���̵� = "+cm.getPlayer().getId()).executeQuery();
	logmessage += "�ζ� ���ų����Դϴ�.\r\n\r\n";
	while(con.next()) {
	logmessage += "#e["+i+"]#n #b"+con.getString("������ȣ")+"#k\r\n";
	i++;
	}
	if(i == 1) {
	logmessage += "#r�ζǸ� �����Ͻ����� ���°� �����ϴ�.";
	cm.sendOk(logmessage); cm.dispose(); con.close();  return;
	} else {
	cm.sendOk(logmessage); cm.dispose(); con.close(); return;
	}
}

function ��÷����() {
	var con = MYSQL.getConnection().prepareStatement("SELECT * FROM arotto WHERE ���� = 1").executeQuery();
	var con2 = MYSQL.getConnection().prepareStatement("SELECT * FROM arotto1 WHERE ���� = 0").executeQuery();
	if(con2.next()) {
	if(con.next()) {
	if(con.getInt("���̵�") == cm.getPlayer().getId()) {
var del = MYSQL.getConnection().prepareStatement("DELETE FROM arotto WHERE id = ?");
	del.setInt(1, con.getInt("id"));
	del.executeUpdate(); del.close();
	cm.sendOk("�ζǿ� ��÷�Ǽ̽��ϴ�! ���ϵ帳�ϴ�.");
	//cm.gainMeso(3000000000);
	cm.gainItem(4001715, 50);
	cm.dispose(); con.close(); con2.close();
	   } else {
		cm.sendOk("�ƽ����� ��÷�� �ȰͰ��� �ʽ��ϴ�.");cm.dispose(); con.close(); con2.close();
	   }  
	} else {
	cm.sendOk("�ƽ����� ��÷�� �ȰͰ��� �ʽ��ϴ�.");cm.dispose(); con.close(); con2.close();
	}
	} else {
	cm.sendOk("���� ����� �������� �ʾҽ��ϴ�.");cm.dispose(); con.close(); con2.close();
	}
}
