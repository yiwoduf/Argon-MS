function start() {
	 if (cm.getPlayer().getEventInstance().getProperty("LudiPQ_Gate") == 0) {
	cm.sendNext("�ι�° ���������� ���� ������ �帮�ڽ��ϴ�. �� ������ ������ �տ��� ���ܳ� ����� ������ �ֽ��ϴ�. �� ����� �������� ������� #b������ ���������#k��� ���͸� ��� �����ּ���. ��� ���͸� ���� �Ŀ�, ������ ���� �ɾ� �ֽø� ���� ���������� �� �� �ֵ��� ���� ����帮�ڽ��ϴ�.");
	cm.dispose();
    } else {
	cm.getPlayer().getMap().broadcastMessage(Packages.packet.creators.MainPacketCreator.environmentChange("gate",2));
	cm.getPlayer().getMap().broadcastMessage(Packages.packet.creators.MainPacketCreator.playSound("Party1/Clear"));
            cm.getPlayer().getMap().broadcastMessage(Packages.packet.creators.MainPacketCreator.showEffect("quest/party/clear"));
	cm.sendNext("���� ���������� �̵��� �ּ���.");
	cm.dispose();
    }
   }

