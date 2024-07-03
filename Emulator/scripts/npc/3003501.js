/*
	에스페라 사냥터 스크립트
	펭귄이(guibe66_harang@nate.com)

*/
var status = 0;

var Star = "#fUI/FarmUI.img/objectStatus/star/whole#";

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
           var chat = "#fn나눔고딕 Extrabold##fs15##d                   " +Star+ " #k ESFERA FIELD  " +Star+ "#d \r\n\r\n";
		   chat += "                       #fs12##k  즐거운 사냥하세요#r♥\r\n\r\n"
		   chat += "#L1##fs11##k[#r♥#k] #n#k(Lv.250~)#b 에스페라 생명이 시작되는 곳2\r\n"
			chat += "#L2##n#k[#r♥#k] #n#k(Lv.250~)#b 에스페라 생명이 시작되는 곳3\r\n"
			chat += "#L3##n#k[#r♥#k] #n#k(Lv.250~)#b 에스페라 생명이 시작되는 곳4\r\n"
			chat += "#L4##n#k[#r♥#k] #n#k(Lv.250~)#b 에스페라 생명이 시작되는 곳5\r\n"
			chat += "#L5##n#k[#r♥#k] #n#k(Lv.250~)#b 에스페라 생명이 시작되는 곳6\r\n"
			chat += "#L6##n#k[#r♥#k] #n#k(Lv.250~)#b 에스페라 생명이 시작되는 곳7\r\n"
			chat += "#L7##n#k[#r♥#k] #n#k(Lv.250~)#b 에스페라 거울에 비친 빛의 신전2\r\n"
			chat += "#L8##n#k[#r♥#k] #n#k(Lv.250~)#b 에스페라 거울에 비친 빛의 신전3\r\n"
			chat += "#L9##n#k[#r♥#k] #n#k(Lv.250~)#b 에스페라 거울에 비친 빛의 신전4\r\n"
			chat += "#L10##n#k[#r♥#k] #n#k(Lv.250~)#b 에스페라 거울빛에 물든 바다2\r\n"
			chat += "#L11##n#k[#r♥#k] #n#k(Lv.250~)#b 에스페라 거울빛에 물든 바다3\r\n"
			chat += "#L12##n#k[#r♥#k] #n#k(Lv.250~)#b 에스페라 거울빛에 물든 바다4\r\n"
			chat += "#L13##n#k[#r♥#k] #n#k(Lv.250~)#b 에스페라 거울빛에 물든 바다5\r\n"
			chat += "#L14##n#k[#r♥#k] #n#k(Lv.250~)#b 에스페라 거울빛에 물든 바다6\r\n"
			chat += "#L15##n#k[#r♥#k] #n#k(Lv.250~)#b 에스페라 거울빛의 물든 바다7\r\n"
	cm.sendSimple(chat);

	} else if (status == 1) {

	if (selection == 1) { //생명이 시작되는 곳2
	cm.dispose();
	cm.warp(450007010);
	
	} else if (selection == 2) { //생명이 시작되는 곳3
	cm.dispose();
	cm.warp(450007020);
	
	} else if (selection == 3) { //생명이 시작되는 곳4
		cm.dispose();
		cm.warp(450007030);
	
	} else if (selection == 4) { //생명이 시작되는 곳5
		cm.dispose();
		cm.warp(450007050);
	
	} else if (selection == 5) { //생명이 시작되는 곳6
		cm.dispose();
		cm.warp(450007060);
	
	} else if (selection == 6) { //생명이 시작되는 곳7
		cm.dispose();
		cm.warp(450007070);
		
	} else if (selection == 7) { //거울에 비친 빛의 신전2
		cm.dispose();
		cm.warp(45007210);
		
	} else if (selection == 8) { //거울에 비친 빛의 신전3
		cm.dispose();
		cm.warp(450007220);
	
	} else if (selection == 9) { //거울에 비친 빛의 신전4
		cm.dispose();
		cm.warp(450007230);
	
	} else if (selection == 10) { //거울빛에 물든 바다2
		cm.dispose();
		cm.warp(450007110);
	
	} else if (selection == 11) { //거울빛에 물든 바다3
		cm.dispose();
		cm.warp(450007120);
		
	} else if (selection == 12) { //거울빛에 물든 바다4
		cm.dispose();
		cm.warp(45007130);
	
	} else if (selection == 13) { //거울빛에 물든 바다5
		cm.dispose();
		cm.warp(450007140);
	
	} else if (selection == 14) { //거울빛에 물든 바다6
		cm.dispose();
		cm.warp(450007150);
	
	} else if (selection == 15) { //거울빛에 물든 바다7
		cm.dispose();
		cm.warp(450007160);
	
 			}
		}
	}
}