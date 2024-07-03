importPackage(java.lang);
importPackage(Packages.handling.world);
importPackage(Packages.packet.creators);



var boss = 8840000; //보스 코드
var map = 272020200; //맵코드
var bn = "아카이럼"; //보스이름
var back = 100000000; //돌아갈 맵 코드
var x = 7; //소환x좌표 
var y = -160; //소환y좌표

var status = -1;


	function start() {
	action(1, 0, 0);
	}

	function action(mode, type, selection) {
	status++;
	if (status == 0) {

            cm.teachSkill(20031260, 1, 1);
		
		} else if(status == 1) {
		if(selection == 1) {//소환
			if (cm.getMonsterCount(map) > 0) {
			cm.sendOk("모든 몬스터를 전멸시켜야 합니다.");
			cm.dispose();
		} else if (cm.getMeso() <= 10000000) {
			cm.sendOk(""+bn+"을 소환하려면 1000만메소가 필요합니다.");
			cm.dispose();
		} else {    
			//WorldBroadcasting.broadcast(MainPacketCreator.getGMText(4, "　　　　　　　　　　　::::::::["+ cm.getPlayer().getName()+"] 님께서 "+(cm.getClient().getChannel()+1) +" 채널에서 "+bn+"을 소환하셨습니다.::::::::")); // 게임 채팅서버알림 메세지 
			cm.gainMeso(-10000000);
			cm.spawnMob(boss,x,y);
			cm.dispose();
		}

		} else if(selection == 2) {
			cm.warp(back, 0);
			cm.dispose();
		} else if(selection == 3) {
    	    		cm.killAllMob();
			//WorldBroadcasting.broadcast(MainPacketCreator.getGMText(8, "　　　　　＊＊＊＊["+ cm.getPlayer().getName()+"] 님께서 "+(cm.getClient().getChannel()+1) +" 채널에서 "+bn+"를 킬올시켰습니다.<스틸자제>＊＊＊＊"));
			cm.dispose();
		} else {
			cm.dispose();
		}

		} else {
			cm.dispose();
		}

		}


