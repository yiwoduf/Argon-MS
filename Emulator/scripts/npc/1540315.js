importPackage(java.sql);
importPackage(java.lang);
importPackage(Packages.database);
importPackage(Packages.launch.world);
importPackage(Packages.packet.creators);

var first = new Array("�ҽ���","������","������","�׶���","����","������","������","��û��", "�ȶ���", "����", "��û��","�̷���","�����","�������� �����ϴ�","���ڸ� �����ϴ�","���ڸ� �����ϴ�","���ڸ� ������","���� �Դ�","��������","���������","��ũ��","������","�߻���","������","������","����������","������","��Ÿ���ϴ�","�����ϴ�","����ζ���","�˹��ϴ�","�丮�ϴ�","������","�����ϴ�","���ڹ�� ��","�븮�����ϴ�","�Ϳ���","���ܿ�","�Ϳ���ô �ϴ�", "��̹��̰� ������","���ڸ� �����ϴ�","���� ����","�鸶ź","�����ٸ�����","��������","������","��Ź��","������","����ȯ������ ��", "���ζ�", "����� ����", "�ҽ���","������","������","�׶���","����","������","������","��û��", "�ȶ���", "����", "��û��","�̷���","�����","�������� �����ϴ�","���ڸ� �����ϴ�","���ڸ� �����ϴ�","���ڸ� ������","���� �Դ�","��������","���������","��ũ��","������","�߻���","������","������","����������","������","��Ÿ���ϴ�","�����ϴ�","����ζ���","�˹��ϴ�","�丮�ϴ�","������","�����ϴ�","���ڹ�� ��","�븮�����ϴ�");
var second = new Array("�ܵ������","���","����","�̻���","�ܼ���","�ҹ��","������","��ȸ�ǿ�","����","����","Ʈ��������","������","�޹���","�ǻ�","��ȣ��","�ǻ�","����","����","���̹� ����","������īBJ","��Ž��","����","�뿹","������","ȸ���","�丮ŷ ����ŷ","���Į","�ս���","AV���","�����","�丶��","������","�Ʊ���","����","������","������","�ƺ�","����","����","������","����","�θ���","��Ÿ��","����� ��÷��","�ι����","Ʈ��","������","���ڴ�","���ִ�","����","�Ŀ�������","��ũ","ȣī��","���ڿ�","�����","���", "�̳�","�̳�","����", "�̺�Ʈ ��÷��","����","����","����","����","����","����","����","����","����","����","����","����","����","����","����","����","����","����","����","����","����","����","����","����","����","����","����","����","����","����","����","����", "������", "�ܵ������","���","����","�̻���","�ܼ���","�ҹ��","������","��ȸ�ǿ�","����","����","Ʈ��������","������","�޹���","�ǻ�","��ȣ��","�ǻ�","����","����","���̹� ����","������īBJ","��Ž��","����","�뿹");


function start() {
	if(cm.getPlayer().getGMLevel() > 0){
		cm.getPlayer().send(MainPacketCreator.sendHint("#fn������� Extrabold# ���ζ� �̺�Ʈ ��÷�ڰ� ��÷�Ǹ� �������� ���޵ȴٱ�?!", 400, 20));
	}

	var str = "";
	cm.sendYesNo("#fn������� Extrabold# ����� �巡����� �����������? #r��ȸ�Ҽ��� �־��...#k\r\n���� ����� �巡��� : #b"+selectHope()+"#k\r\n#Cgray#�巡����� Ȯ���ϰų� ��ü�Ϸ��� 10,000,000�޼Ұ� �ʿ��մϴ�.");
}

function getRand(len){
	return Math.floor(Math.random()*len);
}

function shuffle() {
	return first[getRand(first.length)]+" "+second[getRand(second.length)];
}

function updateHope(str){
	var insert = MYSQL.getConnection().prepareStatement("INSERT INTO futurehope(cid,hope) VALUES(?,?)");
	insert.setInt(1,cm.getPlayer().getId());
	insert.setString(2,str);
	deleteHope(cm.getPlayer().getId());
	insert.executeUpdate();
}

function selectHope(){
	var sq = MYSQL.getConnection().prepareStatement("SELECT * FROM futurehope WHERE cid = ?");
	sq.setInt(1,cm.getPlayer().getId());
	var eq = sq.executeQuery();
	var string = new StringBuilder();
	if(eq.next()){
	string.append("[").append(eq.getString("hope")).append("]\r\n");
	}
	return string.toString();
}

function deleteHope(cid) {
	var dq = MYSQL.getConnection().prepareStatement("DELETE FROM futurehope where cid = ?");
	dq.setInt(1,cid);
	dq.executeUpdate();
}

var status=-1;

function action(m,t,s) {
	m==1?status++:cm.dispose();
	if(status==0){
	var text = shuffle();
	cm.getPlayer().send(MainPacketCreator.sendHint("�巡��� : "+text,200,20))||cm.getMeso()>10000000?cm.sendOk("����� �巡����� "+text+"�Դϴ�.")||cm.gainMeso(-10000000)||updateHope(text)||WorldBroadcasting.broadcast(UIPacket.detailShowInfo("["+cm.getPlayer().getName()+"]���� �巡����� "+text+"�Դϴ�.",false)):cm.sendOk("10,000,000�޼Ұ� �����մϴ�.")||cm.dispose();
	cm.dispose();
	}else{
	cm.dispose();
	}
}