var status = -1;
var point = 10000;//����
importPackage(Packages.constants);
importPackage(Packages.client.skills);

function start() {
    status = -1;
    action (1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        cm.dispose();
        return;
    }
    if (status == 0) {
        var chat = "�ȳ� #b#h0##k, �Ǹ��� ������ξ��? \r\n#e#r#l#h0#���� ���� �Ŀ�����Ʈ "+cm.getRC()+"��#k#l\r\n        ";
   	chat += "\r\n#L0##s5321054##b ���� (�߰�Ÿ) #r[Ư�� �Ŀ�]#k#r#n#l\r\n";
   	chat += "#L1##e#s80001140##b ���� ��ȣ (����) #r [Ư�� �Ŀ�]#k#r#n#l\r\n";
        chat += "#L2##e#s2311003##b Ȧ�� �ɺ� (����) #r [Ư�� �Ŀ�]#k#r#n#l\r\n";
        chat += "#L3##e#s3121002##b ���� ������ (����) #r [Ư�� �Ŀ�]#k#r#n#l\r\n";
        chat += "#L4##e#s5121009##b ���� �ν��� (����) #r [Ư�� �Ŀ�]#k#r#n#l\r\n";
        chat += "#L5##e#s4331002##b �̷� �̹�¡ (����) #r [Ư�� �Ŀ�]#k#r#n#l\r\n";
        chat += "#L6##e#s13101022##b Ʈ�����ø� ��||| #r [Ư�� �Ŀ�]#k#r#n#l\r\n";
        chat += "#L7##e#s3100010##b ���� ȭ�� #r [Ư�� �Ŀ�]#k#r#n#l\r\n";
        chat += "#L8##e#s24120002##b ���͸� ī��Ʈ#r [Ư�� �Ŀ�]#k#r#n#l\r\n";
        chat += "#L9##e#s24100003##b �� ī��Ʈ#r [Ư�� �Ŀ�]#k#r#n#l\r\n";
	chat += "#L10##e#s142110011##b�ڷ� Ű�׽ý�#r [Ư�� �Ŀ�]#k#r#n#l#r#n";
        cm.sendSimple(chat);         
    } else if (selection >= 0) {
	//cm.moneyBuff(selection);
	cm.sendOk("īī���� : @���ζ�¶���\r\n����Ʈ�� : saracen_dev@nate.com\r\nƯ�� �Ŀ��� 1:1 ����� �̿����ּ���!");
	cm.dispose();
	}
}