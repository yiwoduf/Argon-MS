function start() {
	 if (cm.getPlayer().getEventInstance().getProperty("LudiPQ_Gate") == 0) {
	cm.sendNext("두번째 스테이지에 대해 설명해 드리겠습니다. 이 곳에는 차원의 균열로 생겨난 어둠의 공간이 있습니다. 이 어둠의 공간으로 숨어버린 #b차원의 쉐도우아이#k라는 몬스터를 모두 없애주세요. 모든 몬스터를 없앤 후에, 저에게 말을 걸어 주시면 다음 스테이지로 갈 수 있도록 길을 열어드리겠습니다.");
	cm.dispose();
    } else {
	cm.getPlayer().getMap().broadcastMessage(Packages.packet.creators.MainPacketCreator.environmentChange("gate",2));
	cm.getPlayer().getMap().broadcastMessage(Packages.packet.creators.MainPacketCreator.playSound("Party1/Clear"));
            cm.getPlayer().getMap().broadcastMessage(Packages.packet.creators.MainPacketCreator.showEffect("quest/party/clear"));
	cm.sendNext("다음 스테이지로 이동해 주세요.");
	cm.dispose();
    }
   }

