/*
   스킬마스터 스크립트
   만든이 - 어린양(love_789456) = 스크립터(yhalks)

    오류발생 시 수정 후 2차배포는 블로그에서만 합니다

    제작자 블로그 : http://yhalks.xe.to
*/

var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 0 && status == 0) {
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {

	cm.sendSimple ("#e안녕,나는 캐시교환을 해주는 안경이야!#k\r\n#e#d" +
		  "#k\r\n#L100##r캐시 구입하기(수수료없음");

 
	  } else if (selection == 100) {
                cm.sendSimple ("캐시 교환은 #rLv.100#k부터 가능 하며, 최대 한도는 90만원 입니다.\r\n#Cgray#(캐시 비율 1:100)#d" +
                 "#k\r\n#L1##r#i4310080##z4310080#30개로 1만 캐시 교환하기" +
                 "#k\r\n#L2##r#i4310080##z4310080#300개로 15만 캐시 교환하기" +
                 "#k\r\n#L3##r#i4310080##z4310080#900개로 50만 캐시 교환하기");

                } else if (selection == 1) {
		if (cm.haveItem(4310080, 30)) {
				cm.sendOk ("#i4310080##z4310080#으로 1만 캐시로 교환하였습니다!");
                   		cm.gainItem (4310080, -30);
                   		cm.gainNX (10000);
                   		cm.dispose();
                     	} else {
                   		cm.sendOk ("#e#i4310080##z4310080#이 부족합니다. #k   #r(90만 한도)#n");
                   		cm.dispose();
			        
			}           
                } else if (selection == 2) {
		if (cm.haveItem(4310080, 300)) {
				cm.sendOk ("#i4310080##z4310080#으로 15만 캐시로 교환하였습니다!");
                   		cm.gainItem (4310080, -300);
                   		cm.gainNX (150000);
                   		cm.dispose();
                     	} else {
                   		cm.sendOk ("#i4310080##z4310080#부족함아니면 너 최대한도량 넘음 ㅋㅋ(90만 한도)");
                   		cm.dispose();
			        
			} 
                } else if (selection == 3) {
		if (cm.haveItem(4310080, 900)) {
				cm.sendOk ("#i4310080##z4310080#으로 50만 캐시로 교환하였습니다!");
                   		cm.gainItem (4310080, -900);
                   		cm.gainNX (500000);
                   		cm.dispose();
                     	} else {
                   		cm.sendOk ("#i4310080##z4310080#부족함아니면 너 최대한도량 넘음 ㅋㅋ(90만 한도)");
                   		cm.dispose();
			        
			} 
			
		}
	}
}


