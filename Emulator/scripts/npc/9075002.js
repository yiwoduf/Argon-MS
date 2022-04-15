

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
         
	       var Lcoin = cm.itemQuantity(4033076);
               //var Lcoin2 = cm.itemQuantity(4033825);
                
	       var chat = "\r\n#L998#";
	       chat += "#r#e현재 #b#h0##k님의#r#i4033076# 오르카의 징표 갯수 #r#e"+ Lcoin +" #n#k#k#n\r\n"
                
               chat+="         　　　　　　        #k #e#b후원포인트 #r"+cm.getRC()+"#b원#n#k"
	       
	       
              

               
	       // chat += "\r\n\r\n#L998##r#i2028048#[후포] #e#r2,000#k#n(원)#L6125# #i4031345##b[장비 보호권]#k#e#r(1개)#n#k #e#r#k#n";
	       
                chat += "\r\n\r\n#L998##r#i4033076#  #e#r25#k#n(개)#L3746# #i4310119#[초월단풍잎] #e#r200개#k#n";

                  chat += "\r\n\r\n#L998##r#i4033076#  #e#r125#k#n(개)#L4000# #i4310119#[초월단풍잎] #e#r1000개#k#n";

 
                 //chat += "\r\n\r\n#L998##r#i4033076#  #e#r100#k#n(개)#L3726# #i4031054#[오래된 지도 조각] #e#r30개#k#n";

               chat += "\r\n\r\n#L998##r#i4033076#  #e#r200#k#n(개)#L3# #i3015049#[블랙헤븐 기차의자] #e#r1개#k#n";
               

	       
               chat += "\r\n\r\n#L998##r#i4033076#  #e#r300#k#n(개)#L710# #i2040727#[미끄럼 방지 주문서] #e#r1개#k#n"
	       
	       chat += "\r\n\r\n#L998##r#i4033076#  #e#r300#k#n(개)#L7184# #i3015003#[#b스우 베게의자#k] #e#r1개#k#n"
              chat += "\r\n\r\n#L998##r#i4033076#  #e#r300#k#n(개)#L3999# #i3010979##r[#r오르카 베게의자#k]#k #e#r1개#k#n";
              
             chat += "\r\n\r\n#L998##r#i4033076#  #e#r333#k#n(개)#L1004# #i1102766#[#e#d올스텟3000,공마200#n#k] #e#r1개#k#n";
             chat += "\r\n\r\n#L998##r#i4033076#  #e#r400#k#n(개)#L3948# #i1672040##r[#r티타늄 하트#k]#k #e#r1개#k#n\r\n";
chat += "#d#e　　　　　　　　　[올스텟300,공마100]　 #n#k#k#n"

chat += "\r\n\r\n#L998##r#i4033076#  #e#r444#k#n(개)#L3951# #i1003390##r[#e#d블랙윙 마스터의 모자#n#k]#k #e#r1개#k#n\r\n";
chat += "#b#e　　　　　　　　　[올스텟4,000,공마400]　 #n#k#k#n"
//chat += "\r\n\r\n#L998##r#i4033076#  #e#r888#k#n(개)#L3938# #i1112586##r[#e#d다크 엔젤릭 블레스#n#k]#k #e#r1개#k#n\r\n";
//chat += "#b#e　　　　　　　　　[올스텟4,000,공마2,000]　 #n#k#k#n"
//chat += "#r#eㅡㅡㅡㅡㅡ[엔젤릭블레스 중복착용불가능]ㅡㅡㅡㅡㅡ#n#k#k#n"
 chat += "\r\n\r\n#L998##r#i4033076#  #e#r1111#k#n(개)#L3921# #i1702400##r[#e#d토끼인형#n#k]#k #e#r1개#k#n";
 chat += "#b#e　　　　　　　　　　　　　　[올스텟3,000,공마2,000]　 #n#k#k#n"

	    //   chat += "\r\n\r\n#L998##r#i4033076#  #e#r2222#k#n(개)#L742# #i1142661##e#r[올스텟7000,공마700]#n#k #e#r#k#n\r\n"; 

             //  chat += "\r\n\r\n#L998##r#i4033076#  #e#r2222#k#n(개)#L6000# #i1142660##e#r[올스텟7000,공마700]#n#k #e#r#k#n\r\n\r\n#l";

            //   chat += "#r#eㅡㅡㅡㅡㅡㅡㅡ{전체채팅기능#b[『패션왕』]#k}ㅡㅡ #n#k#k#n"
	       

                 chat += "\r\n\r\n#L998##r#i4033076#  #e#r4444#k#n(개)#L3933# #i1102699##r[#e#d전설의 마그마 날개#n#k]#k #e#r1개#k#n\r\n";
chat += "#b#e　　　　　　　　　[올스텟7,000,공마3,000]　 #n#k#k#n"


	       //chat += "\r\n\r\n#L998##r#i4001187#  #e#r5,000#k#n (마리)#L9381# #i1012003#[올스텟3000,공마300] #e#r1개#k#n"
	       
	     
	      
	       //chat += "\r\n\r\n#L998##r#i4310088# 코인 #e#r5#k#n 개#L9385# #i2591088# #e#r1개[위대한 시그너스 소울]#k#n"

//chat += "\r\n\r\n#L998##r#i4033076#  #e#r5000#k#n(개)#L9000# #i2434734##e#r[블랙헤븐 데미지스킨]#n#k #e#r#k#n\r\n\r\n#l";
	    


	   

	       cm.sendSimple(chat);

	    }  if (selection >= 9999999) {
		    cm.dispose();
    } else if (selection == 1) {
		if (cm.haveItem(4310088, 1)) {
		    if (cm.canHold(2049361)) {
		        cm.sendOk("#r홍보 코인#k으로 #r#i2049361#  30개#k를 구입 하셨습니다.");
			cm.gainItem(4310088, -1);
			cm.gainItem(2049361,30);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r홍보 코인#k이 부족합니다.");
		    cm.dispose();

}
} else if (selection == 3999) {
if (cm.haveItem(4033076, 300)) {
		    if (cm.canHold(4033076)) {
		        cm.sendOk("#r오르카의 징표#k로 #r#i3010979# 를 구입 하셨습니다.");
			cm.gainItem(4033076, -300);
                        cm.gainItem(3010979,1);
			cm.dispose();
		    } else {
		        cm.sendOk("설치칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r오르카의 징표#k가 부족합니다.");
		    cm.dispose();
}
} else if (selection == 9000) {
if (cm.haveItem(4033076, 5000)) {
		    if (cm.canHold(4033076)) {
		        cm.sendOk("#r오르카의 징표#k로 #r#i2434734# 를 구입 하셨습니다.");
			cm.gainItem(4033076, -5000);
                        cm.gainItem(2434734,1);
			cm.dispose();
		    } else {
		        cm.sendOk("소비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r오르카의 징표#k가 부족합니다.");
		    cm.dispose();
}
} else if (selection == 3746) {
if (cm.haveItem(4033076, 25)) {
		    if (cm.canHold(4033076)) {
		        cm.sendOk("#r오르카의 징표#k로 #r#i4310119# 를 구입 하셨습니다.");
			cm.gainItem(4033076, -25);
                        cm.gainItem(4310119,200);
			cm.dispose();
		    } else {
		        cm.sendOk("기타창에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r오르카의 징표#k가 부족합니다.");
		    cm.dispose();
}
} else if (selection == 3726) {
if (cm.haveItem(4033076, 100)) {
		    if (cm.canHold(4031054)) {
		        cm.sendOk("#r오르카의 징표#k로 #r#i4031054# 를 구입 하셨습니다.");
			cm.gainItem(4033076, -100);
                        cm.gainItem(4031054,30);
			cm.dispose();
		    } else {
		        cm.sendOk("기타창에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r오르카의 징표#k가 부족합니다.");
		    cm.dispose();
}
} else if (selection == 3938) {
if (cm.haveItem(4033076, 888)) {
		    if (cm.canHold(4033076)) {
		        cm.sendOk("#r오르카의 징표#k로 #r#i1112586# 를 구입 하셨습니다.");
			cm.gainItem(4033076, -888);
                        cm.gainSponserItem(1112586,'[아무거나 온라인]',4000,2000,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r오르카의 징표#k가 부족합니다.");
		    cm.dispose();
}
} else if (selection == 4000) {
if (cm.haveItem(4033076, 125)) {
		    if (cm.canHold(4033076)) {
		        cm.sendOk("#r오르카의 징표#k로 #r#i4310119# 를 구입 하셨습니다.");
			cm.gainItem(4033076, -25);
                        cm.gainItem(4310119,2000);
			cm.dispose();
		    } else {
		        cm.sendOk("기타창에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r오르카의 징표#k가 부족합니다.");
		    cm.dispose();
}
} else if (selection == 3921) {
if (cm.haveItem(4033076, 1111)) {
		    if (cm.canHold(4033076)) {
		        cm.sendOk("#r오르카의 징표#k로 #r#i1702400# 를 구입 하셨습니다.");
			cm.gainItem(4033076, -1111);
                        cm.gainSponserItem(1702400,'[아무거나 온라인]',3000,2000,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r오르카의 징표#k가 부족합니다.");
		    cm.dispose();
}
} else if (selection == 3933) {
if (cm.haveItem(4033076, 4444)) {
		    if (cm.canHold(4033076)) {
		        cm.sendOk("#r오르카의 징표#k로 #r#i1102699# 를 구입 하셨습니다.");
			cm.gainItem(4033076, -4444);
                        cm.gainSponserItem(1102699,'[아무거나 온라인]',7000,3000,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r오르카의 징표#k가 부족합니다.");
		    cm.dispose();
}
} else if (selection == 3948) {
if (cm.haveItem(4033076, 400)) {
		    if (cm.canHold(4033076)) {
		        cm.sendOk("#r오르카의 징표#k로 #r#i1672040# 를 구입 하셨습니다.");
			cm.gainItem(4033076, -400);
                        cm.gainSponserItem(1672040,'[아무거나 온라인]',300,100,9);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r오르카의 징표#k가 부족합니다.");
		    cm.dispose();
}
} else if (selection == 3951) {
if (cm.haveItem(4033076, 444)) {
		    if (cm.canHold(4033076)) {
		        cm.sendOk("#r오르카의 징표#k로 #r#i1003390# 를 구입 하셨습니다.");
			cm.gainItem(4033076, -444);
                        cm.gainSponserItem(1003390,'[아무거나 온라인]',4000,400,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r오르카의 징표#k가 부족합니다.");
		    cm.dispose();
}
}  if (selection == 6125) {
		if(cm.getRC() >=2000) {
		    if (cm.canHold(4031345)) {
			cm.gainItem(4031345,1);
		        cm.sendOk("#r후원 포인트 2,000원#k으로 #i4031345##d[#z4031345#]#k를 구매했다.");
			cm.loseRC(2000);
			cm.dispose();
		    } else {
		        cm.sendOk("기타창에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
                } else {
		    cm.sendOk("후원 포인트가 부족합니다.");
		    cm.dispose();
		}
			
    } else if (selection == 111) {
		if (cm.haveItem(4310088, 10)) {
		    if (cm.canHold(1102550)) {
		        cm.sendOk("#r홍보 코인#k으로 #r#i1102550# 를 구입 하셨습니다.");
			cm.gainItem(4310088, -10);
                        cm.gndnjs(1102550,50,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r홍보 코인#k이 부족합니다.");
		    cm.dispose();
}
    } else if (selection == 110) {
		if (cm.haveItem(4310088, 10)) {
		    if (cm.canHold(1102551)) {
		        cm.sendOk("#r홍보 코인#k으로 #r#i1102551# 를 구입 하셨습니다.");
			cm.gainItem(4310088, -10);
                        cm.gndnjs(1102551,50,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r홍보 코인#k이 부족합니다.");
		    cm.dispose();
}
	    } else if (selection == 109) {
		if (cm.haveItem(4310088, 20)) {
		    if (cm.canHold(1702455)) {
		        cm.sendOk("#r홍보 코인#k으로 #r#i1702455# 를 구입 하셨습니다.");
			cm.gainItem(4310088, -20);
                        cm.gndnjs(1702455,100,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r홍보 코인#k이 부족합니다.");
		    cm.dispose();
}
	    } else if (selection == 2) {
		if (cm.haveItem(4310088, 1)) {
		    if (cm.canHold(2049704)) {
		        cm.sendOk("#r홍보 코인#k으로 #r#i2049704# 30개#k를 구입 하셨습니다.");
			cm.gainItem(4310088, -1);
			cm.gainItem(2049704,30);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r홍보 코인#k이 부족합니다.");
		    cm.dispose();

}
	    } else if (selection == 108) {
		if (cm.haveItem(4310088, 10)) {
		    if (cm.canHold(1052661)) {
		        cm.sendOk("#r홍보 코인#k으로 #r#i1052661# 를 구입 하셨습니다.");
			cm.gainItem(4310088, -10);
                        cm.gndnjs(1052661,50,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r홍보 코인#k이 부족합니다.");
		    cm.dispose();
}
	    } else if (selection == 107) {
		if (cm.haveItem(4310088, 10)) {
		    if (cm.canHold(1082549)) {
		        cm.sendOk("#r홍보 코인#k으로 #r#i1082549# 를 구입 하셨습니다.");
			cm.gainItem(4310088, -10);
                        cm.gndnjs(1082549,50,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r홍보 코인#k이 부족합니다.");
		    cm.dispose();
}
	    } else if (selection == 106) {
		if (cm.haveItem(4310088, 10)) {
		    if (cm.canHold(1003965)) {
		        cm.sendOk("#r홍보 코인#k으로 #r#i1003965# 를 구입 하셨습니다.");
			cm.gainItem(4310088, -10);
                        cm.gndnjs(1003965,50,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r홍보 코인#k이 부족합니다.");
		    cm.dispose();
}
	    } else if (selection == 105) {
		if (cm.haveItem(4310088, 20)) {
		    if (cm.canHold(1702433)) {
		        cm.sendOk("#r홍보 코인#k으로 #r#i1702433# 를 구입 하셨습니다.");
			cm.gainItem(4310088, -20);
                        cm.gndnjs(1702433,100,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r홍보 코인#k이 부족합니다.");
		    cm.dispose();
}
	    } else if (selection == 104) {
		if (cm.haveItem(4310088, 10)) {
		    if (cm.canHold(1052587)) {
		        cm.sendOk("#r홍보 코인#k으로 #r#i1052587# 를 구입 하셨습니다.");
			cm.gainItem(4310088, -10);
                        cm.gndnjs(1052587,50,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r홍보 코인#k이 부족합니다.");
		    cm.dispose();
}
	    } else if (selection == 104) {
		if (cm.haveItem(4310088, 10)) {
		    if (cm.canHold(1052587)) {
		        cm.sendOk("#r홍보 코인#k으로 #r#i1052587# 를 구입 하셨습니다.");
			cm.gainItem(4310088, -10);
                        cm.gndnjs(1052587,50,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r홍보 코인#k이 부족합니다.");
		    cm.dispose();
}
	    } else if (selection == 103) {
		if (cm.haveItem(4310088, 10)) {
		    if (cm.canHold(1082493)) {
		        cm.sendOk("#r홍보 코인#k으로 #r#i1082493# 를 구입 하셨습니다.");
			cm.gainItem(4310088, -10);
                        cm.gndnjs(1082493,50,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r홍보 코인#k이 부족합니다.");
		    cm.dispose();
            
}
	    } else if (selection == 102) {
		if (cm.haveItem(4310088, 10)) {
		    if (cm.canHold(1003776)) {
		        cm.sendOk("#r홍보 코인#k으로 #r#i1003776# 를 구입 하셨습니다.");
			cm.gainItem(4310088, -10);
                        cm.gndnjs(1003776,50,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r홍보 코인#k이 부족합니다.");
		    cm.dispose();
}
	    } else if (selection == 5558) {
		if (cm.haveItem(4310088, 1)) {
		    if (cm.canHold(2048723)) {
		        cm.sendOk("#r홍보 코인#k으로 #r#i2048723# 10개를 구입 하셨습니다.");
			cm.gainItem(4310088, -1);
                        cm.gndnjs(2048723,10);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r홍보 코인#k이 부족합니다.");
		    cm.dispose();
}
	    } else if (selection == 100) {
		if (cm.haveItem(4310088, 10)) {
		    if (cm.canHold(1052434)) {
		        cm.sendOk("#r홍보 코인#k으로 #r#i1052434# 를 구입 하셨습니다.");
			cm.gainItem(4310088, -10);
                        cm.gndnjs(1052434,50,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r홍보 코인#k이 부족합니다.");
		    cm.dispose();
}
              } else if (selection == 7184) {
		if (cm.haveItem(4033076, 300)) {
		    if (cm.canHold(4033076)) {
		        cm.sendOk("#r오르카의 징표#k로 #r#i3015003# 를 구입 하셨습니다.");
			cm.gainItem(4033076, -300);
                        cm.gainItem(3015003, 1);
			cm.dispose();
		    } else {
		        cm.sendOk("설치창에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r오르카의 징표#k가 부족합니다.");
		    cm.dispose();
}
	    } else if (selection == 17) {
		if (cm.haveItem(4310088, 40)) {
		    if (cm.canHold(1112585)) {
		        cm.sendOk("#r홍보 코인#k으로 #r#i1112585# 를 구입 하셨습니다.");
			cm.gainItem(4310088, -40);
                        cm.gndnjs(1112585,200,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r홍보 코인#k이 부족합니다.");
		    cm.dispose();

}
	    } else if (selection == 52) {
		if (cm.haveItem(4310088, 50)) {
		    if (cm.canHold(1142249)) {
		        cm.sendOk("#r홍보 코인#k으로 #r#i1142623# 를 구입 하셨습니다.");
			cm.gainItem(4310088, -50);
                        cm.gndnjs(1142623,250,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r홍보 코인#k이 부족합니다.");
		    cm.dispose();

}
	    } else if (selection == 51) {
		if (cm.haveItem(4310088, 50)) {
		    if (cm.canHold(1142249)) {
		        cm.sendOk("#r홍보 코인#k으로 #r#i1142249# 를 구입 하셨습니다.");
			cm.gainItem(4310088, -50);
                        cm.gndnjs(1142249,250,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r홍보 코인#k이 부족합니다.");
		    cm.dispose();

}
	    } else if (selection == 50) {
		if (cm.haveItem(4310088, 1)) {
		    if (cm.canHold(4310088)) {
		        cm.sendOk("#r홍보 코인#k으로 후원포인트[1,000]을 구입 하셨습니다.");
			cm.gainRC(1000);
                        cm.gndnjs(1112558,250,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r홍보 코인#k이 부족합니다.");
		    cm.dispose();

}
	


	    } else if (selection == 3) {
		if (cm.haveItem(4033076, 200)) {
		    if (cm.canHold(4033076)) {
		        cm.sendOk("#r오르카의 징표#k로 #r#i3015049# 1개#k를 구입 하셨습니다.");
			cm.gainItem(4033076, -200);
			cm.gainItem(3015049,1);
			cm.dispose();
		    } else {
		        cm.sendOk("설치창에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r오르카의 징표#k가 부족합니다.");
		    cm.dispose();

}
	    } else if (selection == 4) {
		if (cm.haveItem(4310088, 1)) {
		    if (cm.canHold(4310029)) {
		        cm.sendOk("#r홍보 코인#k으로 #r#i4310029# 을 구입 하셨습니다.");
			cm.gainItem(4310088, -1);
			cm.gainItem(4310029, 3);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r홍보 코인#k이 부족합니다.");
		    cm.dispose();

}
	    } else if (selection == 5) {
		if (cm.haveItem(4310088, 1)) {
		    if (cm.canHold(2049300)) {
		        cm.sendOk("#r홍보 코인#k으로 #r#i2049300# 를 구입 하셨습니다.");
			cm.gainItem(4310088, -5);
			cm.gainItem(2049300, 5);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r홍보 코인#k이 부족합니다.");
		    cm.dispose();

}
	    } else if (selection == 7) {
		if (cm.haveItem(4310088, 10)) {
		    if (cm.canHold(1102450)) {
		        cm.sendOk("#r홍보 코인#k으로 #r#i1102450# 를 구입 하셨습니다.");
			cm.gainItem(4310088, -10);
                        cm.gndnjs(1102376,50,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r홍보 코인#k이 부족합니다.");
		    cm.dispose();

}
	    } else if (selection == 8) {
		if (cm.haveItem(4310088, 10)) {
		    if (cm.canHold(1102451)) {
		        cm.sendOk("#r홍보 코인#k으로 #r#i1102451#를 구입 하셨습니다.");
			cm.gainItem(4310088, -10);
                        cm.gndnjs(1102451,50,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r홍보 코인#k이 부족합니다.");
		    cm.dispose();

}
	    } else if (selection == 81) {
		if (cm.haveItem(4310088, 10)) {
		    if (cm.canHold(1102452)) {
		        cm.sendOk("#r홍보 코인#k으로 #r#i1102452#를 구입 하셨습니다.");
			cm.gainItem(4310088, -10);
                        cm.gndnjs(1102452,50,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r홍보 코인#k이 부족합니다.");
		    cm.dispose();

}
	    } else if (selection == 9) {
		if (cm.haveItem(4310088, 20)) {
		    if (cm.canHold(1702456)) {
		        cm.sendOk("#r홍보 코인#k으로 #r#i1702456# 를 구입 하셨습니다.");
			cm.gainItem(4310088, -20);
			
                        cm.gndnjs(1702456,100,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r홍보 코인#k이 부족합니다.");
		    cm.dispose();

}
	    } else if (selection == 10) {
		if (cm.haveItem(4310088, 20)) {
		    if (cm.canHold(1702451)) {
		        cm.sendOk("#r홍보 코인#k으로 #r#i1702451# 를 구입 하셨습니다.");
			cm.gainItem(4310088, -20);
                        cm.gndnjs(1702451,100,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r홍보 코인#k이 부족합니다.");
		    cm.dispose();

}
	    } else if (selection == 11) {
		if (cm.haveItem(4310088, 20)) {
		    if (cm.canHold(1702457)) {
		        cm.sendOk("#r홍보 코인#k으로 #r#i1702457# 를 구입 하셨습니다.");
			cm.gainItem(4310088, -20);
                        cm.gndnjs(1702457,100,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r홍보 코인#k이 부족합니다.");
		    cm.dispose();

}
	    } else if (selection == 12) {
		if (cm.haveItem(4310088, 10)) {
		    if (cm.canHold(1003133)) {
		        cm.sendOk("#r홍보 코인#k으로 #r#i1003133# 를 구입 하셨습니다.");
			cm.gainItem(4310088, -10);
                        cm.gndnjs(1003133,50,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r홍보 코인#k이 부족합니다.");
		    cm.dispose();

}
	    } else if (selection == 13) {
		if (cm.haveItem(4310088, 20)) {
		    if (cm.canHold(1003636)) {
		        cm.sendOk("#r홍보 코인#k으로 #r#i1003636# 를 구입 하셨습니다.");
			cm.gainItem(4310088, -20);
                        cm.gndnjs(1003636,100,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r홍보 코인#k이 부족합니다.");
		    cm.dispose();

}
	    } else if (selection == 15) {
		if (cm.haveItem(4310088, 40)) {
		    if (cm.canHold(1112586)) {
		        cm.sendOk("#r홍보 코인#k으로 #r#i1112586# 를 구입 하셨습니다.");
			cm.gainItem(4310088, -40);
                        cm.gndnjs(1112586,250,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r홍보 코인#k이 부족합니다.");
		    cm.dispose();

}
	    } else if (selection == 16) {
		if (cm.haveItem(4310088, 40)) {
		    if (cm.canHold(1112663)) {
		        cm.sendOk("#r홍보 코인#k으로 #r#i1112663# 를 구입 하셨습니다.");
			cm.gainItem(4310088, -40);
                        cm.gndnjs(1112663,200,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r홍보 코인#k이 부족합니다.");
		    cm.dispose();

}
	    } else if (selection == 20) {
		if (cm.haveItem(4310088, 30)) {
		    if (cm.canHold(1112141)) {
		        cm.sendOk("#r홍보 코인#k으로 #r#i1112141# 를 구입 하셨습니다.");
			cm.gainItem(4310088, -30);
                        cm.gndnjs(1112141,150,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r홍보 코인#k이 부족합니다.");
		    cm.dispose();

}
	    } else if (selection == 21) {
		if (cm.haveItem(4310088, 30)) {
		    if (cm.canHold(1112252)) {
		        cm.sendOk("#r홍보 코인#k으로 #r#i1112252# 를 구입 하셨습니다.");
			cm.gainItem(4310088, -30);
                        cm.gndnjs(11112252,150,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r홍보 코인#k이 부족합니다.");
		    cm.dispose();

}
	    } else if (selection == 22) {
		if (cm.haveItem(4310088, 30)) {
		    if (cm.canHold(1112135)) {
		        cm.sendOk("#r홍보 코인#k으로 #r#i1112135# 를 구입 하셨습니다.");
			cm.gainItem(4310088, -30);
                        cm.gndnjs(1112135,150,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r홍보 코인#k이 부족합니다.");
		    cm.dispose();

}
	    } else if (selection == 23) {
		if (cm.haveItem(4310088, 30)) {
		    if (cm.canHold(1112238)) {
		        cm.sendOk("#r홍보 코인#k으로 #r#i1112238# 를 구입 하셨습니다.");
			cm.gainItem(4310088, -30);
                        cm.gndnjs(1112238,150,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r홍보 코인#k이 부족합니다.");
		    cm.dispose();

}
	    } else if (selection == 24) {
		if (cm.haveItem(4310088, 30)) {
		    if (cm.canHold(1702348)) {
		        cm.sendOk("#r홍보 코인#k으로 #r#i1702348 를 구입 하셨습니다.");
			cm.gainItem(4310088, -30);
                        cm.gndnjs(1702348,150,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r홍보 코인#k이 부족합니다.");
		    cm.dispose();

}
	    } else if (selection == 25) {
		if (cm.haveItem(4310088, 30)) {
		    if (cm.canHold(1702350)) {
		        cm.sendOk("#r홍보 코인#k으로 #r#i1702350# 를 구입 하셨습니다.");
			cm.gainItem(4310088, -30);
                        cm.gndnjs(1702350,150,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r홍보 코인#k이 부족합니다.");
		    cm.dispose();

}
	    } else if (selection == 50) {
		if (cm.haveItem(4310088, 1)) {
		    if (cm.canHold(5064000)) {
		        cm.sendOk("#r홍보 코인#k으로 #r#i5064000# 를 구입 하셨습니다.");
			cm.gainItem(4310088, -1);
			cm.gainItem(5064000, 1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r홍보 코인#k이 부족합니다.");
		    cm.dispose();

}
	    } else if (selection == 51) {
		if (cm.haveItem(4310088, 1)) {
		    if (cm.canHold(5062005)) {
		        cm.sendOk("#r홍보 코인#k으로 #r#i5062005# 50개 를 구입 하셨습니다.");
			cm.gainItem(4310088, -1);
			cm.gainItem(5062005, 50);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r홍보 코인#k이 부족합니다.");
		    cm.dispose();

}
	    } else if (selection == 52) {
		if (cm.haveItem(4310088, 1)) {
		    if (cm.canHold(5064100)) {
		        cm.sendOk("#r홍보 코인#k으로 #r#i5064100# 를 구입 하셨습니다.");
			cm.gainItem(4310088, -1);
			cm.gainItem(5064100, 5);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r홍보 코인#k이 부족합니다.");
		    cm.dispose();

}
    } else if (selection == 1004) {
		if (cm.haveItem(4033076, 333)) {
		    if (cm.canHold(4033076)) {
		        cm.sendOk("#r오르카의 징표#k로 #r#i1102766#[폭주 스우 아우라] 1개#k를 구입 하셨습니다.");
			cm.gainItem(4033076, -333);
			cm.gainSponserItem(1102766,'[아무거나 온라인]',3000,200,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비창에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r오르카의 징표#k가 부족합니다.");
		    cm.dispose();

}
} else if (selection == 8724) {
		if (cm.haveItem(4031054, 100)) {
		    if (cm.canHold(4031054)) {
		        cm.sendOk("#r오래된 지도조각#k으로 #r#i4033825#[별빛의 결정] 1개를 구입 하셨습니다.");
			cm.gainItem(4031054, -100);
			cm.gainItem(4033825, 1);
			cm.dispose();
} else {
		        cm.sendOk("기타창에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		    
		} else {
		    cm.sendOk("#r오래된 지도조각#k이 부족합니다.");
		    cm.dispose();

}


	    } else if (selection == 710) {
		if (cm.haveItem(4033076,300)) {
		    if (cm.canHold(4033076)) {
		        cm.sendOk("#r오르카의 징표#300개로 #r#i2040727# 1개#를 구입 하셨습니다.");
			cm.gainItem(4033076, -300);
			cm.gainItem(2040727,1);
			cm.dispose();
		    } else {
		        cm.sendOk("소비창에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r오르카의 징표#k가 부족합니다.");
		    cm.dispose();

}
             } else if (selection == 9381) {
		if (cm.haveItem(4001187, 5000)) {
		    if (cm.canHold(4001187)) {
		        cm.sendOk("#r물고기#k로 #r#i1012003 1개#를 구입 하셨습니다.");
			cm.gainItem(4001187, -5000);
			cm.gainSponserItem(1012003,'[아무거나 온라인]',3000,300,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r물고기#k가 부족합니다.");
		    cm.dispose();

}
             } else if (selection == 9385) {
		if (cm.haveItem(4310088, 1)) {
		    if (cm.canHold(2591088)) {
		        cm.sendOk("#r홍보 코인#k으로 #r#i2591088 1개#를 구입 하셨습니다.");
			cm.gainItem(4310088, -5);
			cm.gainItem(2591088,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r홍보 코인#k이 부족합니다.");
		    cm.dispose();

}
            } else if (selection == 742) {
		if (cm.haveItem(4033076, 2222)) {
		    if (cm.canHold(4033076)) {
		        cm.sendOk("#r오르카의 징표#k로 #r#i1142661#를 구입 하셨습니다.");
			cm.gainItem(4033076, -2222);			
                        cm.gainSponserItem(1142661,'[아무거나 온라인]',7000,700,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r오르카의 징표#k가 부족합니다.");
		    cm.dispose();

}

 } else if (selection == 6000) {
		if (cm.haveItem(4033076, 2222)) {
		    if (cm.canHold(4033076)) {
		        cm.sendOk("#r오르카의 징표#k로 #r#i1142660#를 구입 하셨습니다.");
			cm.gainItem(4033076, -2222);			
                        cm.gainSponserItem(1142660,'[아무거나 온라인]',7000,700,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r오르카의 징표#k가 부족합니다.");
		    cm.dispose();

}
             } else if (selection == 10001) {
		cm.dispose();
		cm.openNpc(1033221);
		return;

             } else if (selection == 10002) {
		cm.dispose();
		cm.openNpc(1033211);
		return;
             } else if (selection == 10003) {
		cm.dispose();
		cm.openNpc(1033206);
		return;
             } else if (selection == 10004) {
		cm.dispose();
		cm.openNpc(1033205);
		return;
             } else if (selection == 10009) {
		cm.dispose();
		cm.openNpc(1033111);
		return;
 } else if (selection == 20000) {
		cm.dispose();
		cm.openNpc(9072100);
		return;
             } else if (selection == 10006) {
		cm.dispose();
		cm.openNpc(1033202);
		return;
             } else if (selection == 10007) {
		cm.dispose();
		cm.openNpc(1033201);
		return;
            } else if (selection == 10008) {
		cm.dispose();
		cm.openNpc(1033200);
		return;
            } else if (selection == 10011) {
		cm.dispose();
		cm.openNpc(1033110);
		return;
  } else if (selection == 20001) {
		cm.dispose();
		cm.openNpc(1033105);
		return;
} else if (selection == 998) {
		cm.dispose();
		cm.openNpc(9075002);
		return;





		}
	}
}